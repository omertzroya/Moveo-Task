require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

// Set up Socket.io
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

// Configure CORS middleware

app.use(cors({
  origin: 'https://moveo-task-frontend-xsqw.onrender.com'  
}));

// Middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define API routes
const authRoutes = require('./routes/auth');
const songsRoutes = require('./routes/songs');

app.use('/api/auth', authRoutes);
app.use('/api/songs', songsRoutes);

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Serve the frontend application for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('song-selected', (song) => {
    io.emit('song-selected', song);
  });

  socket.on('adminQuit', () => {
    console.log('Received adminQuit event');
    io.emit('adminQuit');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

