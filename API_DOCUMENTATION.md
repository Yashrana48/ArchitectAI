# API Documentation
## AI-Driven Software Architecture Decision System

### Table of Contents
1. [API Overview](#api-overview)
2. [Authentication](#authentication)
3. [Endpoints](#endpoints)
4. [Data Models](#data-models)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [SDK Examples](#sdk-examples)
8. [Testing](#testing)

---

## 1. API Overview

### 1.1 Base URL
```
Production: https://api.architectai.com/v1
Development: http://localhost:3000/api
```

### 1.2 API Versioning
The API uses URL-based versioning:
- Current version: `v1`
- Future versions: `v2`, `v3`, etc.

### 1.3 Content Type
All API requests and responses use JSON format:
```
Content-Type: application/json
```

### 1.4 Response Format
All API responses follow a consistent format:

#### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully",
  "timestamp": "2024-12-19T10:30:00Z",
  "requestId": "req_123456789"
}
```

#### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  },
  "timestamp": "2024-12-19T10:30:00Z",
  "requestId": "req_123456789"
}
```

---

## 2. Authentication

### 2.1 Authentication Methods

#### 2.1.1 JWT Token Authentication
The API uses JWT (JSON Web Tokens) for authentication:

```http
Authorization: Bearer <jwt_token>
```

#### 2.1.2 Token Generation
Tokens are generated during login and registration:

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "username": "johndoe"
    },
    "expiresIn": 3600
  }
}
```

### 2.2 Token Management

#### 2.2.1 Token Expiration
- **Access Token**: 1 hour
- **Refresh Token**: 7 days
- **Auto-refresh**: Automatic token refresh before expiration

#### 2.2.2 Token Refresh
```http
POST /api/auth/refresh
Authorization: Bearer <refresh_token>
```

---

## 3. Endpoints

### 3.1 Authentication Endpoints

#### 3.1.1 User Registration
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "company": "Acme Corp",
    "role": "Software Architect"
  }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "username": "johndoe",
      "email": "john@example.com",
      "profile": { ... }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 3.1.2 User Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### 3.1.3 Get User Profile
```http
GET /api/auth/profile
Authorization: Bearer <jwt_token>
```

#### 3.1.4 Update User Profile
```http
PUT /api/auth/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "company": "New Company",
    "role": "Senior Architect"
  }
}
```

#### 3.1.5 Logout
```http
POST /api/auth/logout
Authorization: Bearer <jwt_token>
```

### 3.2 Recommendation Endpoints

#### 3.2.1 Generate Recommendations
```http
POST /api/recommendations/generate
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "requirements": {
    "projectType": "Web Application",
    "industry": "E-commerce",
    "expectedUsers": "100,000 - 1 million users",
    "teamSize": "5-10 developers",
    "timeline": "6-12 months",
    "budget": "Medium",
    "scalability": "High",
    "maintainability": "High",
    "performance": "High",
    "security": "High"
  }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "pattern": "Microservices",
        "score": 92,
        "confidence": 0.89,
        "justification": "Microservices architecture is ideal for your e-commerce platform...",
        "pros": [
          "High scalability",
          "Independent deployment",
          "Technology diversity"
        ],
        "cons": [
          "Increased complexity",
          "Network latency",
          "Data consistency challenges"
        ],
        "risks": [
          "Distributed system complexity",
          "Service communication overhead"
        ],
        "mitigation": [
          "Implement service mesh",
          "Use event-driven architecture"
        ],
        "implementation": {
          "phases": [
            "Phase 1: Core services",
            "Phase 2: Business services",
            "Phase 3: Integration services"
          ],
          "timeline": "6-8 months",
          "teamSize": "8-12 developers"
        }
      }
    ],
    "analysis": {
      "complexity": "High",
      "scalability": "Excellent",
      "maintainability": "Good",
      "cost": "Medium-High"
    },
    "metadata": {
      "generatedAt": "2024-12-19T10:30:00Z",
      "engineVersion": "1.0.0",
      "processingTime": 2.3
    }
  }
}
```

#### 3.2.2 Get Available Architectures
```http
GET /api/recommendations/architectures
```

Response:
```json
{
  "success": true,
  "data": {
    "architectures": [
      {
        "id": "microservices",
        "name": "Microservices",
        "description": "Distributed system architecture",
        "complexity": "High",
        "scalability": "Excellent",
        "maintainability": "Good"
      },
      {
        "id": "monolithic",
        "name": "Monolithic",
        "description": "Single-tier application architecture",
        "complexity": "Low",
        "scalability": "Limited",
        "maintainability": "Poor"
      }
    ]
  }
}
```

#### 3.2.3 Get Recommendation by ID
```http
GET /api/recommendations/:id
Authorization: Bearer <jwt_token>
```

### 3.3 Chat Endpoints

#### 3.3.1 Send Message
```http
POST /api/chat/send
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "message": "What architecture pattern should I use for a real-time chat application?",
  "context": [
    {
      "role": "user",
      "content": "I'm building a chat application"
    },
    {
      "role": "assistant",
      "content": "What are your scalability requirements?"
    }
  ]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "response": "For a real-time chat application, I recommend considering an Event-Driven Architecture with WebSockets...",
    "followUpQuestions": [
      "What's your expected user base size?",
      "Do you need message persistence?",
      "What's your team's experience with real-time systems?"
    ],
    "relatedCaseStudies": [
      {
        "id": "case_123",
        "title": "WhatsApp Architecture",
        "relevance": 0.95
      }
    ],
    "metadata": {
      "responseTime": 1.2,
      "model": "gpt-3.5-turbo",
      "tokens": 150
    }
  }
}
```

#### 3.3.2 Get Chat History
```http
GET /api/chat/history
Authorization: Bearer <jwt_token>
```

Response:
```json
{
  "success": true,
  "data": {
    "sessions": [
      {
        "id": "session_123",
        "title": "Architecture Discussion",
        "messages": [
          {
            "role": "user",
            "content": "What architecture pattern should I use?",
            "timestamp": "2024-12-19T10:30:00Z"
          },
          {
            "role": "assistant",
            "content": "Based on your requirements...",
            "timestamp": "2024-12-19T10:30:05Z"
          }
        ],
        "createdAt": "2024-12-19T10:30:00Z",
        "updatedAt": "2024-12-19T10:30:05Z"
      }
    ]
  }
}
```

#### 3.3.3 Delete Chat History
```http
DELETE /api/chat/history
Authorization: Bearer <jwt_token>
```

### 3.4 Learning Endpoints

#### 3.4.1 Get Case Studies
```http
GET /api/learning/case-studies
```

Query Parameters:
- `industry` (optional): Filter by industry
- `architecture` (optional): Filter by architecture pattern
- `complexity` (optional): Filter by complexity level
- `search` (optional): Search in case study content
- `limit` (optional): Number of results (default: 20)
- `offset` (optional): Pagination offset (default: 0)

Response:
```json
{
  "success": true,
  "data": {
    "caseStudies": [
      {
        "id": "case_123",
        "title": "Netflix Microservices Architecture",
        "company": "Netflix",
        "industry": "Entertainment",
        "architecture": "Microservices",
        "complexity": "High",
        "description": "Netflix's journey from monolithic to microservices...",
        "technologies": ["Java", "Spring Boot", "Docker", "Kubernetes"],
        "results": {
          "scalability": "99.99% uptime",
          "performance": "50% faster deployment",
          "cost": "30% reduction in infrastructure costs"
        },
        "lessons": [
          "Start with a monolith",
          "Implement service mesh",
          "Focus on observability"
        ],
        "year": 2023,
        "teamSize": "500+ developers",
        "budget": "High",
        "timeline": "3 years"
      }
    ],
    "pagination": {
      "total": 100,
      "limit": 20,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

#### 3.4.2 Get Case Study by ID
```http
GET /api/learning/case-studies/:id
```

#### 3.4.3 Get Best Practices
```http
GET /api/learning/best-practices
```

Query Parameters:
- `category` (optional): Filter by category
- `search` (optional): Search in practice content

Response:
```json
{
  "success": true,
  "data": {
    "bestPractices": [
      {
        "id": "practice_123",
        "title": "Service Design Principles",
        "category": "Microservices",
        "description": "Key principles for designing microservices...",
        "implementation": [
          "Single Responsibility Principle",
          "Domain-Driven Design",
          "API-First Design"
        ],
        "benefits": [
          "Improved maintainability",
          "Better scalability",
          "Easier testing"
        ],
        "examples": [
          "Netflix service design",
          "Amazon service architecture"
        ]
      }
    ]
  }
}
```

#### 3.4.4 Get Architecture Patterns
```http
GET /api/learning/patterns
```

Response:
```json
{
  "success": true,
  "data": {
    "patterns": [
      {
        "id": "microservices",
        "name": "Microservices",
        "description": "Distributed system architecture",
        "useCases": [
          "Large-scale applications",
          "Multi-team development",
          "Technology diversity"
        ],
        "benefits": [
          "High scalability",
          "Independent deployment",
          "Technology flexibility"
        ],
        "drawbacks": [
          "Increased complexity",
          "Network latency",
          "Data consistency challenges"
        ],
        "implementation": {
          "phases": [
            "Service identification",
            "API design",
            "Data management",
            "Deployment strategy"
          ],
          "technologies": ["Docker", "Kubernetes", "Service Mesh"],
          "timeline": "6-12 months"
        }
      }
    ]
  }
}
```

### 3.5 Comparison Endpoints

#### 3.5.1 Get Architecture Patterns for Comparison
```http
GET /api/comparison/patterns
```

#### 3.5.2 Analyze Architecture Patterns
```http
POST /api/comparison/analyze
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "patterns": ["microservices", "monolithic", "event-driven"],
  "criteria": {
    "scalability": 0.3,
    "maintainability": 0.25,
    "performance": 0.2,
    "cost": 0.15,
    "complexity": 0.1
  }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "comparison": [
      {
        "pattern": "Microservices",
        "scores": {
          "scalability": 9.5,
          "maintainability": 7.0,
          "performance": 8.0,
          "cost": 6.0,
          "complexity": 4.0
        },
        "overallScore": 7.8,
        "rank": 1
      }
    ],
    "analysis": {
      "winner": "Microservices",
      "tradeoffs": [
        "Microservices excels in scalability but has higher complexity",
        "Monolithic is simpler but limited in scalability"
      ],
      "recommendations": [
        "Choose Microservices for large-scale applications",
        "Consider Monolithic for small teams and simple applications"
      ]
    }
  }
}
```

### 3.6 Saved Recommendations Endpoints

#### 3.6.1 Save Recommendation
```http
POST /api/saved-recommendations
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "projectName": "E-commerce Platform",
  "recommendation": {
    "pattern": "Microservices",
    "score": 92,
    "justification": "..."
  },
  "requirements": { ... }
}
```

#### 3.6.2 Get Saved Recommendations
```http
GET /api/saved-recommendations
Authorization: Bearer <jwt_token>
```

#### 3.6.3 Update Saved Recommendation
```http
PUT /api/saved-recommendations/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "projectName": "Updated Project Name",
  "notes": "Additional notes about the project"
}
```

#### 3.6.4 Delete Saved Recommendation
```http
DELETE /api/saved-recommendations/:id
Authorization: Bearer <jwt_token>
```

---

## 4. Data Models

### 4.1 User Model
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  password: string; // Hashed
  profile: {
    firstName: string;
    lastName: string;
    company: string;
    role: string;
  };
  preferences: {
    industry: string;
    experience: string;
    notifications: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.2 Recommendation Model
```typescript
interface Recommendation {
  id: string;
  userId: string;
  projectName: string;
  requirements: ProjectRequirements;
  recommendations: ArchitectureRecommendation[];
  analysis: {
    complexity: string;
    scalability: string;
    maintainability: string;
    cost: string;
  };
  createdAt: Date;
}

interface ArchitectureRecommendation {
  pattern: string;
  score: number;
  confidence: number;
  justification: string;
  pros: string[];
  cons: string[];
  risks: string[];
  mitigation: string[];
  implementation: {
    phases: string[];
    timeline: string;
    teamSize: string;
  };
}
```

### 4.3 Chat Session Model
```typescript
interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  context: {
    currentTopic: string;
    userPreferences: object;
    sessionData: object;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
```

### 4.4 Case Study Model
```typescript
interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  architecture: string;
  complexity: 'Low' | 'Medium' | 'High';
  description: string;
  technologies: string[];
  results: {
    scalability: string;
    performance: string;
    cost: string;
  };
  lessons: string[];
  year: number;
  teamSize: string;
  budget: string;
  timeline: string;
}
```

---

## 5. Error Handling

### 5.1 Error Codes

#### 5.1.1 HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error

#### 5.1.2 Custom Error Codes
- `VALIDATION_ERROR` - Input validation failed
- `AUTHENTICATION_ERROR` - Authentication failed
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `RESOURCE_NOT_FOUND` - Requested resource not found
- `RATE_LIMIT_EXCEEDED` - Rate limit exceeded
- `AI_SERVICE_ERROR` - AI service unavailable
- `DATABASE_ERROR` - Database operation failed

### 5.2 Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "reason": "Invalid email format",
      "value": "invalid-email"
    }
  },
  "timestamp": "2024-12-19T10:30:00Z",
  "requestId": "req_123456789"
}
```

### 5.3 Common Error Scenarios

#### 5.3.1 Validation Errors
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "reason": "Invalid email format"
      },
      {
        "field": "password",
        "reason": "Password must be at least 8 characters"
      }
    ]
  }
}
```

#### 5.3.2 Authentication Errors
```json
{
  "success": false,
  "error": {
    "code": "AUTHENTICATION_ERROR",
    "message": "Invalid credentials",
    "details": {
      "reason": "Email or password is incorrect"
    }
  }
}
```

#### 5.3.3 Rate Limit Errors
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded",
    "details": {
      "limit": 100,
      "remaining": 0,
      "resetTime": "2024-12-19T11:00:00Z"
    }
  }
}
```

---

## 6. Rate Limiting

### 6.1 Rate Limit Policies

#### 6.1.1 Default Limits
- **Authentication**: 5 requests per minute
- **Recommendations**: 10 requests per minute
- **Chat**: 20 requests per minute
- **Learning**: 30 requests per minute
- **General**: 100 requests per hour

#### 6.1.2 Rate Limit Headers
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

### 6.2 Rate Limit Exceeded Response
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded",
    "details": {
      "limit": 100,
      "remaining": 0,
      "resetTime": "2024-12-19T11:00:00Z"
    }
  }
}
```

---

## 7. SDK Examples

### 7.1 JavaScript/Node.js SDK

#### 7.1.1 Installation
```bash
npm install architectai-sdk
```

#### 7.1.2 Basic Usage
```javascript
const ArchitectAI = require('architectai-sdk');

const client = new ArchitectAI({
  apiKey: 'your-api-key',
  baseURL: 'https://api.architectai.com/v1'
});

// Generate recommendations
const recommendations = await client.recommendations.generate({
  requirements: {
    projectType: 'Web Application',
    industry: 'E-commerce',
    expectedUsers: '100,000 - 1 million users'
  }
});

// Send chat message
const response = await client.chat.send({
  message: 'What architecture pattern should I use?'
});
```

### 7.2 Python SDK

#### 7.2.1 Installation
```bash
pip install architectai-sdk
```

#### 7.2.2 Basic Usage
```python
from architectai import ArchitectAI

client = ArchitectAI(
    api_key='your-api-key',
    base_url='https://api.architectai.com/v1'
)

# Generate recommendations
recommendations = client.recommendations.generate({
    'requirements': {
        'projectType': 'Web Application',
        'industry': 'E-commerce',
        'expectedUsers': '100,000 - 1 million users'
    }
})

# Send chat message
response = client.chat.send({
    'message': 'What architecture pattern should I use?'
})
```

### 7.3 cURL Examples

#### 7.3.1 Generate Recommendations
```bash
curl -X POST https://api.architectai.com/v1/recommendations/generate \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "requirements": {
      "projectType": "Web Application",
      "industry": "E-commerce",
      "expectedUsers": "100,000 - 1 million users"
    }
  }'
```

#### 7.3.2 Send Chat Message
```bash
curl -X POST https://api.architectai.com/v1/chat/send \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What architecture pattern should I use for a real-time chat application?"
  }'
```

---

## 8. Testing

### 8.1 API Testing

#### 8.1.1 Postman Collection
A Postman collection is available for testing all API endpoints:
- Import the collection from the API documentation
- Set up environment variables for authentication
- Run individual requests or the entire collection

#### 8.1.2 Test Environment
- **Base URL**: `https://api-test.architectai.com/v1`
- **Test Data**: Pre-populated test data available
- **Rate Limits**: Higher rate limits for testing

### 8.2 SDK Testing

#### 8.2.1 Unit Tests
```javascript
const ArchitectAI = require('architectai-sdk');

describe('ArchitectAI SDK', () => {
  let client;

  beforeEach(() => {
    client = new ArchitectAI({
      apiKey: 'test-api-key',
      baseURL: 'https://api-test.architectai.com/v1'
    });
  });

  test('should generate recommendations', async () => {
    const result = await client.recommendations.generate({
      requirements: {
        projectType: 'Web Application'
      }
    });
    
    expect(result.success).toBe(true);
    expect(result.data.recommendations).toBeDefined();
  });
});
```

#### 8.2.2 Integration Tests
```javascript
describe('Integration Tests', () => {
  test('should complete full workflow', async () => {
    // 1. Register user
    const user = await client.auth.register({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    // 2. Generate recommendations
    const recommendations = await client.recommendations.generate({
      requirements: { projectType: 'Web Application' }
    });

    // 3. Save recommendation
    const saved = await client.savedRecommendations.save({
      projectName: 'Test Project',
      recommendation: recommendations.data.recommendations[0]
    });

    expect(saved.success).toBe(true);
  });
});
```

---

**Document Version**: 1.0  
**Last Updated**: December 2024  
**Author**: [Your Name]  
**Institution**: [Your University]
