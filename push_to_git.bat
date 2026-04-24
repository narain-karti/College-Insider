@echo off
echo Initializing git repository...
git init

echo Adding files...
git add .

echo Committing changes...
git commit -m "Initial commit with proper structure and README"

echo Adding remote origin...
git remote add origin https://github.com/narain-karti/College-Insider.git

echo Changing branch to main...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

echo Starting development server and opening in browser...
start http://localhost:5173
npm run dev

pause
