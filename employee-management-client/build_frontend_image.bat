@echo off
setlocal enabledelayedexpansion

:: Default to development if no parameter is given
set BUILD_TYPE=development
if "%~1" neq "" set BUILD_TYPE=%~1

docker rmi ralph28/employee-management-client
docker rmi employee-management-client

if "%BUILD_TYPE%"=="production" (
    echo Building Production Image...
    docker build --build-arg BUILD_TYPE=production -t employee-management-client .
) else (
    echo Building Development Image...
    docker build -t employee-management-client .
)

docker tag employee-management-client ralph28/employee-management-client