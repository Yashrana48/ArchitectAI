const mongoose = require('mongoose');

const architectureRecommendationSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['architecture', 'database', 'technology', 'security', 'deployment'],
    required: true
  },
  description: { type: String, required: true },
  confidence: { type: Number, required: true },
  reasoning: { type: String, required: true },
  pros: [{ type: String }],
  cons: [{ type: String }],
  implementation: { type: String, required: true },
  alternatives: [{ type: String }],
  estimatedCost: { type: String, required: true },
  estimatedTime: { type: String, required: true },
  complexity: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  icon: { type: String, required: true }
});

const savedRecommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  projectType: {
    type: String,
    required: true,
    trim: true
  },
  industry: {
    type: String,
    required: true,
    trim: true
  },
  teamSize: {
    type: String,
    required: true
  },
  budget: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'archived', 'implemented'],
    default: 'active'
  },
  requirements: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  recommendations: [architectureRecommendationSchema],
  aiRecommendations: [{
    type: mongoose.Schema.Types.Mixed
  }]
}, {
  timestamps: true
});

// Indexes for efficient querying
savedRecommendationSchema.index({ userId: 1, createdAt: -1 });
savedRecommendationSchema.index({ userId: 1, status: 1 });
savedRecommendationSchema.index({ userId: 1, industry: 1 });

module.exports = mongoose.model('SavedRecommendation', savedRecommendationSchema); 