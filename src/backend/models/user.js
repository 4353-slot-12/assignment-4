import client from "../db.js";

export default class UserModel {
    static async create(id, username, hash, salt) {
      const query = `INSERT INTO users VALUES ($1, $2, $3, $4)`;
      await client.query(query, [id, username, hash, salt]);
    }

    static async findByUsername(username) {
      const query = `SELECT * FROM users WHERE username = $1 LIMIT 1;`;
      const res = await client.query(query, [username]);
      return res.rows[0];
    }

    static async findById(userId) {
      const query = `SELECT * FROM users WHERE id = $1 LIMIT 1;`;
      const res = await client.query(query, [userId]);
      return res.rows[0];
    }
}