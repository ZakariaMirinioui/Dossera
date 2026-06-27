@echo off
setlocal enabledelayedexpansion

:: Set error handling
errors "on"

:: Change to script directory
cd /d "%~dp0"

:: Check if node modules exist
if not exist "node_modules" (
    echo "Installing dependencies..."
    npm install || (
        echo "npm install failed"
        exit /b 1
    )
)

:: Run type check
 tsc --noEmit echo "Type check passed"

:: Run vite build
echo "Building with Vite..."
npm run build || (
    echo "Build failed"
    exit /b 1
)

echo "Build successful!"
exit /b 0