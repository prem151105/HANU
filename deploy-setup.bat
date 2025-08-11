@echo off
echo ====================================
echo   ANURAG TERMINAL PORTFOLIO SETUP
echo ====================================
echo.
echo This script will help you deploy your portfolio to Vercel
echo.
echo Prerequisites check:
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
) else (
    echo [OK] Node.js is installed
    node --version
)

REM Check if npm is installed  
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed!
    echo Please install Node.js which includes npm
    echo.
    pause
    exit /b 1
) else (
    echo [OK] npm is installed
    npm --version
)

echo.
echo ====================================
echo   INSTALLATION STARTING...
echo ====================================
echo.

REM Install dependencies
echo Installing project dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo [SUCCESS] Dependencies installed successfully!
echo.

REM Run type check
echo Running TypeScript type check...
call npm run type-check
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] TypeScript errors found, but continuing...
)

echo.
echo ====================================
echo   TESTING BUILD...
echo ====================================
echo.

REM Test build
echo Testing production build...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed! Please check the errors above.
    pause
    exit /b 1
)

echo.
echo [SUCCESS] Build completed successfully!
echo.

echo ====================================
echo   SETUP COMPLETE!
echo ====================================
echo.
echo Your terminal portfolio is ready for deployment!
echo.
echo NEXT STEPS:
echo 1. Push your code to GitHub (see VERCEL_DEPLOYMENT_GUIDE.md)
echo 2. Connect GitHub to Vercel (https://vercel.com)
echo 3. Import your repository and deploy
echo.
echo To test locally, run: npm run dev
echo Then visit: http://localhost:3000
echo.
echo For detailed deployment instructions, see:
echo - VERCEL_DEPLOYMENT_GUIDE.md
echo - DEPLOYMENT_CHECKLIST.md
echo.
pause