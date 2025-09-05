import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Recommendations',
      description: 'Get intelligent architecture suggestions based on your specific project requirements and constraints.',
      details: [
        'Context-aware recommendations',
        'Real-time analysis',
        'Industry-specific guidance',
        'Risk assessment'
      ]
    },
    {
      icon: '📊',
      title: 'Interactive Comparison Tool',
      description: 'Compare different architecture patterns side-by-side with detailed analysis and visual charts.',
      details: [
        'Multi-mode comparison',
        'Visual radar charts',
        'Cost-benefit analysis',
        'Export detailed reports'
      ]
    },
    {
      icon: '📚',
      title: 'Comprehensive Learning Hub',
      description: 'Access real-world case studies, best practices, and interactive architecture diagrams.',
      details: [
        'Real-world case studies',
        'Interactive diagrams',
        'Technology comparisons',
        'Best practices library'
      ]
    },
    {
      icon: '📋',
      title: 'Decision Tracking Dashboard',
      description: 'Track your architecture decisions, export reports, and maintain decision history.',
      details: [
        'Decision tracking',
        'Progress monitoring',
        'Export capabilities',
        'Analytics dashboard'
      ]
    }
  ];

  const benefits = [
    {
      icon: '⚡',
      title: 'Save Time',
      description: 'Reduce architecture planning time by 70% with AI-powered recommendations'
    },
    {
      icon: '💰',
      title: 'Reduce Costs',
      description: 'Avoid costly architectural mistakes with expert guidance and analysis'
    },
    {
      icon: '🎯',
      title: 'Make Better Decisions',
      description: 'Data-driven insights help you choose the right architecture for your project'
    },
    {
      icon: '🚀',
      title: 'Scale Confidently',
      description: 'Build scalable solutions with proven patterns and best practices'
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/10 to-blue-900/10"></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-6xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
                ArchitectAI
                <span className="block text-4xl md:text-5xl font-light text-blue-600 mt-2">
                  Intelligent Software Architecture Decisions
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
                Transform your software architecture planning with AI-powered insights, 
                interactive comparisons, and expert guidance for modern applications.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/questionnaire"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  🚀 Start Your Assessment
                </Link>
                <Link
                  to="/comparison"
                  className="px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-all duration-300 border-2 border-slate-200 hover:border-slate-300"
                >
                  🔍 Compare Architectures
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Features Section */}
      <div className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Powerful Features for Modern Architecture
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to make informed architecture decisions with confidence
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Feature Display */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                <div className="text-6xl mb-4">{features[currentFeature].icon}</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  {features[currentFeature].title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {features[currentFeature].description}
                </p>
                <ul className="space-y-2">
                  {features[currentFeature].details.map((detail, index) => (
                    <li key={index} className="flex items-center text-slate-600">
                      <span className="text-blue-500 mr-3">✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature Navigation */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    currentFeature === index
                      ? 'bg-white shadow-lg border-2 border-blue-200'
                      : 'bg-white/60 hover:bg-white/80 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">{feature.icon}</span>
                    <div>
                      <h4 className="font-semibold text-slate-800">{feature.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Why Choose ArchitectAI?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join thousands of developers and architects who trust our platform for their critical decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Architecture?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Start your journey towards better software architecture decisions today
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/questionnaire"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
            >
              🎯 Start Assessment
            </Link>
            <Link
              to="/learning"
              className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 border-2 border-white/30 hover:border-white/50"
            >
              📚 Explore Learning Hub
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">ArchitectAI</h3>
            <p className="text-slate-400 mb-6">
              Intelligent Software Architecture Decision System
            </p>
            <div className="flex justify-center space-x-6 text-slate-400">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/questionnaire" className="hover:text-white transition-colors">Assessment</Link>
              <Link to="/comparison" className="hover:text-white transition-colors">Comparison</Link>
              <Link to="/learning" className="hover:text-white transition-colors">Learning</Link>
              <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            </div>
            <div className="mt-6 text-sm text-slate-500">
              © 2025 ArchitectAI. Built for modern software architecture decisions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;