@echo off

echo.
echo Creating output folder...

if not exist "output\%PROJECT_NAME%" md output\%PROJECT_NAME%

echo.
echo Copying Apache httpd.conf file
xcopy %PROJECT_NAME%\build\web-server\apache\httpd.conf output\resources\apache\ /E

exit /B 1
