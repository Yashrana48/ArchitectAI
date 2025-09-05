const mongoose = require('mongoose');

const decisionSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['architecture', 'database', 'technology', 'security', 'scalability'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'decided', 'implemented', 'reviewed'],
    default: 'pending'
  },
  reasoning: {
    type: String,
    required: true
  },
  alternatives: [{
    type: String,
    trim: true
  }],
  pros: [{
    type: String,
    trim: true
  }],
  cons: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  chatSessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatSession'
  },
  metadata: {
    projectName: String,
    teamSize: Number,
    expectedScale: String,
    budget: String,
    timeline: String
  }
}, {
  timestamps: true
});

// Index for efficient querying
decisionSchema.index({ userId: 1, createdAt: -1 });
decisionSchema.index({ category: 1, status: 1 });
decisionSchema.index({ tags: 1 });

module.exports = mongoose.model('Decision', decisionSchema); 