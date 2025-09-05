const SavedRecommendation = require('../models/SavedRecommendation');

// Get all saved recommendations for a user
const getUserRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const recommendations = await SavedRecommendation.find({ userId })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    console.error('Error fetching user recommendations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recommendations',
      error: error.message
    });
  }
};

// Save a new recommendation
const saveRecommendation = async (req, res) => {
  try {
    const { userId } = req.params;
    const recommendationData = req.body;
    
    const newRecommendation = new SavedRecommendation({
      userId,
      ...recommendationData
    });
    
    const savedRecommendation = await newRecommendation.save();
    
    res.status(201).json({
      success: true,
      data: savedRecommendation,
      message: 'Recommendation saved successfully'
    });
  } catch (error) {
    console.error('Error saving recommendation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save recommendation',
      error: error.message
    });
  }
};

// Update a recommendation
const updateRecommendation = async (req, res) => {
  try {
    const { recommendationId } = req.params;
    const updateData = req.body;
    
    const updatedRecommendation = await SavedRecommendation.findByIdAndUpdate(
      recommendationId,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedRecommendation) {
      return res.status(404).json({
        success: false,
        message: 'Recommendation not found'
      });
    }
    
    res.json({
      success: true,
      data: updatedRecommendation,
      message: 'Recommendation updated successfully'
    });
  } catch (error) {
    console.error('Error updating recommendation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update recommendation',
      error: error.message
    });
  }
};

// Delete a recommendation
const deleteRecommendation = async (req, res) => {
  try {
    const { recommendationId } = req.params;
    
    const deletedRecommendation = await SavedRecommendation.findByIdAndDelete(recommendationId);
    
    if (!deletedRecommendation) {
      return res.status(404).json({
        success: false,
        message: 'Recommendation not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Recommendation deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting recommendation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete recommendation',
      error: error.message
    });
  }
};

// Get dashboard metrics for a user
const getDashboardMetrics = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const recommendations = await SavedRecommendation.find({ userId });
    
    const metrics = {
      totalProjects: recommendations.length,
      activeProjects: recommendations.filter(r => r.status === 'active').length,
      implementedProjects: recommendations.filter(r => r.status === 'implemented').length,
      averageConfidence: recommendations.length > 0 
        ? Math.round(recommendations.reduce((sum, r) => 
            sum + r.recommendations.reduce((recSum, rec) => recSum + rec.confidence, 0) / r.recommendations.length, 0
          ) / recommendations.length)
        : 0,
      totalEstimatedCost: calculateTotalCost(recommendations),
      mostPopularArchitecture: getMostPopularArchitecture(recommendations),
      industryDistribution: getIndustryDistribution(recommendations),
      complexityDistribution: getComplexityDistribution(recommendations)
    };
    
    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard metrics',
      error: error.message
    });
  }
};

// Helper functions
const calculateTotalCost = (recommendations) => {
  const total = recommendations.reduce((sum, project) => {
    return sum + project.recommendations.reduce((recSum, rec) => {
      const cost = rec.estimatedCost.match(/\$[\d,]+/);
      return recSum + (cost ? parseInt(cost[0].replace(/[$,]/g, '')) : 0);
    }, 0);
  }, 0);
  return `$${total.toLocaleString()}/month`;
};

const getMostPopularArchitecture = (recommendations) => {
  const archCounts = {};
  recommendations.forEach(project => {
    project.recommendations.forEach(rec => {
      if (rec.category === 'architecture') {
        archCounts[rec.name] = (archCounts[rec.name] || 0) + 1;
      }
    });
  });
  return Object.entries(archCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'None';
};

const getIndustryDistribution = (recommendations) => {
  const distribution = {};
  recommendations.forEach(project => {
    distribution[project.industry] = (distribution[project.industry] || 0) + 1;
  });
  return distribution;
};

const getComplexityDistribution = (recommendations) => {
  const distribution = {};
  recommendations.forEach(project => {
    project.recommendations.forEach(rec => {
      distribution[rec.complexity] = (distribution[rec.complexity] || 0) + 1;
    });
  });
  return distribution;
};

module.exports = {
  getUserRecommendations,
  saveRecommendation,
  updateRecommendation,
  deleteRecommendation,
  getDashboardMetrics
}; 