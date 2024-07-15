const { io } = require('socket.io-client');

// Connect to the server
const socket = io('http://localhost:3001');

// Log connection status
socket.on('chika', (msg) => {
  console.log(msg);

  // Send a test message after connecting
  socket.emit('chat message 2', 'Hello from client');

  // Disconnect after sending the message
  // socket.disconnect();
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
