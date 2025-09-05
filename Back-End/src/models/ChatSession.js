const mongoose = require('mongoose');

const chatSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  summary: {
    type: String,
    default: ''
  },
  topic: {
    type: String,
    enum: ['architecture', 'database', 'technology', 'security', 'scalability', 'general'],
    default: 'general'
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'archived'],
    default: 'active'
  },
  metadata: {
    projectName: String,
    decisionIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Decision'
    }]
  }
}, {
  timestamps: true
});

// Index for efficient querying
chatSessionSchema.index({ userId: 1, createdAt: -1 });
chatSessionSchema.index({ status: 1, topic: 1 });

module.exports = mongoose.model('ChatSession', chatSessionSchema); 