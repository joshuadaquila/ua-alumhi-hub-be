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

// Combine all the queries into a single route
router.get('/getDashboardStats', (req, res) => {
  const query = `
    SELECT 
      (SELECT COUNT(alumniid) FROM alumni WHERE status = 'active') AS totalAlumni,
      (SELECT COUNT(messageid) FROM message) AS totalMessage,
      (SELECT COUNT(commentid) FROM comment) AS totalComment,
      (SELECT COUNT(feedid) FROM feed WHERE status = 'active') AS totalPost,
      (SELECT COUNT(geninfoid) FROM generalinformation) AS totalResponse,
      (SELECT COUNT(eventid) FROM events WHERE status = 'active') AS totalEvent,
      (SELECT COUNT(eventid) FROM events WHERE date = CURDATE() AND CURTIME() BETWEEN time AND endtime AND status = 'active') AS totalEventHap,
      (SELECT COUNT(eventid) FROM events WHERE date > CURDATE() AND status = 'active') AS totalEventFuture,
      (SELECT COUNT(eventid) FROM events WHERE date <= CURDATE() AND status = 'active') AS totalEventPast,
      (SELECT COUNT(userid) FROM user WHERE status = 'active') AS totalUsers;
  `;
  handleQuery(query, res);
});
router.post('/setGraduateTotalBSIT', (req, res) => {
  const userid = req.userId;
  const { year, totalGraduatesIt } = req.body;

  const sql = `
    INSERT INTO graduationData (year, totalbsit)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE totalbsit = VALUES(totalbsit)
  `;

  db.query(sql, [year, totalGraduatesIt], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Internal server error');
    }
    res.send(result);
  });
});

router.post('/setGraduateTotalBSCS', (req, res) => {
  const userid = req.userId;
  const { year, totalGraduatesCs } = req.body;

  const sql = `
    INSERT INTO graduationData (year, totalbscs)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE totalbscs = VALUES(totalbscs)
  `;

  db.query(sql, [year, totalGraduatesCs], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Internal server error');
    }
    res.send(result);
  });
});


module.exports = router;
