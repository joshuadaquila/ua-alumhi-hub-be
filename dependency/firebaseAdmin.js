const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccountPath) {
  throw new Error('Missing the GOOGLE_APPLICATION_CREDENTIALS environment variable');
}

const serviceAccount = require(path.resolve(serviceAccountPath));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'ua-alumni-hub.appspot.com', // Replace with your Firebase project ID
});

const bucket = admin.storage().bucket();
module.exports = { bucket };
