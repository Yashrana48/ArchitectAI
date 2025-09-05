const express = require('express');
const router = express.Router();
const {
  getUserRecommendations,
  saveRecommendation,
  updateRecommendation,
  deleteRecommendation,
  getDashboardMetrics
} = require('../controllers/savedRecommendationController');

// Get all recommendations for a user
router.get('/user/:userId', getUserRecommendations);

// Get dashboard metrics for a user
router.get('/metrics/:userId', getDashboardMetrics);

// Save a new recommendation
router.post('/user/:userId', saveRecommendation);

// Update a recommendation
router.put('/:recommendationId', updateRecommendation);

// Delete a recommendation
router.delete('/:recommendationId', deleteRecommendation);

module.exports = router; 