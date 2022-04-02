DROP TABLE IF EXISTS "users";

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL,
    "hash" VARCHAR(64) NOT NULL,
    "salt" VARCHAR(32) NOT NULL
);

-- Insert data needed for testing.


