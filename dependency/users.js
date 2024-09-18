const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/getUsers', (req, res) => {
  const query = 'SELECT * FROM user WHERE status = "active"';
  db.query(query, (err, results) => {
    if (err) {
      res.status(400).json({ message: 'Error fetching users' });
    } else {
      res.json(results);
    }
  });
})

router.get('/getAlumni', (req, res) => {
  const query = 'SELECT * FROM alumni WHERE status = "active"';
  db.query(query, (err, results) => {
    if (err) {
      res.status(400).json({ message: 'Error fetching alumni' });
    } else {
      res.json(results);
    }
  });
})

router.get('/getUserInfo/:id', (req, res) => {
  const userId = req.params.id; // Extract the id parameter from the request URL

  // Use a parameterized query to prevent SQL injection
  const query = 'SELECT * FROM user WHERE status = ? AND userid = ?';
  const values = ['active', userId];

  db.query(query, values, (err, results) => {
      if (err) {
          console.error('Error fetching user info:', err);
          return res.status(400).json({ message: 'Error fetching user info' });
      }

      if (results.length === 0) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json(results[0]);
  });
});


router.get('/getAlumniInfo', (req, res) => {
  const userid = req.userId;
  const query = `SELECT * FROM alumni WHERE status = "active" and alumniid = ${userid}`;
  console.log(query);
  db.query(query, (err, results) => {
    if (err) {
      res.status(400).json({ message: 'Error fetching users' });
    } else {
      res.json(results);
      console.log(results);
    }
  });
})

router.get('/getJobInfo', (req, res) => {
  const userid = req.userId;
  const query = `SELECT presentoccupation FROM employmentdata WHERE alumniid = ${userid}`;
  console.log(query);
  db.query(query, (err, results) => {
    if (err) {
      res.status(400).json({ message: 'Error fetching users' });
    } else {
      res.json(results);
      console.log(results);
    }
  });
})

router.post('/addUser', (req, res) => {
  const {title, message, type} = req.body;

  // Get the current date and time
  const now = new Date();

  // Format the date and time as a string
  const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
  console.log(now);

  const sql = 'INSERT INTO notifications (title, message, sentdate, type) VALUES (?,?,?, ?)';
  db.query(sql, [title, message, formattedDate, type], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Internal server error');
    }
    res.send(result);
  });
})

router.post('/setSubId', (req, res) => {
  const {subId} = req.body;
  const userId = req.userId;

  const sql = 'INSERT INTO expotoken (userid, token) VALUES (?,?)';
  db.query(sql, [userId, subId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Internal server error');
    }
    res.send(result);
  });
})

module.exports = router;