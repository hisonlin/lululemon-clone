# GitLab Workflow

## Creating a new branch for a new feature
### Step 1: Make sure your local main branch is up to date with the remote main branch
```bash
git checkout main
git pull origin main
```
### Step 2: Create a new branch for your feature
```bash
git branch <your-branch>
git checkout <your-branch>
```
### Step 3: Start working on your feature

## Pushing changes to the remote branch
### Step 1: Make sure your local main branch is up to date with the remote main branch
```bash
git checkout main
git pull origin main
```
### Step 2: Add and Commit your local changes
```bash
git checkout <your-branch>
git add .
git commit -m "Your commit message"
```
### Step 3: Rebase your branch with the main branch
```bash
git rebase main
```
### Step 4: Resolve any conflicts, then continue the rebase
```bash
git rebase --continue
```
### Step 5: Push your changes to the remote branch
```bash
git push origin <your-branch>
```