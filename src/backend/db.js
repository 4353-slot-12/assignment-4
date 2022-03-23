import pg from "pg";
import dotenv from "dotenv";

//or native libpq bindings
//var pg = require('pg').native

dotenv.config()

var conString = process.env.CONNECTION_STRING; // Can be found in the Details page
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    client.end(); // Remember to do this!
  });
});

export default client;