@echo off

pushd ..\..\..

SET PYTHON_PATH=c:\Program Files\Python38
SET VENV_PATH=c:\Program Files\Python38\.venv
SET PATH=%VENV_PATH%;%VENV_PATH%\Scripts;%PATH%

echo Activating Python virtual environment...
call "%VENV_PATH%\Scripts\activate.bat"

echo Migrating Asap DB...
pushd c:\Apache24\asap\server\
.\manage.py migrate
.\manage.py loaddata poolingconfig
popd

echo Deactivating Python virtual environment...
call deactivate

popd

exit /B 1
