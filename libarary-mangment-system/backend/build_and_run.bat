@echo off
REM ============================================
REM Build & Run C++ Backend Server
REM ============================================

echo.
echo Compiling C++ Backend Server...
g++ -o server.exe server.cpp -lws2_32 -std=c++17

if %errorlevel% == 0 (
    echo ✓ Compilation successful!
    echo.
    echo Starting server on http://localhost:3001...
    server.exe
) else (
    echo ✗ Compilation failed!
    echo Make sure you have:
    echo   - G++ compiler installed (gcc, g++, mingw)
    echo   - WinSock2 (included with Windows SDK)
    echo.
    pause
)
