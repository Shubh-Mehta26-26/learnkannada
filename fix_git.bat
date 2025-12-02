@echo off
echo Running git rm... > git_fix.log
git rm -r --cached node_modules >> git_fix.log 2>&1
echo Running git add... >> git_fix.log
git add .gitignore >> git_fix.log 2>&1
echo Running git commit... >> git_fix.log
git commit -m "fix: remove node_modules and add .gitignore" >> git_fix.log 2>&1
echo Done. >> git_fix.log
