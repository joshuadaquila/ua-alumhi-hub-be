const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const serviceAccountBase64 = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccountBase64) {
  throw new Error('Missing the GOOGLE_APPLICATION_CREDENTIALS environment variable');
}

// Decode the base64-encoded service account key
const serviceAccountJson = Buffer.from(serviceAccountBase64, 'base64').toString('utf8');

// Write the JSON to a temporary file
const tempFilePath = path.join(__dirname, 'temp-serviceAccountKey.json');
fs.writeFileSync(tempFilePath, serviceAccountJson);

const serviceAccount = require(tempFilePath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'ua-alumni-hub.appspot.com', // Replace with your Firebase project ID
});

const bucket = admin.storage().bucket();
module.exports = { bucket };

// Clean up the temporary file if necessary
process.on('exit', () => {
  fs.unlinkSync(tempFilePath);
});
