const express = require('express');
const router = express.Router();
const db = require('./db');
// fetchEvents.js


// Example route using authenticateToken middleware
router.get('/getEvents', (req, res) => {
  // console.log("get events is fetched")
  const query = 'SELECT * FROM events WHERE status = "active" order by eventid desc';
  db.query(query, (err, results) => {
    if (err) {
      console.log("ERROR GET/EVENTS")
      res.status(400).json({ message: 'Error fetching events' });
    } else {
      res.json(results);
    }
  });
});

router.get('/getFutureEvents', (req, res) => {
  const query = 'SELECT * FROM events WHERE date > CURDATE() ORDER BY eventid DESC';
  db.query(query, (err, results) => {
    if (err) {
      res.status(400).json({ message: 'Error fetching events' });
    } else {
      res.json(results);
    }
  });
});

router.get('/getPastEvents', (req, res) => {
  const query = 'SELECT * FROM events WHERE date <= CURDATE() and endtime < CURTIME() AND status = "active" ORDER BY eventid DESC';
  db.query(query, (err, results) => {
    if (err) {
      res.status(400).json({ message: 'Error fetching events' });
    } else {
      res.json(results);
    }
  });
});

router.get('/getHappeningEvents', (req, res) => {
  const query = `
  SELECT * 
  FROM events 
  WHERE date = CURDATE() 
    AND CURTIME() BETWEEN time AND endtime 
    AND status = "active" 
  ORDER BY eventid DESC;
`;

  db.query(query, (err, results) => {
    if (err) {
      res.status(400).json({ message: 'Error fetching events' });
    } else {
      res.json(results);
    }
  });
});;

router.post('/addEvent', (req, res) => {
  const userId = req.userId;
  const { title, description, date, time, location, capacity, registrationdeadline } = req.body;
  const sql = 'INSERT INTO events (title, description, date, time, location, capacity, registrationdeadline, staffid) VALUES (?,?,?,?,?,?,?,?)';
    db.query(sql, [title, description, date, time, location, capacity, registrationdeadline, userId], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal server error');
      }
      res.send(result);
    });
});

router.post('/registerEvent', (req, res) => {
  const userId = req.userId;
  const { eventid } = req.body;

  const now = new Date();

  // Format the date and time as a string
  const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
  console.log(eventid);
  const sql = 'INSERT INTO registration (date, alumniid, eventid) VALUES (?,?,?)';
    db.query(sql, [formattedDate, userId, eventid], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal server error');
      }
      res.send(result);
    });
});

router.post('/registerEvent', (req, res) => {
  const userId = req.userId;
  const { eventid } = req.body;

  const now = new Date();

  // Format the date and time as a string
  const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
  console.log(eventid);
  const sql = 'INSERT INTO registration (date, alumniid, eventid) VALUES (?,?,?)';
    db.query(sql, [formattedDate, userId, eventid], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal server error');
      }
      res.send(result);
    });
});
router.post('/cancelRegistration', (req, res) => {
  const userId = req.userId;
  const { eventid } = req.body;

  const now = new Date();

  // Format the date and time as a string
  const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
  console.log(eventid);
  const sql = `DELETE from registration WHERE eventid = ${eventid} and alumniid = ${userId}`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal server error');
      }
      res.send(result);
    });
});

router.get('/checkEvent', (req, res) => {
  const userid = req.userId;
  // console.log(req);
  console.log(userid);
  const { eventid } = req.query;
  const query = `SELECT * FROM registration WHERE eventid = ${eventid} and alumniid = ${userid} `;
  db.query(query, (err, results) => {
    if (err) {
      res.status(400).json({ message: 'Error fetching events' });
    } else {
      res.json(results);
    }
  });
});


module.exports = router;
