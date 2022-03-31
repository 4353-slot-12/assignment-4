import client from "../db.js";

export default async function select_profile(userId){
    const res = await client.query('SELECT * FROM userprofiles WHERE userId = $1', userId, function(err, result) {
          if(err) {
            return console.error('error running profile select query', err);
          }
          res = result;
          return res;
          //client.end();
    });
}

export async function insert_profile(profile){ // Pass profile as a list!
    let q = `INSERT INTO userprofiles VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  
    client.query(q, profile, function(err, result) {
          if(err) {
            return console.error('error running profile insert query ' + q, err);
          }
          console.log(result);
    });
}

export async function update_profile(userId, profile){ // Pass profile as a list.
    let q = "UPDATE userprofiles SET name = '"  + profile[0] 
    + "', address1 = '" + profile[1] 
    + "', address2 = '" + profile[2] 
    + "', city = '" + profile[3] 
    + "', state = '" + profile[4] 
    + "', zip = '" + profile[5]
    + "' WHERE userId = " + userId;
   
    client.query(q, function(err, result) {
          if(err) {
            return console.error('error running profile update query ' + q, err);
          }
          console.log(result);
          //client.end();
    });
}

export async function remove_profile(userId){
    client.query('DELETE from userprofiles WHERE userId = ' + userId, function(err, result) {
          if(err) {
            return console.error('error running profile remove query', err);
          }
          //client.end();
    });
}