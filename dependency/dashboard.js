const express = require('express');
const router = express.Router();
const db = require('./db'); // Assume db is a connection pool

const handleQuery = (query, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection:", err);
      res.status(500).json({ message: 'Error getting connection' });
      return;
    }

    connection.query(query, (queryErr, results) => {
      connection.release(); // Always release the connection

      if (queryErr) {
        console.error("Error executing query:", queryErr);
        res.status(400).json({ message: 'Error executing query' });
      } else {
        res.json(results);
      }
    });
  });
};

router.get('/getTotalAlumni', (req, res) => {
  const query = `
    SELECT COUNT(alumniid) AS totalAlumni FROM alumni WHERE status = 'active'
  `;
  handleQuery(query, res);
});

router.get('/getTotalMessage', (req, res) => {
  const query = `
    SELECT COUNT(messageid) AS totalMessage FROM message
  `;
  handleQuery(query, res);
});

router.get('/getTotalComment', (req, res) => {
  const query = `
    SELECT COUNT(commentid) AS totalComment FROM comment
  `;
  handleQuery(query, res);
});

router.get('/getTotalPost', (req, res) => {
  const query = `
    SELECT COUNT(feedid) AS totalPost FROM feed WHERE status = 'active'
  `;
  handleQuery(query, res);
});

router.get('/getTotalResponses', (req, res) => {
  const query = `
    SELECT COUNT(geninfoid) AS totalResponse FROM generalinformation
  `;
  handleQuery(query, res);
});

router.get('/getTotalEvent', (req, res) => {
  const query = `
    SELECT COUNT(eventid) AS totalEvent FROM events WHERE status = 'active'
  `;
  handleQuery(query, res);
});

router.get('/getTotalEventHap', (req, res) => {
  const query = `
    SELECT COUNT(eventid) AS totalEvent
    FROM events
    WHERE date = CURDATE() 
    AND CURTIME() BETWEEN time AND endtime 
    AND status = 'active'
  `;
  handleQuery(query, res);
});

router.get('/getTotalEventFuture', (req, res) => {
  const query = `
    SELECT COUNT(eventid) AS totalEvent 
    FROM events WHERE
    date > CURDATE() AND status = 'active'
  `;
  handleQuery(query, res);
});

router.get('/getTotalEventPast', (req, res) => {
  const query = `
    SELECT COUNT(eventid) AS totalEvent 
    FROM events WHERE
    date <= CURDATE() AND status = 'active'
  `;
  handleQuery(query, res);
});

router.get('/getTotalUsers', (req, res) => {
  const query = `
    SELECT COUNT(userid) AS totalUsers FROM user WHERE status = 'active'
  `;
  handleQuery(query, res);
});

module.exports = router;
