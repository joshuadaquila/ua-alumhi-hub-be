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

router.get('/getTotalMessage', (req, res) => {
  const userId = req.userId;
  // console.log("userId in getMessages:", userId);

  const query = `
    SELECT COUNT(messageid) AS totalMessage FROM message
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

router.get('/getTotalComment', (req, res) => {
  const userId = req.userId;
  // console.log("userId in getMessages:", userId);

  const query = `
    SELECT COUNT(commentid) AS totalComment FROM comment
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

router.get('/getTotalPost', (req, res) => {
  const userId = req.userId;
  // console.log("userId in getMessages:", userId);

  const query = `
    SELECT COUNT(feedid) AS totalPost FROM feed WHERE status = 'active'
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

router.get('/getTotalResponses', (req, res) => {
  const userId = req.userId;
  // console.log("userId in getMessages:", userId);

  const query = `
    SELECT COUNT(geninfoid) AS totalResponse FROM generalinformation
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

router.get('/getTotalEvent', (req, res) => {
  const userId = req.userId;
  // console.log("userId in getMessages:", userId);

  const query = `
    SELECT COUNT(eventid) AS totalEvent FROM events WHERE status = 'active'
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

router.get('/getTotalEventHap', (req, res) => {
  const userId = req.userId;
  // console.log("userId in getMessages:", userId);

  const query = `
    SELECT COUNT(eventid) AS totalEvent
    FROM events
    WHERE date = CURDATE() 
    AND CURTIME() BETWEEN time AND endtime 
    AND status = 'active' 
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching events:", err);
      res.status(400).json({ message: 'Error fetching events' });
    } else {
      res.json(results[0]); // Return the count directly
    }
  });
});
router.get('/getTotalEventFuture', (req, res) => {
  const userId = req.userId;
  // console.log("userId in getMessages:", userId);

  const query = `
    SELECT COUNT(eventid) AS totalEvent 
    FROM events WHERE
    date > CURDATE() AND status = 'active'
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching events:", err);
      res.status(400).json({ message: 'Error fetching events' });
    } else {
      res.json(results[0]); // Return the count directly
    }
  });
});

router.get('/getTotalEventPast', (req, res) => {
  const userId = req.userId;
  // console.log("userId in getMessages:", userId);

  const query = `
    SELECT COUNT(eventid) AS totalEvent 
    FROM events WHERE
    date <= CURDATE() AND status = 'active'
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching events:", err);
      res.status(400).json({ message: 'Error fetching events' });
    } else {
      res.json(results[0]); // Return the count directly
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