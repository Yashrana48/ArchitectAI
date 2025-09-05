// Questionnaire Types
export interface Question {
    id: number;
    question: string;
    type: 'select' | 'text' | 'number';
    options?: Array<{ value: string; label: string }>;
    required: boolean;
    category: string;
  }
  
  export interface QuestionnaireResponse {
    questionId: number;
    answer: string;
  }
  
  export interface ProjectRequirements {
    userTraffic: string;
    complexity: string;
    teamSize: string;
    scalability: string;
    budget: string;
    security?: string;
    maintenance?: string;
    deployment?: string;
  }
  
  // Architecture Types
  export interface Architecture {
    id: string;
    name: string;
    description: string;
    advantages: string[];
    disadvantages: string[];
    bestFor: string[];
    criteria: {
      userTraffic: string;
      complexity: string;
      teamSize: string;
      scalability: string;
      budget: string;
    };
    score: number;
  }
  
  export interface DesignPattern {
    id: string;
    name: string;
    description: string;
    useCase: string;
    architecture: string[];
  }
  
  // Recommendation Types
  export interface ArchitectureRecommendation {
    architecture: {
      type: string;
      name: string;
      description: string;
      advantages: string[];
      disadvantages: string[];
      bestFor: string[];
      score: number;
      confidence: number;
    };
    designPatterns: DesignPattern[];
    reasoning: string[];
  }
  
  export interface RecommendationResponse {
    success: boolean;
    recommendations: ArchitectureRecommendation[];
    analysis: {
      totalEvaluated: number;
      topScore: number;
      averageScore: number;
    };
    metadata: {
      generatedAt: string;
      requirements: ProjectRequirements;
      engineVersion: string;
      confidence: number;
    };
  }
  
  // Learning Hub Types
  export interface CaseStudy {
    id: string;
    company: string;
    architecture: string;
    title: string;
    description: string;
    challenges: string[];
    solutions: string[];
    results: string[];
    lessons: string[];
    year: number;
    category: string;
  }
  
  export interface BestPractice {
    category: string;
    practices: string[];
  }
  
  // API Response Types
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
  }
  
  export interface QuestionnaireApiResponse {
    questions: Question[];
    totalQuestions: number;
    categories: string[];
  }
  
  // Component Props Types
  export interface QuestionCardProps {
    question: Question;
    onAnswer: (questionId: number, answer: string) => void;
    currentAnswer?: string;
  }
  
  export interface RecommendationCardProps {
    recommendation: ArchitectureRecommendation;
    index: number;
  }
  
  export interface ProgressBarProps {
  current: number;
  total: number;
}

// Chat Types
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

export interface ChatResponse {
  success: boolean;
  response: {
    text: string;
    suggestions?: string[];
  };
  timestamp: string;
}

export interface ChatHistory {
  success: boolean;
  history: ChatMessage[];
}