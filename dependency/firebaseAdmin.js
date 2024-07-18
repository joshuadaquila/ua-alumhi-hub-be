// firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('./ua-alumni-hub-firebase-adminsdk-l4tro-0afb2dbc7b.json'); // Path to your Firebase Admin SDK service account key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'ua-alumni-hub.appspot.com', // Replace with your Firebase project ID
});

const bucket = admin.storage().bucket();
module.exports = { bucket };
