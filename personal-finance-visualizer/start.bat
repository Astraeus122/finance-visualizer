@echo off
echo Starting Personal Finance Visualizer...

:: Start backend
cd backend
start cmd /k "venv\Scripts\activate && python run.py"

:: Start frontend
cd ../frontend
start cmd /k "npm start"

echo Backend and Frontend started!
exit
