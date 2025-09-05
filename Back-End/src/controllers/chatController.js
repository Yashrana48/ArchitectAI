const OpenAI = require('openai');

// Initialize OpenAI client (will be created when needed)
let openai = null;

function getOpenAIClient() {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

// Advanced prompt engineering system
class AdvancedPromptEngine {
  constructor() {
    this.contextHistory = [];
    this.userProfile = {};
    this.industryContext = {};
    this.conversationState = {
      currentTopic: null,
      questionDepth: 0,
      userExpertise: 'intermediate',
      projectPhase: 'planning'
    };
  }

  // Generate sophisticated system prompt based on context
  generateSystemPrompt(userMessage, context = []) {
    const basePrompt = `You are a friendly and knowledgeable software architecture consultant. You help developers and teams make informed decisions about software architecture, design patterns, and technology choices.

You have expertise in:
- Microservices and monolithic architectures
- Cloud platforms (AWS, Azure, GCP)
- Database design and selection
- API design (REST, GraphQL, gRPC)
- Security best practices
- Scalability patterns
- Design patterns and best practices
- Performance optimization
- DevOps and CI/CD

Respond in a conversational, helpful tone. Provide practical advice with clear explanations, real-world examples, and actionable recommendations. Keep your responses concise but informative, and feel free to ask follow-up questions to better understand the user's specific needs.`;

    return basePrompt;
  }

  // Analyze user message for context and intent
  analyzeUserMessage(message) {
    const analysis = {
      topics: [],
      intent: 'general',
      complexity: 'medium',
      urgency: 'normal',
      industry: 'general',
      technicalLevel: 'intermediate'
    };

    const lowerMessage = message.toLowerCase();

    // Detect topics
    if (lowerMessage.includes('microservices') || lowerMessage.includes('micro-service')) {
      analysis.topics.push('microservices');
    }
    if (lowerMessage.includes('monolithic') || lowerMessage.includes('monolith')) {
      analysis.topics.push('monolithic');
    }
    if (lowerMessage.includes('serverless') || lowerMessage.includes('lambda')) {
      analysis.topics.push('serverless');
    }
    if (lowerMessage.includes('database') || lowerMessage.includes('db') || lowerMessage.includes('sql') || lowerMessage.includes('nosql')) {
      analysis.topics.push('database');
    }
    if (lowerMessage.includes('api') || lowerMessage.includes('rest') || lowerMessage.includes('graphql') || lowerMessage.includes('grpc')) {
      analysis.topics.push('api');
    }
    if (lowerMessage.includes('security') || lowerMessage.includes('auth') || lowerMessage.includes('encryption')) {
      analysis.topics.push('security');
    }
    if (lowerMessage.includes('cloud') || lowerMessage.includes('aws') || lowerMessage.includes('azure') || lowerMessage.includes('gcp')) {
      analysis.topics.push('cloud');
    }
    if (lowerMessage.includes('scalability') || lowerMessage.includes('performance') || lowerMessage.includes('load')) {
      analysis.topics.push('scalability');
    }

    // Detect intent
    if (lowerMessage.includes('how') || lowerMessage.includes('what') || lowerMessage.includes('why')) {
      analysis.intent = 'question';
    } else if (lowerMessage.includes('compare') || lowerMessage.includes('vs') || lowerMessage.includes('difference')) {
      analysis.intent = 'comparison';
    } else if (lowerMessage.includes('best') || lowerMessage.includes('recommend') || lowerMessage.includes('should')) {
      analysis.intent = 'recommendation';
    } else if (lowerMessage.includes('problem') || lowerMessage.includes('issue') || lowerMessage.includes('error')) {
      analysis.intent = 'troubleshooting';
    }

    // Detect complexity
    if (lowerMessage.includes('simple') || lowerMessage.includes('basic') || lowerMessage.includes('start')) {
      analysis.complexity = 'low';
    } else if (lowerMessage.includes('advanced') || lowerMessage.includes('complex') || lowerMessage.includes('enterprise')) {
      analysis.complexity = 'high';
    }

    // Detect industry
    if (lowerMessage.includes('healthcare') || lowerMessage.includes('medical') || lowerMessage.includes('hipaa')) {
      analysis.industry = 'healthcare';
    } else if (lowerMessage.includes('finance') || lowerMessage.includes('banking') || lowerMessage.includes('pci')) {
      analysis.industry = 'finance';
    } else if (lowerMessage.includes('ecommerce') || lowerMessage.includes('retail') || lowerMessage.includes('shopping')) {
      analysis.industry = 'ecommerce';
    } else if (lowerMessage.includes('startup') || lowerMessage.includes('mvp') || lowerMessage.includes('prototype')) {
      analysis.industry = 'startup';
    }

    // Detect technical level
    if (lowerMessage.includes('beginner') || lowerMessage.includes('new') || lowerMessage.includes('learn')) {
      analysis.technicalLevel = 'beginner';
    } else if (lowerMessage.includes('expert') || lowerMessage.includes('advanced') || lowerMessage.includes('senior')) {
      analysis.technicalLevel = 'expert';
    }

    return analysis;
  }

  // Generate context-specific prompt
  generateContextSpecificPrompt(analysis, context) {
    let contextPrompt = '';

    if (analysis.topics.length > 0) {
      contextPrompt += `Focus on: ${analysis.topics.join(', ')}. `;
    }

    if (analysis.industry !== 'general') {
      contextPrompt += `Consider ${analysis.industry} industry requirements and compliance. `;
    }

    if (analysis.complexity === 'low') {
      contextPrompt += 'Provide simple, beginner-friendly explanations. ';
    } else if (analysis.complexity === 'high') {
      contextPrompt += 'Include advanced concepts and enterprise considerations. ';
    }

    if (context && context.length > 0) {
      contextPrompt += 'Build upon previous conversation context. ';
    }

    return contextPrompt;
  }

  // Generate reasoning framework
  generateReasoningFramework(analysis) {
    let framework = 'Use this reasoning framework:\n';
    
    if (analysis.intent === 'comparison') {
      framework += '1. Define criteria for comparison\n2. Evaluate each option against criteria\n3. Provide pros and cons\n4. Recommend based on context\n';
    } else if (analysis.intent === 'recommendation') {
      framework += '1. Analyze requirements\n2. Consider constraints\n3. Evaluate alternatives\n4. Provide justification\n';
    } else if (analysis.intent === 'troubleshooting') {
      framework += '1. Identify root cause\n2. Analyze symptoms\n3. Provide solutions\n4. Suggest prevention\n';
    } else {
      framework += '1. Understand the question\n2. Provide comprehensive answer\n3. Include examples\n4. Suggest next steps\n';
    }

    return framework;
  }

  // Generate industry-specific guidance
  generateIndustryGuidance(analysis) {
    let guidance = '';

    if (analysis.industry === 'healthcare') {
      guidance += 'Emphasize HIPAA compliance, data privacy, and reliability. ';
    } else if (analysis.industry === 'finance') {
      guidance += 'Focus on security, compliance (PCI-DSS), and audit trails. ';
    } else if (analysis.industry === 'ecommerce') {
      guidance += 'Prioritize scalability, performance, and user experience. ';
    } else if (analysis.industry === 'startup') {
      guidance += 'Consider rapid development, cost-effectiveness, and future scalability. ';
    }

    return guidance;
  }

  // Generate follow-up questions
  generateFollowUpQuestions(analysis, userMessage) {
    const questions = [];

    if (analysis.topics.includes('microservices')) {
      questions.push('What is your expected user load?');
      questions.push('How many development teams do you have?');
      questions.push('What are your data consistency requirements?');
    }

    if (analysis.topics.includes('database')) {
      questions.push('What is your expected data volume?');
      questions.push('What are your primary query patterns?');
      questions.push('Do you need real-time analytics?');
    }

    if (analysis.topics.includes('api')) {
      questions.push('What is your expected API usage?');
      questions.push('Do you need real-time updates?');
      questions.push('What is your client diversity?');
    }

    if (analysis.topics.includes('security')) {
      questions.push('What compliance requirements apply?');
      questions.push('What is your threat model?');
      questions.push('Do you need audit trails?');
    }

    if (analysis.topics.includes('cloud')) {
      questions.push('What is your team\'s cloud experience?');
      questions.push('What is your budget?');
      questions.push('What specific services do you need?');
    }

    return questions.slice(0, 3); // Return max 3 questions
  }
}

// Initialize the advanced prompt engine
const advancedPromptEngine = new AdvancedPromptEngine();

// Main chat controller object
const chatController = {
  // Send a message and get AI response
  async sendMessage(req, res) {
    try {
      const { message, context = [] } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Message is required and must be a string'
        });
      }

      console.log('Frontend: Sending message to API:', message);
      console.log('Frontend: Context:', context);

      // Try OpenAI first
      try {
        const aiResponse = await generateEnhancedAIResponse(message, context);
        
        console.log('Frontend: API response:', {
          success: true,
          response: aiResponse,
          timestamp: new Date().toISOString()
        });

        return res.json({
          success: true,
          response: aiResponse,
          timestamp: new Date().toISOString()
        });

      } catch (openaiError) {
        console.error('OpenAI error, falling back to rule-based system:', openaiError);
        
        // Fallback to rule-based system
        const fallbackResponse = generateEnhancedFallbackResponse(message);
        
        return res.json({
          success: true,
          response: fallbackResponse,
          timestamp: new Date().toISOString(),
          fallback: true
        });
      }

    } catch (error) {
      console.error('Chat controller error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  },

  // Get chat history for a user
  async getChatHistory(req, res) {
    try {
      const { userId } = req.params;
      
      // This would typically fetch from database
      // For now, return empty array
      return res.json({
        success: true,
        data: []
      });
    } catch (error) {
      console.error('Error getting chat history:', error);
      return res.status(500).json({
        success: false,
        message: 'Error retrieving chat history'
      });
    }
  },

  // Get AI performance analytics
  async getAnalytics(req, res) {
    try {
      // Mock analytics data
      const analytics = {
        totalConversations: 150,
        averageResponseTime: 2.3,
        userSatisfaction: 4.2,
        mostCommonTopics: ['microservices', 'database', 'api'],
        fallbackUsage: 0.15
      };

      return res.json({
        success: true,
        data: analytics
      });
    } catch (error) {
      console.error('Error getting analytics:', error);
      return res.status(500).json({
        success: false,
        message: 'Error retrieving analytics'
      });
    }
  }
};

// Enhanced AI response generation with OpenAI
async function generateEnhancedAIResponse(userMessage, context = []) {
  try {
    console.log('Generating enhanced AI response...');
    
    // Analyze user message
    const analysis = advancedPromptEngine.analyzeUserMessage(userMessage);
    console.log('Message analysis:', analysis);
    
    // Generate system prompt
    const systemPrompt = advancedPromptEngine.generateSystemPrompt(userMessage, context);
    console.log('System prompt generated successfully');
    
    // Prepare conversation history for context
    const messages = [
      {
        role: "system",
        content: systemPrompt
      }
    ];

    // Add conversation context if available
    if (context && context.length > 0) {
      context.forEach(msg => {
        messages.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        });
      });
    }

    // Add current user message
    messages.push({
      role: "user",
      content: userMessage
    });

    // Call OpenAI API with enhanced parameters
    console.log('Calling enhanced OpenAI API...');
    const openaiClient = getOpenAIClient();
    console.log('OpenAI client created successfully');
    
    const completion = await openaiClient.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: messages,
      max_tokens: 800, // Increased for more detailed responses
      temperature: 0.7,
      top_p: 0.9,
      frequency_penalty: 0.1,
      presence_penalty: 0.1
    });
    
    console.log('Enhanced OpenAI API call completed');

    const aiResponse = completion.choices[0].message.content;
    console.log('Enhanced OpenAI response received successfully:', aiResponse.substring(0, 100) + '...');

    // Generate simple suggestions
    const suggestions = generateSimpleSuggestions(userMessage, aiResponse);

    return {
      text: aiResponse,
      suggestions: suggestions,
      followUpQuestions: [],
      analysis: {
        topics: analysis.topics,
        intent: analysis.intent,
        complexity: analysis.complexity,
        industry: analysis.industry,
        technicalLevel: analysis.technicalLevel
      },
      metadata: {
        promptVersion: '3.0.0',
        contextAwareness: true,
        industrySpecific: analysis.industry !== 'general',
        reasoningFramework: false
      }
    };

  } catch (error) {
    console.error('Enhanced OpenAI API error:', error);
    console.error('Error details:', error.message);
    console.error('API Key present:', !!process.env.OPENAI_API_KEY);
    
    // Enhanced fallback response
    return generateEnhancedFallbackResponse(userMessage);
  }
}

// Generate simple contextual suggestions
function generateSimpleSuggestions(userMessage, aiResponse) {
  const message = userMessage.toLowerCase();
  const response = aiResponse.toLowerCase();
  
  const suggestions = [];

  // Topic-specific suggestions
  if (message.includes('microservices') || response.includes('microservices')) {
    suggestions.push("Show me microservices best practices");
    suggestions.push("How do I migrate from monolith to microservices?");
    suggestions.push("Microservices communication patterns");
  }
  
  if (message.includes('database') || response.includes('database')) {
    suggestions.push("Compare SQL vs NoSQL databases");
    suggestions.push("Database scaling strategies");
    suggestions.push("Data modeling best practices");
  }
  
  if (message.includes('api') || response.includes('api')) {
    suggestions.push("REST vs GraphQL comparison");
    suggestions.push("API design best practices");
    suggestions.push("API documentation strategies");
  }
  
  if (message.includes('security') || response.includes('security')) {
    suggestions.push("Authentication patterns");
    suggestions.push("Data encryption strategies");
    suggestions.push("Security compliance guide");
  }
  
  if (message.includes('cloud') || response.includes('cloud')) {
    suggestions.push("Cloud cost optimization");
    suggestions.push("Multi-cloud strategies");
    suggestions.push("Cloud migration guide");
  }

  // Default suggestions if no specific topics
  if (suggestions.length === 0) {
    suggestions.push("Take the architecture questionnaire");
    suggestions.push("Show me case studies");
    suggestions.push("Explain design patterns");
  }

  return suggestions.slice(0, 3); // Return max 3 suggestions
}

// Enhanced fallback response with better context awareness
function generateEnhancedFallbackResponse(userMessage) {
  const message = userMessage.toLowerCase();
  
  if (message.includes('microservices') || message.includes('micro-service')) {
    return {
      text: "Microservices architecture involves breaking down applications into small, independent services. Key considerations include service boundaries, communication patterns, data consistency, and operational complexity. What specific aspect of microservices would you like to explore?",
      suggestions: ["Microservices best practices", "Service decomposition strategies", "Communication patterns"],
      followUpQuestions: ["What's your expected user load?", "How many development teams?", "What are your data consistency requirements?"],
      analysis: {
        topics: ['microservices'],
        intent: 'general',
        complexity: 'medium',
        industry: 'general',
        technicalLevel: 'intermediate'
      }
    };
  }
  
  if (message.includes('database') || message.includes('db')) {
    return {
      text: "Database selection depends on your data structure, access patterns, and scalability requirements. SQL databases excel at ACID compliance and complex queries, while NoSQL databases handle unstructured data and horizontal scaling better. What type of data will you be storing?",
      suggestions: ["Database patterns", "Data modeling", "Database selection guide"],
      followUpQuestions: ["What's your data volume?", "What are your query patterns?", "Do you need real-time analytics?"],
      analysis: {
        topics: ['database'],
        intent: 'general',
        complexity: 'medium',
        industry: 'general',
        technicalLevel: 'intermediate'
      }
    };
  }
  
  if (message.includes('api') || message.includes('rest') || message.includes('graphql')) {
    return {
      text: "API design is crucial for system integration and scalability. REST APIs are simpler and more widely supported, while GraphQL provides flexibility for complex data requirements. gRPC excels at high-performance microservices communication. What's your primary use case?",
      suggestions: ["API design patterns", "REST vs GraphQL", "API documentation"],
      followUpQuestions: ["What's your expected API usage?", "Do you need real-time updates?", "What's your client diversity?"],
      analysis: {
        topics: ['api'],
        intent: 'general',
        complexity: 'medium',
        industry: 'general',
        technicalLevel: 'intermediate'
      }
    };
  }
  
  if (message.includes('security') || message.includes('auth')) {
    return {
      text: "Security is fundamental to any architecture. Consider OAuth 2.0 for authentication, JWT for stateless sessions, HTTPS everywhere, and encryption for sensitive data. What security requirements do you have?",
      suggestions: ["Security best practices", "Authentication patterns", "Data protection"],
      followUpQuestions: ["What compliance requirements apply?", "What's your threat model?", "Do you need audit trails?"],
      analysis: {
        topics: ['security'],
        intent: 'general',
        complexity: 'medium',
        industry: 'general',
        technicalLevel: 'intermediate'
      }
    };
  }
  
  if (message.includes('cloud') || message.includes('aws') || message.includes('azure') || message.includes('gcp')) {
    return {
      text: "Cloud platforms offer scalability and managed services. AWS, Azure, and GCP all provide excellent services. Consider your team's expertise, cost requirements, and specific service needs. Which cloud platform are you considering?",
      suggestions: ["Cloud architecture patterns", "Cost optimization", "Multi-cloud strategies"],
      followUpQuestions: ["What's your team's cloud experience?", "What's your budget?", "What specific services do you need?"],
      analysis: {
        topics: ['cloud'],
        intent: 'general',
        complexity: 'medium',
        industry: 'general',
        technicalLevel: 'intermediate'
      }
    };
  }
  
  // Default enhanced response
  return {
    text: "I'm here to help with your software architecture decisions. I can provide guidance on microservices, databases, APIs, security, cloud platforms, and more. What specific architecture challenge are you facing?",
    suggestions: ["Take the architecture questionnaire", "Show me case studies", "Explain design patterns"],
    followUpQuestions: ["What type of application are you building?", "What are your main requirements?", "What's your team size and expertise?"],
    analysis: {
      topics: [],
      intent: 'general',
      complexity: 'medium',
      industry: 'general',
      technicalLevel: 'intermediate'
    }
  };
}

module.exports = chatController; 