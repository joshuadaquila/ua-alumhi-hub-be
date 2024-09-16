const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const router = express.Router();

// Retrieve the base64-encoded service account key from the environment variable
const serviceAccountBase64 = process.env.FIREBASE_CREDENTIALS;

if (!serviceAccountBase64) {
  throw new Error('Missing the FIREBASE_CREDENTIALS environment variable');
}

// Decode the base64-encoded service account key
const serviceAccountJson = Buffer.from(serviceAccountBase64, 'base64').toString('utf8');

// Write the JSON to a temporary file
const tempFilePath = path.join(__dirname, 'firebasetemp-serviceAccountKey.json');
fs.writeFileSync(tempFilePath, serviceAccountJson);

// Initialize Firebase Admin SDK
const serviceAccount = require(tempFilePath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // storageBucket: 'ua-alumni-hub.appspot.com', // Replace with your Firebase project ID
});

// Clean up the temporary file when the process exits
process.on('exit', () => {
  try {
    fs.unlinkSync(tempFilePath);
  } catch (err) {
    console.error('Error deleting temporary service account file:', err);
  }
});

// Route to handle sending notifications
router.post('/send-notification', async (req, res) => {
  const { to, notification } = req.body;

  if (!to || !notification || !notification.title || !notification.body) {
    return res.status(400).send({ success: false, error: 'Missing required fields' });
  }

  try {
    const message = {
      token: to,
      notification: {
        title: notification.title,
        body: notification.body,
      },
    };

    const response = await admin.messaging().send(message);
    res.status(200).send({ success: true, response });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send({ success: false, error: error.message });
  }
});

module.exports = router;
