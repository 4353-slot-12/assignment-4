# COSC 4353, Team 12, Assignment 4

## Installation & Setup

### Step 1: Install necessary pre-requisites

- **NodeJS** (for API): https://nodejs.org/en/download/
- **Git** (for Version Control): https://git-scm.com/downloads
- **Postgres SQL** (for Database): https://www.postgresql.org/download/

### Step 2: Clone the repository
Open a terminal or command prompt and navigate to your desired directory (for example, your Desktop). You can use the `cd` command to accomplish this.

```
cd path/to/file
```

When you run the command below, you will create a folder (named "assignment-4") containing the project in your desired directory.

```
git clone https://github.com/4353-slot-12/assignment-4.git
```

Next, let's navigate into the root directory of the project.

```
cd assignment-4
```

### Step 3: Prepare a Postgres SQL Database

This project requires a Postgres SQL Database. To prepare the database to run this project, please run the following query:

```sql
DROP TABLE IF EXISTS "session";
DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "userprofiles";

-- Set up stored sessions.
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

CREATE TABLE "users" (
    "id" VARCHAR(24) PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL,
    "hash" VARCHAR(64) NOT NULL,
    "salt" VARCHAR(32) NOT NULL
);

CREATE TABLE "userprofiles" (
    "userid" VARCHAR(24) PRIMARY KEY,
    "name" VARCHAR(100),
    "address1" VARCHAR(100),
    "address2" VARCHAR(100),
    "city" VARCHAR(100),
    "state" VARCHAR(2),
    "zip" VARCHAR(5)
);
```

### Step 4: Ensure that the `.env` file is present.
This project will not run unless the necessary environment variables are set. The necessary environment variables must be set via a `.env` file in the root directory (the same directory as this README file).

Below is an example of a `.env` file.

```
PORT=5000
SESSION_SECRET='28a1ab4e1a6bb3b102b8adc3af539ebf'
CONNECTION_STRING='postgres://postgres:480a5477d3243abb9ba487fd771b78f1@localhost:5432/quoteapp'
```

- The `PORT` will default to `8080` if not set.
- The `SESSION_SECRET` will default to `keyboardCat` if not set. (Not secure!)
- The app will crash if `CONNECTION_STRING` is not set.
- The connection string format is usually `postgres://{user}:{password}@{hostname}:{port}/{database-name}`

### Step 5: Install dependencies
Node dependencies need to be installed before we can run the backend for the website. We can install those by navigating to the root directory of the project and running the following command:

```
npm install
```

### Step 6: Run the backend server
At this point, we can check if we did everything correctly by starting the server. Start the server by navigating to the root directory of the project (the same directory as this README file) and running the following command:

```
npm run start
```

### Step 7: Run the application.
Finally, open your Google Chrome or Firefox and visit `http://localhost:8080`. You should see that the website loaded cleanly. Make sure to check the developer console to see if you're getting any errors.

NOTE: If your port number is different, please use that instead. For example, for port `5000`, visit `http://localhost:5000`.
