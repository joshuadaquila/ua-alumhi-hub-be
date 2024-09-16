const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const db = require('./db');

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
    io.emit('feedNotification', msg); // Send event notification to all connected clients
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

            if (true) { // Ensure the user has an Expo Push Token
              const pushNotificationData = {
                to: 'ExponentPushToken[ViKtfYKj7Q8c1mqHXRZnc7]', // Expo push token for this user
                sound: 'default',
                title: `New message from ${user.name}`,
                body: message.content,
                data: { messageId: message.messageid }
              };

              axios.post('https://exp.host/--/api/v2/push/send', pushNotificationData, {
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(response => {
                console.log('Push notification sent successfully:', response.data);
              }).catch(error => {
                console.error('Error sending push notification:', error);
              });
            } else {
              console.log(`No Expo Push Token for user ${user.name}`);
            }

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
