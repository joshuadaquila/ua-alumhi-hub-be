require('dotenv').config();
const mysql = require('mysql');

let db;

function handleDisconnect() {
    db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            setTimeout(handleDisconnect, 2000); // Retry after 2 seconds if connection fails
        }
    });

    db.on('error', (err) => {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
            handleDisconnect(); // Reconnect if the connection is lost
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = db;
