const express = require('express');
const router = express.Router();
const decisionController = require('../controllers/decisionController');
const auth = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(auth);

// Decision routes
router.get('/user/:userId', decisionController.getDecisions);
router.get('/:id', decisionController.getDecision);
router.post('/', decisionController.createDecision);
router.put('/:id', decisionController.updateDecision);
router.delete('/:id', decisionController.deleteDecision);

// Analytics routes
router.get('/analytics/:userId', decisionController.getDecisionAnalytics);

// Chat session routes
router.get('/sessions/:userId', decisionController.getChatSessions);
router.post('/sessions', decisionController.createChatSession);
router.put('/sessions/:id', decisionController.updateChatSession);

module.exports = router; 