import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InteractiveArchitectureDiagram from '../components/InteractiveArchitectureDiagram';

interface Question {
  id: string;
  question: string;
  type: 'radio' | 'select' | 'number' | 'text';
  options?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
  category: string;
}

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

const Questionnaire: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [recommendations, setRecommendations] = useState<ArchitectureRecommendation[]>([]);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showInteractiveDiagram, setShowInteractiveDiagram] = useState(false);

  const questions: Question[] = [
    // Project Overview
    {
      id: 'projectType',
      question: 'What type of application are you building?',
      type: 'select',
      options: [
        'Web Application',
        'Mobile Application',
        'Desktop Application',
        'API/Backend Service',
        'Microservices System',
        'Data Processing Pipeline',
        'Real-time System',
        'IoT Application',
        'Other'
      ],
      category: 'Project Overview'
    },
    {
      id: 'industry',
      question: 'What industry is your project in?',
      type: 'select',
      options: [
        'E-commerce/Retail',
        'Finance/Banking',
        'Healthcare',
        'Education',
        'Entertainment/Media',
        'Social Networking',
        'Business/Enterprise',
        'Gaming',
        'Transportation/Logistics',
        'Other'
      ],
      category: 'Project Overview'
    },
    {
      id: 'expectedUsers',
      question: 'What is your expected user base size?',
      type: 'select',
      options: [
        'Less than 1,000 users',
        '1,000 - 10,000 users',
        '10,000 - 100,000 users',
        '100,000 - 1 million users',
        'More than 1 million users'
      ],
      category: 'Project Overview'
    },

    // Technical Requirements
    {
      id: 'teamSize',
      question: 'What is your development team size?',
      type: 'select',
      options: [
        '1-3 developers',
        '4-7 developers',
        '8-15 developers',
        '16-30 developers',
        'More than 30 developers'
      ],
      category: 'Technical Requirements'
    },
    {
      id: 'timeline',
      question: 'What is your project timeline?',
      type: 'select',
      options: [
        'Less than 3 months',
        '3-6 months',
        '6-12 months',
        '1-2 years',
        'More than 2 years'
      ],
      category: 'Technical Requirements'
    },
    {
      id: 'budget',
      question: 'What is your budget range for infrastructure?',
      type: 'select',
      options: [
        'Less than $1,000/month',
        '$1,000 - $5,000/month',
        '$5,000 - $20,000/month',
        '$20,000 - $100,000/month',
        'More than $100,000/month'
      ],
      category: 'Technical Requirements'
    },

    // Performance Requirements
    {
      id: 'responseTime',
      question: 'What response time is acceptable for your application?',
      type: 'select',
      options: [
        'Less than 100ms (Real-time)',
        '100ms - 500ms (Fast)',
        '500ms - 2s (Standard)',
        '2s - 5s (Acceptable)',
        'More than 5s (Batch processing)'
      ],
      category: 'Performance Requirements'
    },
    {
      id: 'availability',
      question: 'What level of availability do you need?',
      type: 'select',
      options: [
        '99% (Basic)',
        '99.5% (Standard)',
        '99.9% (High)',
        '99.99% (Very High)',
        '99.999% (Critical)'
      ],
      category: 'Performance Requirements'
    },
    {
      id: 'dataVolume',
      question: 'What is your expected data volume?',
      type: 'select',
      options: [
        'Less than 1GB',
        '1GB - 100GB',
        '100GB - 1TB',
        '1TB - 100TB',
        'More than 100TB'
      ],
      category: 'Performance Requirements'
    },

    // Security & Compliance
    {
      id: 'securityLevel',
      question: 'What level of security do you require?',
      type: 'select',
      options: [
        'Basic (Public data)',
        'Standard (User data)',
        'High (Financial data)',
        'Very High (Healthcare/Government)',
        'Critical (Military/Defense)'
      ],
      category: 'Security & Compliance'
    },
    {
      id: 'compliance',
      question: 'Do you need to comply with any regulations?',
      type: 'select',
      options: [
        'None',
        'GDPR (EU)',
        'HIPAA (Healthcare)',
        'SOX (Financial)',
        'PCI DSS (Payment)',
        'Multiple regulations'
      ],
      category: 'Security & Compliance'
    },

    // Integration Requirements
    {
      id: 'externalIntegrations',
      question: 'How many external systems will you integrate with?',
      type: 'select',
      options: [
        'None',
        '1-3 systems',
        '4-10 systems',
        '11-25 systems',
        'More than 25 systems'
      ],
      category: 'Integration Requirements'
    },
    {
      id: 'apiType',
      question: 'What type of APIs will you need?',
      type: 'select',
      options: [
        'REST APIs',
        'GraphQL APIs',
        'SOAP APIs',
        'Real-time APIs (WebSocket)',
        'Event-driven APIs',
        'Multiple types'
      ],
      category: 'Integration Requirements'
    }
  ];

  const categories = [...new Set(questions.map(q => q.category))];
  const questionsPerCategory = questions.length / categories.length;

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < categories.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setIsAnalyzing(true);
    
    // Simulate API call and analysis
    setTimeout(() => {
      setIsSubmitting(false);
      setIsAnalyzing(false);
      
      // Generate recommendations
      const recs = generateRecommendations(answers as QuestionnaireAnswers);
      setRecommendations(recs);
      
      // Generate AI recommendations for interactive diagram
      const aiRecs = generateAIRecommendations(answers as QuestionnaireAnswers);
      setAiRecommendations(aiRecs);
      
      // Mark assessment as complete
      setAssessmentComplete(true);
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
          disadvantages: ['Complexity DevOps', 'Network overhead', 'Data consistency challenges', 'Higher initial cost'],
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
        description: 'Collection of small, independent services that communicate via APIs',
        confidence: 95,
        reasoning: 'Based on your team size and expected scale, microservices will provide better scalability and team autonomy.',
        pros: [
          'Team autonomy and independent deployments',
          'Better scalability and fault isolation',
          'Technology diversity per service',
          'Easier to maintain and update'
        ],
        cons: [
          'Increased complexity in service communication',
          'Distributed system challenges',
          'Higher operational overhead',
          'Data consistency across services'
        ],
        implementation: 'Start with domain-driven design, implement API gateway, use service mesh for communication.',
        alternatives: ['Monolithic Architecture', 'Serverless Architecture'],
        estimatedCost: '$5,000 - $15,000/month',
        estimatedTime: '6-12 months',
        complexity: 'High',
        icon: '🏗️'
      };
    } else if (projectType.includes('simple') || expectedUsers.includes('1,000')) {
      return {
        id: 'monolithic',
        name: 'Monolithic Architecture',
        category: 'architecture',
        description: 'Single, unified application where all components are tightly coupled',
        confidence: 85,
        reasoning: 'For smaller teams and simpler applications, monolithic architecture provides faster development and easier deployment.',
        pros: [
          'Simple deployment and development',
          'Lower initial cost',
          'Easier testing and debugging',
          'No distributed system complexity'
        ],
        cons: [
          'Poor scalability',
          'Hard to maintain as it grows',
          'Technology lock-in',
          'Single point of failure'
        ],
        implementation: 'Use MVC pattern, implement proper layering, plan for future refactoring.',
        alternatives: ['Microservices Architecture', 'Serverless Architecture'],
        estimatedCost: '$1,000 - $5,000/month',
        estimatedTime: '3-6 months',
        complexity: 'Low',
        icon: '🏢'
      };
    } else {
      return {
        id: 'serverless',
        name: 'Serverless Architecture',
        category: 'architecture',
        description: 'Event-driven architecture where code runs in response to events',
        confidence: 80,
        reasoning: 'Serverless provides cost-effective scaling and reduced operational overhead for variable workloads.',
        pros: [
          'No server management',
          'Cost-effective for variable workloads',
          'Auto-scaling',
          'Pay-per-use pricing'
        ],
        cons: [
          'Limited control over infrastructure',
          'Cold start issues',
          'Vendor lock-in',
          'Debugging complexity'
        ],
        implementation: 'Use event-driven patterns, implement proper error handling, optimize for cold starts.',
        alternatives: ['Microservices Architecture', 'Monolithic Architecture'],
        estimatedCost: '$500 - $3,000/month',
        estimatedTime: '2-4 months',
        complexity: 'Medium',
        icon: '⚡'
      };
    }
  };

  const getDatabaseRecommendation = (answers: QuestionnaireAnswers): ArchitectureRecommendation => {
    const { dataVolume, expectedUsers, compliance } = answers;
    
    if (dataVolume.includes('large') || expectedUsers.includes('million')) {
      return {
        id: 'distributed-db',
        name: 'Distributed Database System',
        category: 'database',
        description: 'Horizontally scalable database system with multiple nodes',
        confidence: 90,
        reasoning: 'For large data volumes and high user counts, distributed databases provide better scalability and availability.',
        pros: [
          'Horizontal scalability',
          'High availability',
          'Geographic distribution',
          'Fault tolerance'
        ],
        cons: [
          'Complex consistency management',
          'Higher operational complexity',
          'Network latency issues',
          'More expensive'
        ],
        implementation: 'Use Cassandra or MongoDB for NoSQL, PostgreSQL with read replicas for SQL.',
        alternatives: ['Single Database', 'Database Sharding'],
        estimatedCost: '$2,000 - $8,000/month',
        estimatedTime: '4-8 months',
        complexity: 'High',
        icon: '🗄️'
      };
    } else {
      return {
        id: 'single-db',
        name: 'Single Database',
        category: 'database',
        description: 'Traditional single database with ACID compliance',
        confidence: 85,
        reasoning: 'For smaller applications, a single database provides simplicity and strong consistency.',
        pros: [
          'ACID compliance',
          'Simple setup and management',
          'Strong consistency',
          'Lower cost'
        ],
        cons: [
          'Limited scalability',
          'Single point of failure',
          'Vertical scaling only',
          'Geographic limitations'
        ],
        implementation: 'Use PostgreSQL or MySQL, implement proper indexing, plan for backups.',
        alternatives: ['Distributed Database', 'Database Sharding'],
        estimatedCost: '$200 - $1,000/month',
        estimatedTime: '1-2 months',
        complexity: 'Low',
        icon: '💾'
      };
    }
  };

  const getTechnologyStack = (answers: QuestionnaireAnswers): ArchitectureRecommendation => {
    const { projectType, teamSize, timeline } = answers;
    
    if (projectType.includes('web') || projectType.includes('mobile')) {
      return {
        id: 'modern-stack',
        name: 'Modern Web Stack',
        category: 'technology',
        description: 'React/Node.js stack with modern development practices',
        confidence: 88,
        reasoning: 'Modern web stack provides excellent developer experience and wide community support.',
        pros: [
          'Large community and ecosystem',
          'Excellent developer experience',
          'Rich library ecosystem',
          'Cross-platform compatibility'
        ],
        cons: [
          'JavaScript fatigue',
          'Rapid ecosystem changes',
          'Performance overhead',
          'Security considerations'
        ],
        implementation: 'Use React for frontend, Node.js/Express for backend, MongoDB/PostgreSQL for database.',
        alternatives: ['Traditional Stack', 'Serverless Stack'],
        estimatedCost: '$1,000 - $5,000/month',
        estimatedTime: '3-6 months',
        complexity: 'Medium',
        icon: '⚛️'
      };
    } else {
      return {
        id: 'enterprise-stack',
        name: 'Enterprise Stack',
        category: 'technology',
        description: 'Java/Spring stack with enterprise-grade features',
        confidence: 85,
        reasoning: 'Enterprise stack provides stability, security, and enterprise integration capabilities.',
        pros: [
          'Enterprise-grade security',
          'Strong typing and reliability',
          'Excellent tooling',
          'Enterprise integration'
        ],
        cons: [
          'Slower development',
          'Higher resource usage',
          'Steeper learning curve',
          'More expensive'
        ],
        implementation: 'Use Spring Boot, Java 17+, PostgreSQL, Docker for containerization.',
        alternatives: ['Modern Web Stack', 'Cloud-Native Stack'],
        estimatedCost: '$3,000 - $10,000/month',
        estimatedTime: '6-12 months',
        complexity: 'High',
        icon: '☕'
      };
    }
  };

  const getSecurityRecommendation = (answers: QuestionnaireAnswers): ArchitectureRecommendation => {
    const { securityLevel, compliance, industry } = answers;
    
    if (securityLevel.includes('high') || compliance.includes('strict') || industry.includes('finance')) {
      return {
        id: 'enterprise-security',
        name: 'Enterprise Security Framework',
        category: 'security',
        description: 'Comprehensive security framework with multiple layers of protection',
        confidence: 92,
        reasoning: 'For high-security requirements, enterprise security framework provides comprehensive protection.',
        pros: [
          'Multi-layer security',
          'Compliance ready',
          'Advanced threat protection',
          'Audit trails'
        ],
        cons: [
          'Complex implementation',
          'Higher cost',
          'Performance impact',
          'User experience friction'
        ],
        implementation: 'Implement OAuth 2.0, JWT tokens, API gateway security, encryption at rest and in transit.',
        alternatives: ['Basic Security', 'Cloud Security'],
        estimatedCost: '$2,000 - $8,000/month',
        estimatedTime: '4-8 months',
        complexity: 'High',
        icon: '🔒'
      };
    } else {
      return {
        id: 'basic-security',
        name: 'Basic Security Framework',
        category: 'security',
        description: 'Standard security practices for typical applications',
        confidence: 80,
        reasoning: 'Basic security framework provides adequate protection for most applications.',
        pros: [
          'Simple implementation',
          'Lower cost',
          'Good performance',
          'Easy maintenance'
        ],
        cons: [
          'Limited protection',
          'Not suitable for high-risk applications',
          'Basic audit capabilities',
          'Limited compliance features'
        ],
        implementation: 'Use HTTPS, implement authentication, input validation, regular security updates.',
        alternatives: ['Enterprise Security', 'Cloud Security'],
        estimatedCost: '$200 - $1,000/month',
        estimatedTime: '1-2 months',
        complexity: 'Low',
        icon: '🛡️'
      };
    }
  };

  const getDeploymentRecommendation = (answers: QuestionnaireAnswers): ArchitectureRecommendation => {
    const { expectedUsers, teamSize, budget } = answers;
    
    if (expectedUsers.includes('million') || teamSize.includes('15')) {
      return {
        id: 'kubernetes',
        name: 'Kubernetes Deployment',
        category: 'deployment',
        description: 'Container orchestration platform for scalable deployments',
        confidence: 90,
        reasoning: 'Kubernetes provides excellent scalability and management for large applications.',
        pros: [
          'Excellent scalability',
          'High availability',
          'Automated deployments',
          'Resource optimization'
        ],
        cons: [
          'Complex setup',
          'Steep learning curve',
          'Higher operational cost',
          'Resource overhead'
        ],
        implementation: 'Use Docker containers, implement CI/CD pipeline, set up monitoring and logging.',
        alternatives: ['Cloud Deployment', 'Traditional Deployment'],
        estimatedCost: '$3,000 - $12,000/month',
        estimatedTime: '6-12 months',
        complexity: 'High',
        icon: '☸️'
      };
    } else {
      return {
        id: 'cloud-deployment',
        name: 'Cloud Deployment',
        category: 'deployment',
        description: 'Cloud-based deployment with managed services',
        confidence: 85,
        reasoning: 'Cloud deployment provides cost-effective scaling and reduced operational overhead.',
        pros: [
          'Easy setup and management',
          'Cost-effective scaling',
          'Managed services',
          'High availability'
        ],
        cons: [
          'Vendor lock-in',
          'Ongoing costs',
          'Limited control',
          'Network dependency'
        ],
        implementation: 'Use AWS/Azure/GCP, implement auto-scaling, set up monitoring and alerts.',
        alternatives: ['Kubernetes', 'Traditional Deployment'],
        estimatedCost: '$500 - $3,000/month',
        estimatedTime: '2-4 months',
        complexity: 'Medium',
        icon: '☁️'
      };
    }
  };

  const getCurrentCategoryQuestions = () => {
    const startIndex = currentStep * questionsPerCategory;
    return questions.slice(startIndex, startIndex + questionsPerCategory);
  };

  const getProgressPercentage = () => {
    return ((currentStep + 1) / categories.length) * 100;
  };

  const renderQuestion = (question: Question) => {
    const value = answers[question.id] || '';

    switch (question.type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select an option...</option>
            {question.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            min={question.min}
            max={question.max}
            placeholder={question.placeholder}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      
      case 'text':
        return (
          <textarea
            value={value}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            placeholder={question.placeholder}
            rows={3}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Architecture Assessment
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Answer these questions to get personalized architecture recommendations for your project
          </p>
        </div>

        {!assessmentComplete ? (
          <>
            {/* Progress Bar */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-slate-600">
                  Step {currentStep + 1} of {categories.length}
                </span>
                <span className="text-sm font-medium text-slate-600">
                  {Math.round(getProgressPercentage())}% Complete
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>

            {/* Current Category */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                {categories[currentStep]}
              </h2>
              
              <div className="space-y-6">
                {getCurrentCategoryQuestions().map((question) => (
                  <div key={question.id} className="space-y-3">
                    <label className="block text-lg font-medium text-slate-700">
                      {question.question}
                    </label>
                    {renderQuestion(question)}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>

              {currentStep < categories.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    'Get Recommendations'
                  )}
                </button>
              )}
            </div>

            {/* Info Box */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="text-blue-500 text-xl mr-3">💡</div>
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">Assessment Tips</h3>
                  <p className="text-blue-700 text-sm">
                    Be as accurate as possible with your answers. The more precise your requirements, 
                    the better our AI can recommend the right architecture patterns for your project.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Results Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                Your Architecture Recommendations
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Based on your assessment, here are our AI-powered recommendations for your software architecture
              </p>
            </div>

            {/* Loading State */}
            {isAnalyzing && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Analyzing Your Requirements</h3>
                <p className="text-slate-600">Our AI is processing your responses and generating personalized recommendations...</p>
              </div>
            )}

            {/* Results Display */}
            {!isAnalyzing && recommendations.length > 0 && (
              <>
                {/* Recommendations Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {recommendations.map((recommendation) => (
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
                            <div className={`text-sm font-semibold px-2 py-1 rounded ${
                              recommendation.complexity === 'Low' ? 'bg-green-100 text-green-800' :
                              recommendation.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
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
                  <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
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
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <InteractiveArchitectureDiagram
                            recommendations={aiRecommendations}
                            requirements={convertToAIRequirements(answers as QuestionnaireAnswers)}
                            onNodeClick={(node) => console.log('Architecture selected:', node)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="text-center space-y-4">
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
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

  export default Questionnaire;