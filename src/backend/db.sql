DROP TABLE IF EXISTS "session";
DROP TABLE IF EXISTS "users";

CREATE TABLE public.session (
    SID CHARACTER varying NOT NULL,
    sess JSON NOT NULL,
    expire TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL
);

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL,
    "hash" VARCHAR(64) NOT NULL,
    "salt" VARCHAR(32) NOT NULL
);

-- Insert data needed for testing.


