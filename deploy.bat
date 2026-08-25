@echo off
REM ============================================================
REM  Rashet 3TR (Hesham) deployment launcher
REM  Runs deploy.ps1 with an execution-policy bypass.
REM  Right-click > "Run as administrator" (IIS control needs it).
REM ============================================================

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy.ps1"

REM Propagate the PowerShell exit code to the caller (CI, task scheduler, etc.).
exit /b %ERRORLEVEL%
