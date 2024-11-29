# Data-Intensive Systems - BeReal Clone

## Development

### Install dependencies 🪐

To install node dependencies in the root directory and then the client and server directories, run the following commands in the root directory (you will need to run these commands when new dependencies are added to the project):

```
npm install
npm run install:all
```

### Install PostgreSQL 🐘

For local development, download and install PostgreSQL from the [official website](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).

### Set up environment variables 📝

The following environment variables should be set in a .env file in the server directory so that you may access your local PostgreSQL database:

```
DB_USER=postgres
DB_PASSWORD=< your_password >
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
```

### Run the app 🏃‍♂️

To run the app, run the following command in the project directory:

```
npm run dev:all
```

Then open http://localhost:3000 to view it in the browser.

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

### How does data move 📨

The basic flow of data from the front end NextJS components to the server and back is the same in most cases. To illustrate this, we will use the example of getting data from the database on the dashboard view.

For example, from the client dashboard view `\client\src\app\views\dashboard\page.tsx` how do you get data on posts in the database from the server `\server\src\database\db.ts`?

1. `\client\src\app\views\dashboard\page.tsx`: calls getPosts()

   page.tsx contains the main visible content for the dasboard view.

2. `\client\src\app\services\posts.ts`: calls fetch "/api/posts" GET (to the NextJS API route which is still in the client side)

   posts.ts is one of the "services" that are used to make API calls to the NextJS API route.

3. `\client\src\app\api\posts\route.ts`: calls fetch "/api/posts" GET (to the API route which is in the Express server side)

   route.ts files under the api folder are used to handle API calls from client services and forward them to the Express server.

4. `\server\src\controllers\postController.ts`: receives the GET request and performs a database query. query()

   In the server side, `app.ts` is used to register routers. `routes\postRoutes.ts` defines the routes for the posts router, and controllers such as `controllers\postController.ts` define the logic that is executed when a route is hit.

5. `\server\src\database\db.ts`: contains the definition of query() and handles the connection to the database when it is called.
