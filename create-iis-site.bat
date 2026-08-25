@echo off
REM ============================================================
REM  Rashet 3TR (Hesham) IIS provisioning launcher
REM  Runs create-iis-site.ps1 with an execution-policy bypass.
REM  Right-click > "Run as administrator" (IIS setup needs it).
REM  Run once per server, before the first deploy.bat.
REM ============================================================

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0create-iis-site.ps1" %*

REM Propagate the PowerShell exit code to the caller (CI, task scheduler, etc.).
exit /b %ERRORLEVEL%
