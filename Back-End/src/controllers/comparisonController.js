const ArchitecturePattern = require('../models/ArchitecturePattern');

// Get all architecture patterns
const getArchitecturePatterns = async (req, res) => {
  try {
    const { category, complexity, scalability } = req.query;

    const query = {};
    if (category) query.category = category;
    if (complexity) query['characteristics.complexity'] = complexity;
    if (scalability) query['characteristics.scalability'] = scalability;

    const patterns = await ArchitecturePattern.find(query).sort({ name: 1 });
    res.json(patterns);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching architecture patterns' });
  }
};

// Get a single architecture pattern
const getArchitecturePattern = async (req, res) => {
  try {
    const pattern = await ArchitecturePattern.findById(req.params.id);
    
    if (!pattern) {
      return res.status(404).json({ error: 'Architecture pattern not found' });
    }

    res.json(pattern);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching architecture pattern' });
  }
};

// Compare multiple architecture patterns
const comparePatterns = async (req, res) => {
  try {
    const { patternIds, projectContext } = req.body;

    if (!patternIds || patternIds.length < 2) {
      return res.status(400).json({ error: 'At least 2 patterns must be selected for comparison' });
    }

    const patterns = await ArchitecturePattern.find({
      _id: { $in: patternIds }
    });

    if (patterns.length !== patternIds.length) {
      return res.status(400).json({ error: 'Some patterns not found' });
    }

    // Calculate weighted scores based on project context
    const comparisonCriteria = [
      { id: 'scalability', weight: 0.2 },
      { id: 'maintainability', weight: 0.15 },
      { id: 'performance', weight: 0.15 },
      { id: 'cost', weight: 0.15 },
      { id: 'complexity', weight: 0.1 },
      { id: 'timeToMarket', weight: 0.1 },
      { id: 'teamSize', weight: 0.1 },
      { id: 'security', weight: 0.05 }
    ];

    const getScore = (pattern, criterion) => {
      const scores = { low: 1, medium: 2, high: 3 };
      const characteristic = pattern.characteristics[criterion];
      
      if (criterion === 'cost' || criterion === 'complexity') {
        return 4 - scores[characteristic]; // Lower is better
      }
      return scores[characteristic];
    };

    const calculateWeightedScore = (pattern) => {
      return comparisonCriteria.reduce((total, criterion) => {
        return total + (getScore(pattern, criterion.id) * criterion.weight);
      }, 0);
    };

    const patternsWithScores = patterns.map(pattern => ({
      ...pattern.toObject(),
      weightedScore: calculateWeightedScore(pattern),
      scores: comparisonCriteria.reduce((acc, criterion) => {
        acc[criterion.id] = getScore(pattern, criterion.id);
        return acc;
      }, {})
    }));

    // Sort by weighted score (higher is better)
    patternsWithScores.sort((a, b) => b.weightedScore - a.weightedScore);

    // Generate recommendation
    const recommendation = {
      bestPattern: patternsWithScores[0],
      reasoning: generateRecommendationReasoning(patternsWithScores[0], projectContext),
      alternatives: patternsWithScores.slice(1, 3).map(p => ({
        pattern: p,
        reasoning: generateRecommendationReasoning(p, projectContext)
      }))
    };

    res.json({
      patterns: patternsWithScores,
      recommendation,
      projectContext
    });
  } catch (error) {
    res.status(500).json({ error: 'Error comparing patterns' });
  }
};

// Generate recommendation reasoning
const generateRecommendationReasoning = (pattern, projectContext) => {
  const reasons = [];

  // Team size considerations
  if (projectContext.teamSize === 'small' && pattern.characteristics.teamSize === 'large') {
    reasons.push('May be overkill for small team - consider simpler architecture');
  } else if (projectContext.teamSize === 'large' && pattern.characteristics.teamSize === 'small') {
    reasons.push('May not scale well with large team - consider more distributed approach');
  }

  // Budget considerations
  if (projectContext.budget === 'low' && pattern.characteristics.cost === 'high') {
    reasons.push('High cost may not fit budget constraints');
  }

  // Timeline considerations
  if (projectContext.timeline === 'short' && pattern.characteristics.timeToMarket === 'slow') {
    reasons.push('May take too long to implement for tight timeline');
  }

  // Scale considerations
  if (projectContext.expectedScale === 'high' && pattern.characteristics.scalability === 'low') {
    reasons.push('May not handle expected scale - consider more scalable architecture');
  }

  // Complexity considerations
  if (projectContext.complexity === 'low' && pattern.characteristics.complexity === 'high') {
    reasons.push('May be too complex for simple requirements');
  }

  // Positive aspects
  if (pattern.characteristics.scalability === 'high') {
    reasons.push('Excellent scalability for future growth');
  }
  if (pattern.characteristics.maintainability === 'high') {
    reasons.push('High maintainability for long-term success');
  }
  if (pattern.characteristics.cost === 'low') {
    reasons.push('Cost-effective solution');
  }

  return reasons.length > 0 ? reasons : ['Well-balanced architecture for your requirements'];
};

// Get comparison criteria
const getComparisonCriteria = async (req, res) => {
  try {
    const criteria = [
      { id: 'scalability', name: 'Scalability', description: 'Ability to handle increased load', weight: 0.2, category: 'technical' },
      { id: 'maintainability', name: 'Maintainability', description: 'Ease of maintaining and updating', weight: 0.15, category: 'technical' },
      { id: 'performance', name: 'Performance', description: 'Response time and throughput', weight: 0.15, category: 'technical' },
      { id: 'cost', name: 'Cost', description: 'Development and operational costs', weight: 0.15, category: 'business' },
      { id: 'complexity', name: 'Complexity', description: 'Implementation and operational complexity', weight: 0.1, category: 'technical' },
      { id: 'timeToMarket', name: 'Time to Market', description: 'Speed of development and deployment', weight: 0.1, category: 'business' },
      { id: 'teamSize', name: 'Team Size', description: 'Required team size and skills', weight: 0.1, category: 'operational' },
      { id: 'security', name: 'Security', description: 'Security features and considerations', weight: 0.05, category: 'technical' }
    ];

    res.json(criteria);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comparison criteria' });
  }
};

// Seed architecture patterns (for development)
const seedPatterns = async (req, res) => {
  try {
    const patterns = [
      {
        name: 'Monolithic Architecture',
        category: 'monolithic',
        description: 'A single, unified application where all components are tightly coupled and deployed together.',
        pros: [
          'Simple to develop and deploy',
          'Easier debugging and testing',
          'Lower initial development cost',
          'Simpler database transactions',
          'Faster development for small teams'
        ],
        cons: [
          'Difficult to scale individual components',
          'Technology lock-in',
          'Slower deployment cycles',
          'Harder to maintain as application grows',
          'Single point of failure'
        ],
        useCases: [
          'Small to medium applications',
          'MVP development',
          'Simple business logic',
          'Small development teams',
          'Rapid prototyping'
        ],
        characteristics: {
          complexity: 'low',
          scalability: 'low',
          maintainability: 'medium',
          performance: 'medium',
          cost: 'low',
          teamSize: 'small',
          timeToMarket: 'fast'
        },
        technologyStack: ['Spring Boot', 'Django', 'Rails', 'Express.js'],
        deployment: ['Single deployment unit', 'Traditional hosting'],
        monitoring: ['Application logs', 'Basic metrics'],
        security: ['Standard authentication', 'Database security'],
        examples: [
          {
            company: 'Basecamp',
            description: 'Uses monolithic Rails architecture',
            link: 'https://basecamp.com'
          }
        ],
        bestPractices: [
          'Keep modules loosely coupled',
          'Use dependency injection',
          'Implement proper logging',
          'Plan for future modularization'
        ],
        antiPatterns: [
          'God objects',
          'Tight coupling',
          'Monolithic database',
          'No separation of concerns'
        ]
      },
      {
        name: 'Microservices Architecture',
        category: 'microservices',
        description: 'A collection of small, independent services that communicate through well-defined APIs.',
        pros: [
          'Independent deployment and scaling',
          'Technology diversity',
          'Fault isolation',
          'Team autonomy',
          'Easier to maintain and update'
        ],
        cons: [
          'Increased complexity',
          'Distributed system challenges',
          'Higher operational overhead',
          'Data consistency issues',
          'Network latency'
        ],
        useCases: [
          'Large, complex applications',
          'High scalability requirements',
          'Multiple development teams',
          'Different technology needs',
          'Independent service evolution'
        ],
        characteristics: {
          complexity: 'high',
          scalability: 'high',
          maintainability: 'high',
          performance: 'high',
          cost: 'high',
          teamSize: 'large',
          timeToMarket: 'slow'
        },
        technologyStack: ['Docker', 'Kubernetes', 'API Gateway', 'Service Mesh'],
        deployment: ['Container orchestration', 'CI/CD pipelines'],
        monitoring: ['Distributed tracing', 'Service metrics'],
        security: ['Service-to-service auth', 'API security'],
        examples: [
          {
            company: 'Netflix',
            description: 'Pioneered microservices at scale',
            link: 'https://netflix.com'
          }
        ],
        bestPractices: [
          'Design for failure',
          'Use API gateways',
          'Implement circuit breakers',
          'Monitor everything'
        ],
        antiPatterns: [
          'Distributed monolith',
          'Shared databases',
          'Tight coupling between services',
          'Inconsistent APIs'
        ]
      }
    ];

    await ArchitecturePattern.deleteMany({});
    await ArchitecturePattern.insertMany(patterns);

    res.json({ message: 'Architecture patterns seeded successfully', count: patterns.length });
  } catch (error) {
    res.status(500).json({ error: 'Error seeding patterns' });
  }
};

module.exports = {
  getArchitecturePatterns,
  getArchitecturePattern,
  comparePatterns,
  getComparisonCriteria,
  seedPatterns
}; 