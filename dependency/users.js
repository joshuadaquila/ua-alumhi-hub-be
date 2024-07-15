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
  const userid = req.params.id;
  const query = `SELECT * FROM user WHERE status = "active" and userid = ${userid}`;
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
module.exports = router;