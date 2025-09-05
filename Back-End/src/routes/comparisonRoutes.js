const express = require('express');
const router = express.Router();
const comparisonController = require('../controllers/comparisonController');

// Public routes (no auth required for comparison)
router.get('/patterns', comparisonController.getArchitecturePatterns);
router.get('/patterns/:id', comparisonController.getArchitecturePattern);
router.post('/compare', comparisonController.comparePatterns);
router.get('/criteria', comparisonController.getComparisonCriteria);

// Development route (remove in production)
router.post('/seed', comparisonController.seedPatterns);

module.exports = router; 