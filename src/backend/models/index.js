import client from "../db.js";

function select_profile(userId){
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

function insert_profile(profile){ // Pass profile as a list!
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

function update_profile(userId){
    client.connect(function(err) {
        if(err) {
          return console.error('could not connect to postgres', err);
        }
        client.query('UPDATE userprofiles SET (!unfinished!) WHERE userId = ' + userId, function(err, result) {
          if(err) {
            return console.error('error running query', err);
          }
          console.log(result);
          client.end();
        });
      });
}