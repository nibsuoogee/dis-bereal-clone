# Data-Intensive Systems - BeReal Clone

## Development

### Prerequisites 📋

Code formatting in this project is handled by Prettier. Install the [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension for VS Code.

### Install dependencies 🪐

To install node dependencies in the root directory and then the client and server directories, run the following commands in the root directory (you will need to run these commands when new dependencies are added to the project):

```
npm install
npm run install:all
```
### Database setup 📦

#### Install PostgreSQL 🐘

For local development, download and install PostgreSQL from the [official website](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).

#### Set up environment variables 📝

The following environment variables should be set in a .env file in the server directory so that you may access your local PostgreSQL database:

```
DB_USER=postgres
DB_PASSWORD=< your_password >
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
```

#### Modify `postgresql.conf` 📝

The file is located in your local PostgreSQL files `C:\Program Files\PostgreSQL\17\data` on Windows by default. Uncomment/change the following lines to allow replication for multiple databases.

```
max_worker_processes = 64
max_logical_replication_workers = 64
wal_level = logical
max_replication_slots = 64
max_wal_senders = 64
```

To apply these changes, restart the PostgreSQL service. Navigate to your PostgreSQL binaries folder (using Windows cmd as **administrator**). 
```
cd "C:\Program Files\PostgreSQL\17\bin"
```

Stop the PostgreSQL server:
```
pg_ctl stop -D "C:\Program Files\PostgreSQL\17\data" -m fast
```

Then start the PostgreSQL server again:
```
pg_ctl start -D "C:\Program Files\PostgreSQL\17\data" -l "C:\Program Files\PostgreSQL\17\data\server.log"
```

#### Create regional database

`\server\src\config\constants.ts` contains `DB_NAME_PREFIX`. Create databases in your local PostgreSQL cluster for each region defined in the `DatabaseOption` enum, named using the prefix and then the database option.

For example: `bereal_clone_db_za`, `bereal_clone_db_br`, etc.

#### Monitoring replication

After you have launched the app, you can initialize the databases you have created in your local cluster using the DEV button in the UI. Next, you can monitor replication related details using the following commands.

```
--SELECT * FROM pg_subscription;
--SELECT * FROM pg_stat_subscription;
--SELECT * FROM pg_publication;
--SELECT * FROM pg_publication_tables;
--SELECT * FROM pg_stat_replication;
--SELECT * FROM pg_replication_slots;
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
git push origin -u feature-< issue number >
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

### TypeScript types 🧪

`\client\types.ts` contains all common type definitions for the data structures used in the project, such as User and Post. Use these definitions in the client and server code to ensure consistency.
