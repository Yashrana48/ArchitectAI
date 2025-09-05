const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({
    message: 'AI-Driven Software Architecture Decision System API',
    status: 'Running',
    version: '1.0.0'
  });
});

// Import routes
const questionnaireRoutes = require('./routes/questionnaireRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const learningRoutes = require('./routes/learningRoutes');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const decisionRoutes = require('./routes/decisionRoutes');
const comparisonRoutes = require('./routes/comparisonRoutes');
const savedRecommendationRoutes = require('./routes/savedRecommendationRoutes');

// Use routes
app.use('/api/questionnaire', questionnaireRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/decisions', decisionRoutes);
app.use('/api/comparison', comparisonRoutes);
app.use('/api/saved-recommendations', savedRecommendationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 AI Architecture Decision System API`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
