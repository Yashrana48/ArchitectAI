# 7. IMPLEMENTATION

## 7.1 Introduction

This chapter presents the implementation details of the AI-driven software architecture decision support system. The implementation follows the system design specifications outlined in Chapter 6 and incorporates modern software engineering practices, including agile development, continuous integration, and comprehensive testing.

## 7.2 Development Environment and Tools

### 7.2.1 Development Setup

The development environment was configured to support the full-stack development approach:

**Frontend Development**:
- **Node.js**: Version 18.17.0 for package management and build tools
- **Vite**: Version 4.4.5 for fast development and building
- **TypeScript**: Version 4.9.5 for type-safe development
- **ESLint**: Code linting and quality assurance
- **Prettier**: Code formatting and consistency

**Backend Development**:
- **Node.js**: Version 18.17.0 for server-side development
- **Express.js**: Version 4.18.2 for web application framework
- **MongoDB**: Version 6.0.8 for database management
- **Mongoose**: Version 7.5.0 for object document mapping

**Development Tools**:
- **Git**: Version control and collaboration
- **Docker**: Containerization for consistent development environments
- **Postman**: API testing and documentation
- **VS Code**: Integrated development environment

### 7.2.2 Project Structure

The project follows a modular structure to ensure maintainability and scalability:

```
ArchitectAI/
├── my-react-app/                 # Frontend React application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/              # Main application pages
│   │   ├── contexts/           # React context providers
│   │   ├── services/           # API services and utilities
│   │   ├── data/               # Static data and case studies
│   │   └── types/              # TypeScript type definitions
│   ├── public/                 # Static assets
│   └── package.json
├── Back-End/                    # Backend Node.js application
│   ├── src/
│   │   ├── controllers/        # API route controllers
│   │   ├── models/             # Database models
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic services
│   │   ├── middleware/         # Express middleware
│   │   └── config/             # Configuration files
│   └── package.json
└── Documentation/              # Project documentation
```

## 7.3 Frontend Implementation

### 7.3.1 React Application Structure

The frontend application is built using React 18 with TypeScript and follows modern React patterns:

**Main Application Component**:
```typescript
// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import QuestionnairePage from './pages/Questionnaire';
import LearningHubPage from './pages/LearningHub';
import ChatbotPage from './pages/Chatbot';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/questionnaire" element={<QuestionnairePage />} />
              <Route path="/learning" element={<LearningHubPage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
```

### 7.3.2 State Management

The application uses React Context API for global state management:

```typescript
// contexts/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    company: string;
    role: string;
  };
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.data.token);
        setUser(data.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
```

### 7.3.3 API Integration

The frontend communicates with the backend through a centralized API service:

```typescript
// services/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authentication token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const recommendationService = {
  generateRecommendation: async (requirements: any) => {
    const response = await api.post('/recommendations/generate', { requirements });
    return response.data;
  },
  
  getArchitectures: async () => {
    const response = await api.get('/recommendations/architectures');
    return response.data;
  }
};

export const chatService = {
  sendMessage: async (message: string, context: any[] = []) => {
    const response = await api.post('/chat/send', { message, context });
    return response.data;
  },
  
  getHistory: async () => {
    const response = await api.get('/chat/history');
    return response.data;
  }
};

export default api;
```

### 7.3.4 Component Implementation

**Questionnaire Component**:
```typescript
// pages/Questionnaire.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { recommendationService } from '../services/api';

interface Question {
  id: string;
  question: string;
  type: 'select' | 'text' | 'number';
  options?: string[];
  category: string;
}

const Questionnaire: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const questions: Question[] = [
    {
      id: 'projectType',
      question: 'What type of application are you building?',
      type: 'select',
      options: ['Web Application', 'Mobile Application', 'API/Backend Service'],
      category: 'Project Overview'
    },
    {
      id: 'expectedUsers',
      question: 'What is your expected user base size?',
      type: 'select',
      options: ['Less than 1,000 users', '1,000 - 10,000 users', '10,000 - 100,000 users'],
      category: 'Project Overview'
    }
    // ... more questions
  ];

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await recommendationService.generateRecommendation(answers);
      setRecommendations(result.data.recommendations);
      navigate('/recommendations', { state: { recommendations: result.data.recommendations } });
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Architecture Assessment</h1>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{currentStep + 1} of {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {questions[currentStep] && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {questions[currentStep].question}
            </h2>
            
            {questions[currentStep].type === 'select' && (
              <div className="space-y-2">
                {questions[currentStep].options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(questions[currentStep].id, option)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                      answers[questions[currentStep].id] === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          
          {currentStep === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              {isSubmitting ? 'Generating...' : 'Get Recommendations'}
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!answers[questions[currentStep]?.id]}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
```

## 7.4 Backend Implementation

### 7.4.1 Server Setup

The backend server is implemented using Express.js with proper middleware configuration:

```javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/architectai', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/authRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const chatRoutes = require('./routes/chatRoutes');
const learningRoutes = require('./routes/learningRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/learning', learningRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 7.4.2 Database Models

The database models are implemented using Mongoose schemas:

```javascript
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profile: {
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    company: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      trim: true
    }
  },
  preferences: {
    industry: {
      type: String,
      trim: true
    },
    experience: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    },
    notifications: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

```javascript
// models/Recommendation.js
const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  requirements: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  recommendations: [{
    pattern: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 1
    },
    justification: {
      type: String,
      required: true
    },
    pros: [String],
    cons: [String],
    risks: [String],
    mitigation: [String],
    implementation: {
      phases: [String],
      timeline: String,
      teamSize: String
    }
  }],
  analysis: {
    complexity: {
      type: String,
      enum: ['Low', 'Medium', 'High']
    },
    scalability: {
      type: String,
      enum: ['Limited', 'Good', 'Excellent']
    },
    maintainability: {
      type: String,
      enum: ['Poor', 'Good', 'Excellent']
    },
    cost: {
      type: String,
      enum: ['Low', 'Medium', 'High']
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
```

### 7.4.3 API Controllers

The API controllers handle business logic and request processing:

```javascript
// controllers/recommendationController.js
const Recommendation = require('../models/Recommendation');
const aiEngine = require('../services/aiEngine');

const generateRecommendation = async (req, res) => {
  try {
    const { requirements } = req.body;
    const userId = req.user.id;

    // Validate requirements
    if (!requirements || typeof requirements !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid requirements format'
      });
    }

    // Generate recommendation using AI engine
    const result = await aiEngine.generateRecommendation(requirements);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to generate recommendation',
        error: result.error
      });
    }

    // Save recommendation to database
    const recommendation = new Recommendation({
      userId,
      projectName: requirements.projectName || 'Untitled Project',
      requirements,
      recommendations: result.recommendations,
      analysis: result.analysis
    });

    await recommendation.save();

    // Add metadata to response
    const response = {
      ...result,
      metadata: {
        generatedAt: new Date(),
        requirements: requirements,
        engineVersion: '1.0.0',
        confidence: result.analysis?.topScore || 0
      }
    };

    res.json(response);

  } catch (error) {
    console.error('Error generating recommendation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate recommendation',
      error: error.message
    });
  }
};

const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const recommendations = await Recommendation.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      data: recommendations
    });

  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recommendations',
      error: error.message
    });
  }
};

module.exports = {
  generateRecommendation,
  getRecommendations
};
```

### 7.4.4 AI Integration Service

The AI integration service handles communication with OpenAI and custom algorithms:

```javascript
// services/aiEngine.js
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

class AIEngine {
  constructor() {
    this.model = 'gpt-3.5-turbo-0125';
    this.fallbackEngine = new FallbackEngine();
  }

  async generateRecommendation(requirements) {
    try {
      // Generate AI response
      const aiResponse = await this.generateAIResponse(requirements);
      
      // Apply custom scoring algorithm
      const scoredRecommendations = this.applyScoringAlgorithm(aiResponse, requirements);
      
      return {
        success: true,
        recommendations: scoredRecommendations,
        analysis: this.generateAnalysis(scoredRecommendations)
      };

    } catch (error) {
      console.error('AI Engine error:', error);
      
      // Fallback to rule-based system
      return this.fallbackEngine.generateRecommendation(requirements);
    }
  }

  async generateAIResponse(requirements) {
    const prompt = this.buildPrompt(requirements);
    
    const response = await openai.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: 'system',
          content: 'You are an expert software architect with 20+ years of experience. Provide detailed architecture recommendations based on project requirements.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7
    });

    return response.choices[0].message.content;
  }

  buildPrompt(requirements) {
    return `
    Analyze the following project requirements and recommend appropriate software architecture patterns:
    
    Project Type: ${requirements.projectType}
    Industry: ${requirements.industry}
    Expected Users: ${requirements.expectedUsers}
    Team Size: ${requirements.teamSize}
    Timeline: ${requirements.timeline}
    Budget: ${requirements.budget}
    Scalability Requirements: ${requirements.scalability}
    Performance Requirements: ${requirements.performance}
    Security Requirements: ${requirements.security}
    
    Please provide:
    1. Primary architecture recommendation with justification
    2. Alternative options with trade-offs
    3. Implementation considerations
    4. Risk assessment and mitigation strategies
    `;
  }

  applyScoringAlgorithm(aiResponse, requirements) {
    const patterns = ['Microservices', 'Monolithic', 'Event-Driven', 'Serverless'];
    const recommendations = [];

    patterns.forEach(pattern => {
      const score = this.calculateScore(pattern, requirements);
      if (score > 50) {
        recommendations.push({
          pattern,
          score,
          confidence: score / 100,
          justification: this.generateJustification(pattern, requirements),
          pros: this.getPros(pattern),
          cons: this.getCons(pattern),
          risks: this.getRisks(pattern),
          mitigation: this.getMitigation(pattern),
          implementation: this.getImplementation(pattern)
        });
      }
    });

    return recommendations.sort((a, b) => b.score - a.score);
  }

  calculateScore(pattern, requirements) {
    const weights = {
      technicalFit: 0.4,
      scalability: 0.25,
      maintainability: 0.2,
      cost: 0.15
    };

    const scores = {
      technicalFit: this.calculateTechnicalFit(pattern, requirements),
      scalability: this.calculateScalability(pattern, requirements),
      maintainability: this.calculateMaintainability(pattern, requirements),
      cost: this.calculateCost(pattern, requirements)
    };

    return Object.keys(scores).reduce((total, key) => {
      return total + (scores[key] * weights[key]);
    }, 0);
  }

  calculateTechnicalFit(pattern, requirements) {
    // Implementation of technical fit calculation
    const fitMatrix = {
      'Microservices': {
        'Web Application': 90,
        'API/Backend Service': 95,
        'Mobile Application': 60
      },
      'Monolithic': {
        'Web Application': 85,
        'API/Backend Service': 70,
        'Mobile Application': 80
      }
      // ... more patterns
    };

    return fitMatrix[pattern]?.[requirements.projectType] || 50;
  }

  // ... other calculation methods
}

class FallbackEngine {
  generateRecommendation(requirements) {
    // Rule-based fallback system
    const recommendations = [
      {
        pattern: 'Monolithic',
        score: 75,
        confidence: 0.7,
        justification: 'Monolithic architecture is suitable for small to medium projects with limited complexity.',
        pros: ['Simple to develop', 'Easy to deploy', 'Low complexity'],
        cons: ['Limited scalability', 'Technology lock-in', 'Difficult to maintain'],
        risks: ['Scalability issues', 'Deployment bottlenecks'],
        mitigation: ['Plan for future refactoring', 'Use modular design'],
        implementation: {
          phases: ['Setup', 'Development', 'Testing', 'Deployment'],
          timeline: '3-6 months',
          teamSize: '2-5 developers'
        }
      }
    ];

    return {
      success: true,
      recommendations,
      analysis: {
        complexity: 'Medium',
        scalability: 'Limited',
        maintainability: 'Good',
        cost: 'Low'
      }
    };
  }
}

module.exports = new AIEngine();
```

## 7.5 Testing Implementation

### 7.5.1 Frontend Testing

The frontend testing is implemented using Jest and React Testing Library:

```typescript
// __tests__/Questionnaire.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Questionnaire from '../pages/Questionnaire';
import { recommendationService } from '../services/api';

// Mock the API service
jest.mock('../services/api');
const mockRecommendationService = recommendationService as jest.Mocked<typeof recommendationService>;

describe('Questionnaire Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders questionnaire form', () => {
    render(
      <BrowserRouter>
        <Questionnaire />
      </BrowserRouter>
    );

    expect(screen.getByText('Architecture Assessment')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  test('handles question navigation', () => {
    render(
      <BrowserRouter>
        <Questionnaire />
      </BrowserRouter>
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();

    // Select an option
    const option = screen.getByText('Web Application');
    fireEvent.click(option);

    expect(nextButton).not.toBeDisabled();
  });

  test('submits questionnaire and generates recommendations', async () => {
    const mockRecommendations = [
      {
        pattern: 'Microservices',
        score: 85,
        confidence: 0.8,
        justification: 'Suitable for scalable web applications'
      }
    ];

    mockRecommendationService.generateRecommendation.mockResolvedValue({
      success: true,
      data: { recommendations: mockRecommendations }
    });

    render(
      <BrowserRouter>
        <Questionnaire />
      </BrowserRouter>
    );

    // Complete the questionnaire
    const option = screen.getByText('Web Application');
    fireEvent.click(option);

    const submitButton = screen.getByText('Get Recommendations');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRecommendationService.generateRecommendation).toHaveBeenCalled();
    });
  });
});
```

### 7.5.2 Backend Testing

The backend testing is implemented using Jest and Supertest:

```javascript
// tests/recommendation.test.js
const request = require('supertest');
const app = require('../server');
const Recommendation = require('../models/Recommendation');
const User = require('../models/User');

describe('Recommendation API', () => {
  let authToken;
  let userId;

  beforeEach(async () => {
    // Create test user
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    await user.save();
    userId = user._id;

    // Login to get auth token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    authToken = loginResponse.body.data.token;
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Recommendation.deleteMany({});
  });

  describe('POST /api/recommendations/generate', () => {
    test('should generate recommendations with valid requirements', async () => {
      const requirements = {
        projectType: 'Web Application',
        industry: 'E-commerce',
        expectedUsers: '10,000 - 100,000 users',
        teamSize: '5-10 developers',
        timeline: '6-12 months',
        budget: 'Medium',
        scalability: 'High',
        performance: 'High',
        security: 'High'
      };

      const response = await request(app)
        .post('/api/recommendations/generate')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ requirements })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.recommendations).toBeDefined();
      expect(response.body.data.recommendations.length).toBeGreaterThan(0);
    });

    test('should return error with invalid requirements', async () => {
      const response = await request(app)
        .post('/api/recommendations/generate')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ requirements: null })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid requirements format');
    });

    test('should require authentication', async () => {
      const requirements = {
        projectType: 'Web Application'
      };

      const response = await request(app)
        .post('/api/recommendations/generate')
        .send({ requirements })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/recommendations', () => {
    test('should return user recommendations', async () => {
      // Create test recommendation
      const recommendation = new Recommendation({
        userId,
        projectName: 'Test Project',
        requirements: { projectType: 'Web Application' },
        recommendations: [{
          pattern: 'Microservices',
          score: 85,
          confidence: 0.8,
          justification: 'Test justification'
        }]
      });
      await recommendation.save();

      const response = await request(app)
        .get('/api/recommendations')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0].projectName).toBe('Test Project');
    });
  });
});
```

## 7.6 Deployment Implementation

### 7.6.1 Docker Configuration

The application is containerized using Docker for consistent deployment:

```dockerfile
# Dockerfile (Frontend)
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```dockerfile
# Dockerfile (Backend)
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build: ./my-react-app
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build: ./Back-End
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/architectai
    depends_on:
      - mongo

  mongo:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### 7.6.2 Environment Configuration

Environment variables are managed through configuration files:

```javascript
// config/environment.js
module.exports = {
  development: {
    database: process.env.MONGODB_URI_DEV || 'mongodb://localhost:27017/architectai_dev',
    jwtSecret: process.env.JWT_SECRET_DEV || 'dev-secret-key',
    openaiKey: process.env.OPENAI_API_KEY_DEV,
    frontendUrl: 'http://localhost:5173',
    port: 3000
  },
  production: {
    database: process.env.MONGODB_URI_PROD,
    jwtSecret: process.env.JWT_SECRET_PROD,
    openaiKey: process.env.OPENAI_API_KEY_PROD,
    frontendUrl: process.env.FRONTEND_URL,
    port: process.env.PORT || 3000
  }
};
```

## 7.7 Performance Optimization

### 7.7.1 Frontend Optimization

```typescript
// components/LazyComponent.tsx
import React, { lazy, Suspense } from 'react';

const LazyLearningHub = lazy(() => import('../pages/LearningHub'));
const LazyDashboard = lazy(() => import('../pages/Dashboard'));

const LazyComponent: React.FC<{ component: string }> = ({ component }) => {
  const Component = component === 'learning' ? LazyLearningHub : LazyDashboard;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};

export default LazyComponent;
```

### 7.7.2 Backend Optimization

```javascript
// middleware/cache.js
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes

const cacheMiddleware = (duration = 600) => {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      return res.json(cachedResponse);
    }

    const originalSend = res.json;
    res.json = function(data) {
      cache.set(key, data, duration);
      originalSend.call(this, data);
    };

    next();
  };
};

module.exports = cacheMiddleware;
```

## 7.8 Summary

This chapter has presented the comprehensive implementation details of the AI-driven software architecture decision support system. The implementation includes frontend development with React and TypeScript, backend development with Node.js and Express, database implementation with MongoDB, AI integration with OpenAI, comprehensive testing, and deployment configuration.

The implementation follows modern software engineering practices and incorporates the design specifications outlined in Chapter 6. The next chapter will present the testing and validation approach, including unit testing, integration testing, and user acceptance testing.
