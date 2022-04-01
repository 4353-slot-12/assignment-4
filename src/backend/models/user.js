import { client } from "../db.js";

export default class UserModel {
  
    static create(username, hash, salt) {
        client.connect(function(err) {
            if(err) {
              return console.error('[User.create] could not connect to postgres', err);
            }
            client.query(
                "INSERT INTO users VALUES ($1, $2, $3);", [username, hash, salt], 
                function(err, result) {
              if(err) {
                return console.error('[User.create] error running query', err);
              }
              console.log(`[User.create] User inserted: ${username} with hash ${hash}.`);
              client.end(); // Remember to do this!
            });
          });
    }

    static findByUsername(username) {
        client.connect(function(err) {
            if(err) {
              return console.error('[User.findByUsername] could not connect to postgres', err);
            }
            client.query(
                "SELECT * FROM users WHERE username = $1 LIMIT 1;", [username], 
                function(err, result) {
              if(err) {
                return console.error('[User.findByUsername] error running query', err);
              }
              const { rows } = result;
              if (!rows.length) {
                  console.log(`[User.findByUsername] No results found.`)
                  return null;
                } 
              console.log(`[User.findByUsername] User found: ${rows[0]}`);
              client.end(); // Remember to do this!
            });
          });
    }

    static findById(userId) {
        client.connect(function(err) {
            if(err) {
              return console.error('[User.findById] could not connect to postgres', err);
            }
            client.query(
                "SELECT * FROM users WHERE userId = $1 LIMIT 1;", [userId], 
                function(err, result) {
              if(err) {
                return console.error('[User.findById] error running query', err);
              }
              const { rows } = result;
              if (!rows.length) {
                  console.log(`[User.findById] No results found.`)
                  return null;
                } 
              console.log(`[User.findById] User found: ${rows[0]}`);
              client.end(); // Remember to do this!
            });
          });
    }
}