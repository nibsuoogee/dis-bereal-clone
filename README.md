# dis-bereal-clone

## Development

### Install dependencies 🪐

To install node dependencies in the root directory and then the client and server directories, run the following commands in the root directory:

```
npm install
npm run install:all
```

### Run the app 🏃‍♂️

To run the app, run the following command in the project directory:

### Making changes 🔨

Any changes should be made via feature branches that are created for specific issues in the project Kanban board.

0. Create a branch on GitHub via an issue on the project Kanban board named: "feature-< issue number >". The source should be the main branch.

1. Fetch branches and prune remote branches that have been deleted on the remote

```
git fetch origin --prune
```

2. View branches (optional)

```
git branch -a
```

3. Checkout the branch and pull the latest changes

```
git checkout feature-< issue number >
git pull
```

4. Make changes to the code

5. Commit changes

```
git add -A
git commit -m "commit message"
git push origin feature-< issue number >
```

6. Create a pull request on GitHub from the feature branch to the main branch then merge the pull request.

7. Delete the feature branch on GitHub
