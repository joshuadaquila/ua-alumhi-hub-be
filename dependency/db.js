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
  connectTimeout: 60000 // 1 minute
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
        }
        connection.release();
      });
    }
  });
}, 600000); // 10 minutes

module.exports = db;