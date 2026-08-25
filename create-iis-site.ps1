<#
.SYNOPSIS
    Creates (or repairs) the IIS website and Application Pool for the
    Rashet 3TR (Hesham) React + Vite SPA on Windows Server.

.DESCRIPTION
    One-time provisioning script, run once per server before the first
    deploy.ps1. It is idempotent - re-running it is safe and only adds
    what is missing:

      1. Verifies IIS + the URL Rewrite module are present.
      2. Creates the physical website directory.
      3. Creates a "No Managed Code" Application Pool.
      4. Creates the website bound to that pool.
      5. Adds the HTTP (port 80) and HTTPS (port 443, SNI) bindings.
      6. Attaches the matching SSL certificate (wildcard certs supported).
      7. Grants the Application Pool identity read access to the folder.
      8. Drops a placeholder index.html so the site answers before deploy.

.NOTES
    Run from an ELEVATED PowerShell session (IIS management needs Administrator).
    Usage: powershell -ExecutionPolicy Bypass -File create-iis-site.ps1

    DNS is NOT handled here: point an A record for the domain at this
    server's public IP, or the bindings will never receive traffic.

.PARAMETER Force
    Recreate the HTTP/HTTPS bindings even if they already exist. Useful when
    a binding was created by hand with the wrong host header or certificate.
#>

[CmdletBinding()]
param(
    [switch]$Force
)

# ============================================================================
#  CONFIGURATION  -  Adjust these values for your environment
# ============================================================================

# IIS website name, as it appears in IIS Manager.
$SiteName = 'rashet-3tr-hesham'

# IIS Application Pool name. Kept identical to the site name by convention.
$AppPoolName = 'rashet-3tr-hesham'

# Physical path served by the website. This is deploy.ps1's $WebsitePath and
# must NOT be the source project folder, which deploy.ps1 would then wipe.
$WebsitePath = 'C:\inetpub\rashet-3tr-hesham'

# Public host header for both the HTTP and HTTPS bindings.
$Domain = 'rashet-etr-hesham.growfet.com'

# Certificate stores searched for a certificate matching $Domain, in order.
# WebHosting is where IIS puts certificates imported for SNI hosting; My is
# the classic "Personal" machine store.
$CertStores = @('WebHosting', 'My')

# ============================================================================
#  SETUP  -  Fail fast on any error
# ============================================================================

$ErrorActionPreference = 'Stop'

function Write-Step { param([string]$Message) Write-Host "`n==> $Message" -ForegroundColor Cyan }
function Write-Info { param([string]$Message) Write-Host "    $Message"    -ForegroundColor Gray }
function Write-Ok   { param([string]$Message) Write-Host "[OK]  $Message"  -ForegroundColor Green }
function Write-Warn { param([string]$Message) Write-Host "[WARN] $Message" -ForegroundColor Yellow }
function Write-Err  { param([string]$Message) Write-Host "[FAIL] $Message" -ForegroundColor Red }

function Fail { param([string]$Message, [int]$Code = 1) Write-Err $Message; exit $Code }

Write-Host '========================================================' -ForegroundColor Magenta
Write-Host '  Rashet 3TR (Hesham) - IIS Site Provisioning' -ForegroundColor Magenta
Write-Host "  Site   : $SiteName" -ForegroundColor Magenta
Write-Host "  Pool   : $AppPoolName" -ForegroundColor Magenta
Write-Host "  Path   : $WebsitePath" -ForegroundColor Magenta
Write-Host "  Domain : $Domain" -ForegroundColor Magenta
Write-Host '========================================================' -ForegroundColor Magenta

# ============================================================================
#  0. PRE-FLIGHT CHECKS
# ============================================================================

Write-Step 'Running pre-flight checks'

# Creating sites, pools and ACLs all require an elevated token.
$identity  = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = New-Object Security.Principal.WindowsPrincipal($identity)
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Fail 'This script must be run from an elevated (Administrator) PowerShell session.'
}
Write-Info 'Elevation : Administrator'

# Load the IIS management module (ships with the IIS management role).
try {
    Import-Module WebAdministration -ErrorAction Stop
} catch {
    Fail 'The WebAdministration module is unavailable. Is the IIS management role installed?'
}
Write-Info 'WebAdministration module : loaded'

# The web.config SPA fallback rule needs URL Rewrite; without it IIS returns
# HTTP 500.19 on every request. Warn now rather than after the first deploy.
$rewriteInstalled = Get-WebGlobalModule -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -eq 'RewriteModule' }
if ($rewriteInstalled) {
    Write-Info 'URL Rewrite module : installed'
} else {
    Write-Warn ('The IIS URL Rewrite module is NOT installed. The site will be created, ' +
                'but every request will fail with HTTP 500.19 until you install it from ' +
                'https://www.iis.net/downloads/microsoft/url-rewrite')
}

Write-Ok 'Pre-flight checks passed.'

# ============================================================================
#  1. PHYSICAL DIRECTORY
# ============================================================================

Write-Step 'Ensuring the physical website directory exists'

if (Test-Path $WebsitePath) {
    Write-Info "Already exists: $WebsitePath"
} else {
    New-Item -ItemType Directory -Path $WebsitePath -Force | Out-Null
    Write-Ok "Created $WebsitePath"
}

# ============================================================================
#  2. APPLICATION POOL
# ============================================================================

Write-Step "Ensuring Application Pool '$AppPoolName' exists"

if (Test-Path "IIS:\AppPools\$AppPoolName") {
    Write-Info 'Application Pool already exists; leaving its settings untouched.'
} else {
    New-WebAppPool -Name $AppPoolName | Out-Null

    # A Vite build is pure static files: no .NET runtime is loaded. An empty
    # managedRuntimeVersion is IIS Manager's "No Managed Code".
    Set-ItemProperty "IIS:\AppPools\$AppPoolName" -Name 'managedRuntimeVersion' -Value ''
    Set-ItemProperty "IIS:\AppPools\$AppPoolName" -Name 'managedPipelineMode'   -Value 'Integrated'
    Set-ItemProperty "IIS:\AppPools\$AppPoolName" -Name 'autoStart'             -Value $true

    # ApplicationPoolIdentity is the least-privileged default: a virtual
    # account named "IIS AppPool\<pool>" scoped to this pool alone.
    Set-ItemProperty "IIS:\AppPools\$AppPoolName" -Name 'processModel.identityType' -Value 'ApplicationPoolIdentity'

    Write-Ok "Created Application Pool '$AppPoolName' (No Managed Code)."
}

# ============================================================================
#  3. WEBSITE
# ============================================================================

Write-Step "Ensuring website '$SiteName' exists"

$site = Get-Website -Name $SiteName -ErrorAction SilentlyContinue
if ($site) {
    Write-Info "Website already exists (id $($site.Id))."

    # Repair the two properties most likely to be wrong on a hand-made site.
    if ($site.PhysicalPath -ne $WebsitePath) {
        Set-ItemProperty "IIS:\Sites\$SiteName" -Name 'physicalPath' -Value $WebsitePath
        Write-Warn "Corrected the physical path to $WebsitePath"
    }
    if ($site.applicationPool -ne $AppPoolName) {
        Set-ItemProperty "IIS:\Sites\$SiteName" -Name 'applicationPool' -Value $AppPoolName
        Write-Warn "Re-pointed the site at Application Pool '$AppPoolName'"
    }
} else {
    # Create with the HTTP binding in one shot, then add HTTPS below.
    New-Website -Name $SiteName `
                -PhysicalPath $WebsitePath `
                -ApplicationPool $AppPoolName `
                -HostHeader $Domain `
                -Port 80 | Out-Null
    Write-Ok "Created website '$SiteName'."
}

# ============================================================================
#  4. BINDINGS
# ============================================================================

Write-Step 'Configuring bindings'

# Returns the existing binding for a protocol/port/host header, or $null.
function Get-SiteBinding {
    param([string]$Protocol, [int]$Port)
    Get-WebBinding -Name $SiteName -Protocol $Protocol -ErrorAction SilentlyContinue |
        Where-Object { $_.bindingInformation -eq "*:${Port}:$Domain" }
}

# --- HTTP (port 80) -------------------------------------------------------
$httpBinding = Get-SiteBinding -Protocol 'http' -Port 80
if ($httpBinding -and $Force) {
    Remove-WebBinding -Name $SiteName -Protocol 'http' -Port 80 -HostHeader $Domain
    $httpBinding = $null
    Write-Info 'Removed the existing HTTP binding (-Force).'
}
if ($httpBinding) {
    Write-Info "HTTP  binding already present : *:80:$Domain"
} else {
    New-WebBinding -Name $SiteName -Protocol 'http' -Port 80 -HostHeader $Domain -IPAddress '*'
    Write-Ok "Added HTTP  binding : *:80:$Domain"
}

# --- HTTPS (port 443, SNI) ------------------------------------------------
$httpsBinding = Get-SiteBinding -Protocol 'https' -Port 443
if ($httpsBinding -and $Force) {
    Remove-WebBinding -Name $SiteName -Protocol 'https' -Port 443 -HostHeader $Domain
    $httpsBinding = $null
    Write-Info 'Removed the existing HTTPS binding (-Force).'
}
if ($httpsBinding) {
    Write-Info "HTTPS binding already present : *:443:$Domain"
} else {
    # SslFlags 1 = SNI. Required so several HTTPS host headers can share
    # port 443, each with its own certificate.
    New-WebBinding -Name $SiteName -Protocol 'https' -Port 443 -HostHeader $Domain -IPAddress '*' -SslFlags 1
    Write-Ok "Added HTTPS binding : *:443:$Domain (SNI)"
}

# ============================================================================
#  5. SSL CERTIFICATE
# ============================================================================

Write-Step 'Attaching the SSL certificate'

# True when a certificate DNS name covers $Domain, either exactly or as a
# single-label wildcard (*.growfet.com covers foo.growfet.com but not
# foo.bar.growfet.com, matching how browsers validate wildcards).
function Test-CertCoversDomain {
    param([string]$DnsName, [string]$TargetDomain)

    if ($DnsName -ieq $TargetDomain) { return $true }

    if ($DnsName.StartsWith('*.')) {
        $certSuffix   = $DnsName.Substring(2)
        $domainSuffix = $TargetDomain -replace '^[^.]+\.', ''
        return ($certSuffix -ieq $domainSuffix)
    }

    return $false
}

# Search the stores in order and keep the certificate with the longest
# remaining validity, so a renewed cert wins over the one it replaced.
$now       = Get-Date
$cert      = $null
$certStore = $null
foreach ($store in $CertStores) {
    $candidates = Get-ChildItem "Cert:\LocalMachine\$store" -ErrorAction SilentlyContinue |
        Where-Object {
            $_.NotAfter -gt $now -and
            $_.HasPrivateKey -and
            ($_.DnsNameList | Where-Object { Test-CertCoversDomain $_.Unicode $Domain })
        } |
        Sort-Object NotAfter -Descending

    if ($candidates) {
        $cert      = @($candidates)[0]
        $certStore = $store
        break
    }
}

if (-not $cert) {
    Write-Warn ("No valid certificate covering '$Domain' was found in: " +
                ($CertStores -join ', ') + '. The HTTPS binding exists but has no ' +
                'certificate - HTTPS will fail until one is attached (IIS Manager > ' +
                'site > Bindings > https > Edit).')
} else {
    Write-Info "Certificate : $($cert.Subject)"
    Write-Info "Thumbprint  : $($cert.Thumbprint)"
    Write-Info "Store       : $certStore"
    Write-Info "Expires     : $($cert.NotAfter.ToString('yyyy-MM-dd'))"

    # AddSslCertificate on the binding object registers the certificate
    # against the correct SNI hostname:port entry in http.sys, which a plain
    # IIS:\SslBindings path assignment gets wrong for SNI bindings.
    $binding = Get-WebBinding -Name $SiteName -Protocol 'https' |
        Where-Object { $_.bindingInformation -eq "*:443:$Domain" }

    if ($binding) {
        $binding.AddSslCertificate($cert.Thumbprint, $certStore)
        Write-Ok 'Certificate attached to the HTTPS binding.'
    } else {
        Write-Warn 'Could not locate the HTTPS binding to attach the certificate to.'
    }
}

# ============================================================================
#  6. FILESYSTEM PERMISSIONS
# ============================================================================

Write-Step 'Granting read access to the IIS worker identities'

# Read+Execute is all a static site needs; the deploy script writes to this
# folder as Administrator, never as the pool identity.
#
# "IIS AppPool\<pool>" is the pool's virtual account. IIS_IUSRS covers any
# worker process not running under that virtual account (for example if the
# identity is later changed to a service account in that group).
foreach ($account in @("IIS AppPool\$AppPoolName", 'IIS_IUSRS')) {
    $acl  = Get-Acl $WebsitePath
    $rule = New-Object System.Security.AccessControl.FileSystemAccessRule(
        $account,
        'ReadAndExecute',
        'ContainerInherit,ObjectInherit',
        'None',
        'Allow'
    )
    $acl.SetAccessRule($rule)
    Set-Acl -Path $WebsitePath -AclObject $acl
    Write-Ok "Granted ReadAndExecute to '$account'."
}

# ============================================================================
#  7. PLACEHOLDER PAGE
# ============================================================================

Write-Step 'Ensuring the site answers before the first deploy'

# With no content at all IIS returns a directory-listing error or 403, which
# is easy to mistake for a broken binding. A placeholder makes the difference
# between "IIS is misconfigured" and "nothing is deployed yet" obvious.
$placeholder = Join-Path $WebsitePath 'index.html'
if (Test-Path $placeholder) {
    Write-Info 'index.html already present; leaving it alone.'
} else {
    $placeholderHtml = @"
<!doctype html>
<meta charset="utf-8">
<title>$SiteName</title>
<h1>$SiteName</h1>
<p>IIS site provisioned. Run deploy.bat to publish the build.</p>
"@
    Set-Content -Path $placeholder -Value $placeholderHtml -Encoding UTF8
    Write-Ok 'Wrote a placeholder index.html.'
}

# ============================================================================
#  8. START EVERYTHING
# ============================================================================

Write-Step 'Starting the Application Pool and website'

if ((Get-WebAppPoolState -Name $AppPoolName).Value -ne 'Started') {
    Start-WebAppPool -Name $AppPoolName
}
Write-Info "Application Pool : $((Get-WebAppPoolState -Name $AppPoolName).Value)"

if ((Get-WebsiteState -Name $SiteName).Value -ne 'Started') {
    Start-Website -Name $SiteName
}
Write-Info "Website          : $((Get-WebsiteState -Name $SiteName).Value)"

# ============================================================================
#  9. SUMMARY
# ============================================================================

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host '  IIS SITE READY' -ForegroundColor Green
Write-Host "  http://$Domain" -ForegroundColor Green
Write-Host "  https://$Domain" -ForegroundColor Green
Write-Host '========================================================' -ForegroundColor Green
Write-Host '  Next steps:' -ForegroundColor Green
Write-Host "    1. Point a DNS A record for $Domain at this server." -ForegroundColor Green
Write-Host '    2. Run deploy.bat (as Administrator) to publish the build.' -ForegroundColor Green
Write-Host "========================================================`n" -ForegroundColor Green

exit 0
