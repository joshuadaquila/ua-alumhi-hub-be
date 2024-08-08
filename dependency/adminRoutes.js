const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('./db');
const jwt = require('jsonwebtoken');

// Environment Variables
const SECRET_KEY = process.env.SECRET_KEY || 'default-secret-key';

router.post('/signup', (req, res)=> {
  const { username, password, usertype } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).send('Internal server error');
    }

    const sql = 'INSERT INTO user (username, password, usertype, status) VALUES (?,?,?, "active")';
    db.query(sql, [username, hashedPassword, usertype], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal server error');
      }
      res.send(result);
    });
  });
})

router.post('/updateUser/:id', (req, res) => {
  const { username, password } = req.body;
  const userId = req.params.id;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).send('Internal server error');
    }

    const sql = 'UPDATE user SET username = ?, password = ? WHERE userid = ?';
    db.query(sql, [username, hashedPassword, userId], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal server error');
      }
      res.send(result);
    });
  });
});


router.post('/deleteUser', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send('User ID is required');
  }

  const sql = 'UPDATE user SET status = "deleted" WHERE userid = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Internal server error');
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).send('User not found');
    }

    res.send({ message: 'User deleted successfully' });
  });
});

module.exports = router;

router.post('/signin', (req, res) =>{
  const { username, password } = req.body;

  const sql = 'SELECT password, userid, username FROM user WHERE username =? and STATUS = "active"';
  db.query(sql, [username], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Internal server error');
    }

    if (result.length === 0) {
      return res.status(401).send({ message: 'User not found' });
    }

    const hashedPassword = result[0].password;
    const userId = result[0].userid;
    const name = result[0].username;
    console.log(name);
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) {
        console.error('Error comparing password:', err);
        return res.status(500).send('Internal server error');
      }

      if (isMatch) {
        const token = jwt.sign({ userId }, SECRET_KEY);
        res.send({ token, username, userId });
      } else {
        res.status(401).send({ message: 'Invalid password' });
      }
    });
  });
})

module.exports = router;