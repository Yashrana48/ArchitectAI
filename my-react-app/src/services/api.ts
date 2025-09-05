import type {
    QuestionnaireResponse,
    ProjectRequirements,
    RecommendationResponse,
    ApiResponse,
    QuestionnaireApiResponse,
    Architecture,
    DesignPattern,
    CaseStudy,
    BestPractice
  } from '../types';
  
  const API_BASE_URL = 'http://localhost:5000/api';
  
  // Generic API request function
  async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
  
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
  
  // Questionnaire API
  export const questionnaireApi = {
    // Get questionnaire questions
    getQuestions: async (): Promise<QuestionnaireApiResponse> => {
      const response = await apiRequest<QuestionnaireApiResponse>('/questionnaire/questions');
      return response.data!;
    },
  
    // Submit questionnaire responses
    submitQuestionnaire: async (responses: QuestionnaireResponse[]): Promise<ProjectRequirements> => {
      const response = await apiRequest<{ requirements: ProjectRequirements }>('/questionnaire/submit', {
        method: 'POST',
        body: JSON.stringify({ responses }),
      });
      return response.data!.requirements;
    },
  
    // Get questionnaire history
    getHistory: async () => {
      return await apiRequest('/questionnaire/history');
    },
  };
  
  // Recommendations API
  export const recommendationsApi = {
    // Generate architecture recommendation
    generateRecommendation: async (requirements: ProjectRequirements): Promise<RecommendationResponse> => {
      const response = await apiRequest<RecommendationResponse>('/recommendations/generate', {
        method: 'POST',
        body: JSON.stringify({ requirements }),
      });
      return response.data!;
    },
  
    // Get all architectures
    getAllArchitectures: async (): Promise<Architecture[]> => {
      const response = await apiRequest<{ architectures: Architecture[] }>('/recommendations/architectures');
      return response.data!.architectures;
    },
  
    // Get all design patterns
    getAllDesignPatterns: async (): Promise<DesignPattern[]> => {
      const response = await apiRequest<{ patterns: DesignPattern[] }>('/recommendations/patterns');
      return response.data!.patterns;
    },
  
    // Get specific architecture
    getArchitectureById: async (id: string): Promise<Architecture> => {
      const response = await apiRequest<{ architecture: Architecture }>(`/recommendations/architecture/${id}`);
      return response.data!.architecture;
    },
  
    // Get specific design pattern
    getPatternById: async (id: string): Promise<DesignPattern> => {
      const response = await apiRequest<{ pattern: DesignPattern }>(`/recommendations/pattern/${id}`);
      return response.data!.pattern;
    },
  };
  
  // Learning Hub API
  export const learningApi = {
    // Get learning hub content
    getLearningHub: async () => {
      return await apiRequest('/learning/hub');
    },
  
    // Get case studies
    getCaseStudies: async (category?: string, company?: string): Promise<CaseStudy[]> => {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (company) params.append('company', company);
  
      const queryString = params.toString();
      const endpoint = `/learning/case-studies${queryString ? `?${queryString}` : ''}`;
  
      const response = await apiRequest<{ caseStudies: CaseStudy[] }>(endpoint);
      return response.data!.caseStudies;
    },
  
    // Get specific case study
    getCaseStudyById: async (id: string): Promise<CaseStudy> => {
      const response = await apiRequest<{ caseStudy: CaseStudy }>(`/learning/case-study/${id}`);
      return response.data!.caseStudy;
    },
  
    // Get best practices
    getBestPractices: async (category?: string): Promise<BestPractice[]> => {
      const endpoint = category ? `/learning/best-practices?category=${category}` : '/learning/best-practices';
      const response = await apiRequest<{ bestPractices: BestPractice[] }>(endpoint);
      return response.data!.bestPractices;
    },
  
    // Get architecture comparison
    getArchitectureComparison: async () => {
      return await apiRequest('/learning/comparison');
    },
  };
  
  // Health check
  export const healthCheck = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL.replace('/api', '')}`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  };
  
  // Auth API
export const authApi = {
  register: async (name: string, email: string, password: string) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return await response.json();
  },
  login: async (email: string, password: string) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  },
};

// Chat API
export const chatApi = {
  sendMessage: async (message: string, context: any[] = []) => {
    console.log('Frontend: Sending message to API:', message);
    console.log('Frontend: Context:', context);
    
    const response = await fetch('http://localhost:5000/api/chat/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context }),
    });
    
    const data = await response.json();
    console.log('Frontend: API response:', data);
    return data;
  },

  getChatHistory: async (userId: string) => {
    const response = await fetch(`http://localhost:5000/api/chat/history/${userId}`);
    return await response.json();
  },
  };