const mysql = require('mysql');

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'alumniHubDb'
});

module.exports = db;