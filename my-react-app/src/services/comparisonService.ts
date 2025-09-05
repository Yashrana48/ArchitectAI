import { apiClient } from './apiClient';

export interface ArchitecturePattern {
  _id: string;
  name: string;
  category: 'monolithic' | 'microservices' | 'serverless' | 'event-driven' | 'layered' | 'hexagonal';
  description: string;
  pros: string[];
  cons: string[];
  useCases: string[];
  characteristics: {
    complexity: 'low' | 'medium' | 'high';
    scalability: 'low' | 'medium' | 'high';
    maintainability: 'low' | 'medium' | 'high';
    performance: 'low' | 'medium' | 'high';
    cost: 'low' | 'medium' | 'high';
    teamSize: 'small' | 'medium' | 'large';
    timeToMarket: 'fast' | 'medium' | 'slow';
  };
  technologyStack: string[];
  deployment: string[];
  monitoring: string[];
  security: string[];
  examples: Array<{
    company: string;
    description: string;
    link: string;
  }>;
  bestPractices: string[];
  antiPatterns: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ComparisonCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;
  category: 'technical' | 'business' | 'operational';
}

export interface ProjectContext {
  teamSize: 'small' | 'medium' | 'large';
  budget: 'low' | 'medium' | 'high';
  timeline: 'short' | 'medium' | 'long';
  expectedScale: 'low' | 'medium' | 'high';
  complexity: 'low' | 'medium' | 'high';
}

export interface ComparisonResult {
  patterns: (ArchitecturePattern & {
    weightedScore: number;
    scores: Record<string, number>;
  })[];
  recommendation: {
    bestPattern: ArchitecturePattern & {
      weightedScore: number;
      scores: Record<string, number>;
    };
    reasoning: string[];
    alternatives: Array<{
      pattern: ArchitecturePattern & {
        weightedScore: number;
        scores: Record<string, number>;
      };
      reasoning: string[];
    }>;
  };
  projectContext: ProjectContext;
}

class ComparisonService {
  private baseUrl = '/api/comparison';

  // Get all architecture patterns
  async getArchitecturePatterns(filters?: {
    category?: string;
    complexity?: string;
    scalability?: string;
  }): Promise<ArchitecturePattern[]> {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.complexity) params.append('complexity', filters.complexity);
    if (filters?.scalability) params.append('scalability', filters.scalability);

    const response = await apiClient.get(`${this.baseUrl}/patterns?${params}`);
    return response.data;
  }

  // Get a single architecture pattern
  async getArchitecturePattern(patternId: string): Promise<ArchitecturePattern> {
    const response = await apiClient.get(`${this.baseUrl}/patterns/${patternId}`);
    return response.data;
  }

  // Compare multiple architecture patterns
  async comparePatterns(
    patternIds: string[],
    projectContext: ProjectContext
  ): Promise<ComparisonResult> {
    const response = await apiClient.post(`${this.baseUrl}/compare`, {
      patternIds,
      projectContext
    });
    return response.data;
  }

  // Get comparison criteria
  async getComparisonCriteria(): Promise<ComparisonCriteria[]> {
    const response = await apiClient.get(`${this.baseUrl}/criteria`);
    return response.data;
  }

  // Seed patterns (development only)
  async seedPatterns(): Promise<{ message: string; count: number }> {
    const response = await apiClient.post(`${this.baseUrl}/seed`);
    return response.data;
  }

  // Export comparison as markdown
  exportComparisonAsMarkdown(result: ComparisonResult): void {
    const content = `
# Architecture Comparison Report

Generated on: ${new Date().toLocaleDateString()}

## Project Context
- Team Size: ${result.projectContext.teamSize}
- Budget: ${result.projectContext.budget}
- Timeline: ${result.projectContext.timeline}
- Expected Scale: ${result.projectContext.expectedScale}
- Complexity: ${result.projectContext.complexity}

## Recommendation

### Best Architecture: ${result.recommendation.bestPattern.name}

**Weighted Score**: ${result.recommendation.bestPattern.weightedScore.toFixed(2)}

**Reasoning**:
${result.recommendation.reasoning.map(reason => `- ${reason}`).join('\n')}

**Characteristics**:
- Complexity: ${result.recommendation.bestPattern.characteristics.complexity}
- Scalability: ${result.recommendation.bestPattern.characteristics.scalability}
- Maintainability: ${result.recommendation.bestPattern.characteristics.maintainability}
- Performance: ${result.recommendation.bestPattern.characteristics.performance}
- Cost: ${result.recommendation.bestPattern.characteristics.cost}
- Team Size: ${result.recommendation.bestPattern.characteristics.teamSize}
- Time to Market: ${result.recommendation.bestPattern.characteristics.timeToMarket}

## Detailed Comparison

${result.patterns.map((pattern, index) => `
### ${index + 1}. ${pattern.name}

**Weighted Score**: ${pattern.weightedScore.toFixed(2)}

**Description**: ${pattern.description}

**Pros**:
${pattern.pros.map(pro => `- ${pro}`).join('\n')}

**Cons**:
${pattern.cons.map(con => `- ${con}`).join('\n')}

**Use Cases**:
${pattern.useCases.map(useCase => `- ${useCase}`).join('\n')}

**Technology Stack**:
${pattern.technologyStack.map(tech => `- ${tech}`).join('\n')}

**Best Practices**:
${pattern.bestPractices.map(practice => `- ${practice}`).join('\n')}

**Anti-Patterns to Avoid**:
${pattern.antiPatterns.map(antiPattern => `- ${antiPattern}`).join('\n')}

**Real-World Examples**:
${pattern.examples.map(example => `- **${example.company}**: ${example.description}`).join('\n')}

---
`).join('\n')}

## Alternative Recommendations

${result.recommendation.alternatives.map((alt, index) => `
### Alternative ${index + 1}: ${alt.pattern.name}

**Weighted Score**: ${alt.pattern.weightedScore.toFixed(2)}

**Reasoning**:
${alt.reasoning.map(reason => `- ${reason}`).join('\n')}
`).join('\n')}

---
Generated by AI-Driven Software Architecture Decision System
    `.trim();

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `architecture-comparison-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Export comparison as JSON
  exportComparisonAsJson(result: ComparisonResult): void {
    const content = JSON.stringify(result, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `architecture-comparison-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export const comparisonService = new ComparisonService(); 