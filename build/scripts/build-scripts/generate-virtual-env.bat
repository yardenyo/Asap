@echo off

echo.
echo Building Python...

:: Generate Python virtual environment
echo Generating Python virtual environment...
python -m venv .venv
echo Activating Python virtual environment...
call .venv\Scripts\activate.bat

:: Install pip packages
:: IMPORTANT NOTICE!!! - Any newly used package during development should be added here for deployment time
echo Installing %PROJECT_NAME% Python dependencies...
python -m pip install -q -r %PROJECT_NAME%/code/server/requirements.txt

:: Export Python dependencies
echo Export %PROJECT_NAME% Python dependencies - generating requirements.txt file...
python -m pip freeze > output\resources\python_requirements\requirements.txt
copy %PROJECT_NAME%\build\scripts\deploy-scripts\deploy-django.bat output\resources\python_requirements\
copy %PROJECT_NAME%\build\scripts\deploy-scripts\populate-db.bat output\resources\python_requirements\

:: Generate and copy Django static files
echo Generate and copy Django static files
python %PROJECT_NAME%\code\server\src\manage.py collectstatic --no-input --clear
xcopy %PROJECT_NAME%\code\server\src\static output\%PROJECT_NAME%\static\static\ /eqv

echo Deactivating Python virtual environment...
call deactivate

echo Python cleanup...
if exist ".venv" rd /S /Q .venv

exit /B 1
