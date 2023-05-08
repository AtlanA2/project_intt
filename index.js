const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('move', (col) => {
    console.log(`move made in column ${col}`);
    // Send the move to all other connected clients
    socket.broadcast.emit('move', col);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
