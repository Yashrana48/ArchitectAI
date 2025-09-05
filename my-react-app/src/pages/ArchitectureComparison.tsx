import React, { useState, useEffect } from 'react';

interface ArchitecturePattern {
  id: string;
  name: string;
  category: 'monolithic' | 'microservices' | 'serverless' | 'event-driven' | 'layered' | 'hexagonal';
  description: string;
  pros: string[];
  cons: string[];
  useCases: string[];
  complexity: 'low' | 'medium' | 'high';
  scalability: 'low' | 'medium' | 'high';
  maintainability: 'low' | 'medium' | 'high';
  performance: 'low' | 'medium' | 'high';
  cost: 'low' | 'medium' | 'high';
  teamSize: 'small' | 'medium' | 'large';
  timeToMarket: 'fast' | 'medium' | 'slow';
  technologyStack: string[];
  deployment: string[];
  monitoring: string[];
  security: string[];
}

interface ComparisonCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;
  category: 'technical' | 'business' | 'operational';
}

interface ProjectContextOption {
  value: string;
  label: string;
  description: string;
  icon: string;
  details: string[];
}

interface EnhancedProjectContext {
  teamSize: string;
  budget: string;
  timeline: string;
  expectedScale: string;
  complexity: string;
  industry: string;
  compliance: string;
  integration: string;
}

const ArchitectureComparison: React.FC = () => {
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [comparisonMode, setComparisonMode] = useState<'overview' | 'detailed' | 'matrix' | 'radar'>('overview');
  const [criteria, setCriteria] = useState<ComparisonCriteria[]>([]);
  const [showContextDetails, setShowContextDetails] = useState<string | null>(null);
  
  const [projectContext, setProjectContext] = useState<EnhancedProjectContext>({
    teamSize: '6-15',
    budget: '50K-200K',
    timeline: '3-6 months',
    expectedScale: '10K-100K',
    complexity: 'Standard Business App',
    industry: 'Technology',
    compliance: 'Basic',
    integration: 'Moderate'
  });

  // Enhanced project context options
  const contextOptions: Record<string, ProjectContextOption[]> = {
    teamSize: [
      {
        value: '1-5',
        label: '1-5 Developers',
        description: 'Small startup or solo project',
        icon: '👥',
        details: ['Rapid prototyping', 'MVP development', 'Simple applications', 'Quick iterations']
      },
      {
        value: '6-15',
        label: '6-15 Developers',
        description: 'Growing startup or small team',
        icon: '👨‍💻',
        details: ['Feature-rich applications', 'Moderate complexity', 'Team collaboration', 'Structured development']
      },
      {
        value: '16-50',
        label: '16-50 Developers',
        description: 'Medium enterprise or established company',
        icon: '🏢',
        details: ['Complex applications', 'Multiple teams', 'Process-driven development', 'Scalable architecture']
      },
      {
        value: '50+',
        label: '50+ Developers',
        description: 'Large enterprise or tech company',
        icon: '🏭',
        details: ['Enterprise applications', 'Multiple departments', 'Strict processes', 'High scalability requirements']
      }
    ],
    budget: [
      {
        value: '10K-50K',
        label: '$10K - $50K',
        description: 'Bootstrap or seed funding',
        icon: '💰',
        details: ['Cost-effective solutions', 'Open-source technologies', 'Cloud services', 'Minimal infrastructure']
      },
      {
        value: '50K-200K',
        label: '$50K - $200K',
        description: 'Series A or moderate investment',
        icon: '💵',
        details: ['Professional tools', 'Managed services', 'Quality infrastructure', 'Team expansion']
      },
      {
        value: '200K-1M',
        label: '$200K - $1M',
        description: 'Series B or significant investment',
        icon: '🏦',
        details: ['Enterprise tools', 'Custom solutions', 'Advanced infrastructure', 'Multiple teams']
      },
      {
        value: '1M+',
        label: '$1M+',
        description: 'Enterprise or large-scale project',
        icon: '💎',
        details: ['Premium solutions', 'Custom development', 'Enterprise infrastructure', 'Unlimited resources']
      }
    ],
    timeline: [
      {
        value: '1-3 months',
        label: '1-3 Months',
        description: 'MVP or rapid development',
        icon: '⚡',
        details: ['Quick market validation', 'Basic features', 'Simple architecture', 'Fast deployment']
      },
      {
        value: '3-6 months',
        label: '3-6 Months',
        description: 'Standard development cycle',
        icon: '📅',
        details: ['Full feature set', 'Quality assurance', 'Proper architecture', 'Production ready']
      },
      {
        value: '6-12 months',
        label: '6-12 Months',
        description: 'Complex application development',
        icon: '🗓️',
        details: ['Advanced features', 'Comprehensive testing', 'Scalable architecture', 'Enterprise ready']
      },
      {
        value: '12+ months',
        label: '12+ Months',
        description: 'Large-scale enterprise project',
        icon: '📊',
        details: ['Enterprise features', 'Extensive testing', 'Complex architecture', 'Multi-phase rollout']
      }
    ],
    expectedScale: [
      {
        value: '1K-10K',
        label: '1K - 10K Users',
        description: 'Small to medium user base',
        icon: '👤',
        details: ['Simple scaling', 'Basic monitoring', 'Standard hosting', 'Moderate traffic']
      },
      {
        value: '10K-100K',
        label: '10K - 100K Users',
        description: 'Growing user base',
        icon: '👥',
        details: ['Auto-scaling', 'Performance monitoring', 'CDN integration', 'High availability']
      },
      {
        value: '100K-1M',
        label: '100K - 1M Users',
        description: 'Large user base',
        icon: '🌍',
        details: ['Global scaling', 'Advanced monitoring', 'Load balancing', 'Fault tolerance']
      },
      {
        value: '1M+',
        label: '1M+ Users',
        description: 'Massive scale',
        icon: '🚀',
        details: ['Global infrastructure', 'Real-time monitoring', 'Microservices', 'High performance']
      }
    ],
    complexity: [
      {
        value: 'Simple MVP',
        label: 'Simple MVP',
        description: 'Basic functionality for validation',
        icon: '🎯',
        details: ['Core features only', 'Simple data model', 'Basic UI/UX', 'Quick development']
      },
      {
        value: 'Standard Business App',
        label: 'Standard Business App',
        description: 'Full-featured business application',
        icon: '💼',
        details: ['Complete feature set', 'Complex data relationships', 'Professional UI/UX', 'Integration requirements']
      },
      {
        value: 'Complex Enterprise',
        label: 'Complex Enterprise',
        description: 'Enterprise-grade application',
        icon: '🏢',
        details: ['Advanced features', 'Complex workflows', 'Multiple integrations', 'Compliance requirements']
      },
      {
        value: 'Highly Distributed',
        label: 'Highly Distributed',
        description: 'Distributed system with microservices',
        icon: '🌐',
        details: ['Microservices architecture', 'Event-driven design', 'Multiple data stores', 'Complex orchestration']
      }
    ],
    industry: [
      {
        value: 'Technology',
        label: 'Technology',
        description: 'Software, SaaS, or tech products',
        icon: '💻',
        details: ['Modern tech stack', 'Rapid iteration', 'Cloud-first approach', 'Developer-friendly']
      },
      {
        value: 'Finance',
        label: 'Finance',
        description: 'Banking, fintech, or financial services',
        icon: '🏦',
        details: ['High security', 'Compliance requirements', 'Real-time processing', 'Audit trails']
      },
      {
        value: 'Healthcare',
        label: 'Healthcare',
        description: 'Medical, healthtech, or healthcare services',
        icon: '🏥',
        details: ['HIPAA compliance', 'Data privacy', 'Reliability requirements', 'Integration needs']
      },
      {
        value: 'E-commerce',
        label: 'E-commerce',
        description: 'Online retail or marketplace',
        icon: '🛒',
        details: ['High availability', 'Payment processing', 'Inventory management', 'Customer experience']
      },
      {
        value: 'Education',
        label: 'Education',
        description: 'Edtech or educational platforms',
        icon: '🎓',
        details: ['Scalable learning', 'Content management', 'User engagement', 'Analytics']
      }
    ],
    compliance: [
      {
        value: 'Basic',
        label: 'Basic',
        description: 'Standard security practices',
        icon: '🔒',
        details: ['SSL/TLS encryption', 'Basic authentication', 'Data backup', 'Standard security']
      },
      {
        value: 'Moderate',
        label: 'Moderate',
        description: 'Enhanced security requirements',
        icon: '🛡️',
        details: ['Multi-factor authentication', 'Role-based access', 'Audit logging', 'Security monitoring']
      },
      {
        value: 'High',
        label: 'High',
        description: 'Enterprise security standards',
        icon: '🔐',
        details: ['SOC 2 compliance', 'Advanced encryption', 'Security testing', 'Compliance reporting']
      },
      {
        value: 'Critical',
        label: 'Critical',
        description: 'Regulated industry requirements',
        icon: '⚡',
        details: ['GDPR compliance', 'HIPAA compliance', 'Penetration testing', 'Regular audits']
      }
    ],
    integration: [
      {
        value: 'Minimal',
        label: 'Minimal',
        description: 'Few external integrations',
        icon: '🔗',
        details: ['Basic APIs', 'Simple data exchange', 'Standard protocols', 'Limited dependencies']
      },
      {
        value: 'Moderate',
        label: 'Moderate',
        description: 'Several external integrations',
        icon: '🔗',
        details: ['Multiple APIs', 'Data synchronization', 'Webhook integration', 'Third-party services']
      },
      {
        value: 'Extensive',
        label: 'Extensive',
        description: 'Complex integration ecosystem',
        icon: '🌐',
        details: ['Enterprise APIs', 'Real-time sync', 'Complex workflows', 'Multiple platforms']
      },
      {
        value: 'Critical',
        label: 'Critical',
        description: 'Mission-critical integrations',
        icon: '⚡',
        details: ['High availability', 'Failover systems', 'Real-time processing', 'Zero downtime']
      }
    ]
  };

  // Mock architecture patterns data
  const architecturePatterns: ArchitecturePattern[] = [
    {
      id: 'monolithic',
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
      complexity: 'low',
      scalability: 'low',
      maintainability: 'medium',
      performance: 'medium',
      cost: 'low',
      teamSize: 'small',
      timeToMarket: 'fast',
      technologyStack: ['Spring Boot', 'Django', 'Rails', 'Express.js'],
      deployment: ['Single deployment unit', 'Traditional hosting'],
      monitoring: ['Application logs', 'Basic metrics'],
      security: ['Standard authentication', 'Database security']
    },
    {
      id: 'microservices',
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
      complexity: 'high',
      scalability: 'high',
      maintainability: 'high',
      performance: 'high',
      cost: 'high',
      teamSize: 'large',
      timeToMarket: 'slow',
      technologyStack: ['Docker', 'Kubernetes', 'API Gateway', 'Service Mesh'],
      deployment: ['Container orchestration', 'CI/CD pipelines'],
      monitoring: ['Distributed tracing', 'Service metrics'],
      security: ['Service-to-service auth', 'API security']
    },
    {
      id: 'serverless',
      name: 'Serverless Architecture',
      category: 'serverless',
      description: 'Event-driven architecture where code runs in response to events without managing servers.',
      pros: [
        'No server management',
        'Auto-scaling',
        'Pay-per-use pricing',
        'Faster time to market',
        'Built-in high availability'
      ],
      cons: [
        'Cold start latency',
        'Vendor lock-in',
        'Limited execution time',
        'Debugging complexity',
        'Cost at scale'
      ],
      useCases: [
        'Event-driven applications',
        'Sporadic workloads',
        'API backends',
        'Data processing',
        'IoT applications'
      ],
      complexity: 'medium',
      scalability: 'high',
      maintainability: 'medium',
      performance: 'medium',
      cost: 'medium',
      teamSize: 'medium',
      timeToMarket: 'fast',
      technologyStack: ['AWS Lambda', 'Azure Functions', 'Google Cloud Functions'],
      deployment: ['Cloud platform', 'Event triggers'],
      monitoring: ['Cloud monitoring', 'Function metrics'],
      security: ['IAM policies', 'VPC configuration']
    },
    {
      id: 'event-driven',
      name: 'Event-Driven Architecture',
      category: 'event-driven',
      description: 'Architecture where components communicate through events, enabling loose coupling.',
      pros: [
        'Loose coupling',
        'High scalability',
        'Real-time processing',
        'Fault tolerance',
        'Flexible integration'
      ],
      cons: [
        'Event ordering challenges',
        'Debugging complexity',
        'Event schema evolution',
        'Message delivery guarantees',
        'Increased complexity'
      ],
      useCases: [
        'Real-time applications',
        'Data streaming',
        'IoT systems',
        'E-commerce platforms',
        'Financial trading systems'
      ],
      complexity: 'high',
      scalability: 'high',
      maintainability: 'medium',
      performance: 'high',
      cost: 'high',
      teamSize: 'large',
      timeToMarket: 'slow',
      technologyStack: ['Apache Kafka', 'RabbitMQ', 'Event Store', 'Apache Pulsar'],
      deployment: ['Message brokers', 'Event stores'],
      monitoring: ['Event monitoring', 'Message queues'],
      security: ['Message encryption', 'Access control']
    }
  ];

  // Mock comparison criteria
  const comparisonCriteria: ComparisonCriteria[] = [
    { id: 'scalability', name: 'Scalability', description: 'Ability to handle increased load', weight: 0.2, category: 'technical' },
    { id: 'maintainability', name: 'Maintainability', description: 'Ease of maintaining and updating', weight: 0.15, category: 'technical' },
    { id: 'performance', name: 'Performance', description: 'Response time and throughput', weight: 0.15, category: 'technical' },
    { id: 'cost', name: 'Cost', description: 'Development and operational costs', weight: 0.15, category: 'business' },
    { id: 'complexity', name: 'Complexity', description: 'Implementation and operational complexity', weight: 0.1, category: 'technical' },
    { id: 'timeToMarket', name: 'Time to Market', description: 'Speed of development and deployment', weight: 0.1, category: 'business' },
    { id: 'teamSize', name: 'Team Size', description: 'Required team size and skills', weight: 0.1, category: 'operational' },
    { id: 'security', name: 'Security', description: 'Security features and considerations', weight: 0.05, category: 'technical' }
  ];

  useEffect(() => {
    setCriteria(comparisonCriteria);
  }, []);

  const getScore = (pattern: ArchitecturePattern, criterion: string): number => {
    const scores = {
      low: 1, medium: 2, high: 3
    };
    
    const timeScores = {
      slow: 1, medium: 2, fast: 3
    };
    
    const teamScores = {
      small: 1, medium: 2, large: 3
    };
    
    switch (criterion) {
      case 'scalability': return scores[pattern.scalability];
      case 'maintainability': return scores[pattern.maintainability];
      case 'performance': return scores[pattern.performance];
      case 'cost': return 4 - scores[pattern.cost]; // Lower cost is better
      case 'complexity': return 4 - scores[pattern.complexity]; // Lower complexity is better
      case 'timeToMarket': return timeScores[pattern.timeToMarket];
      case 'teamSize': return teamScores[pattern.teamSize];
      case 'security': return scores[pattern.maintainability]; // Using maintainability as proxy
      default: return 2;
    }
  };

  const calculateWeightedScore = (pattern: ArchitecturePattern): number => {
    return criteria.reduce((total, criterion) => {
      return total + (getScore(pattern, criterion.id) * criterion.weight);
    }, 0);
  };

  const togglePattern = (patternId: string) => {
    setSelectedPatterns(prev => 
      prev.includes(patternId) 
        ? prev.filter(id => id !== patternId)
        : [...prev, patternId]
    );
  };

  const getSelectedPatterns = () => {
    return architecturePatterns.filter(pattern => selectedPatterns.includes(pattern.id));
  };

  const getContextOption = (key: string, value: string) => {
    return contextOptions[key]?.find(option => option.value === value);
  };

  const exportComparison = () => {
    const patterns = getSelectedPatterns();
    const content = `
# Architecture Comparison Report

Generated on: ${new Date().toLocaleDateString()}

## Project Context
- Team Size: ${getContextOption('teamSize', projectContext.teamSize)?.label}
- Budget: ${getContextOption('budget', projectContext.budget)?.label}
- Timeline: ${getContextOption('timeline', projectContext.timeline)?.label}
- Expected Scale: ${getContextOption('expectedScale', projectContext.expectedScale)?.label}
- Complexity: ${getContextOption('complexity', projectContext.complexity)?.label}
- Industry: ${getContextOption('industry', projectContext.industry)?.label}
- Compliance: ${getContextOption('compliance', projectContext.compliance)?.label}
- Integration: ${getContextOption('integration', projectContext.integration)?.label}

## Compared Architectures
${patterns.map(pattern => `- ${pattern.name}`).join('\n')}

## Detailed Comparison

${patterns.map(pattern => `
### ${pattern.name}

**Description**: ${pattern.description}

**Pros**:
${pattern.pros.map(pro => `- ${pro}`).join('\n')}

**Cons**:
${pattern.cons.map(con => `- ${con}`).join('\n')}

**Use Cases**:
${pattern.useCases.map(useCase => `- ${useCase}`).join('\n')}

**Technical Characteristics**:
- Complexity: ${pattern.complexity}
- Scalability: ${pattern.scalability}
- Maintainability: ${pattern.maintainability}
- Performance: ${pattern.performance}
- Cost: ${pattern.cost}

**Operational Characteristics**:
- Team Size: ${pattern.teamSize}
- Time to Market: ${pattern.timeToMarket}

**Technology Stack**:
${pattern.technologyStack.map(tech => `- ${tech}`).join('\n')}

---
`).join('\n')}

## Recommendation

Based on the comparison, the recommended architecture for your project context is:

${patterns.length > 0 ? patterns.reduce((best, current) => 
  calculateWeightedScore(current) > calculateWeightedScore(best) ? current : best
).name : 'No patterns selected'}

---
Generated by AI-Driven Software Architecture Decision System
    `.trim();

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `architecture-comparison-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Architecture Comparison Tool
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare different architecture patterns side-by-side and find the best fit for your project.
          </p>
        </div>

        {/* Enhanced Project Context */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Project Context</h2>
            <div className="text-sm text-gray-600">
              Configure your project requirements for accurate recommendations
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(projectContext).map(([key, value]) => {
              const options = contextOptions[key];
              const selectedOption = getContextOption(key, value);
              
              return (
                <div key={key} className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  
                  <div className="relative">
                    <select
                      value={value}
                      onChange={(e) => setProjectContext(prev => ({ ...prev, [key]: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      {options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.icon} {option.label}
                        </option>
                      ))}
                    </select>
                    
                    {/* Context Details Toggle */}
                    <button
                      onClick={() => setShowContextDetails(showContextDetails === key ? null : key)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showContextDetails === key ? '−' : '+'}
                    </button>
                  </div>
                  
                  {/* Selected Option Details */}
                  {selectedOption && (
                    <div className="text-sm text-gray-600">
                      <div className="font-medium">{selectedOption.description}</div>
                    </div>
                  )}
                  
                  {/* Expandable Details */}
                  {showContextDetails === key && selectedOption && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-sm text-blue-800">
                        <div className="font-medium mb-2">Key Characteristics:</div>
                        <ul className="space-y-1">
                          {selectedOption.details.map((detail, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Pattern Selection */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Architecture Patterns</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {architecturePatterns.map((pattern) => (
              <div
                key={pattern.id}
                onClick={() => togglePattern(pattern.id)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedPatterns.includes(pattern.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-semibold text-gray-800 mb-2">{pattern.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{pattern.description}</p>
                <div className="flex flex-wrap gap-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    pattern.complexity === 'low' ? 'bg-green-100 text-green-800' :
                    pattern.complexity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {pattern.complexity} complexity
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    pattern.scalability === 'low' ? 'bg-red-100 text-red-800' :
                    pattern.scalability === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {pattern.scalability} scalability
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Modes */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            <div className="flex space-x-2">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'detailed', label: 'Detailed' },
                { id: 'matrix', label: 'Matrix' },
                { id: 'radar', label: 'Radar Chart' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setComparisonMode(mode.id as any)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    comparisonMode === mode.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Content */}
        {selectedPatterns.length > 0 && (
          <div className="space-y-8">
            {comparisonMode === 'overview' && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Overview Comparison</h2>
                  <button
                    onClick={exportComparison}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    📄 Export Report
                  </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getSelectedPatterns().map((pattern) => (
                    <div key={pattern.id} className="border border-gray-200 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">{pattern.name}</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Complexity:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                            pattern.complexity === 'low' ? 'bg-green-100 text-green-800' :
                            pattern.complexity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {pattern.complexity}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Scalability:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                            pattern.scalability === 'low' ? 'bg-red-100 text-red-800' :
                            pattern.scalability === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {pattern.scalability}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Cost:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                            pattern.cost === 'low' ? 'bg-green-100 text-green-800' :
                            pattern.cost === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {pattern.cost}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Team Size:</span>
                          <span className="ml-2 text-sm text-gray-800 capitalize">{pattern.teamSize}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {comparisonMode === 'detailed' && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Detailed Comparison</h2>
                  <button
                    onClick={exportComparison}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    📄 Export Report
                  </button>
                </div>
                <div className="space-y-6">
                  {getSelectedPatterns().map((pattern) => (
                    <div key={pattern.id} className="border border-gray-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">{pattern.name}</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Pros</h4>
                          <ul className="space-y-1">
                            {pattern.pros.map((pro, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Cons</h4>
                          <ul className="space-y-1">
                            {pattern.cons.map((con, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start">
                                <span className="text-red-500 mr-2">✗</span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Use Cases</h4>
                        <div className="flex flex-wrap gap-2">
                          {pattern.useCases.map((useCase, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {useCase}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {comparisonMode === 'matrix' && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Comparison Matrix</h2>
                  <button
                    onClick={exportComparison}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    📄 Export Report
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-3 font-semibold text-gray-800">Criteria</th>
                        {getSelectedPatterns().map((pattern) => (
                          <th key={pattern.id} className="text-center p-3 font-semibold text-gray-800">
                            {pattern.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {criteria.map((criterion) => (
                        <tr key={criterion.id} className="border-b border-gray-100">
                          <td className="p-3">
                            <div>
                              <div className="font-medium text-gray-800">{criterion.name}</div>
                              <div className="text-sm text-gray-600">{criterion.description}</div>
                            </div>
                          </td>
                          {getSelectedPatterns().map((pattern) => (
                            <td key={pattern.id} className="text-center p-3">
                              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                getScore(pattern, criterion.id) === 1 ? 'bg-red-100 text-red-800' :
                                getScore(pattern, criterion.id) === 2 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {getScore(pattern, criterion.id) === 1 ? 'Low' :
                                 getScore(pattern, criterion.id) === 2 ? 'Medium' : 'High'}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {comparisonMode === 'radar' && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Radar Chart Comparison</h2>
                  <button
                    onClick={exportComparison}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    📄 Export Report
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {getSelectedPatterns().map((pattern) => (
                    <div key={pattern.id} className="border border-gray-200 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">{pattern.name}</h3>
                      <div className="space-y-3">
                        {criteria.slice(0, 6).map((criterion) => (
                          <div key={criterion.id} className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">{criterion.name}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${(getScore(pattern, criterion.id) / 3) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-800 w-8 text-right">
                                {getScore(pattern, criterion.id)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedPatterns.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏗️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Select Architecture Patterns</h3>
            <p className="text-gray-600">Choose two or more patterns from above to start comparing them.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchitectureComparison; 