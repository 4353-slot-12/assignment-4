import client from "../db.js";

function get_profile(userId){
    client.connect(function(err) {
        if(err) {
          return console.error('could not connect to postgres', err);
        }
        client.query('SELECT * FROM userprofiles WHERE userId = ' + userId, function(err, result) {
          if(err) {
            return console.error('error running query', err);
          }
          console.log(result.rows);
          client.end(); // Remember to do this!
        });
      });
}