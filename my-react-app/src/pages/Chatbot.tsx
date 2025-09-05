import React, { useState, useRef, useEffect } from 'react';
import { chatApi } from '../services/api';
import type { ChatMessage } from '../types';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your advanced AI architecture assistant powered by sophisticated algorithms and context-aware analysis. I can help you with software architecture decisions, discuss different patterns, and provide industry-specific guidance. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send conversation context for better AI responses
      const conversationContext = messages
        .filter(msg => msg.sender === 'user' || msg.sender === 'ai')
        .slice(-6) // Send last 6 messages for context
        .map(msg => ({
          sender: msg.sender,
          text: msg.text
        }));
      
      const response = await chatApi.sendMessage(inputMessage, conversationContext);
      
      if (response.success) {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: response.response.text,
          sender: 'ai',
          timestamp: new Date(),
          suggestions: response.response.suggestions
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: 'Sorry, I encountered an error. Please try again.',
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const exampleQuestions = [
    "I need microservices for healthcare compliance",
    "Compare database options for e-commerce",
    "How to migrate from monolith to microservices?",
    "What's the best architecture for IoT applications?",
    "Security patterns for financial applications"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Advanced AI Architecture Assistant
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            Powered by sophisticated algorithms, context-aware analysis, and industry-specific guidance
          </p>
          
          {/* Advanced Features Toggle */}
          <button
            onClick={() => setShowAdvancedFeatures(!showAdvancedFeatures)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4"
          >
            {showAdvancedFeatures ? 'Hide' : 'Show'} Advanced Features
          </button>
          
          {showAdvancedFeatures && (
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Advanced AI Capabilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🧠</div>
                  <h4 className="font-medium text-gray-800 mb-2">Context Analysis</h4>
                  <p className="text-sm text-gray-600">
                    Automatically detects topics, intent, complexity, and industry context from your questions
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🏭</div>
                  <h4 className="font-medium text-gray-800 mb-2">Industry-Specific</h4>
                  <p className="text-sm text-gray-600">
                    Provides tailored guidance for healthcare, finance, e-commerce, and IoT applications
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <h4 className="font-medium text-gray-800 mb-2">Mathematical Reasoning</h4>
                  <p className="text-sm text-gray-600">
                    Uses advanced algorithms with weighted scoring and risk assessment
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Example Questions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Try these example questions:</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {exampleQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(question)}
                className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-2">Suggested follow-ups:</p>
                        <div className="flex flex-wrap gap-1">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => setInputMessage(suggestion)}
                              className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-sm">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about architecture patterns, scalability, security, or any technical questions..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Engine Info */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-2">Advanced AI Engine v2.0</h3>
            <p className="text-blue-100 text-sm">
              Powered by sophisticated prompt engineering, mathematical models, and context-aware analysis. 
              Get industry-specific guidance with confidence scores and risk assessments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot; 