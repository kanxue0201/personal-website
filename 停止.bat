@echo off
chcp 65001 >nul
set PORT=3210
echo stopping whatever listens on port %PORT% ...
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":%PORT%" ^| findstr "LISTENING"') do (
  echo   kill PID %%p
  taskkill /pid %%p /f >nul 2>&1
)
echo done.
ping -n 4 127.0.0.1 >nul
