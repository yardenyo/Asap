@echo off

echo.
echo Cloning GIT repositories...
git clone --quiet --single-branch --branch master git@gitlab.com:sapir-exlab/%PROJECT_NAME%.git
echo.
echo Cleaning up development code from server...
pushd %PROJECT_NAME%
rd ".git" ".idea" /S /Q
popd

exit /B 1
