@echo off
echo ==========================================
echo   EstateHub MERN - Full Stack Starter
echo ==========================================
echo.

echo [1/2] Starting Backend Server (Port 5000)...
start cmd /k "cd backend && npm run dev"

echo [2/2] Starting Frontend Server (Port 3000)...
start cmd /k "cd frontend && npm run dev"

echo.
echo ==========================================
echo   Servers are starting in separate windows.
echo   Backend: http://localhost:5000
echo   Frontend: http://localhost:3000
echo ==========================================
pause
