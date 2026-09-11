const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Initialize DB Connection
connectDB();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'AuthShield Authentication API',
    internship: 'Codveda Web Development',
    level: 'Level 3 Task 2',
    timestamp: new Date().toISOString()
  });
});

// Route Mounting
app.use('/api/auth', authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🔐 AuthShield Authentication API Server on port ${PORT}`);
  console.log(`📡 Health endpoint:   http://localhost:${PORT}/api/health`);
  console.log(`🔑 Register endpoint: http://localhost:${PORT}/api/auth/register`);
  console.log(`🔓 Login endpoint:    http://localhost:${PORT}/api/auth/login`);
  console.log(`🛡️ Profile endpoint:  http://localhost:${PORT}/api/auth/profile`);
  console.log(`====================================================`);
});

module.exports = app;
