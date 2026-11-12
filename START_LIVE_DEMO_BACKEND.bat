@echo off
title NEURA-SHIELD AI - FastAPI & Real Email OTP Server
echo ======================================================================
echo   NEURA-SHIELD AI - FastAPI & Real Email OTP Server
echo   Sender Account: cherycharan20@gmail.com
echo   Developer: M. Charan Teja
echo ======================================================================
echo.

cd /d "%~dp0downloads_project\project-backend 1successful"

python -c "
import json, os
path = 'email_config.json'
if not os.path.exists(path) and os.path.exists('../../email_config.json'):
    path = '../../email_config.json'
try:
    with open(path) as f:
        cfg = json.load(f)
    pw = cfg.get('smtp_pass', '').strip()
    if pw:
        print('[STATUS] Real Email Engine ACTIVE: Emails will be dispatched from ' + cfg.get('smtp_user', 'cherycharan20@gmail.com'))
    else:
        print('[STATUS] Notice: smtp_pass in email_config.json is empty.')
        print('         To send real emails to phones, paste your 16-char Google App Password into email_config.json.')
except Exception as e:
    print('[STATUS] Config check notice:', e)
"

echo.
echo Starting FastAPI server on port 8000...
echo Keep this window OPEN while evaluating or presenting your portfolio!
echo ======================================================================
echo.

python -m uvicorn main:app --reload --port 8000
pause
