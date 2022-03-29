import client from "../db.js";

export function select_profile(userId){
    var res;
    client.connect(function(err) {
        if(err) {
          return console.error('could not connect to postgres', err);
        }
        client.query('SELECT * FROM userprofiles WHERE userId = ' + userId, function(err, result) {
          if(err) {
            return console.error('error running query', err);
          }
          res = result.rows;
          client.end();
        });
      });
    return res;
}

export function insert_profile(profile){ // Pass profile as a list!
    client.connect(function(err) {
        if(err) {
          return console.error('could not connect to postgres', err);
        }
        client.query('INSERT INTO userprofiles VALUES (' + profile[0] + ',' + profile[1] + ',' + profile[2] 
        + ',' + profile[3] + ',' + profile[4] + ',' + profile[5] + ',' + profile[6] + ")", function(err, result) {
          if(err) {
            return console.error('error running query', err);
          }
          console.log(result);
          client.end();
        });
      });
}

export function update_profile(userId, profile){ // Pass profile as a list.
    client.connect(function(err) {
        if(err) {
          return console.error('could not connect to postgres', err);
        }
        client.query('UPDATE userprofiles SET name = '  + profile[0] 
        + ', address1 = ' + profile[1] 
        + ', address2 = ' + profile[2] 
        + ', city = ' + profile[3] 
        + ', state = ' + profile[4] 
        + ', zip = ' + profile[5]
        + ' WHERE userId = ' + userId, function(err, result) {
          if(err) {
            return console.error('error running query', err);
          }
          console.log(result);
          client.end();
        });
      });
}