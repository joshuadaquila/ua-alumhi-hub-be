const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const router = express.Router();

// Retrieve the base64-encoded service account key from the environment variable
const serviceAccountBase64 = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccountBase64) {
  throw new Error('Missing the GOOGLE_APPLICATION_CREDENTIALS environment variable');
}

// Decode the base64-encoded service account key
const serviceAccountJson = Buffer.from(serviceAccountBase64, 'base64').toString('utf8');

// Write the JSON to a temporary file
const tempFilePath = path.join(__dirname, 'temp-serviceAccountKey.json');
fs.writeFileSync(tempFilePath, serviceAccountJson);

// Initialize Firebase Admin SDK apps if not already initialized
const initializeFirebaseApp = (appName) => {
  if (!admin.apps.find(app => app.name === appName)) {
    const serviceAccount = require(tempFilePath);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    }, appName);
  }
};

// Initialize apps with unique names for FCM
initializeFirebaseApp('androidApp');
initializeFirebaseApp('webApp');

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
  const { to, notification, appName } = req.body;

  if (!to || !notification || !notification.title || !notification.body || !appName) {
    return res.status(400).send({ success: false, error: 'Missing required fields' });
  }

  try {
    // Use the appName to get the correct Firebase app instance
    const app = admin.apps.find(app => app.name === appName);

    if (!app) {
      return res.status(400).send({ success: false, error: 'Invalid app name' });
    }

    const message = {
      token: to,
      notification: {
        title: notification.title,
        body: notification.body,
      },
    };

    const response = await app.messaging().send(message);
    res.status(200).send({ success: true, response });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send({ success: false, error: error.message });
  }
});

module.exports = router;
