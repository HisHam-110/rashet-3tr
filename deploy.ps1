<#
.SYNOPSIS
    Production deployment script for the Rashet 3TR (Hesham) React + Vite site
    on Windows Server + IIS.

.DESCRIPTION
    Stops the IIS Application Pool, installs dependencies, builds the Vite project,
    safely cleans the target website directory, copies the fresh build with
    robocopy, deploys web.config, and restarts the Application Pool.

.NOTES
    Run from an elevated PowerShell session (IIS management requires Administrator).
    Usage: powershell -ExecutionPolicy Bypass -File deploy.ps1

    The IIS site and Application Pool must already exist. Provision them once
    with create-iis-site.ps1 before the first deployment.
#>

# ============================================================================
#  CONFIGURATION  -  Adjust these values for your environment
# ============================================================================

# Root of the source project (where package.json lives). Defaults to this script's folder.
$ProjectPath = $PSScriptRoot

# Name of the Vite build output folder (Vite's default is "dist").
$BuildFolder = 'dist'

# The physical path of the IIS website (destination for the built files).
# IMPORTANT: This must NOT be the same as $ProjectPath, or the source will be wiped.
# Must match $WebsitePath in create-iis-site.ps1.
$WebsitePath = 'C:\inetpub\rashet-3tr-hesham'

# Name of the IIS Application Pool serving the site.
$AppPoolName = 'rashet-3tr-hesham'

# Public URL, printed on success.
$WebsiteUrl  = 'https://rashet-etr-hesham.growfet.com'

# The IIS web.config is sourced from the project root and deployed alongside the
# build. If it is missing from the project on first run, a default SPA config is
# generated here and written to the project so it is version-controlled going forward.
$WebConfigName   = 'web.config'
$WebConfigSource = Join-Path $ProjectPath $WebConfigName

# ============================================================================
#  SETUP  -  Fail fast on any error
# ============================================================================

# Stop the whole script on the first unhandled error (covers cmdlets/.NET calls).
$ErrorActionPreference = 'Stop'

# Helper: colored, timestamped logging.
function Write-Step  { param([string]$Message) Write-Host "`n==> $Message" -ForegroundColor Cyan }
function Write-Info  { param([string]$Message) Write-Host "    $Message"     -ForegroundColor Gray }
function Write-Ok    { param([string]$Message) Write-Host "[OK]  $Message"   -ForegroundColor Green }
function Write-Warn  { param([string]$Message) Write-Host "[WARN] $Message"  -ForegroundColor Yellow }
function Write-Err   { param([string]$Message) Write-Host "[FAIL] $Message"  -ForegroundColor Red }

# Helper: abort with a message and a non-zero exit code.
function Fail { param([string]$Message, [int]$Code = 1) Write-Err $Message; exit $Code }

# Native commands (npm, robocopy) don't throw; check $LASTEXITCODE explicitly.
function Assert-LastExit {
    param([string]$What, [int[]]$AllowedCodes = @(0))
    if ($AllowedCodes -notcontains $LASTEXITCODE) {
        Fail "$What failed with exit code $LASTEXITCODE." $LASTEXITCODE
    }
}

$deployStart = Get-Date
Write-Host "========================================================" -ForegroundColor Magenta
Write-Host "  Rashet 3TR (Hesham) Deployment" -ForegroundColor Magenta
Write-Host "  Source : $ProjectPath" -ForegroundColor Magenta
Write-Host "  Target : $WebsitePath" -ForegroundColor Magenta
Write-Host "========================================================" -ForegroundColor Magenta

# ============================================================================
#  0. PRE-FLIGHT CHECKS
# ============================================================================

Write-Step 'Running pre-flight checks'

# Guard: refuse to run if source and destination are the same (would delete the source).
if ((Resolve-Path $ProjectPath).Path -ieq (Resolve-Path -LiteralPath $WebsitePath -ErrorAction SilentlyContinue).Path) {
    Fail 'ProjectPath and WebsitePath resolve to the same directory. Aborting to protect the source.'
}

# Verify Node.js is installed.
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Fail 'Node.js is not installed or not in PATH.'
}
Write-Info "Node.js : $(node --version)"

# Verify npm is installed.
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Fail 'npm is not installed or not in PATH.'
}
Write-Info "npm     : $(npm --version)"

# Verify package.json exists in the project.
if (-not (Test-Path (Join-Path $ProjectPath 'package.json'))) {
    Fail "No package.json found in $ProjectPath."
}

# Load the IIS management module (WebAdministration ships with the IIS role).
try {
    Import-Module WebAdministration -ErrorAction Stop
} catch {
    Fail 'The WebAdministration module is unavailable. Is the IIS management role installed?'
}

# Verify the target Application Pool exists before we try to control it.
if (-not (Test-Path "IIS:\AppPools\$AppPoolName")) {
    Fail "IIS Application Pool '$AppPoolName' does not exist. Run create-iis-site.ps1 first."
}

# Verify the IIS URL Rewrite module is installed. The web.config's SPA fallback
# rule depends on it; without it IIS returns HTTP 500.19 on every request.
$rewriteInstalled = Get-WebGlobalModule -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -eq 'RewriteModule' }
if (-not $rewriteInstalled) {
    Fail ("The IIS URL Rewrite module is not installed. " +
          "Install it from https://www.iis.net/downloads/microsoft/url-rewrite and retry.")
}
Write-Info 'URL Rewrite module : installed'

Write-Ok 'Pre-flight checks passed.'

# ============================================================================
#  1. STOP THE APPLICATION POOL
# ============================================================================

Write-Step "Stopping Application Pool '$AppPoolName'"
$poolState = (Get-WebAppPoolState -Name $AppPoolName).Value
if ($poolState -eq 'Stopped') {
    Write-Info 'Application Pool is already stopped.'
} else {
    Stop-WebAppPool -Name $AppPoolName
    # Wait until the pool reports Stopped (releases file locks before we copy).
    $timeout = (Get-Date).AddSeconds(30)
    while ((Get-WebAppPoolState -Name $AppPoolName).Value -ne 'Stopped') {
        if ((Get-Date) -gt $timeout) { Fail "Timed out waiting for '$AppPoolName' to stop." }
        Start-Sleep -Milliseconds 500
    }
    Write-Ok 'Application Pool stopped.'
}

# ============================================================================
#  2. INSTALL DEPENDENCIES
# ============================================================================

Write-Step 'Installing dependencies (npm install)'
Push-Location $ProjectPath
try {
    npm install
    Assert-LastExit 'npm install'
    Write-Ok 'Dependencies installed.'

# ============================================================================
#  3. BUILD THE PROJECT
# ============================================================================

    Write-Step 'Building the project (npm run build)'
    npm run build
    Assert-LastExit 'npm run build'
    Write-Ok 'Build completed.'
}
finally {
    Pop-Location
}

# Verify the build actually produced output.
$buildPath = Join-Path $ProjectPath $BuildFolder
if (-not (Test-Path $buildPath) -or -not (Get-ChildItem $buildPath -ErrorAction SilentlyContinue)) {
    Fail "Build folder '$buildPath' is missing or empty."
}

# ============================================================================
#  4. PREPARE THE DESTINATION (create if missing, ensure web.config)
# ============================================================================

Write-Step 'Preparing the destination directory'

# Create the website folder if it does not exist yet.
if (-not (Test-Path $WebsitePath)) {
    New-Item -ItemType Directory -Path $WebsitePath -Force | Out-Null
    Write-Info "Created website directory: $WebsitePath"
}

# Ensure a web.config exists in the project. On the very first deployment there
# may be none; generate a sensible SPA default and save it to the project root so
# it is version-controlled and reused on every subsequent deployment.
if (-not (Test-Path $WebConfigSource)) {
    Write-Warn "No $WebConfigName found in the project; generating a default SPA config."
    $defaultWebConfig = @'
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React SPA Fallback" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
            <add input="{REQUEST_URI}" pattern="^/api/" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
    <urlCompression doStaticCompression="true" doDynamicCompression="true" />
    <staticContent>
      <clientCache cacheControlMode="UseMaxAge" cacheControlMaxAge="365.00:00:00" />
    </staticContent>
  </system.webServer>
</configuration>
'@
    Set-Content -Path $WebConfigSource -Value $defaultWebConfig -Encoding UTF8
    Write-Info "Created $WebConfigSource"
}

# ============================================================================
#  5. CLEAN THE DESTINATION SAFELY
# ============================================================================

Write-Step 'Cleaning old deployed files'
# Remove everything under the website path (contents only, keep the folder
# itself so its ACLs, set up by create-iis-site.ps1, survive).
Get-ChildItem -Path $WebsitePath -Force | ForEach-Object {
    Remove-Item -Path $_.FullName -Recurse -Force
}
Write-Ok 'Destination cleaned.'

# ============================================================================
#  6. COPY THE NEW BUILD WITH ROBOCOPY
# ============================================================================

Write-Step 'Copying new build to the website directory'
# /MIR mirrors the source tree; /NFL /NDL /NP keep the log readable; /R /W limit retries.
# Exclude web.config from the mirror: it lives in the project root (not in dist),
# and is copied explicitly below so /MIR does not delete it from the destination.
robocopy $buildPath $WebsitePath /MIR /XF $WebConfigName /NFL /NDL /NJH /NP /R:3 /W:5 | Out-Null
# Robocopy exit codes 0-7 indicate success (files copied/extra/mismatch); 8+ is an error.
Assert-LastExit 'robocopy' @(0, 1, 2, 3, 4, 5, 6, 7)
Write-Ok 'Files copied.'

# Deploy the project's web.config over the freshly copied build. If the build
# (via a public/ folder) already produced one, this authoritative copy wins.
Copy-Item -Path $WebConfigSource -Destination (Join-Path $WebsitePath $WebConfigName) -Force
Write-Info "Deployed $WebConfigName."

# ============================================================================
#  7. RESTART THE APPLICATION POOL
# ============================================================================

Write-Step "Starting Application Pool '$AppPoolName'"
Start-WebAppPool -Name $AppPoolName
$timeout = (Get-Date).AddSeconds(30)
while ((Get-WebAppPoolState -Name $AppPoolName).Value -ne 'Started') {
    if ((Get-Date) -gt $timeout) { Fail "Timed out waiting for '$AppPoolName' to start." }
    Start-Sleep -Milliseconds 500
}
Write-Ok 'Application Pool started.'

# ============================================================================
#  8. DONE
# ============================================================================

$elapsed = [math]::Round(((Get-Date) - $deployStart).TotalSeconds, 1)
Write-Host "`n========================================================" -ForegroundColor Green
Write-Host "  DEPLOYMENT SUCCESSFUL  (${elapsed}s)" -ForegroundColor Green
Write-Host "  Live at: $WebsiteUrl" -ForegroundColor Green
Write-Host "========================================================`n" -ForegroundColor Green

exit 0
