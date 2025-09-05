import React, { useState } from 'react';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import TechnologyComparison from '../components/TechnologyComparison';

interface CaseStudy {
  id: string;
  company: string;
  title: string;
  description: string;
  architecture: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  year: number;
  category: string;
}

interface BestPractice {
  category: string;
  title: string;
  description: string;
  practices: string[];
}

const LearningHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('case-studies');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const caseStudies: CaseStudy[] = [
    {
      id: '1',
      company: 'Netflix',
      title: 'Microservices Migration at Scale',
      description: 'How Netflix transformed from a monolithic DVD rental service to a global streaming platform using microservices architecture.',
      architecture: 'Microservices',
      challenges: [
        'Monolithic system couldn\'t handle global scale',
        'Single point of failure',
        'Difficult to deploy new features',
        'Team coordination issues'
      ],
      solutions: [
        'Broke down monolith into 500+ microservices',
        'Implemented service mesh for communication',
        'Adopted containerization with Docker',
        'Built comprehensive monitoring and observability'
      ],
      results: [
        '99.99% uptime achieved',
        'Deployment frequency increased by 1000x',
        'Reduced time-to-market by 60%',
        'Scaled to 200+ million users globally'
      ],
      year: 2012,
      category: 'microservices'
    },
    {
      id: '2',
      company: 'Uber',
      title: 'Real-time Architecture for Global Operations',
      description: 'Uber\'s journey to build a real-time platform that handles millions of rides simultaneously across the globe.',
      architecture: 'Event-Driven Microservices',
      challenges: [
        'Real-time location tracking for millions of users',
        'Complex pricing algorithms',
        'Global regulatory compliance',
        'Peak load handling during events'
      ],
      solutions: [
        'Implemented event-driven architecture',
        'Used Apache Kafka for real-time data streaming',
        'Built geospatial databases for location services',
        'Adopted polyglot persistence strategy'
      ],
      results: [
        'Processes 15+ million rides daily',
        'Real-time ETA accuracy within 30 seconds',
        'Handles 1000+ requests per second',
        'Operates in 900+ cities worldwide'
      ],
      year: 2014,
      category: 'real-time'
    },
    {
      id: '3',
      company: 'Amazon',
      title: 'AWS: From Internal Tool to Global Platform',
      description: 'How Amazon transformed its internal infrastructure into the world\'s largest cloud computing platform.',
      architecture: 'Cloud-Native',
      challenges: [
        'Scaling internal infrastructure',
        'Managing costs across teams',
        'Providing self-service capabilities',
        'Ensuring security and compliance'
      ],
      solutions: [
        'Built API-first architecture',
        'Implemented multi-tenancy',
        'Created comprehensive IAM system',
        'Developed auto-scaling capabilities'
      ],
      results: [
        'Serves 200+ services globally',
        'Processes $100+ billion in revenue',
        '99.99% availability SLA',
        'Millions of active customers'
      ],
      year: 2006,
      category: 'cloud'
    },
    {
      id: '4',
      company: 'Spotify',
      title: 'Squad Model and Microservices',
      description: 'Spotify\'s innovative approach to organizing teams and architecture for rapid innovation.',
      architecture: 'Squad-Based Microservices',
      challenges: [
        'Coordinating 1000+ developers',
        'Maintaining code quality at scale',
        'Balancing autonomy and consistency',
        'Managing technical debt'
      ],
      solutions: [
        'Implemented Squad, Tribe, Chapter model',
        'Built autonomous microservices',
        'Created shared infrastructure platform',
        'Established guilds for knowledge sharing'
      ],
      results: [
        '500+ million active users',
        'Deployments every 4 hours',
        'Reduced time-to-market by 50%',
        'Improved developer satisfaction'
      ],
      year: 2012,
      category: 'microservices'
    },
    {
      id: '5',
      company: 'Airbnb',
      title: 'Data-Driven Architecture Evolution',
      description: 'Airbnb\'s journey from a simple website to a data-driven platform handling millions of bookings.',
      architecture: 'Data-Centric Microservices',
      challenges: [
        'Managing massive amounts of listing data',
        'Real-time pricing and availability',
        'Global payment processing',
        'Trust and safety at scale'
      ],
      solutions: [
        'Built data mesh architecture',
        'Implemented real-time pricing engine',
        'Created global payment infrastructure',
        'Developed AI-powered trust systems'
      ],
      results: [
        '7+ million listings worldwide',
        '150+ million users',
        'Processes $100+ billion in bookings',
        'Real-time pricing updates'
      ],
      year: 2015,
      category: 'data'
    }
  ];

  const bestPractices: BestPractice[] = [
    {
      category: 'Microservices',
      title: 'Microservices Best Practices',
      description: 'Essential practices for designing and implementing microservices architecture.',
      practices: [
        'Design services around business capabilities',
        'Implement API Gateway for external communication',
        'Use event-driven communication for loose coupling',
        'Implement circuit breakers for fault tolerance',
        'Use distributed tracing for observability',
        'Design for failure and implement graceful degradation',
        'Use containerization for consistent deployment',
        'Implement comprehensive monitoring and alerting'
      ]
    },
    {
      category: 'Security',
      title: 'Security Best Practices',
      description: 'Critical security practices for modern software architecture.',
      practices: [
        'Implement defense in depth strategy',
        'Use OAuth 2.0 and JWT for authentication',
        'Encrypt data at rest and in transit',
        'Implement least privilege access control',
        'Regular security audits and penetration testing',
        'Use HTTPS everywhere',
        'Implement input validation and sanitization',
        'Keep dependencies updated and patched'
      ]
    },
    {
      category: 'Performance',
      title: 'Performance Optimization',
      description: 'Key practices for optimizing application performance.',
      practices: [
        'Implement caching strategies (Redis, CDN)',
        'Use database indexing and query optimization',
        'Implement connection pooling',
        'Use load balancing for horizontal scaling',
        'Optimize database queries and reduce N+1 problems',
        'Implement lazy loading and pagination',
        'Use compression for data transfer',
        'Monitor and optimize memory usage'
      ]
    },
    {
      category: 'Scalability',
      title: 'Scalability Patterns',
      description: 'Proven patterns for building scalable applications.',
      practices: [
        'Design for horizontal scaling',
        'Use stateless services for easy scaling',
        'Implement database sharding and partitioning',
        'Use message queues for asynchronous processing',
        'Implement auto-scaling based on metrics',
        'Use CDN for global content delivery',
        'Design for eventual consistency',
        'Implement rate limiting and throttling'
      ]
    }
  ];

  const filteredCaseStudies = selectedCategory === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => study.category === selectedCategory);

  // Architecture Diagram Data
  const microservicesDiagram = {
    title: "Microservices Architecture",
    description: "Interactive diagram showing a typical microservices architecture with API Gateway, services, databases, and message queues.",
    nodes: [
      {
        id: 'gateway',
        label: 'API Gateway',
        type: 'gateway' as const,
        position: { x: 200, y: 50 },
        connections: ['auth-service', 'user-service', 'order-service'],
        description: 'Single entry point for all client requests, handles routing, authentication, and rate limiting.'
      },
      {
        id: 'auth-service',
        label: 'Auth Service',
        type: 'service' as const,
        position: { x: 50, y: 150 },
        connections: ['gateway', 'user-db'],
        description: 'Handles user authentication and authorization using JWT tokens.'
      },
      {
        id: 'user-service',
        label: 'User Service',
        type: 'service' as const,
        position: { x: 200, y: 150 },
        connections: ['gateway', 'user-db', 'notification-queue'],
        description: 'Manages user profiles, preferences, and account information.'
      },
      {
        id: 'order-service',
        label: 'Order Service',
        type: 'service' as const,
        position: { x: 350, y: 150 },
        connections: ['gateway', 'order-db', 'payment-queue'],
        description: 'Handles order processing, inventory management, and order history.'
      },
      {
        id: 'user-db',
        label: 'User DB',
        type: 'database' as const,
        position: { x: 125, y: 250 },
        connections: ['auth-service', 'user-service'],
        description: 'PostgreSQL database storing user data, authentication info, and profiles.'
      },
      {
        id: 'order-db',
        label: 'Order DB',
        type: 'database' as const,
        position: { x: 275, y: 250 },
        connections: ['order-service'],
        description: 'MongoDB database storing order information, inventory, and transaction history.'
      },
      {
        id: 'notification-queue',
        label: 'Notification Queue',
        type: 'queue' as const,
        position: { x: 200, y: 350 },
        connections: ['user-service'],
        description: 'RabbitMQ queue for handling email notifications, SMS, and push notifications.'
      },
      {
        id: 'payment-queue',
        label: 'Payment Queue',
        type: 'queue' as const,
        position: { x: 350, y: 350 },
        connections: ['order-service'],
        description: 'Kafka stream for processing payment transactions and financial operations.'
      }
    ]
  };

  // Technology Comparison Data
  const databaseTechnologies = [
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      category: 'SQL Databases',
      description: 'Advanced open-source relational database with ACID compliance and rich feature set.',
      pros: [
        'ACID compliance and strong consistency',
        'Rich feature set (JSON, arrays, full-text search)',
        'Excellent performance for complex queries',
        'Strong community and ecosystem',
        'Free and open-source'
      ],
      cons: [
        'Horizontal scaling is complex',
        'Limited built-in sharding',
        'Can be resource-intensive',
        'Less suitable for unstructured data'
      ],
      useCases: [
        'Traditional business applications',
        'Financial systems requiring ACID',
        'Complex reporting and analytics',
        'Applications with complex relationships'
      ],
      performance: 8,
      scalability: 6,
      complexity: 4,
      cost: 2,
      community: 9,
      maturity: 9
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'NoSQL Databases',
      description: 'Document-oriented NoSQL database designed for scalability and flexibility.',
      pros: [
        'Horizontal scaling with sharding',
        'Flexible schema for rapid development',
        'Excellent for unstructured data',
        'Built-in replication and high availability',
        'Good performance for read-heavy workloads'
      ],
      cons: [
        'No ACID compliance across documents',
        'Complex aggregation queries',
        'Larger storage footprint',
        'Limited transaction support'
      ],
      useCases: [
        'Content management systems',
        'Real-time analytics',
        'IoT data storage',
        'Applications with evolving schemas'
      ],
      performance: 7,
      scalability: 9,
      complexity: 3,
      cost: 4,
      community: 8,
      maturity: 8
    },
    {
      id: 'redis',
      name: 'Redis',
      category: 'In-Memory Databases',
      description: 'Ultra-fast in-memory data structure store used as database, cache, and message broker.',
      pros: [
        'Extremely fast performance',
        'Rich data structures',
        'Built-in caching capabilities',
        'Pub/sub messaging',
        'Atomic operations'
      ],
      cons: [
        'Limited by RAM size',
        'No complex querying',
        'Data persistence complexity',
        'Higher cost per GB'
      ],
      useCases: [
        'Session storage',
        'Real-time caching',
        'Leaderboards and counters',
        'Message queues and pub/sub'
      ],
      performance: 10,
      scalability: 7,
      complexity: 2,
      cost: 6,
      community: 8,
      maturity: 9
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Learning Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master software architecture through real-world case studies, best practices, and proven patterns from industry leaders.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('case-studies')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'case-studies'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Case Studies
              </button>
              <button
                onClick={() => setActiveTab('best-practices')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'best-practices'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Best Practices
              </button>
              <button
                onClick={() => setActiveTab('patterns')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'patterns'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Architecture Patterns
              </button>
              <button
                onClick={() => setActiveTab('diagrams')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'diagrams'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Interactive Diagrams
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'comparison'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Technology Comparison
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'case-studies' && (
            <div>
              {/* Category Filter */}
              <div className="mb-8">
                <div className="flex flex-wrap justify-center gap-3">
                  {['all', 'microservices', 'real-time', 'cloud', 'data'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Case Studies Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {filteredCaseStudies.map((study) => (
                  <div key={study.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-800">{study.company}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {study.year}
                        </span>
                      </div>
                      
                      <h4 className="text-xl font-semibold text-gray-700 mb-3">{study.title}</h4>
                      <p className="text-gray-600 mb-4">{study.description}</p>
                      
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {study.architecture}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h5 className="font-semibold text-gray-800 mb-2">Challenges:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {study.challenges.map((challenge, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-semibold text-gray-800 mb-2">Solutions:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {study.solutions.map((solution, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                {solution}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-semibold text-gray-800 mb-2">Results:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {study.results.map((result, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                {result}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'best-practices' && (
            <div className="grid md:grid-cols-2 gap-8">
              {bestPractices.map((practice, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-3">
                      {practice.category}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{practice.title}</h3>
                    <p className="text-gray-600">{practice.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Key Practices:</h4>
                    <ul className="space-y-2">
                      {practice.practices.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <span className="text-purple-500 mr-2 mt-1">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'patterns' && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Architecture Patterns</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Microservices Pattern</h4>
                    <p className="text-gray-600 mb-3">Decompose applications into small, independent services that communicate via APIs.</p>
                    <div className="text-sm text-gray-500">
                      <strong>Use when:</strong> Large, complex applications with multiple teams
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Event-Driven Architecture</h4>
                    <p className="text-gray-600 mb-3">Use events to trigger and communicate between decoupled services.</p>
                    <div className="text-sm text-gray-500">
                      <strong>Use when:</strong> Real-time processing and loose coupling needed
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">CQRS Pattern</h4>
                    <p className="text-gray-600 mb-3">Separate read and write operations for different models.</p>
                    <div className="text-sm text-gray-500">
                      <strong>Use when:</strong> Complex queries and high read/write ratios
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">API Gateway Pattern</h4>
                    <p className="text-gray-600 mb-3">Single entry point for all client requests to microservices.</p>
                    <div className="text-sm text-gray-500">
                      <strong>Use when:</strong> Multiple microservices need unified access
                    </div>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Circuit Breaker Pattern</h4>
                    <p className="text-gray-600 mb-3">Prevent cascading failures by monitoring for failures and stopping the flow.</p>
                    <div className="text-sm text-gray-500">
                      <strong>Use when:</strong> Calling external services that might fail
                    </div>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Saga Pattern</h4>
                    <p className="text-gray-600 mb-3">Manage distributed transactions across multiple services.</p>
                    <div className="text-sm text-gray-500">
                      <strong>Use when:</strong> Distributed transactions across microservices
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'diagrams' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Interactive Architecture Diagrams</h3>
                <p className="text-gray-600">Click on components to learn more about their role in the architecture</p>
              </div>
              
              <ArchitectureDiagram
                title={microservicesDiagram.title}
                description={microservicesDiagram.description}
                nodes={microservicesDiagram.nodes}
                onNodeClick={(node) => console.log('Clicked:', node.label)}
              />
            </div>
          )}

          {activeTab === 'comparison' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Technology Comparison</h3>
                <p className="text-gray-600">Compare different technologies to make informed decisions</p>
              </div>
              
              <TechnologyComparison
                technologies={databaseTechnologies}
                category="Database Technologies"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

  export default LearningHub;