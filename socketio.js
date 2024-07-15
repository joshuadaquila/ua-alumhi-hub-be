const { Server } = require('socket.io');

const socketio = (server) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message 2', (msg) => {
      console.log('message: ' + msg);
    });
  });
}

module.exports = socketio;
