import pg from "pg";
import dotenv from "dotenv";
import fs from 'fs';
import path from 'path';

dotenv.config()

export const conString = process.env.CONNECTION_STRING; // Can be found in the Details page
export const client = new pg.Client(conString);

const dbSqlPath = path.join(process.cwd(), 'src', 'backend', 'db.sql');
const initDatabaseSql = fs.readFileSync(dbSqlPath, 'utf8');

client.connect(function(err) {
  if (err) {
    return console.error('could not connect to postgres', err);
  }

  client.query(initDatabaseSql, (err, result) => {
    if (err) 
      return console.error(err.message, err.stack);
    console.log(`Database initialized.`);
  });

  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if (err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    //client.end();
  });
});


