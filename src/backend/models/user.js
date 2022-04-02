import client from "../db.js";

export default class UserModel {
    static async create(id, username, hash, salt) {
      const query = `INSERT INTO users VALUES ($1, $2, $3, $4)`;
      try {
        await client.query(query, [id, username, hash, salt]);
        console.log(`Inserted user ${username}, with ID "${id}".`);
      } catch (err) {
        console.error(`Error on query: ${query}`);
        console.error(err.stack || err);
      } 
    }

    static async findByUsername(username) {
      const query = `SELECT * FROM users WHERE username = $1 LIMIT 1;`;
      try {
        const res = await client.query(query, [username]);
        console.log(`Query "${query}" returned: ${JSON.stringify(res.rows[0], null, 4)}`);
        return res.rows[0];
      } catch (err) {
        console.error(`Error on query: ${query}`);
        console.error(err.stack || err);
      }
    }

    static async findById(userId) {
      const query = `SELECT * FROM users WHERE id = $1 LIMIT 1;`;
      try {
        const res = await client.query(query, [userId]);
        console.log(`Query "${query}" returned: ${JSON.stringify(res.rows[0], null, 4)}`);
        return res.rows[0];
      } catch (err) {
        console.error(`Error on query: ${query}`);
        console.error(err.stack || err);
      }
    }
}