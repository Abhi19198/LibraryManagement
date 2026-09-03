@echo off
echo =========================================
echo Setting up Library Management Database
echo =========================================
echo.

REM Check if sqlite3 is installed
where sqlite3 >nul 2>nul
if %errorlevel% neq 0 (
    echo ✗ SQLite3 CLI not found!
    echo Please install SQLite3 or its development headers.
    echo.
    echo For MSYS2/MinGW users:
    echo   pacman -S mingw-w64-x86_64-sqlite3
    echo.
    echo For other users, download from: https://www.sqlite.org/download.html
    echo.
    pause
    exit /b 1
)

echo Creating database from schema...
sqlite3 library.db < database_schema.sql

if %errorlevel% == 0 (
    echo ✓ Database created successfully!
    echo.
    echo Database file: library.db
    echo Schema applied successfully
) else (
    echo ✗ Failed to create database!
    pause
    exit /b 1
)

pause
