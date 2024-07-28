const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/getTotalAlumni', (req, res) => {
  const userId = req.userId;
  // console.log("userId in getMessages:", userId);

  const query = `
    SELECT COUNT(alumniid) AS totalAlumni FROM alumni WHERE status = 'active'
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching messages:", err);
      res.status(400).json({ message: 'Error fetching messages' });
    } else {
      res.json(results);
    }
  });
});

router.get('/getTotalUsers', (req, res) => {
  const userId = req.userId;
  // console.log("userId in getMessages:", userId);

  const query = `
    SELECT COUNT(userid) AS totalUsers FROM user WHERE status = 'active'
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching messages:", err);
      res.status(400).json({ message: 'Error fetching messages' });
    } else {
      res.json(results);
    }
  });
});

module.exports= router;