const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Send message to AI chatbot
router.post('/message', chatController.sendMessage);

// Get chat history for a user
router.get('/history/:userId', chatController.getChatHistory);

// Get AI performance analytics
router.get('/analytics', chatController.getAnalytics);

module.exports = router; 