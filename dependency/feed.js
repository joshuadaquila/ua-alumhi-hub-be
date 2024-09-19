const express = require('express');
const router = express.Router();
const db = require('./db'); // Assuming you have a module to handle database connection
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { bucket } = require('./firebaseAdmin'); // Import bucket from firebaseAdmin.js

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/createPost', upload.array('images', 10), async (req, res) => {
  const userId = req.userId; // Assuming you have middleware to get userId from token
  const { content } = req.body;
  const files = req.files;

  if (!content) {
    return res.status(400).send('Post content cannot be empty');
  }

  try {
    const imageUrls = await Promise.all(files.map(async (file) => {
      const fileName = `${uuidv4()}.jpg`;
      const fileUpload = bucket.file(`images/${fileName}`);
      await fileUpload.save(file.buffer, {
        contentType: file.mimetype,
        resumable: false,
      });

      const downloadURL = await fileUpload.getSignedUrl({
        action: 'read',
        expires: '03-09-2491', // Set expiration date as needed
      });

      return downloadURL[0];
    }));

    const sql = 'INSERT INTO feed (content, photourl, alumniid) VALUES (?, ?, ?)';
    db.query(sql, [content, JSON.stringify(imageUrls), userId], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal server error');
      }
      res.send(result);
    });
  } catch (error) {
    console.error('Error processing images:', error);
    res.status(500).send('Error processing images');
  }
});

router.put('/updatePost/:feedid', async (req, res) => {
  const userId = req.userId; // Assuming you have middleware to get userId from token
  const { feedid } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).send('Post content cannot be empty');
  }

  try {
    const sql = 'UPDATE feed SET content = ? WHERE feedid = ? AND alumniid = ?';
    db.query(sql, [content, feedid, userId], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal server error');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Post not found or you are not the owner');
      }
      res.send('Post updated successfully');
    });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).send('Error updating post');
  }
});

router.delete('/deletePost/:feedid', async (req, res) => {
  const userId = req.userId; // Assuming you have middleware to get userId from token
  const { feedid } = req.params;

  try {
    const sql = 'DELETE FROM feed WHERE feedid = ? AND alumniid = ?';
    db.query(sql, [feedid, userId], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal server error');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Post not found or you are not the owner');
      }
      res.send('Post deleted successfully');
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).send('Error deleting post');
  }
});


router.get('/getFeed', (req, res) => {
  // console.log("get events is fetched")
  const query = `SELECT f.content, f.datestamp, f.photourl, f.feedid, a.alumniid,
    a.name, a.photourl as "profilepic" 
    FROM feed f
    INNER JOIN alumni a
    ON f.alumniid = a.alumniid
    WHERE f.status = "active" order by feedid desc`;
  db.query(query, (err, results) => {
    if (err) {
      console.log("ERROR GET FEED", err);
      res.status(400).json({ message: 'Error fetching feed' });
    } else {
      res.json(results);
    }
  });
});

router.post('/likePost', (req, res) => {
  const userId = req.userId;
  const { feedid } = req.body;

  if (!userId || !feedid) {
    return res.status(400).send('Missing required fields');
  }

  // Insert a new like record with status 'active'
  const insertSql = 'INSERT INTO feedlike (feedid, alumniid, status) VALUES (?, ?, ?)';
  db.query(insertSql, [feedid, userId, 'active'], (insertErr, insertResult) => {
    if (insertErr) {
      console.error('Error executing query:', insertErr);
      return res.status(500).send('Internal server error');
    }
    res.status(201).json({ message: 'Post liked successfully', likeId: insertResult.insertId });
  });
});

router.get('/hasLiked/:feedid', (req, res) => {
  const userId = req.userId;
  const feedid = req.params.feedid;

  if (!userId || !feedid) {
    return res.status(400).send('Missing required fields');
  }

  // Query to check if the user has liked the post
  const checkSql = 'SELECT * FROM feedlike WHERE feedid = ? AND alumniid = ? AND status = ?';
  db.query(checkSql, [feedid, userId, 'active'], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error executing query:', checkErr);
      return res.status(500).send('Internal server error');
    }

    // If a record is found, the user has liked the post
    const hasLiked = checkResult.length > 0;
    res.status(200).json({ hasLiked });
  });
});


router.post('/unlikePost', (req, res) => {
  const userId = req.userId;
  const { feedid } = req.body;

  if (!userId || !feedid) {
    return res.status(400).send('Missing required fields');
  }

  // Remove the like record
  const deleteSql = 'DELETE FROM feedlike WHERE feedid = ? AND alumniid = ?';
  db.query(deleteSql, [feedid, userId], (deleteErr, deleteResult) => {
    if (deleteErr) {
      console.error('Error executing query:', deleteErr);
      return res.status(500).send('Internal server error');
    }
    res.status(200).json({ message: 'Post unliked successfully' });
  });
});



router.get('/getLikes/:feedid', (req, res) => {
  const feedid = req.params.feedid;
  
  // SQL query to count the number of active likes
  const query = `
    SELECT COUNT(*) AS totalLikes
    FROM feedlike
    WHERE feedid = ? AND status = 'active'
  `;
  
  db.query(query, [feedid], (err, results) => {
    if (err) {
      console.log("ERROR GETTING LIKES", err);
      return res.status(400).json({ message: 'Error fetching likes' });
    }
    
    // Send the count of active likes as a response
    res.json({ totalLikes: results[0].totalLikes });
  });
});


router.post('/addComment', (req, res) => {
  const userId = req.userId;
  const { feedid, content } = req.body;

  if (!userId || !feedid || !content) {
    return res.status(400).send('Missing required fields');
  }

  const sql = 'INSERT INTO comment (feedid, alumniid, content) VALUES (?,?,?)';
  db.query(sql, [feedid, userId, content], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Internal server error');
    }
    res.status(201).json({
      message: 'Comment added successfully',
      commentId: result.insertId
    });
  });
});

router.get('/getComments/:feedid', (req, res) => {
  const feedid = req.params.feedid;
  const query = `
    SELECT c.commentid, c.content, c.date, a.name, a.photourl,
    FROM comment c
    INNER JOIN alumni a ON c.alumniid = a.alumniid
    WHERE c.status = "active" AND c.feedid = ?
    ORDER BY c.commentid ASC
  `;
  
  db.query(query, [feedid], (err, results) => {
    if (err) {
      console.log("ERROR GET COMMENTS", err);
      res.status(400).json({ message: 'Error fetching comments' });
    } else {
      res.json(results);
    }
  });
});


router.get('/getMyFeed', (req, res) => {
  console.log("get myfeed is fetched")
  const userId = req.userId;
  const query = `SELECT f.content, f.datestamp, f.photourl, f.feedid,
    a.name, a.photourl as "profilepic" 
    FROM feed f
    INNER JOIN alumni a
    ON f.alumniid = a.alumniid
    WHERE f.status = "active" and f.alumniid = ${userId}
    order by feedid desc`;
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
