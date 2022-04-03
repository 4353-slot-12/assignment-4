import app from './app.js'
import database from './db.js';

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`Server listening. Try: http://localhost:${port}`)
});

const gracefulExit = () => {
  database.end();
  server.close();
}

process.on('SIGINT', gracefulExit);
process.on('SIGQUIT', gracefulExit);
process.on('SIGTERM', gracefulExit);
process.on('SIGKILL', gracefulExit);