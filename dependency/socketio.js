const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);

const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from your React app
  credentials: true // Allow credentials (session cookie) to be sent
};

app.use(cors(corsOptions));

const io = new Server(server, {
  cors: corsOptions
});

io.on('connection', (socket) => {
  console.log('a user connected hehe'); //sends to client
  const msg = "guys may nag connect";
  socket.emit('chika', msg);

  socket.on('eventNotification', (msg) => { //receives from client
    console.log('message: ' + msg);
    io.emit('eventNotification', msg); //send message to all connected
  });

  socket.on('messageNotification', (msg) => { //receives from client
    console.log('message: ' + msg);
    io.emit('messageNotification', msg); //send message to all connected
  });
});

module.exports = io;
