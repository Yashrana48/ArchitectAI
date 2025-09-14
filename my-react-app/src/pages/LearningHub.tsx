import React, { useState, useMemo } from 'react';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import TechnologyComparison from '../components/TechnologyComparison';
import { caseStudies } from '../data/caseStudies';
import { additionalCaseStudies } from '../data/additionalCaseStudies';
import { moreCaseStudies } from '../data/moreCaseStudies';
import { finalCaseStudies } from '../data/finalCaseStudies';
import type { CaseStudy } from '../data/caseStudies';

interface BestPractice {
  category: string;
  title: string;
  description: string;
  practices: string[];
}

const LearningHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('case-studies');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiagram, setSelectedDiagram] = useState('microservices');

  // Combine all case studies
  const allCaseStudies: CaseStudy[] = useMemo(() => [
    ...caseStudies,
    ...additionalCaseStudies,
    ...moreCaseStudies,
    ...finalCaseStudies
  ], []);

  // Get unique categories, industries, and complexities
  const categories = useMemo(() => {
    const cats = [...new Set(allCaseStudies.map(study => study.category))];
    return ['all', ...cats];
  }, [allCaseStudies]);

  const industries = useMemo(() => {
    const inds = [...new Set(allCaseStudies.map(study => study.industry))];
    return ['all', ...inds];
  }, [allCaseStudies]);

  const complexities = useMemo(() => {
    const comps = [...new Set(allCaseStudies.map(study => study.complexity))];
    return ['all', ...comps];
  }, [allCaseStudies]);

  // Filter case studies based on selected criteria
  const filteredCaseStudies = useMemo(() => {
    return allCaseStudies.filter(study => {
      const matchesCategory = selectedCategory === 'all' || study.category === selectedCategory;
      const matchesIndustry = selectedIndustry === 'all' || study.industry === selectedIndustry;
      const matchesComplexity = selectedComplexity === 'all' || study.complexity === selectedComplexity;
      const matchesSearch = searchTerm === '' || 
        study.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.architecture.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesIndustry && matchesComplexity && matchesSearch;
    });
  }, [allCaseStudies, selectedCategory, selectedIndustry, selectedComplexity, searchTerm]);

  const bestPractices: BestPractice[] = [
    {
      category: 'Microservices',
      title: 'Microservices Architecture Best Practices',
      description: 'Essential practices for designing and implementing microservices architecture based on industry experience.',
      practices: [
        'Design services around business capabilities, not technical layers',
        'Implement API Gateway for external communication and routing',
        'Use event-driven communication for loose coupling between services',
        'Implement circuit breakers and bulkheads for fault tolerance',
        'Use distributed tracing (Jaeger, Zipkin) for observability',
        'Design for failure and implement graceful degradation patterns',
        'Use containerization (Docker) for consistent deployment',
        'Implement comprehensive monitoring, logging, and alerting',
        'Maintain database per service for data isolation',
        'Use service mesh (Istio, Linkerd) for service-to-service communication',
        'Implement health checks and readiness probes',
        'Use configuration management for environment-specific settings'
      ]
    },
    {
      category: 'Security',
      title: 'Security Architecture Best Practices',
      description: 'Critical security practices for modern software architecture and data protection.',
      practices: [
        'Implement defense in depth strategy with multiple security layers',
        'Use OAuth 2.0 and JWT for authentication and authorization',
        'Encrypt data at rest (AES-256) and in transit (TLS 1.3)',
        'Implement least privilege access control and RBAC',
        'Conduct regular security audits and penetration testing',
        'Use HTTPS everywhere and implement HSTS headers',
        'Implement input validation, sanitization, and SQL injection prevention',
        'Keep dependencies updated and use vulnerability scanning',
        'Implement API rate limiting and DDoS protection',
        'Use secrets management (HashiCorp Vault, AWS Secrets Manager)',
        'Implement zero-trust network architecture',
        'Regular security training and awareness programs'
      ]
    },
    {
      category: 'Performance',
      title: 'Performance Optimization Best Practices',
      description: 'Comprehensive practices for optimizing application performance and scalability.',
      practices: [
        'Implement multi-level caching strategies (Redis, CDN, application cache)',
        'Use database indexing, query optimization, and connection pooling',
        'Implement horizontal scaling with load balancers',
        'Optimize database queries and eliminate N+1 problems',
        'Use lazy loading, pagination, and data compression',
        'Implement CDN for static content delivery',
        'Monitor and optimize memory usage and garbage collection',
        'Use asynchronous processing for non-critical operations',
        'Implement database read replicas for read-heavy workloads',
        'Use content compression (Gzip, Brotli) for data transfer',
        'Optimize images and use modern formats (WebP, AVIF)',
        'Implement performance budgets and monitoring'
      ]
    },
    {
      category: 'Scalability',
      title: 'Scalability Architecture Patterns',
      description: 'Proven patterns and practices for building highly scalable applications.',
      practices: [
        'Design for horizontal scaling from the beginning',
        'Use stateless services for easy scaling and load distribution',
        'Implement database sharding and partitioning strategies',
        'Use message queues (Kafka, RabbitMQ) for asynchronous processing',
        'Implement auto-scaling based on CPU, memory, and custom metrics',
        'Use CDN for global content delivery and edge computing',
        'Design for eventual consistency where appropriate',
        'Implement rate limiting, throttling, and backpressure',
        'Use microservices for independent scaling of components',
        'Implement caching at multiple levels (application, database, CDN)',
        'Use database connection pooling and read replicas',
        'Design for graceful degradation under high load'
      ]
    },
    {
      category: 'Data Management',
      title: 'Data Architecture Best Practices',
      description: 'Best practices for data management, storage, and processing in modern applications.',
      practices: [
        'Choose appropriate database types (SQL, NoSQL, Graph) for use cases',
        'Implement data modeling and normalization strategies',
        'Use data versioning and migration strategies',
        'Implement backup and disaster recovery procedures',
        'Use data encryption and privacy protection (GDPR, CCPA)',
        'Implement data quality monitoring and validation',
        'Use ETL/ELT pipelines for data processing and analytics',
        'Implement data lake and data warehouse architectures',
        'Use real-time data streaming (Kafka, Kinesis) for analytics',
        'Implement data governance and lineage tracking',
        'Use data compression and archival strategies',
        'Implement data retention and deletion policies'
      ]
    },
    {
      category: 'DevOps',
      title: 'DevOps and Deployment Best Practices',
      description: 'Essential practices for modern DevOps, CI/CD, and deployment strategies.',
      practices: [
        'Implement Infrastructure as Code (Terraform, CloudFormation)',
        'Use CI/CD pipelines for automated testing and deployment',
        'Implement blue-green and canary deployment strategies',
        'Use container orchestration (Kubernetes, Docker Swarm)',
        'Implement comprehensive testing (unit, integration, e2e)',
        'Use configuration management and environment parity',
        'Implement monitoring, logging, and alerting (Prometheus, Grafana)',
        'Use version control and code review processes',
        'Implement automated security scanning and compliance checks',
        'Use feature flags for controlled rollouts',
        'Implement disaster recovery and backup strategies',
        'Use infrastructure monitoring and cost optimization'
      ]
    },
    {
      category: 'API Design',
      title: 'API Design and Management Best Practices',
      description: 'Best practices for designing, implementing, and managing APIs effectively.',
      practices: [
        'Follow RESTful principles and HTTP standards',
        'Use OpenAPI/Swagger for API documentation',
        'Implement API versioning strategies (URL, header, query)',
        'Use API Gateway for rate limiting, authentication, and routing',
        'Implement comprehensive error handling and status codes',
        'Use pagination, filtering, and sorting for large datasets',
        'Implement API testing and contract testing',
        'Use API analytics and monitoring for performance insights',
        'Implement API security (authentication, authorization, rate limiting)',
        'Use GraphQL for flexible data querying where appropriate',
        'Implement API caching strategies for performance',
        'Use API lifecycle management and deprecation strategies'
      ]
    },
    {
      category: 'Testing',
      title: 'Testing Strategy Best Practices',
      description: 'Comprehensive testing practices for ensuring software quality and reliability.',
      practices: [
        'Implement test pyramid (unit, integration, e2e) strategy',
        'Use Test-Driven Development (TDD) and Behavior-Driven Development (BDD)',
        'Implement automated testing in CI/CD pipelines',
        'Use mocking and stubbing for isolated unit tests',
        'Implement contract testing for microservices',
        'Use performance and load testing for scalability validation',
        'Implement security testing and vulnerability scanning',
        'Use chaos engineering for resilience testing',
        'Implement visual regression testing for UI components',
        'Use test data management and test environment strategies',
        'Implement accessibility testing for inclusive design',
        'Use test coverage metrics and quality gates'
      ]
    }
  ];

  // Statistics for the header
  const totalCaseStudies = allCaseStudies.length;
  const filteredCount = filteredCaseStudies.length;

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
    },
    {
      id: 'mysql',
      name: 'MySQL',
      category: 'SQL Databases',
      description: 'Popular open-source relational database management system.',
      pros: [
        'Wide adoption and community support',
        'Good performance for read-heavy workloads',
        'Easy to set up and manage',
        'Strong ecosystem and tools',
        'Cost-effective'
      ],
      cons: [
        'Limited advanced features compared to PostgreSQL',
        'Complex horizontal scaling',
        'Some performance limitations',
        'Less suitable for complex analytics'
      ],
      useCases: [
        'Web applications',
        'Content management systems',
        'E-commerce platforms',
        'Small to medium business applications'
      ],
      performance: 7,
      scalability: 5,
      complexity: 3,
      cost: 2,
      community: 9,
      maturity: 9
    },
    {
      id: 'cassandra',
      name: 'Apache Cassandra',
      category: 'NoSQL Databases',
      description: 'Distributed NoSQL database designed for high availability and scalability.',
      pros: [
        'Excellent horizontal scalability',
        'High availability and fault tolerance',
        'Linear scalability',
        'No single point of failure',
        'Good for time-series data'
      ],
      cons: [
        'Complex data modeling',
        'Limited query capabilities',
        'Eventual consistency',
        'Steep learning curve'
      ],
      useCases: [
        'Time-series data',
        'IoT applications',
        'High-volume logging',
        'Global distributed applications'
      ],
      performance: 8,
      scalability: 10,
      complexity: 7,
      cost: 5,
      community: 7,
      maturity: 8
    },
    {
      id: 'elasticsearch',
      name: 'Elasticsearch',
      category: 'Search & Analytics',
      description: 'Distributed search and analytics engine built on Apache Lucene.',
      pros: [
        'Powerful full-text search capabilities',
        'Real-time analytics and aggregations',
        'Horizontal scaling',
        'Rich query DSL',
        'Strong ecosystem (ELK stack)'
      ],
      cons: [
        'Resource-intensive',
        'Complex configuration',
        'Not suitable as primary database',
        'Steep learning curve'
      ],
      useCases: [
        'Search engines',
        'Log analytics',
        'Business intelligence',
        'Real-time monitoring'
      ],
      performance: 9,
      scalability: 8,
      complexity: 6,
      cost: 6,
      community: 8,
      maturity: 8
    }
  ];

  const frontendTechnologies = [
    {
      id: 'react',
      name: 'React',
      category: 'Frontend Frameworks',
      description: 'Popular JavaScript library for building user interfaces with component-based architecture.',
      pros: [
        'Large ecosystem and community',
        'Virtual DOM for performance',
        'Component reusability',
        'Strong developer tools',
        'Backed by Facebook'
      ],
      cons: [
        'Steep learning curve for beginners',
        'Rapid ecosystem changes',
        'Requires additional libraries for full functionality',
        'JSX syntax can be polarizing'
      ],
      useCases: [
        'Single-page applications',
        'Progressive web apps',
        'Mobile apps (React Native)',
        'Complex user interfaces'
      ],
      performance: 8,
      scalability: 8,
      complexity: 6,
      cost: 2,
      community: 10,
      maturity: 9
    },
    {
      id: 'vue',
      name: 'Vue.js',
      category: 'Frontend Frameworks',
      description: 'Progressive JavaScript framework for building user interfaces.',
      pros: [
        'Easy to learn and adopt',
        'Excellent documentation',
        'Flexible and lightweight',
        'Good performance',
        'Progressive framework'
      ],
      cons: [
        'Smaller ecosystem compared to React',
        'Less enterprise adoption',
        'Limited mobile development options',
        'Smaller community'
      ],
      useCases: [
        'Small to medium applications',
        'Rapid prototyping',
        'Progressive web apps',
        'Component libraries'
      ],
      performance: 8,
      scalability: 7,
      complexity: 4,
      cost: 2,
      community: 7,
      maturity: 8
    },
    {
      id: 'angular',
      name: 'Angular',
      category: 'Frontend Frameworks',
      description: 'Platform and framework for building mobile and desktop web applications.',
      pros: [
        'Full-featured framework',
        'Strong TypeScript support',
        'Enterprise-ready',
        'Comprehensive tooling',
        'Backed by Google'
      ],
      cons: [
        'Steep learning curve',
        'Large bundle size',
        'Complex for simple applications',
        'Opinionated architecture'
      ],
      useCases: [
        'Enterprise applications',
        'Large-scale applications',
        'Complex business applications',
        'Applications requiring strong typing'
      ],
      performance: 7,
      scalability: 9,
      complexity: 8,
      cost: 3,
      community: 8,
      maturity: 9
    }
  ];

  const backendTechnologies = [
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'Backend Runtime',
      description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
      pros: [
        'Single language for frontend and backend',
        'Large ecosystem (npm)',
        'Good for real-time applications',
        'Fast development cycle',
        'Strong community'
      ],
      cons: [
        'Single-threaded nature',
        'Callback hell (without proper patterns)',
        'Not suitable for CPU-intensive tasks',
        'Rapid ecosystem changes'
      ],
      useCases: [
        'Real-time applications',
        'APIs and microservices',
        'Full-stack JavaScript applications',
        'IoT applications'
      ],
      performance: 7,
      scalability: 7,
      complexity: 5,
      cost: 2,
      community: 9,
      maturity: 8
    },
    {
      id: 'python',
      name: 'Python',
      category: 'Backend Languages',
      description: 'High-level programming language with emphasis on code readability.',
      pros: [
        'Easy to learn and read',
        'Extensive libraries and frameworks',
        'Strong in data science and AI',
        'Rapid development',
        'Large community'
      ],
      cons: [
        'Slower execution speed',
        'Global Interpreter Lock (GIL)',
        'Not ideal for mobile development',
        'Version compatibility issues'
      ],
      useCases: [
        'Web applications (Django, Flask)',
        'Data science and analytics',
        'Machine learning and AI',
        'Automation and scripting'
      ],
      performance: 5,
      scalability: 6,
      complexity: 3,
      cost: 2,
      community: 9,
      maturity: 9
    },
    {
      id: 'java',
      name: 'Java',
      category: 'Backend Languages',
      description: 'Object-oriented programming language designed for portability and reliability.',
      pros: [
        'Platform independence',
        'Strong enterprise adoption',
        'Excellent performance',
        'Mature ecosystem',
        'Strong typing and safety'
      ],
      cons: [
        'Verbose syntax',
        'Memory overhead',
        'Slower development cycle',
        'Complex for simple applications'
      ],
      useCases: [
        'Enterprise applications',
        'Large-scale systems',
        'Android development',
        'Financial systems'
      ],
      performance: 8,
      scalability: 9,
      complexity: 7,
      cost: 4,
      community: 8,
      maturity: 10
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Master software architecture through {totalCaseStudies}+ real-world case studies, best practices, and proven patterns from industry leaders.
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              {totalCaseStudies}+ Case Studies
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              15+ Industries
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
              Global Scale
            </div>
          </div>
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
              {/* Search and Filters */}
              <div className="mb-8">
                {/* Search Bar */}
                <div className="mb-6">
                  <div className="max-w-md mx-auto">
                    <input
                      type="text"
                      placeholder="Search case studies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Filter Controls */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Industry Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select
                      value={selectedIndustry}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry === 'all' ? 'All Industries' : industry}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Complexity Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Complexity</label>
                    <select
                      value={selectedComplexity}
                      onChange={(e) => setSelectedComplexity(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      {complexities.map((complexity) => (
                        <option key={complexity} value={complexity}>
                          {complexity === 'all' ? 'All Complexities' : complexity}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Results Count */}
                <div className="text-center mb-4">
                  <p className="text-gray-600">
                    Showing {filteredCount} of {totalCaseStudies} case studies
                  </p>
                </div>
              </div>

              {/* Case Studies Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCaseStudies.map((study) => (
                  <div key={study.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800">{study.company}</h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {study.year}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-semibold text-gray-700 mb-3">{study.title}</h4>
                      <p className="text-gray-600 mb-4 text-sm">{study.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {study.architecture}
                        </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          {study.industry}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          study.complexity === 'High' ? 'bg-red-100 text-red-800' :
                          study.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {study.complexity}
                        </span>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                        <div>
                          <span className="text-gray-500">Team Size:</span>
                          <span className="ml-1 font-medium">{study.teamSize}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Budget:</span>
                          <span className="ml-1 font-medium">{study.budget}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Timeline:</span>
                          <span className="ml-1 font-medium">{study.timeline}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Scale:</span>
                          <span className="ml-1 font-medium">{study.scale}</span>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-800 mb-2 text-sm">Technologies:</h5>
                        <div className="flex flex-wrap gap-1">
                          {study.technologies.slice(0, 4).map((tech, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                          {study.technologies.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              +{study.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Key Results */}
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-2 text-sm">Key Results:</h5>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {study.results.slice(0, 3).map((result, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-500 mr-2 mt-0.5">✓</span>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results Message */}
              {filteredCaseStudies.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No case studies found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                </div>
              )}
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
            <div className="space-y-8">
              {/* Architecture Patterns */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Architecture Patterns</h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Microservices Pattern</h4>
                    <p className="text-gray-600 mb-3">Decompose applications into small, independent services that communicate via APIs.</p>
                    <div className="text-sm text-gray-500 mb-2">
                      <strong>Use when:</strong> Large, complex applications with multiple teams
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>Benefits:</strong> Independent deployment, technology diversity, team autonomy
                    </div>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Event-Driven Architecture</h4>
                    <p className="text-gray-600 mb-3">Use events to trigger and communicate between decoupled services.</p>
                    <div className="text-sm text-gray-500 mb-2">
                      <strong>Use when:</strong> Real-time processing and loose coupling needed
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>Benefits:</strong> Scalability, loose coupling, real-time processing
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">CQRS Pattern</h4>
                    <p className="text-gray-600 mb-3">Separate read and write operations for different models.</p>
                    <div className="text-sm text-gray-500 mb-2">
                      <strong>Use when:</strong> Complex queries and high read/write ratios
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>Benefits:</strong> Optimized read/write performance, independent scaling
                    </div>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">API Gateway Pattern</h4>
                    <p className="text-gray-600 mb-3">Single entry point for all client requests to microservices.</p>
                    <div className="text-sm text-gray-500 mb-2">
                      <strong>Use when:</strong> Multiple microservices need unified access
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>Benefits:</strong> Centralized routing, authentication, rate limiting
                    </div>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Circuit Breaker Pattern</h4>
                    <p className="text-gray-600 mb-3">Prevent cascading failures by monitoring for failures and stopping the flow.</p>
                    <div className="text-sm text-gray-500 mb-2">
                      <strong>Use when:</strong> Calling external services that might fail
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>Benefits:</strong> Fault tolerance, graceful degradation, system stability
                    </div>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Saga Pattern</h4>
                    <p className="text-gray-600 mb-3">Manage distributed transactions across multiple services.</p>
                    <div className="text-sm text-gray-500 mb-2">
                      <strong>Use when:</strong> Distributed transactions across microservices
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>Benefits:</strong> Data consistency, transaction management, fault recovery
                    </div>
                  </div>

                  <div className="border-l-4 border-teal-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Bulkhead Pattern</h4>
                    <p className="text-gray-600 mb-3">Isolate critical resources to prevent cascading failures.</p>
                    <div className="text-sm text-gray-500 mb-2">
                      <strong>Use when:</strong> Need to isolate critical resources
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>Benefits:</strong> Fault isolation, resource protection, system resilience
                    </div>
                  </div>

                  <div className="border-l-4 border-pink-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Sidecar Pattern</h4>
                    <p className="text-gray-600 mb-3">Deploy supporting services alongside main application components.</p>
                    <div className="text-sm text-gray-500 mb-2">
                      <strong>Use when:</strong> Need cross-cutting concerns (logging, monitoring)
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>Benefits:</strong> Separation of concerns, reusability, maintainability
                    </div>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Strangler Fig Pattern</h4>
                    <p className="text-gray-600 mb-3">Gradually replace legacy systems by building new systems around them.</p>
                    <div className="text-sm text-gray-500 mb-2">
                      <strong>Use when:</strong> Migrating from monolithic to microservices
                    </div>
                    <div className="text-sm text-gray-500">
                      <strong>Benefits:</strong> Risk reduction, gradual migration, business continuity
                    </div>
                  </div>
                </div>
              </div>

              {/* Anti-Patterns */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Architecture Anti-Patterns</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">God Object</h4>
                    <p className="text-gray-600 mb-3">A single class or service that handles too many responsibilities.</p>
                    <div className="text-sm text-red-600 mb-2">
                      <strong>Problems:</strong> Hard to maintain, test, and extend
                    </div>
                    <div className="text-sm text-green-600">
                      <strong>Solution:</strong> Apply Single Responsibility Principle
                    </div>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Distributed Monolith</h4>
                    <p className="text-gray-600 mb-3">Microservices that are tightly coupled and must be deployed together.</p>
                    <div className="text-sm text-red-600 mb-2">
                      <strong>Problems:</strong> No independent deployment, tight coupling
                    </div>
                    <div className="text-sm text-green-600">
                      <strong>Solution:</strong> Design for loose coupling and independent deployment
                    </div>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Database per Service</h4>
                    <p className="text-gray-600 mb-3">Sharing databases across multiple microservices.</p>
                    <div className="text-sm text-red-600 mb-2">
                      <strong>Problems:</strong> Data coupling, deployment dependencies
                    </div>
                    <div className="text-sm text-green-600">
                      <strong>Solution:</strong> Implement database per service pattern
                    </div>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Shared Database</h4>
                    <p className="text-gray-600 mb-3">Multiple services sharing the same database instance.</p>
                    <div className="text-sm text-red-600 mb-2">
                      <strong>Problems:</strong> Data coupling, schema conflicts, deployment issues
                    </div>
                    <div className="text-sm text-green-600">
                      <strong>Solution:</strong> Use database per service or event sourcing
                    </div>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Anemic Domain Model</h4>
                    <p className="text-gray-600 mb-3">Domain objects with only data and no business logic.</p>
                    <div className="text-sm text-red-600 mb-2">
                      <strong>Problems:</strong> Business logic scattered, poor encapsulation
                    </div>
                    <div className="text-sm text-green-600">
                      <strong>Solution:</strong> Implement rich domain models with behavior
                    </div>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Spaghetti Architecture</h4>
                    <p className="text-gray-600 mb-3">Unstructured, tangled dependencies between components.</p>
                    <div className="text-sm text-red-600 mb-2">
                      <strong>Problems:</strong> Hard to understand, maintain, and test
                    </div>
                    <div className="text-sm text-green-600">
                      <strong>Solution:</strong> Apply clean architecture principles
                    </div>
                  </div>
                </div>
              </div>

              {/* Design Principles */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Design Principles</h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">SOLID Principles</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Single Responsibility Principle</li>
                      <li>• Open/Closed Principle</li>
                      <li>• Liskov Substitution Principle</li>
                      <li>• Interface Segregation Principle</li>
                      <li>• Dependency Inversion Principle</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">DRY Principle</h4>
                    <p className="text-sm text-gray-600">Don't Repeat Yourself - Avoid code duplication and promote reusability.</p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">KISS Principle</h4>
                    <p className="text-sm text-gray-600">Keep It Simple, Stupid - Favor simplicity over complexity.</p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">YAGNI Principle</h4>
                    <p className="text-sm text-gray-600">You Aren't Gonna Need It - Don't implement features until needed.</p>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Fail Fast</h4>
                    <p className="text-sm text-gray-600">Detect and handle errors as early as possible in the system.</p>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Separation of Concerns</h4>
                    <p className="text-sm text-gray-600">Separate different aspects of functionality into distinct modules.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'diagrams' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Interactive Architecture Diagrams</h3>
                <p className="text-gray-600">Click on components to learn more about their role in different architecture patterns</p>
              </div>

              {/* Diagram Selection */}
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-xl p-2 shadow-lg">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedDiagram('microservices')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        selectedDiagram === 'microservices'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Microservices
                    </button>
                    <button
                      onClick={() => setSelectedDiagram('event-driven')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        selectedDiagram === 'event-driven'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Event-Driven
                    </button>
                    <button
                      onClick={() => setSelectedDiagram('serverless')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        selectedDiagram === 'serverless'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Serverless
                    </button>
                    <button
                      onClick={() => setSelectedDiagram('monolithic')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        selectedDiagram === 'monolithic'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      Monolithic
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Dynamic Diagram Display */}
              {selectedDiagram === 'microservices' && (
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Microservices Architecture</h4>
                  <p className="text-gray-600 mb-6">A distributed system where applications are built as a collection of loosely coupled services.</p>
                  <ArchitectureDiagram
                    title={microservicesDiagram.title}
                    description={microservicesDiagram.description}
                    nodes={microservicesDiagram.nodes}
                    onNodeClick={(node) => console.log('Clicked:', node.label)}
                  />
                </div>
              )}

              {selectedDiagram === 'event-driven' && (
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Event-Driven Architecture</h4>
                  <p className="text-gray-600 mb-6">Architecture pattern that uses events to trigger and communicate between decoupled services.</p>
                  <ArchitectureDiagram
                    title="Event-Driven Architecture"
                    description="Interactive diagram showing event-driven architecture with event producers, event streams, and event consumers."
                    nodes={[
                      {
                        id: 'event-producer',
                        label: 'Event Producer',
                        type: 'service' as const,
                        position: { x: 100, y: 50 },
                        connections: ['event-stream'],
                        description: 'Services that generate events based on business logic or user actions.'
                      },
                      {
                        id: 'event-stream',
                        label: 'Event Stream (Kafka)',
                        type: 'queue' as const,
                        position: { x: 300, y: 50 },
                        connections: ['event-producer', 'event-processor-1', 'event-processor-2', 'event-processor-3'],
                        description: 'Central event streaming platform that stores and distributes events to consumers.'
                      },
                      {
                        id: 'event-processor-1',
                        label: 'Order Processor',
                        type: 'service' as const,
                        position: { x: 200, y: 150 },
                        connections: ['event-stream', 'order-db'],
                        description: 'Processes order-related events and updates order status.'
                      },
                      {
                        id: 'event-processor-2',
                        label: 'Inventory Processor',
                        type: 'service' as const,
                        position: { x: 300, y: 150 },
                        connections: ['event-stream', 'inventory-db'],
                        description: 'Handles inventory updates based on order events.'
                      },
                      {
                        id: 'event-processor-3',
                        label: 'Notification Processor',
                        type: 'service' as const,
                        position: { x: 400, y: 150 },
                        connections: ['event-stream', 'notification-service'],
                        description: 'Sends notifications to users based on various events.'
                      },
                      {
                        id: 'order-db',
                        label: 'Order DB',
                        type: 'database' as const,
                        position: { x: 200, y: 250 },
                        connections: ['event-processor-1'],
                        description: 'Stores order information and status updates.'
                      },
                      {
                        id: 'inventory-db',
                        label: 'Inventory DB',
                        type: 'database' as const,
                        position: { x: 300, y: 250 },
                        connections: ['event-processor-2'],
                        description: 'Manages product inventory and stock levels.'
                      },
                      {
                        id: 'notification-service',
                        label: 'Notification Service',
                        type: 'service' as const,
                        position: { x: 400, y: 250 },
                        connections: ['event-processor-3'],
                        description: 'Handles email, SMS, and push notifications.'
                      }
                    ]}
                    onNodeClick={(node) => console.log('Clicked:', node.label)}
                  />
                </div>
              )}

              {selectedDiagram === 'serverless' && (
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Serverless Architecture</h4>
                  <p className="text-gray-600 mb-6">Cloud computing execution model where the cloud provider manages server infrastructure.</p>
                  <ArchitectureDiagram
                    title="Serverless Architecture"
                    description="Interactive diagram showing serverless architecture with API Gateway, Lambda functions, and managed services."
                    nodes={[
                      {
                        id: 'api-gateway',
                        label: 'API Gateway',
                        type: 'gateway' as const,
                        position: { x: 300, y: 50 },
                        connections: ['lambda-auth', 'lambda-orders', 'lambda-users'],
                        description: 'Manages API requests, authentication, and routing to appropriate Lambda functions.'
                      },
                      {
                        id: 'lambda-auth',
                        label: 'Auth Lambda',
                        type: 'service' as const,
                        position: { x: 150, y: 150 },
                        connections: ['api-gateway', 'cognito'],
                        description: 'Handles user authentication and authorization using AWS Cognito.'
                      },
                      {
                        id: 'lambda-orders',
                        label: 'Orders Lambda',
                        type: 'service' as const,
                        position: { x: 300, y: 150 },
                        connections: ['api-gateway', 'dynamodb-orders'],
                        description: 'Processes order creation, updates, and retrieval operations.'
                      },
                      {
                        id: 'lambda-users',
                        label: 'Users Lambda',
                        type: 'service' as const,
                        position: { x: 450, y: 150 },
                        connections: ['api-gateway', 'dynamodb-users'],
                        description: 'Manages user profiles and account information.'
                      },
                      {
                        id: 'cognito',
                        label: 'Cognito',
                        type: 'database' as const,
                        position: { x: 150, y: 250 },
                        connections: ['lambda-auth'],
                        description: 'AWS Cognito for user authentication and user pools.'
                      },
                      {
                        id: 'dynamodb-orders',
                        label: 'DynamoDB Orders',
                        type: 'database' as const,
                        position: { x: 300, y: 250 },
                        connections: ['lambda-orders'],
                        description: 'NoSQL database for storing order data with automatic scaling.'
                      },
                      {
                        id: 'dynamodb-users',
                        label: 'DynamoDB Users',
                        type: 'database' as const,
                        position: { x: 450, y: 250 },
                        connections: ['lambda-users'],
                        description: 'NoSQL database for storing user profile information.'
                      },
                      {
                        id: 's3',
                        label: 'S3 Storage',
                        type: 'database' as const,
                        position: { x: 300, y: 350 },
                        connections: [],
                        description: 'Object storage for static files, images, and documents.'
                      }
                    ]}
                    onNodeClick={(node) => console.log('Clicked:', node.label)}
                  />
                </div>
              )}

              {selectedDiagram === 'monolithic' && (
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Monolithic Architecture</h4>
                  <p className="text-gray-600 mb-6">Traditional architecture where all components are built and deployed as a single unit.</p>
                  <ArchitectureDiagram
                    title="Monolithic Architecture"
                    description="Interactive diagram showing monolithic architecture with all components in a single application."
                    nodes={[
                      {
                        id: 'load-balancer',
                        label: 'Load Balancer',
                        type: 'gateway' as const,
                        position: { x: 300, y: 50 },
                        connections: ['app-instance-1', 'app-instance-2'],
                        description: 'Distributes incoming requests across multiple application instances.'
                      },
                      {
                        id: 'app-instance-1',
                        label: 'App Instance 1',
                        type: 'service' as const,
                        position: { x: 200, y: 150 },
                        connections: ['load-balancer', 'monolithic-app'],
                        description: 'First instance of the monolithic application.'
                      },
                      {
                        id: 'app-instance-2',
                        label: 'App Instance 2',
                        type: 'service' as const,
                        position: { x: 400, y: 150 },
                        connections: ['load-balancer', 'monolithic-app'],
                        description: 'Second instance of the monolithic application for redundancy.'
                      },
                      {
                        id: 'monolithic-app',
                        label: 'Monolithic App',
                        type: 'service' as const,
                        position: { x: 300, y: 250 },
                        connections: ['app-instance-1', 'app-instance-2', 'database'],
                        description: 'Single application containing all business logic, UI, and data access layers.'
                      },
                      {
                        id: 'database',
                        label: 'Database',
                        type: 'database' as const,
                        position: { x: 300, y: 350 },
                        connections: ['monolithic-app'],
                        description: 'Single database serving all application components and data.'
                      }
                    ]}
                    onNodeClick={(node) => console.log('Clicked:', node.label)}
                  />
                </div>
              )}

              {/* Architecture Comparison Table */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h4 className="text-xl font-bold text-gray-800 mb-6">Architecture Pattern Comparison</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Aspect</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Monolithic</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Microservices</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Event-Driven</th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Serverless</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Complexity</td>
                        <td className="border border-gray-300 px-4 py-2">Low</td>
                        <td className="border border-gray-300 px-4 py-2">High</td>
                        <td className="border border-gray-300 px-4 py-2">Medium</td>
                        <td className="border border-gray-300 px-4 py-2">Low</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Scalability</td>
                        <td className="border border-gray-300 px-4 py-2">Limited</td>
                        <td className="border border-gray-300 px-4 py-2">Excellent</td>
                        <td className="border border-gray-300 px-4 py-2">Excellent</td>
                        <td className="border border-gray-300 px-4 py-2">Automatic</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Deployment</td>
                        <td className="border border-gray-300 px-4 py-2">Simple</td>
                        <td className="border border-gray-300 px-4 py-2">Complex</td>
                        <td className="border border-gray-300 px-4 py-2">Medium</td>
                        <td className="border border-gray-300 px-4 py-2">Simple</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Team Independence</td>
                        <td className="border border-gray-300 px-4 py-2">Low</td>
                        <td className="border border-gray-300 px-4 py-2">High</td>
                        <td className="border border-gray-300 px-4 py-2">Medium</td>
                        <td className="border border-gray-300 px-4 py-2">High</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Technology Diversity</td>
                        <td className="border border-gray-300 px-4 py-2">Limited</td>
                        <td className="border border-gray-300 px-4 py-2">High</td>
                        <td className="border border-gray-300 px-4 py-2">Medium</td>
                        <td className="border border-gray-300 px-4 py-2">Limited</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Cost</td>
                        <td className="border border-gray-300 px-4 py-2">Low</td>
                        <td className="border border-gray-300 px-4 py-2">High</td>
                        <td className="border border-gray-300 px-4 py-2">Medium</td>
                        <td className="border border-gray-300 px-4 py-2">Pay-per-use</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Best For</td>
                        <td className="border border-gray-300 px-4 py-2">Small teams, simple apps</td>
                        <td className="border border-gray-300 px-4 py-2">Large teams, complex apps</td>
                        <td className="border border-gray-300 px-4 py-2">Real-time processing</td>
                        <td className="border border-gray-300 px-4 py-2">Event-driven, variable load</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Architecture Decision Guide */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h4 className="text-xl font-bold text-gray-800 mb-6">Architecture Decision Guide</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h5 className="font-semibold text-gray-800">Choose Monolithic When:</h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Small team (1-5 developers)</li>
                      <li>• Simple application requirements</li>
                      <li>• Rapid prototyping and MVP development</li>
                      <li>• Limited budget and resources</li>
                      <li>• Single technology stack preferred</li>
                      <li>• Predictable and stable load</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h5 className="font-semibold text-gray-800">Choose Microservices When:</h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Large team (10+ developers)</li>
                      <li>• Complex business domain</li>
                      <li>• Need for independent scaling</li>
                      <li>• Multiple technology stacks required</li>
                      <li>• High availability requirements</li>
                      <li>• Long-term maintenance and evolution</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h5 className="font-semibold text-gray-800">Choose Event-Driven When:</h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Real-time data processing needed</li>
                      <li>• Loose coupling between services</li>
                      <li>• Asynchronous processing requirements</li>
                      <li>• Integration with external systems</li>
                      <li>• Audit trail and event sourcing</li>
                      <li>• Complex business workflows</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h5 className="font-semibold text-gray-800">Choose Serverless When:</h5>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Variable or unpredictable load</li>
                      <li>• Event-driven processing</li>
                      <li>• Cost optimization important</li>
                      <li>• Rapid development and deployment</li>
                      <li>• Limited operational overhead</li>
                      <li>• Integration with cloud services</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comparison' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Technology Comparison</h3>
                <p className="text-gray-600">Compare different technologies to make informed decisions</p>
              </div>
              
              {/* Database Technologies */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h4 className="text-xl font-bold text-gray-800 mb-6">Database Technologies</h4>
                <TechnologyComparison
                  technologies={databaseTechnologies}
                  category="Database Technologies"
                />
              </div>

              {/* Frontend Technologies */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h4 className="text-xl font-bold text-gray-800 mb-6">Frontend Technologies</h4>
                <TechnologyComparison
                  technologies={frontendTechnologies}
                  category="Frontend Frameworks"
                />
              </div>

              {/* Backend Technologies */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h4 className="text-xl font-bold text-gray-800 mb-6">Backend Technologies</h4>
                <TechnologyComparison
                  technologies={backendTechnologies}
                  category="Backend Technologies"
                />
              </div>

              {/* Technology Stack Recommendations */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h4 className="text-xl font-bold text-gray-800 mb-6">Recommended Technology Stacks</h4>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h5 className="font-semibold text-gray-800 mb-3">Modern Web Stack</h5>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Frontend:</span> React + TypeScript</div>
                      <div><span className="font-medium">Backend:</span> Node.js + Express</div>
                      <div><span className="font-medium">Database:</span> PostgreSQL + Redis</div>
                      <div><span className="font-medium">Deployment:</span> Docker + Kubernetes</div>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Best for: Full-stack JavaScript applications, rapid development
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h5 className="font-semibold text-gray-800 mb-3">Enterprise Stack</h5>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Frontend:</span> Angular + TypeScript</div>
                      <div><span className="font-medium">Backend:</span> Java + Spring Boot</div>
                      <div><span className="font-medium">Database:</span> PostgreSQL + Elasticsearch</div>
                      <div><span className="font-medium">Deployment:</span> Kubernetes + Jenkins</div>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Best for: Large-scale enterprise applications, high reliability
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h5 className="font-semibold text-gray-800 mb-3">Data-Intensive Stack</h5>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Frontend:</span> React + D3.js</div>
                      <div><span className="font-medium">Backend:</span> Python + FastAPI</div>
                      <div><span className="font-medium">Database:</span> MongoDB + Redis</div>
                      <div><span className="font-medium">Analytics:</span> Apache Kafka + Spark</div>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Best for: Data analytics, machine learning, real-time processing
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h5 className="font-semibold text-gray-800 mb-3">Microservices Stack</h5>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Frontend:</span> Vue.js + Nuxt.js</div>
                      <div><span className="font-medium">Backend:</span> Go + gRPC</div>
                      <div><span className="font-medium">Database:</span> PostgreSQL + Cassandra</div>
                      <div><span className="font-medium">Messaging:</span> Apache Kafka</div>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Best for: High-performance microservices, distributed systems
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h5 className="font-semibold text-gray-800 mb-3">Startup Stack</h5>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Frontend:</span> React + Next.js</div>
                      <div><span className="font-medium">Backend:</span> Node.js + Prisma</div>
                      <div><span className="font-medium">Database:</span> PostgreSQL</div>
                      <div><span className="font-medium">Deployment:</span> Vercel + Railway</div>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Best for: Rapid prototyping, MVP development, cost-effective
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h5 className="font-semibold text-gray-800 mb-3">AI/ML Stack</h5>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Frontend:</span> React + TensorFlow.js</div>
                      <div><span className="font-medium">Backend:</span> Python + FastAPI</div>
                      <div><span className="font-medium">Database:</span> PostgreSQL + Vector DB</div>
                      <div><span className="font-medium">ML:</span> TensorFlow + PyTorch</div>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Best for: AI applications, machine learning, data science
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

  export default LearningHub;