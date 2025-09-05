const Decision = require('../models/Decision');
const ChatSession = require('../models/ChatSession');

// Get all decisions for a user
const getDecisions = async (req, res) => {
  try {
    const { userId } = req.params;
    const { category, status, page = 1, limit = 10 } = req.query;

    const query = { userId };
    if (category) query.category = category;
    if (status) query.status = status;

    const decisions = await Decision.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Decision.countDocuments(query);

    res.json({
      decisions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching decisions' });
  }
};

// Get a single decision
const getDecision = async (req, res) => {
  try {
    const decision = await Decision.findById(req.params.id)
      .populate('chatSessionId', 'title summary');
    
    if (!decision) {
      return res.status(404).json({ error: 'Decision not found' });
    }

    res.json(decision);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching decision' });
  }
};

// Create a new decision
const createDecision = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      reasoning,
      alternatives,
      pros,
      cons,
      tags,
      chatSessionId,
      metadata
    } = req.body;

    const decision = new Decision({
      userId: req.user.id, // From auth middleware
      title,
      description,
      category,
      reasoning,
      alternatives: alternatives || [],
      pros: pros || [],
      cons: cons || [],
      tags: tags || [],
      chatSessionId,
      metadata: metadata || {}
    });

    const savedDecision = await decision.save();

    // Update chat session if provided
    if (chatSessionId) {
      await ChatSession.findByIdAndUpdate(chatSessionId, {
        $push: { 'metadata.decisionIds': savedDecision._id }
      });
    }

    res.status(201).json(savedDecision);
  } catch (error) {
    res.status(500).json({ error: 'Error creating decision' });
  }
};

// Update a decision
const updateDecision = async (req, res) => {
  try {
    const decision = await Decision.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!decision) {
      return res.status(404).json({ error: 'Decision not found' });
    }

    res.json(decision);
  } catch (error) {
    res.status(500).json({ error: 'Error updating decision' });
  }
};

// Delete a decision
const deleteDecision = async (req, res) => {
  try {
    const decision = await Decision.findByIdAndDelete(req.params.id);
    
    if (!decision) {
      return res.status(404).json({ error: 'Decision not found' });
    }

    res.json({ message: 'Decision deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting decision' });
  }
};

// Get decision analytics
const getDecisionAnalytics = async (req, res) => {
  try {
    const { userId } = req.params;

    const analytics = await Decision.aggregate([
      { $match: { userId: require('mongoose').Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalDecisions: { $sum: 1 },
          byCategory: {
            $push: {
              category: '$category',
              status: '$status'
            }
          },
          byStatus: {
            $push: '$status'
          }
        }
      }
    ]);

    if (analytics.length === 0) {
      return res.json({
        totalDecisions: 0,
        byCategory: {},
        byStatus: {}
      });
    }

    const result = analytics[0];
    
    // Process category breakdown
    const categoryBreakdown = {};
    const statusBreakdown = {};
    
    result.byCategory.forEach(item => {
      if (!categoryBreakdown[item.category]) {
        categoryBreakdown[item.category] = 0;
      }
      categoryBreakdown[item.category]++;
    });

    result.byStatus.forEach(status => {
      if (!statusBreakdown[status]) {
        statusBreakdown[status] = 0;
      }
      statusBreakdown[status]++;
    });

    res.json({
      totalDecisions: result.totalDecisions,
      byCategory: categoryBreakdown,
      byStatus: statusBreakdown
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching analytics' });
  }
};

// Get chat sessions for a user
const getChatSessions = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, topic, page = 1, limit = 10 } = req.query;

    const query = { userId };
    if (status) query.status = status;
    if (topic) query.topic = topic;

    const sessions = await ChatSession.find(query)
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('metadata.decisionIds', 'title status')
      .exec();

    const total = await ChatSession.countDocuments(query);

    res.json({
      sessions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching chat sessions' });
  }
};

// Create a new chat session
const createChatSession = async (req, res) => {
  try {
    const { title, topic, projectName } = req.body;

    const session = new ChatSession({
      userId: req.user.id,
      title,
      topic,
      metadata: { projectName }
    });

    const savedSession = await session.save();
    res.status(201).json(savedSession);
  } catch (error) {
    res.status(500).json({ error: 'Error creating chat session' });
  }
};

// Update chat session summary
const updateChatSession = async (req, res) => {
  try {
    const { summary, status } = req.body;
    
    const session = await ChatSession.findByIdAndUpdate(
      req.params.id,
      { summary, status, updatedAt: Date.now() },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Error updating chat session' });
  }
};

module.exports = {
  getDecisions,
  getDecision,
  createDecision,
  updateDecision,
  deleteDecision,
  getDecisionAnalytics,
  getChatSessions,
  createChatSession,
  updateChatSession
}; 