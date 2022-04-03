import app from './app.js'
import pool from './db.js';

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`Server listening. Try: http://localhost:${port}`)
});


const gracefulExit = () => {
  pool.end();
  server.close()
}

process.on('SIGTERM', gracefulExit);
process.on('SIGKILL', gracefulExit);