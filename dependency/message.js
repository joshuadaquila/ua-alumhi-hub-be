const express = require('express');
const router = express.Router();
const db = require('./db');


router.get('/getMessages/:id', (req, res) => {
  const userId = req.userId;
  console.log("userid in getmsg", userId);
  const query = `
    SELECT m.*, u.username, u.usertype
    FROM message m
    INNER JOIN user u ON m.userid = u.userid
    WHERE m.date >= (SELECT datecreated FROM alumni WHERE alumniid = ?) AND m.status = 'active'
    ORDER BY m.date desc
  `;
  db.query(query, [userId], (err, results) => {
    if (err) {
      res.status(400).json({ message: 'Error fetching notifications' });
    } else {
      res.json(results);
    }
  });
});

router.get('/getMessages', (req, res) => {
  const userId = req.userId;
  console.log("userId in getMessages:", userId);

  const query = `
    SELECT m.*, a.name, a.email, a.photourl
    FROM message m
    INNER JOIN alumni a ON m.userid = a.alumniid
    ORDER BY m.date DESC
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



router.get('/getMessageInfo/:id', (req, res) => {
  const messageId = req.params.id;
  console.log("messageId in getmsg", messageId);
  const query = `
    SELECT * FROM message WHERE (status = 'active' OR status = 'hidden') AND messageid = ?
  `;
  db.query(query, [messageId], (err, results) => {
    if (err) {
      res.status(400).json({ message: 'Error fetching message information' });
    } else {
      res.json(results);
    }
  });
});


router.post('/addMessage', (req, res) => {
  const userid = req.userId;
  const { content } = req.body;

  // Get the current date and time
  const now = new Date();

  // Format the date and time as a string
  const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
  console.log(now);

  const sql = 'INSERT INTO message (content, date, userid) VALUES (?,?,?)';
  db.query(sql, [content, formattedDate, userid], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Internal server error');
    }
    res.send(result);
  });
});
router.post('/addAdminMessage', (req, res) => {
  const userid = 29
  const { content } = req.body;

  // Get the current date and time
  const now = new Date();

  // Format the date and time as a string
  const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
  console.log(now);

  const sql = 'INSERT INTO message (content, date, userid) VALUES (?,?,?)';
  db.query(sql, [content, formattedDate, userid], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Internal server error');
    }
    res.send(result);
  });
});


router.post('/hideMessage', (req, res) => {
  const userid = req.userId;
  const { messageid } = req.body;
  const query = `SELECT status FROM message WHERE messageid = ${messageid}`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(400).json({ message: 'Error fetching events' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }

    const status = results[0].status;

    if (status === "active") {
      const sql = `UPDATE message SET status = "hidden" WHERE messageid = ${messageid}`;
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).send('Internal server error');
        }
        res.send(result);
      });
    } else if (status === "hidden") {
      const sql = `UPDATE message SET status = "active" WHERE messageid = ${messageid}`;
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).send('Internal server error');
        }
        res.send(result);
      });
    } else {
      return res.status(400).json({ message: 'Invalid status' });
    }
  });
});


router.get('/checkMessage', (req, res) => {
  const userid = req.userId;
  // console.log(req);
  console.log(userid);
  const { messageid } = req.query;
  const query = `SELECT status FROM message WHERE messageid = ${messageid}`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(400).json({ message: 'Error fetching events' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;