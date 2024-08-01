const express = require('express');
const router = express.Router();
const db = require('./db'); // Assuming you have a module to handle database connection
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { bucket } = require('./firebaseAdmin'); // Import bucket from firebaseAdmin.js

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for uploading profile pictures
router.post('/uploadProfilePicture', upload.single('photo'), async (req, res) => {
  console.log('Received file:', req.file);

  const userId = req.userId; // Assuming you have middleware to get userId from token
  console.log('User ID:', userId); // Debugging user ID

  const file = req.file;
  console.log('File received:', file); // Debugging file object

  if (!file) {
    console.log('No file uploaded');
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Generate a unique filename
    const fileName = `${uuidv4()}.jpg`;
    console.log('Generated file name:', fileName); // Debugging file name

    const fileUpload = bucket.file(`profile_pictures/${fileName}`);

    // Upload the image to Firebase Storage
    await fileUpload.save(file.buffer, {
      contentType: file.mimetype,
      resumable: false,
    });

    // Get the download URL for the uploaded image
    const downloadURL = await fileUpload.getSignedUrl({
      action: 'read',
      expires: '03-09-2491', // Set expiration date as needed
    });
    console.log('Download URL:', downloadURL[0]); // Debugging download URL

    // Update the user's profile picture URL in the database
    const sql = 'UPDATE alumni SET photourl = ? WHERE alumniid = ?';
    db.query(sql, [downloadURL[0], userId], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send('Internal server error');
      }
      console.log('Profile picture updated successfully');
      res.json({ success: true, message: 'Profile picture updated successfully' });
    });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).send('Error processing image');
  }
});

module.exports = router;
