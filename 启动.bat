@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
set PORT=3210
set URL=http://127.0.0.1:%PORT%

echo [1/3] checking %URL% ...
powershell -NoProfile -Command "try { $r = Invoke-WebRequest -Uri '%URL%' -UseBasicParsing -TimeoutSec 2; exit 0 } catch { exit 1 }"
if %errorlevel%==0 (
  echo       already running
  start "" "%URL%"
  goto :done
)

if not exist ".next\BUILD_ID" (
  echo [2/3] no production build found, building ^(takes ~1 min^) ...
  node "node_modules\next\dist\bin\next" build
  if errorlevel 1 goto :fail
) else (
  echo [2/3] production build found
)

echo [3/3] starting next on port %PORT% ...
start "portfolio-%PORT%" /min node "node_modules\next\dist\bin\next" start -p %PORT%
ping -n 6 127.0.0.1 >nul
start "" "%URL%"
goto :done

:fail
echo.
echo Build failed. Check the messages above.
pause
exit /b 1

:done
echo.
echo Site: %URL%
echo Keep the minimized "portfolio-%PORT%" window open while you browse.
ping -n 6 127.0.0.1 >nul
exit /b 0
