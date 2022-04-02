import pg from "pg";
import dotenv from "dotenv";
import fs from 'fs';
import path from 'path';

dotenv.config()

export const conString = process.env.CONNECTION_STRING; // Can be found in the Details page
const pool = new pg.Pool({ connectionString: conString });

const dbSqlPath = path.join(process.cwd(), 'src', 'backend', 'db.sql');
const initDatabaseSql = fs.readFileSync(dbSqlPath, 'utf8');

pool.query(initDatabaseSql)
pool.query('SELECT NOW() AS "theTime"').then((res, err) => {
  if (err) return console.error(err);
  console.log(res.rows[0].theTime);
})

export default pool;