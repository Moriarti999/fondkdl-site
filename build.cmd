@echo off
cd /d "%~dp0"
echo Current folder: %CD%
echo.
call npm.cmd run build
if errorlevel 1 exit /b 1
