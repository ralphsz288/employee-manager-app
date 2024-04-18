@echo off
docker rmi ralph28/employee-management-server
docker rmi employee-management-server
docker build -t employee-management-server .
docker tag employee-management-server ralph28/employee-management-server