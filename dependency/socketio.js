const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const db = require('./db');
const OneSignal = require('onesignal-node');

// Initialize OneSignal client
const client = new OneSignal.Client('9649e634-24e7-4692-bb25-c0fe5d33ce63', 'N2ZlM2MxY2EtYmFkMi00Mzg2LTk5NzEtNDE5OTZlNzU2YzQw');

const app = express();
const server = createServer(app);

const corsOptions = {
  origin: ['https://alumni-hub.netlify.app', 'http://localhost:3000'],  // Allow requests from your React app
  credentials: true // Allow credentials (session cookie) to be sent
};

app.use(cors(corsOptions));

const io = new Server(server, {
  cors: corsOptions
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('eventNotification', (msg) => {
    console.log('Event message:', msg);
    io.emit('eventNotification', msg); // Send event notification to all connected clients
  });

  socket.on('feedNotification', (msg) => {
    io.emit('feedNotification', msg); // Send feed notification to all connected clients
  });

  socket.on('messageNotification', (msg) => {
    console.log('Received message:', msg);

    // Query to get message details
    const getMessageQuery = 'SELECT * FROM message WHERE messageid = ?';
    db.query(getMessageQuery, [msg.insertId], (err, messageResults) => {
      if (err) {
        console.error('Error fetching message:', err);
        return;
      }

      if (messageResults.length > 0) {
        const message = messageResults[0];
        const userId = message.userid;

        // Query to get user details
        const getUserQuery = 'SELECT * FROM alumni WHERE alumniid = ?';
        db.query(getUserQuery, [userId], (err, userResults) => {
          if (err) {
            console.error('Error fetching user details:', err);
            return;
          }

          if (userResults.length > 0) {
            const user = userResults[0];
            const enrichedMessage = {
              ...message,
              name: user.name,
              email: user.email,
              photourl: user.photourl
            };

            io.emit('messageNotification', enrichedMessage); // Send enriched message to all connected clients

            // Send push notification
            const notification = {
              headings: { en: 'New Message Received' },
              contents: { en: enrichedMessage.message },
              include_player_ids: [user.onesignal_player_id] // Use the OneSignal player ID of the user
            };

            client.createNotification(notification)
              .then(response => {
                console.log('Notification sent successfully:', response.body);
              })
              .catch(err => {
                console.error('Error sending notification:', err);
              });
          } else {
            // Handle case where user is not found
            io.emit('messageNotification', message); // Send original message if user details are not found
          }
        });
      } else {
        // Handle case where message is not found
        console.error('Message not found');
      }
    });
  });
});

module.exports = io;
