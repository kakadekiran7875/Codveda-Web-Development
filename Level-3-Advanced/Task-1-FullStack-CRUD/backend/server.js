const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const postRoutes = require('./routes/postRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

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
    service: 'DevLog CRUD Backend API',
    internship: 'Codveda Web Development',
    level: 'Level 3 Task 1',
    timestamp: new Date().toISOString()
  });
});

// Route Mounting
app.use('/api/posts', postRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 DevLog CRUD API Server running on port ${PORT}`);
  console.log(`📡 Health endpoint: http://localhost:${PORT}/api/health`);
  console.log(`📚 Posts endpoint:  http://localhost:${PORT}/api/posts`);
  console.log(`====================================================`);
});

module.exports = app;
