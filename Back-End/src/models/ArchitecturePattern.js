const mongoose = require('mongoose');

const architecturePatternSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['monolithic', 'microservices', 'serverless', 'event-driven', 'layered', 'hexagonal'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pros: [{
    type: String,
    trim: true
  }],
  cons: [{
    type: String,
    trim: true
  }],
  useCases: [{
    type: String,
    trim: true
  }],
  characteristics: {
    complexity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true
    },
    scalability: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true
    },
    maintainability: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true
    },
    performance: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true
    },
    cost: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true
    },
    teamSize: {
      type: String,
      enum: ['small', 'medium', 'large'],
      required: true
    },
    timeToMarket: {
      type: String,
      enum: ['fast', 'medium', 'slow'],
      required: true
    }
  },
  technologyStack: [{
    type: String,
    trim: true
  }],
  deployment: [{
    type: String,
    trim: true
  }],
  monitoring: [{
    type: String,
    trim: true
  }],
  security: [{
    type: String,
    trim: true
  }],
  examples: [{
    company: String,
    description: String,
    link: String
  }],
  bestPractices: [{
    type: String,
    trim: true
  }],
  antiPatterns: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index for efficient querying
architecturePatternSchema.index({ category: 1 });
architecturePatternSchema.index({ 'characteristics.complexity': 1 });
architecturePatternSchema.index({ 'characteristics.scalability': 1 });

module.exports = mongoose.model('ArchitecturePattern', architecturePatternSchema); 