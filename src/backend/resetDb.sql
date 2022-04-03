DROP TABLE IF EXISTS "session";
DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "userprofiles";
DROP TABLE IF EXISTS "fuelquote";

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

CREATE TABLE "fuelquote" (
    "timeStamp" DATE,
    "gallonsRequested" INT,
    "deliveryAddress" VARCHAR(255),
    "deliveryDate" DATE,
    "suggestedPrice" FLOAT,
    "totalPrice" FLOAT
);