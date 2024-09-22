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
  const query = 'SELECT e.*, COUNT(r.registrationid) AS totalRegistration FROM events e LEFT JOIN registration r ON e.eventid = r.eventid WHERE e.date > CURDATE() GROUP BY e.eventid ORDER BY e.eventid DESC;';
  db.query(query, (err, results) => {
    if (err) {
      res.status(400).json({ message: 'Error fetching events' });
    } else {
      res.json(results);
    }
  });
});

router.get('/getPastEvents', (req, res) => {
  const query = 'SELECT e.*, COUNT(r.registrationid) AS totalRegistration FROM events e LEFT JOIN registration r ON e.eventid = r.eventid WHERE e.date <= CURDATE() AND e.status = "active" GROUP BY e.eventid ORDER BY e.eventid DESC;';
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
  const { title, description, date, time, endtime, location, capacity, registrationdeadline } = req.body;
  const sql = 'INSERT INTO events (title, description, date, time, endtime, location, capacity, registrationdeadline, staffid) VALUES (?, ?,?,?,?,?,?,?,?)';
    db.query(sql, [title, description, date, time, endtime, location, capacity, registrationdeadline, userId], (err, result) => {
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
  console.log("REGISTER EVENT");
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
      console.log("CHECK STATUS FAILED", err);
      res.status(400).json({ message: 'Error checking events' });
    } else {
      console.log("CHECK STATUS OK");
      res.json(results);
    }
  });
});

router.post('/hideEvent', (req, res) => {
  const userid = req.userId;
  const { eventid } = req.body;
  const query = `SELECT status FROM event WHERE eventid = ${eventid}`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(400).json({ message: 'Error fetching events' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }

    const status = results[0].status;

    if (status === "active") {
      const sql = `UPDATE event SET status = "hidden" WHERE eventid = ${eventid}`;
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).send('Internal server error');
        }
        res.send(result);
      });
    } else if (status === "hidden") {
      const sql = `UPDATE event SET status = "active" WHERE eventid = ${eventid}`;
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


router.post('/deleteEvent/:id', (req, res) => {
  const { id } = req.params; // Get the event ID from the URL parameters

  const sql = 'DELETE FROM events WHERE eventid = ?';

  // Execute the query with the event ID
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Internal server error');
    }
    if (result.affectedRows === 0) {
      // No rows were deleted, likely because the event ID doesn't exist
      return res.status(404).send('Event not found');
    }
    res.send({ message: 'Event deleted successfully' });
  });
});

router.post('/updateEvent', (req, res) => {
  const { eventid, title, description, date, time, location, capacity, registrationdeadline } = req.body;

  const sql = `UPDATE events 
               SET title = ?, description = ?, date = ?, time = ?, location = ?, capacity = ?, registrationdeadline = ? 
               WHERE eventid = ?`;

  db.query(sql, [title, description, date, time, location, capacity, registrationdeadline, eventid], (err, result) => {
    if (err) {
      console.error('Error updating event:', err);
      return res.status(500).send('Internal server error');
    }
    res.send(result);
  });
});

router.get('/eventReport/:id', (req, res) => {
  const eventid = req.params.id;
  const query = `
    SELECT r.registrationid, r.date as registrationdate, a.name, a.email, e.*
    FROM registration r
    INNER JOIN alumni a
    ON r.alumniid = a.alumniid
    INNER JOIN events e
    ON r.eventid = e.eventid
    WHERE r.eventid = ${eventid}
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.log("CHECK STATUS FAILED", err);
      res.status(400).json({ message: 'Error checking events' });
    } else {
      console.log("CHECK STATUS OK");
      res.json(results);
    }
  });
});

router.post('/setTotalAttended', (req, res) => {
  const { eventId, attendeeCount } = req.body;

  // Ensure eventId and attendeeCount are provided
  if (!eventId || attendeeCount === undefined) {
    return res.status(400).send('Bad request: eventId and attendeeCount are required.');
  }

  const sql = `UPDATE events 
               SET totalattendees = ? 
               WHERE eventid = ?`;

  db.query(sql, [attendeeCount, eventId], (err, result) => {
    if (err) {
      console.error('Error setting total attendees:', err);
      return res.status(500).send('Internal server error');
    }
    res.send(result);
  });
});



module.exports = router;
