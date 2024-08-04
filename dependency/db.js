require('dotenv').config();
const mysql = require('mysql');

// Configure MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 10, // Adjust this value based on your needs
  acquireTimeout: 30000, // 30 seconds
  timeout: 60000, // 1 minute
  connectTimeout: 60000, // 1 minute
  charset: 'utf8mb4'
});

// Periodic connection ping
setInterval(() => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection:', err);
    } else {
      connection.ping((err) => {
        if (err) {
          console.error('Error pinging MySQL server:', err);
        } else {
          console.log('MySQL connection is active and healthy!');
        }
        connection.release();
      });
    }
  });
}, 600000); // 10 minutes

// Log a success message when the connection is established
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error getting initial connection:', err);
  } else {
    console.log('MySQL connection established successfully!');
    connection.release();
  }
});

module.exports = db;