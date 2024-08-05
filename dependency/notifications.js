const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/getNotifications', (req, res) => {
  const userId = req.userId;
  console.log("userid", userId);
  const query = 'SELECT * FROM notifications WHERE sentdate >=(SELECT datecreated FROM alumni WHERE alumniid = ?) ORDER By sentdate desc';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.log("ERROR FETCHING NOTIF")
      res.status(400).json({ message: 'Error fetching notifications' });
    } else {
      res.json(results);
    }
  });
})


router.post('/addNotification', (req, res) => {
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

router.get('/checkNotification', (req, res) => {
  // console.log("get events is fetched")
  const query = `SELECT notificationid
    FROM notification
    WHERE status = "unread"`;
  db.query(query, (err, results) => {
    if (err) {
      console.log("ERROR GET FEED", err);
      res.status(400).json({ message: 'Error fetching feed' });
    } else {
      res.json(results);
    }
  });
});
module.exports = router;