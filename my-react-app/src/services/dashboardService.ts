import { apiClient } from './apiClient';

export interface Decision {
  _id: string;
  title: string;
  description: string;
  category: 'architecture' | 'database' | 'technology' | 'security' | 'scalability';
  status: 'pending' | 'decided' | 'implemented' | 'reviewed';
  reasoning: string;
  alternatives: string[];
  pros: string[];
  cons: string[];
  tags: string[];
  chatSessionId?: string;
  metadata?: {
    projectName?: string;
    teamSize?: number;
    expectedScale?: string;
    budget?: string;
    timeline?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ChatSession {
  _id: string;
  title: string;
  summary: string;
  topic: 'architecture' | 'database' | 'technology' | 'security' | 'scalability' | 'general';
  status: 'active' | 'completed' | 'archived';
  metadata?: {
    projectName?: string;
    decisionIds?: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface DecisionAnalytics {
  totalDecisions: number;
  byCategory: Record<string, number>;
  byStatus: Record<string, number>;
}

export interface CreateDecisionRequest {
  title: string;
  description: string;
  category: Decision['category'];
  reasoning: string;
  alternatives?: string[];
  pros?: string[];
  cons?: string[];
  tags?: string[];
  chatSessionId?: string;
  metadata?: Decision['metadata'];
}

export interface CreateChatSessionRequest {
  title: string;
  topic?: ChatSession['topic'];
  projectName?: string;
}

class DashboardService {
  private baseUrl = '/api/decisions';

  // Decision methods
  async getDecisions(userId: string, filters?: {
    category?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ decisions: Decision[]; totalPages: number; currentPage: number; total: number }> {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await apiClient.get(`${this.baseUrl}/user/${userId}?${params}`);
    return response.data;
  }

  async getDecision(decisionId: string): Promise<Decision> {
    const response = await apiClient.get(`${this.baseUrl}/${decisionId}`);
    return response.data;
  }

  async createDecision(decisionData: CreateDecisionRequest): Promise<Decision> {
    const response = await apiClient.post(this.baseUrl, decisionData);
    return response.data;
  }

  async updateDecision(decisionId: string, updates: Partial<Decision>): Promise<Decision> {
    const response = await apiClient.put(`${this.baseUrl}/${decisionId}`, updates);
    return response.data;
  }

  async deleteDecision(decisionId: string): Promise<{ message: string }> {
    const response = await apiClient.delete(`${this.baseUrl}/${decisionId}`);
    return response.data;
  }

  // Analytics methods
  async getDecisionAnalytics(userId: string): Promise<DecisionAnalytics> {
    const response = await apiClient.get(`${this.baseUrl}/analytics/${userId}`);
    return response.data;
  }

  // Chat session methods
  async getChatSessions(userId: string, filters?: {
    status?: string;
    topic?: string;
    page?: number;
    limit?: number;
  }): Promise<{ sessions: ChatSession[]; totalPages: number; currentPage: number; total: number }> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.topic) params.append('topic', filters.topic);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await apiClient.get(`${this.baseUrl}/sessions/${userId}?${params}`);
    return response.data;
  }

  async createChatSession(sessionData: CreateChatSessionRequest): Promise<ChatSession> {
    const response = await apiClient.post(`${this.baseUrl}/sessions`, sessionData);
    return response.data;
  }

  async updateChatSession(sessionId: string, updates: {
    summary?: string;
    status?: ChatSession['status'];
  }): Promise<ChatSession> {
    const response = await apiClient.put(`${this.baseUrl}/sessions/${sessionId}`, updates);
    return response.data;
  }

  // Export decision as markdown
  exportDecisionAsMarkdown(decision: Decision): void {
    const content = `
# Architecture Decision Record: ${decision.title}

## Overview
${decision.description}

## Decision
- **Status**: ${decision.status}
- **Category**: ${decision.category}
- **Created**: ${new Date(decision.createdAt).toLocaleDateString()}
- **Updated**: ${new Date(decision.updatedAt).toLocaleDateString()}

## Reasoning
${decision.reasoning}

## Alternatives Considered
${decision.alternatives.map(alt => `- ${alt}`).join('\n')}

## Pros
${decision.pros.map(pro => `- ${pro}`).join('\n')}

## Cons
${decision.cons.map(con => `- ${con}`).join('\n')}

## Tags
${decision.tags.map(tag => `#${tag}`).join(' ')}

${decision.metadata?.projectName ? `\n## Project Context\n- **Project**: ${decision.metadata.projectName}` : ''}
${decision.metadata?.teamSize ? `- **Team Size**: ${decision.metadata.teamSize} developers` : ''}
${decision.metadata?.expectedScale ? `- **Expected Scale**: ${decision.metadata.expectedScale}` : ''}
${decision.metadata?.budget ? `- **Budget**: ${decision.metadata.budget}` : ''}
${decision.metadata?.timeline ? `- **Timeline**: ${decision.metadata.timeline}` : ''}

---
Generated by AI-Driven Software Architecture Decision System
    `.trim();

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `decision-${decision._id}-${decision.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Export all decisions as a report
  exportDecisionsReport(decisions: Decision[]): void {
    const content = `
# Architecture Decisions Report

Generated on: ${new Date().toLocaleDateString()}

## Summary
- Total Decisions: ${decisions.length}
- By Category: ${Object.entries(
    decisions.reduce((acc, d) => {
      acc[d.category] = (acc[d.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([cat, count]) => `${cat}: ${count}`).join(', ')}
- By Status: ${Object.entries(
    decisions.reduce((acc, d) => {
      acc[d.status] = (acc[d.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([status, count]) => `${status}: ${count}`).join(', ')}

## Decisions

${decisions.map((decision, index) => `
### ${index + 1}. ${decision.title}

**Category**: ${decision.category}  
**Status**: ${decision.status}  
**Created**: ${new Date(decision.createdAt).toLocaleDateString()}

${decision.description}

**Reasoning**: ${decision.reasoning}

**Alternatives**: ${decision.alternatives.join(', ')}

**Pros**:
${decision.pros.map(pro => `- ${pro}`).join('\n')}

**Cons**:
${decision.cons.map(con => `- ${con}`).join('\n')}

**Tags**: ${decision.tags.map(tag => `#${tag}`).join(' ')}

---
`).join('\n')}

Generated by AI-Driven Software Architecture Decision System
    `.trim();

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `architecture-decisions-report-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export const dashboardService = new DashboardService(); 