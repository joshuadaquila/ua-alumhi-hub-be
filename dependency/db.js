require('dotenv').config();
const mysql = require('mysql');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig);

  connection.connect(function (err) {
    if (err) {
      console.error('Error connecting to the database:', err);
      setTimeout(handleDisconnect, 2000); // Retry connection after 2 seconds
    } else {
      console.log('Connected to the database with thread ID:', connection.threadId);
    }
  });

  connection.on('error', function (err) {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
      handleDisconnect(); // Reconnect on connection lost or fatal error
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;
