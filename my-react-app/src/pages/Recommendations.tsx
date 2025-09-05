import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InteractiveArchitectureDiagram from '../components/InteractiveArchitectureDiagram';

interface QuestionnaireAnswers {
  projectType: string;
  industry: string;
  expectedUsers: string;
  teamSize: string;
  timeline: string;
  budget: string;
  responseTime: string;
  availability: string;
  dataVolume: string;
  securityLevel: string;
  compliance: string;
  externalIntegrations: string;
  apiType: string;
}

interface ArchitectureRecommendation {
  id: string;
  name: string;
  category: 'architecture' | 'database' | 'technology' | 'security' | 'deployment';
  description: string;
  confidence: number;
  reasoning: string;
  pros: string[];
  cons: string[];
  implementation: string;
  alternatives: string[];
  estimatedCost: string;
  estimatedTime: string;
  complexity: 'Low' | 'Medium' | 'High';
  icon: string;
}

const Recommendations: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<QuestionnaireAnswers | null>(null);
  const [recommendations, setRecommendations] = useState<ArchitectureRecommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showInteractiveDiagram, setShowInteractiveDiagram] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);

  useEffect(() => {
    // Get answers from navigation state
    const assessmentResults = location.state?.assessmentResults;
    if (assessmentResults) {
      setAnswers(assessmentResults);
      analyzeRecommendations(assessmentResults);
    } else {
      // If no answers, redirect back to questionnaire
      navigate('/questionnaire');
    }
  }, [location, navigate]);

  const analyzeRecommendations = (answers: QuestionnaireAnswers) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const recommendations = generateRecommendations(answers);
      setRecommendations(recommendations);
      
      // Generate AI recommendations for interactive diagram
      const aiRecs = generateAIRecommendations(answers);
      setAiRecommendations(aiRecs);
      
      setIsAnalyzing(false);
    }, 3000);
  };

  // Convert questionnaire answers to AI engine format
  const convertToAIRequirements = (answers: QuestionnaireAnswers) => {
    return {
      userTraffic: answers.expectedUsers.includes('million') ? 'high' : 
                   answers.expectedUsers.includes('thousand') ? 'medium' : 'low',
      complexity: answers.projectType.includes('enterprise') || answers.externalIntegrations.includes('multiple') ? 'high' :
                  answers.projectType.includes('simple') ? 'low' : 'medium',
      teamSize: answers.teamSize.includes('15') || answers.teamSize.includes('30') ? 'large' :
                answers.teamSize.includes('5') ? 'medium' : 'small',
      scalability: answers.expectedUsers.includes('million') ? 'high' : 'medium',
      budget: answers.budget.includes('high') ? 'high' : 
              answers.budget.includes('low') ? 'low' : 'medium',
      security: answers.securityLevel.includes('high') ? 'high' : 'medium',
      maintenance: answers.timeline.includes('long') ? 'low' : 'medium'
    };
  };

  // Generate AI recommendations using the enhanced engine
  const generateAIRecommendations = (answers: QuestionnaireAnswers) => {
    const requirements = convertToAIRequirements(answers);
    
    // Mock AI recommendations based on the enhanced engine
    const architectures = [
      {
        architecture: {
          type: 'microservices',
          name: 'Microservices Architecture',
          description: 'Collection of small, independent services that communicate via APIs',
          advantages: ['High scalability', 'Fault isolation', 'Technology diversity', 'Independent deployment'],
          disadvantages: ['Complex DevOps', 'Network overhead', 'Data consistency challenges', 'Higher initial cost'],
          bestFor: ['Large applications', 'High traffic', 'Complex business logic', 'Multiple teams'],
          score: 92.5,
          confidence: 87.3,
          riskAssessment: {
            overallRisk: 0.4,
            riskLevel: 'Medium',
            riskFactors: ['Complexity mismatch', 'Budget constraints'],
            mitigationStrategies: ['Phased implementation', 'Team training', 'Cost optimization']
          },
          costAnalysis: {
            developmentCost: 1.5,
            maintenanceCost: 1.3,
            infrastructureCost: 1.2,
            totalCost: 4.0,
            costEfficiency: 75.0
          },
          componentScores: {
            complexity: 95.0,
            scalability: 100.0,
            cost: 60.0,
            maintenance: 70.0
          }
        },
        designPatterns: [
          {
            name: 'Circuit Breaker Pattern',
            description: 'Prevents cascading failures in distributed systems',
            contextScore: 95,
            recommendation: 'Highly Recommended'
          }
        ],
        reasoning: [
          'Complexity alignment: 95.0% match with Microservices Architecture requirements',
          'Scalability alignment: 100.0% match with scalability requirements'
        ]
      },
      {
        architecture: {
          type: 'monolithic',
          name: 'Monolithic Architecture',
          description: 'Single, unified application where all components are tightly coupled',
          advantages: ['Simple deployment', 'Easy to develop', 'Lower initial cost', 'Simpler testing'],
          disadvantages: ['Poor scalability', 'Hard to maintain', 'Technology lock-in', 'Single point of failure'],
          bestFor: ['Small applications', 'Simple business logic', 'Limited user base', 'Quick prototypes'],
          score: 78.2,
          confidence: 82.1,
          riskAssessment: {
            overallRisk: 0.3,
            riskLevel: 'Low',
            riskFactors: ['Scalability limitations'],
            mitigationStrategies: ['Future migration planning', 'Horizontal scaling strategies']
          },
          costAnalysis: {
            developmentCost: 1.0,
            maintenanceCost: 1.0,
            infrastructureCost: 1.0,
            totalCost: 3.0,
            costEfficiency: 85.0
          },
          componentScores: {
            complexity: 80.0,
            scalability: 60.0,
            cost: 85.0,
            maintenance: 90.0
          }
        },
        designPatterns: [
          {
            name: 'MVC Pattern',
            description: 'Separates application logic into three interconnected components',
            contextScore: 88,
            recommendation: 'Recommended'
          }
        ],
        reasoning: [
          'Cost efficiency: 85.0% efficiency score for budget constraints',
          'Low risk profile: Architecture aligns well with project constraints'
        ]
      },
      {
        architecture: {
          type: 'serverless',
          name: 'Serverless Architecture',
          description: 'Event-driven architecture where code runs in response to events',
          advantages: ['No server management', 'Cost-effective', 'Auto-scaling', 'Pay-per-use'],
          disadvantages: ['Limited control', 'Cold start issues', 'Vendor lock-in', 'Debugging complexity'],
          bestFor: ['Event-driven applications', 'Variable workloads', 'Cost-sensitive projects', 'Quick deployments'],
          score: 65.8,
          confidence: 75.4,
          riskAssessment: {
            overallRisk: 0.5,
            riskLevel: 'Medium',
            riskFactors: ['Vendor lock-in', 'Complexity mismatch'],
            mitigationStrategies: ['Multi-cloud strategy', 'Simplified architecture']
          },
          costAnalysis: {
            developmentCost: 1.2,
            maintenanceCost: 0.8,
            infrastructureCost: 0.9,
            totalCost: 2.9,
            costEfficiency: 85.0
          },
          componentScores: {
            complexity: 60.0,
            scalability: 90.0,
            cost: 85.0,
            maintenance: 80.0
          }
        },
        designPatterns: [
          {
            name: 'Observer Pattern',
            description: 'Defines a one-to-many dependency between objects',
            contextScore: 78,
            recommendation: 'Recommended'
          }
        ],
        reasoning: [
          'Cost efficiency: 85.0% efficiency score for budget constraints',
          'Scalability alignment: 90.0% match with scalability requirements'
        ]
      }
    ];

    return architectures;
  };

  const generateRecommendations = (answers: QuestionnaireAnswers): ArchitectureRecommendation[] => {
    const recommendations: ArchitectureRecommendation[] = [];

    // Architecture Pattern Recommendation
    const architecturePattern = getArchitecturePattern(answers);
    recommendations.push(architecturePattern);

    // Database Recommendation
    const databaseRecommendation = getDatabaseRecommendation(answers);
    recommendations.push(databaseRecommendation);

    // Technology Stack Recommendation
    const technologyStack = getTechnologyStack(answers);
    recommendations.push(technologyStack);

    // Security Recommendation
    const securityRecommendation = getSecurityRecommendation(answers);
    recommendations.push(securityRecommendation);

    // Deployment Recommendation
    const deploymentRecommendation = getDeploymentRecommendation(answers);
    recommendations.push(deploymentRecommendation);

    return recommendations;
  };

  const getArchitecturePattern = (answers: QuestionnaireAnswers): ArchitectureRecommendation => {
    const { projectType, expectedUsers, teamSize, externalIntegrations } = answers;
    
    if (expectedUsers.includes('million') || teamSize.includes('15') || teamSize.includes('30')) {
      return {
        id: 'microservices',
        name: 'Microservices Architecture',
        category: 'architecture',
        description: 'Distributed system with loosely coupled services for high scalability and team autonomy',
        confidence: 95,
        reasoning: `Based on your large user base (${expectedUsers}) and team size (${teamSize}), microservices will provide better scalability, team autonomy, and independent deployments.`,
        pros: [
          'Independent service deployment and scaling',
          'Team autonomy and technology diversity',
          'Better fault isolation and resilience',
          'Easier to maintain and update individual services'
        ],
        cons: [
          'Increased complexity in service communication',
          'Distributed system challenges',
          'Higher operational overhead',
          'Data consistency across services'
        ],
        implementation: 'Start with 3-5 core services, implement API Gateway, use service mesh for communication',
        alternatives: ['Monolithic Architecture', 'Event-Driven Architecture', 'Serverless Architecture'],
        estimatedCost: '$5,000 - $15,000/month',
        estimatedTime: '6-12 months',
        complexity: 'High',
        icon: '🏗️'
      };
    } else if (externalIntegrations.includes('10') || externalIntegrations.includes('25')) {
      return {
        id: 'event-driven',
        name: 'Event-Driven Architecture',
        category: 'architecture',
        description: 'Loosely coupled system using events for communication between components',
        confidence: 88,
        reasoning: `With ${externalIntegrations} external integrations, event-driven architecture will provide better decoupling and scalability.`,
        pros: [
          'Loose coupling between components',
          'Scalable and responsive system',
          'Easy to add new integrations',
          'Better fault tolerance'
        ],
        cons: [
          'Complex event flow management',
          'Debugging and monitoring challenges',
          'Event ordering and consistency issues',
          'Learning curve for team'
        ],
        implementation: 'Implement message broker (Kafka/RabbitMQ), define event schemas, build event handlers',
        alternatives: ['Microservices', 'API-First Architecture', 'Service-Oriented Architecture'],
        estimatedCost: '$3,000 - $10,000/month',
        estimatedTime: '4-8 months',
        complexity: 'Medium',
        icon: '⚡'
      };
    } else {
      return {
        id: 'monolith',
        name: 'Monolithic Architecture',
        category: 'architecture',
        description: 'Single, unified application for simpler development and deployment',
        confidence: 92,
        reasoning: `For your ${projectType} with ${expectedUsers} users and ${teamSize} team, a monolithic approach will be simpler to develop and maintain.`,
        pros: [
          'Simpler development and deployment',
          'Easier debugging and testing',
          'Lower operational complexity',
          'Faster initial development'
        ],
        cons: [
          'Limited scalability options',
          'Technology lock-in',
          'Difficult to maintain as it grows',
          'Single point of failure'
        ],
        implementation: 'Use modern frameworks, implement modular design, plan for future migration',
        alternatives: ['Microservices', 'Layered Architecture', 'Modular Monolith'],
        estimatedCost: '$1,000 - $5,000/month',
        estimatedTime: '3-6 months',
        complexity: 'Low',
        icon: '🏢'
      };
    }
  };

  const getDatabaseRecommendation = (answers: QuestionnaireAnswers): ArchitectureRecommendation => {
    const { dataVolume, securityLevel, compliance, projectType } = answers;
    
    if (compliance !== 'None' || securityLevel.includes('High') || securityLevel.includes('Critical')) {
      return {
        id: 'postgresql',
        name: 'PostgreSQL',
        category: 'database',
        description: 'Advanced open-source relational database with ACID compliance and security features',
        confidence: 94,
        reasoning: `PostgreSQL provides excellent ACID compliance and security features needed for ${compliance} compliance and ${securityLevel} security requirements.`,
        pros: [
          'ACID compliance for data integrity',
          'Excellent security features',
          'Strong community and ecosystem',
          'Built-in JSON support',
          'Compliance-ready'
        ],
        cons: [
          'Horizontal scaling complexity',
          'Resource intensive for simple operations',
          'Limited built-in sharding'
        ],
        implementation: 'Set up with proper authentication, encryption, and backup strategies',
        alternatives: ['MySQL', 'Oracle', 'SQL Server'],
        estimatedCost: '$500 - $2,000/month',
        estimatedTime: '2-4 weeks',
        complexity: 'Medium',
        icon: '🗄️'
      };
    } else if (dataVolume.includes('TB') || dataVolume.includes('100TB')) {
      return {
        id: 'mongodb',
        name: 'MongoDB',
        category: 'database',
        description: 'Document-based NoSQL database for high scalability and flexibility',
        confidence: 89,
        reasoning: `MongoDB's horizontal scaling capabilities are ideal for your ${dataVolume} data volume requirements.`,
        pros: [
          'Horizontal scaling with sharding',
          'Flexible schema design',
          'High performance for read operations',
          'Built-in replication'
        ],
        cons: [
          'Limited ACID compliance',
          'Complex aggregation queries',
          'Storage overhead',
          'Security configuration complexity'
        ],
        implementation: 'Set up replica sets, configure sharding, implement proper indexing',
        alternatives: ['Cassandra', 'DynamoDB', 'PostgreSQL with partitioning'],
        estimatedCost: '$1,000 - $5,000/month',
        estimatedTime: '3-6 weeks',
        complexity: 'Medium',
        icon: '📄'
      };
    } else {
      return {
        id: 'mysql',
        name: 'MySQL',
        category: 'database',
        description: 'Reliable and widely-used relational database for general-purpose applications',
        confidence: 91,
        reasoning: `MySQL provides a good balance of performance, reliability, and ease of use for your ${projectType} project.`,
        pros: [
          'Wide community support',
          'Good performance',
          'Easy to set up and maintain',
          'Cost-effective'
        ],
        cons: [
          'Limited advanced features',
          'Scaling challenges',
          'Lock-in with some features'
        ],
        implementation: 'Configure for performance, set up replication, implement backup strategy',
        alternatives: ['PostgreSQL', 'SQLite', 'MariaDB'],
        estimatedCost: '$200 - $1,000/month',
        estimatedTime: '1-2 weeks',
        complexity: 'Low',
        icon: '🐬'
      };
    }
  };

  const getTechnologyStack = (answers: QuestionnaireAnswers): ArchitectureRecommendation => {
    const { projectType, teamSize, timeline } = answers;
    
    if (projectType.includes('Web') && teamSize.includes('15') || teamSize.includes('30')) {
      return {
        id: 'modern-web-stack',
        name: 'Modern Web Stack (React + Node.js)',
        category: 'technology',
        description: 'JavaScript-based full-stack solution with React frontend and Node.js backend',
        confidence: 87,
        reasoning: `A modern JavaScript stack will leverage your team's skills and provide rapid development for your ${projectType}.`,
        pros: [
          'JavaScript across frontend and backend',
          'Large ecosystem and community',
          'Rapid development and prototyping',
          'Good for real-time features'
        ],
        cons: [
          'Performance limitations for CPU-intensive tasks',
          'Callback hell and async complexity',
          'Security considerations with JavaScript'
        ],
        implementation: 'Set up React with TypeScript, Node.js with Express, implement proper testing',
        alternatives: ['Python (Django/Flask)', 'Java (Spring)', 'C# (.NET)'],
        estimatedCost: '$2,000 - $8,000/month',
        estimatedTime: '4-8 months',
        complexity: 'Medium',
        icon: '⚛️'
      };
    } else {
      return {
        id: 'python-stack',
        name: 'Python Stack (Django/FastAPI)',
        category: 'technology',
        description: 'Python-based backend with modern web framework for rapid development',
        confidence: 85,
        reasoning: `Python's simplicity and extensive libraries make it ideal for your ${projectType} with ${timeline} timeline.`,
        pros: [
          'Rapid development and prototyping',
          'Extensive library ecosystem',
          'Great for data processing and ML',
          'Easy to learn and maintain'
        ],
        cons: [
          'Slower execution compared to compiled languages',
          'GIL limitations for CPU-bound tasks',
          'Deployment complexity'
        ],
        implementation: 'Choose Django for full-featured or FastAPI for API-focused, set up virtual environments',
        alternatives: ['Node.js', 'Java', 'Go'],
        estimatedCost: '$1,500 - $6,000/month',
        estimatedTime: '3-6 months',
        complexity: 'Low',
        icon: '🐍'
      };
    }
  };

  const getSecurityRecommendation = (answers: QuestionnaireAnswers): ArchitectureRecommendation => {
    const { securityLevel, compliance } = answers;
    
    if (securityLevel.includes('High') || securityLevel.includes('Critical') || compliance !== 'None') {
      return {
        id: 'enterprise-security',
        name: 'Enterprise Security Stack',
        category: 'security',
        description: 'Comprehensive security solution with authentication, encryption, and compliance features',
        confidence: 96,
        reasoning: `Enterprise-grade security is required for ${securityLevel} security and ${compliance} compliance requirements.`,
        pros: [
          'Comprehensive security coverage',
          'Compliance-ready features',
          'Advanced threat protection',
          'Audit and monitoring capabilities'
        ],
        cons: [
          'High implementation complexity',
          'Significant cost',
          'Performance overhead',
          'Complex configuration'
        ],
        implementation: 'Implement OAuth 2.0/OIDC, encryption at rest/transit, WAF, SIEM integration',
        alternatives: ['Basic Security', 'Cloud Security', 'Custom Security Solution'],
        estimatedCost: '$5,000 - $20,000/month',
        estimatedTime: '6-12 weeks',
        complexity: 'High',
        icon: '🔒'
      };
    } else {
      return {
        id: 'standard-security',
        name: 'Standard Security Implementation',
        category: 'security',
        description: 'Essential security measures for typical web applications',
        confidence: 88,
        reasoning: `Standard security measures provide adequate protection for your ${securityLevel} security requirements.`,
        pros: [
          'Easy to implement',
          'Cost-effective',
          'Good baseline protection',
          'Wide community support'
        ],
        cons: [
          'Limited advanced features',
          'May not meet compliance requirements',
          'Basic threat protection'
        ],
        implementation: 'Implement HTTPS, JWT authentication, input validation, rate limiting',
        alternatives: ['Enterprise Security', 'Cloud Security', 'Zero Trust'],
        estimatedCost: '$500 - $2,000/month',
        estimatedTime: '2-4 weeks',
        complexity: 'Low',
        icon: '🛡️'
      };
    }
  };

  const getDeploymentRecommendation = (answers: QuestionnaireAnswers): ArchitectureRecommendation => {
    const { budget, expectedUsers, availability } = answers;
    
    if (budget.includes('100,000') || availability.includes('99.99') || availability.includes('99.999')) {
      return {
        id: 'kubernetes',
        name: 'Kubernetes Orchestration',
        category: 'deployment',
        description: 'Container orchestration platform for scalable, reliable deployments',
        confidence: 93,
        reasoning: `Kubernetes provides the scalability and reliability needed for ${availability} availability and your budget requirements.`,
        pros: [
          'High availability and fault tolerance',
          'Automatic scaling and load balancing',
          'Multi-cloud and hybrid support',
          'Advanced deployment strategies'
        ],
        cons: [
          'High complexity and learning curve',
          'Significant operational overhead',
          'Resource requirements',
          'Debugging complexity'
        ],
        implementation: 'Set up cluster, configure ingress, implement CI/CD, monitoring and logging',
        alternatives: ['Docker Swarm', 'Cloud-native services', 'Traditional VMs'],
        estimatedCost: '$3,000 - $15,000/month',
        estimatedTime: '8-16 weeks',
        complexity: 'High',
        icon: '☸️'
      };
    } else {
      return {
        id: 'cloud-platform',
        name: 'Cloud Platform (AWS/Azure/GCP)',
        category: 'deployment',
        description: 'Managed cloud services for simplified deployment and scaling',
        confidence: 90,
        reasoning: `Cloud platforms provide managed services that reduce operational overhead while meeting your ${availability} availability needs.`,
        pros: [
          'Managed services reduce operational overhead',
          'Built-in scalability and reliability',
          'Pay-as-you-go pricing',
          'Global infrastructure'
        ],
        cons: [
          'Vendor lock-in risk',
          'Cost management complexity',
          'Limited customization',
          'Data sovereignty concerns'
        ],
        implementation: 'Choose cloud provider, set up VPC, configure auto-scaling, implement monitoring',
        alternatives: ['Kubernetes', 'Traditional hosting', 'Serverless'],
        estimatedCost: '$1,000 - $8,000/month',
        estimatedTime: '4-8 weeks',
        complexity: 'Medium',
        icon: '☁️'
      };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'architecture': return '🏗️';
      case 'database': return '🗄️';
      case 'technology': return '⚙️';
      case 'security': return '🔒';
      case 'deployment': return '🚀';
      default: return '📋';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.category === selectedCategory);

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Analyzing Your Requirements</h2>
          <p className="text-slate-600">Our AI is processing your responses to generate personalized recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Your Architecture Recommendations
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Based on your assessment, here are our AI-powered recommendations for your software architecture
          </p>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Recommendations
            </button>
            {['architecture', 'database', 'technology', 'security', 'deployment'].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {getCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredRecommendations.map((recommendation) => (
            <div key={recommendation.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{recommendation.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{recommendation.name}</h3>
                      <p className="text-slate-600">{recommendation.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{recommendation.confidence}%</div>
                    <div className="text-sm text-slate-500">Confidence</div>
                  </div>
                </div>
                <p className="text-slate-700">{recommendation.description}</p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Reasoning */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Why This Recommendation?</h4>
                  <p className="text-slate-600 text-sm">{recommendation.reasoning}</p>
                </div>

                {/* Pros and Cons */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">✅ Pros</h4>
                    <ul className="space-y-1">
                      {recommendation.pros.map((pro, index) => (
                        <li key={index} className="text-sm text-slate-600">• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">❌ Cons</h4>
                    <ul className="space-y-1">
                      {recommendation.cons.map((con, index) => (
                        <li key={index} className="text-sm text-slate-600">• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Implementation Details */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Implementation</h4>
                  <p className="text-slate-600 text-sm">{recommendation.implementation}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-slate-800">{recommendation.estimatedCost}</div>
                    <div className="text-xs text-slate-500">Estimated Cost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-slate-800">{recommendation.estimatedTime}</div>
                    <div className="text-xs text-slate-500">Timeline</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-semibold px-2 py-1 rounded ${getComplexityColor(recommendation.complexity)}`}>
                      {recommendation.complexity}
                    </div>
                    <div className="text-xs text-slate-500">Complexity</div>
                  </div>
                </div>

                {/* Alternatives */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Alternatives</h4>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.alternatives.map((alt, index) => (
                      <span key={index} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Architecture Diagram */}
        {aiRecommendations.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Interactive Architecture Analysis</h3>
                <p className="text-slate-600">
                  Explore our AI-powered architecture recommendations with interactive visualizations and detailed analysis
                </p>
              </div>
              <button
                onClick={() => setShowInteractiveDiagram(!showInteractiveDiagram)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showInteractiveDiagram ? 'Hide' : 'Show'} Interactive Diagram
              </button>
            </div>
            
            {showInteractiveDiagram && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {aiRecommendations.slice(0, 3).map((rec, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-slate-800">{rec.architecture.name}</h4>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{rec.architecture.score.toFixed(1)}</div>
                          <div className="text-sm text-slate-500">AI Score</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Confidence:</span>
                          <span className="font-medium">{rec.architecture.confidence.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Risk Level:</span>
                          <span className={`font-medium ${
                            rec.architecture.riskAssessment.riskLevel === 'Low' ? 'text-green-600' :
                            rec.architecture.riskAssessment.riskLevel === 'Medium' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {rec.architecture.riskAssessment.riskLevel}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Cost Efficiency:</span>
                          <span className="font-medium">{rec.architecture.costAnalysis.costEfficiency.toFixed(1)}%</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-blue-200">
                        <div className="text-xs text-slate-500 mb-1">Mathematical Model:</div>
                        <div className="text-xs text-slate-700">{rec.mathematicalModel?.algorithm || 'Advanced Weighted Scoring'}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <InteractiveArchitectureDiagram
                    recommendations={aiRecommendations}
                    requirements={answers ? convertToAIRequirements(answers) : {}}
                    onNodeClick={(node) => console.log('Architecture selected:', node)}
                  />
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-3">AI Analysis Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium text-slate-700 mb-2">Advanced Algorithms</h5>
                      <ul className="text-slate-600 space-y-1">
                        <li>• Weighted Multi-Factor Analysis</li>
                        <li>• Risk Assessment & Mitigation</li>
                        <li>• Cost-Benefit Analysis</li>
                        <li>• Context-Aware Scoring</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-700 mb-2">Interactive Features</h5>
                      <ul className="text-slate-600 space-y-1">
                        <li>• Real-time Visualizations</li>
                        <li>• Clickable Architecture Nodes</li>
                        <li>• Dynamic Score Display</li>
                        <li>• Detailed Analysis Panels</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-12 text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/comparison')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              🔍 Compare These Options
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-all duration-300 border-2 border-slate-200 hover:border-slate-300"
            >
              📊 Save to Dashboard
            </button>
            <button
              onClick={() => navigate('/chatbot')}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
            >
              💬 Discuss with AI
            </button>
          </div>
          <p className="text-slate-600">
            Need more details? Chat with our AI assistant or explore our learning hub for deeper insights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recommendations; 