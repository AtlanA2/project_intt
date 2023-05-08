const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
import io from 'socket.io-client';

const socket = io('http://localhost:5000');


const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
