import app from './app.js'
import client from './db.js';

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`Server listening. Try: http://localhost:${port}`)
});

process.on('SIGTERM', () => {
  client.end();
  server.close();
});