import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface SavedRecommendation {
  _id: string;
  userId: string;
  projectName: string;
  projectType: string;
  industry: string;
  teamSize: string;
  budget: string;
  status: 'active' | 'archived' | 'implemented';
  requirements: any;
  recommendations: ArchitectureRecommendation[];
  aiRecommendations: any[];
  createdAt: string;
  updatedAt: string;
}

export interface ArchitectureRecommendation {
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

export interface ProjectMetrics {
  totalProjects: number;
  activeProjects: number;
  implementedProjects: number;
  averageConfidence: number;
  totalEstimatedCost: string;
  mostPopularArchitecture: string;
  industryDistribution: { [key: string]: number };
  complexityDistribution: { [key: string]: number };
}

class SavedRecommendationService {
  // Get all recommendations for a user
  async getUserRecommendations(userId: string): Promise<SavedRecommendation[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/saved-recommendations/user/${userId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user recommendations:', error);
      throw error;
    }
  }

  // Save a new recommendation
  async saveRecommendation(userId: string, recommendationData: any): Promise<SavedRecommendation> {
    try {
      const response = await axios.post(`${API_BASE_URL}/saved-recommendations/user/${userId}`, recommendationData);
      return response.data.data;
    } catch (error) {
      console.error('Error saving recommendation:', error);
      throw error;
    }
  }

  // Update a recommendation
  async updateRecommendation(recommendationId: string, updateData: any): Promise<SavedRecommendation> {
    try {
      const response = await axios.put(`${API_BASE_URL}/saved-recommendations/${recommendationId}`, updateData);
      return response.data.data;
    } catch (error) {
      console.error('Error updating recommendation:', error);
      throw error;
    }
  }

  // Delete a recommendation
  async deleteRecommendation(recommendationId: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/saved-recommendations/${recommendationId}`);
    } catch (error) {
      console.error('Error deleting recommendation:', error);
      throw error;
    }
  }

  // Get dashboard metrics for a user
  async getDashboardMetrics(userId: string): Promise<ProjectMetrics> {
    try {
      const response = await axios.get(`${API_BASE_URL}/saved-recommendations/metrics/${userId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching dashboard metrics:', error);
      throw error;
    }
  }
}

export const savedRecommendationService = new SavedRecommendationService(); 