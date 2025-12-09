require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');
const logger = require('./src/utils/logger');
const { createServer } = require('http');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO
const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });

  // Order tracking updates
  socket.on('track-order', (orderId) => {
    socket.join(`order-${orderId}`);
  });
});

// Make io accessible to routes
app.set('io', io);

// Connect to MongoDB
connectDB();

// Start server
server.listen(PORT, () => {
  logger.info(`🚀 DFW Furniture MERN Backend running on port ${PORT}`);
  logger.info(`📱 Environment: ${process.env.NODE_ENV}`);
  logger.info(`🔗 Frontend: ${process.env.FRONTEND_URL}`);
  logger.info(`📊 MongoDB: ${process.env.MONGODB_URI ? 'Connected' : 'Not configured'}`);
  logger.info(`⚡ Redis: ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
  console.log('\n✅ Server is ready to accept requests!\n');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
  });
});

// Handle SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

module.exports = server;
