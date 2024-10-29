import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

// Create socket instance with more aggressive connection settings
const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  upgrade: false,
  reconnection: true,
  reconnectionAttempts: Infinity,  // Keep trying to reconnect
  reconnectionDelay: 1000,         // Try every second
  timeout: 10000,
  autoConnect: true,               // Connect automatically
  forceNew: true                   // Force a new connection
});

// Add heartbeat to keep connection alive
setInterval(() => {
  if (socket.connected) {
    socket.emit('ping');
  } else {
    console.log('Socket disconnected, attempting to reconnect...');
    socket.connect();
  }
}, 5000);

socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
  // Immediately register player details if available from localStorage
  const savedInstrument = localStorage.getItem('playerInstrument');
  const savedRole = localStorage.getItem('playerRole');
  if (savedInstrument && savedRole) {
    socket.emit('registerPlayer', { instrument: savedInstrument, role: savedRole });
  }
});

socket.on('connect_error', (error) => {
  console.error('Connection failed:', error);
  socket.connect();  // Immediately try to reconnect
});

socket.io.on("error", (error) => {
  console.error('Transport error:', error);
  socket.connect();  // Immediately try to reconnect
});

export default socket;