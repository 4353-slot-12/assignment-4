import client from "../db.js";

export default async function select_profile(userId){
    var res;
    client.query('SELECT * FROM userprofiles WHERE userId = ' + userId, function(err, result) {
          if(err) {
            return console.error('error running profile select query', err);
          }
          res = result.rows;
          //client.end();
    });
    return res;
}

export async function insert_profile(profile){ // Pass profile as a list!
    let q = 'INSERT INTO userprofiles VALUES (' + profile[0] + ',"' + profile[1] + '","' + profile[2] 
    + '","' + profile[3] + '","' + profile[4] + '","' + profile[5] + '","' + profile[6] + '")';

    console.log(q);

    client.query(q, function(err, result) {
          if(err) {
            return console.error('error running profile insert query', err);
          }
          console.log(result);
          //client.end();
    });
}

export async function update_profile(userId, profile){ // Pass profile as a list.
    let q = 'UPDATE userprofiles SET name = "'  + profile[0] 
    + '", address1 = "' + profile[1] 
    + '", address2 = "' + profile[2] 
    + '", city = "' + profile[3] 
    + '", state = "' + profile[4] 
    + '", zip = "' + profile[5]
    + '" WHERE userId = ' + userId;

    console.log(q);
   
    client.query(q, function(err, result) {
          if(err) {
            return console.error('error running profile update query', err);
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