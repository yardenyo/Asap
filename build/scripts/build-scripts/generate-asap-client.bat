@echo off

echo.
echo Bundle pooling-design static content...
pushd %PROJECT_NAME%\client
cmd /c npm install
cmd /c npm run build

echo Copying pooling-design static content...
xcopy dist ..\..\output\%PROJECT_NAME%\static\ /eqv
popd

exit /B 1
