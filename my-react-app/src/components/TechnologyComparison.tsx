import React, { useState } from 'react';

interface Technology {
  id: string;
  name: string;
  category: string;
  description: string;
  pros: string[];
  cons: string[];
  useCases: string[];
  performance: number; // 1-10
  scalability: number; // 1-10
  complexity: number; // 1-10 (1 = simple, 10 = complex)
  cost: number; // 1-10 (1 = low, 10 = high)
  community: number; // 1-10
  maturity: number; // 1-10
}

interface TechnologyComparisonProps {
  technologies: Technology[];
  category: string;
}

const TechnologyComparison: React.FC<TechnologyComparisonProps> = ({
  technologies,
  category
}) => {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'radar'>('overview');

  const handleTechnologyToggle = (techId: string) => {
    setSelectedTechnologies(prev => 
      prev.includes(techId) 
        ? prev.filter(id => id !== techId)
        : prev.length < 3 
          ? [...prev, techId]
          : prev
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const selectedTechs = technologies.filter(tech => selectedTechnologies.includes(tech.id));

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{category} Comparison</h3>
        <p className="text-gray-600">Compare different {category.toLowerCase()} technologies side by side</p>
      </div>

      {/* Technology Selection */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Select Technologies (Max 3)</h4>
        <div className="flex flex-wrap gap-3">
          {technologies.map((tech) => (
            <button
              key={tech.id}
              onClick={() => handleTechnologyToggle(tech.id)}
              className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                selectedTechnologies.includes(tech.id)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {tech.name}
            </button>
          ))}
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              viewMode === 'overview'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setViewMode('detailed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              viewMode === 'detailed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Detailed
          </button>
          <button
            onClick={() => setViewMode('radar')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              viewMode === 'radar'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Radar Chart
          </button>
        </div>
      </div>

      {/* Comparison Content */}
      {selectedTechnologies.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>Select up to 3 technologies to compare</p>
        </div>
      ) : (
        <div>
          {viewMode === 'overview' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedTechs.map((tech) => (
                <div key={tech.id} className="border rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{tech.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{tech.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Performance</span>
                        <span className={getScoreColor(tech.performance)}>{tech.performance}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getScoreBarColor(tech.performance)}`}
                          style={{ width: `${tech.performance * 10}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Scalability</span>
                        <span className={getScoreColor(tech.scalability)}>{tech.scalability}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getScoreBarColor(tech.scalability)}`}
                          style={{ width: `${tech.scalability * 10}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Complexity</span>
                        <span className={getScoreColor(11 - tech.complexity)}>{(11 - tech.complexity)}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getScoreBarColor(11 - tech.complexity)}`}
                          style={{ width: `${(11 - tech.complexity) * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'detailed' && (
            <div className="space-y-6">
              {selectedTechs.map((tech) => (
                <div key={tech.id} className="border rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">{tech.name}</h4>
                  <p className="text-gray-600 mb-4">{tech.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-green-700 mb-2">✅ Pros</h5>
                      <ul className="space-y-1">
                        {tech.pros.map((pro, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-red-700 mb-2">❌ Cons</h5>
                      <ul className="space-y-1">
                        {tech.cons.map((con, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h5 className="font-semibold text-blue-700 mb-2">🎯 Best Use Cases</h5>
                    <ul className="space-y-1">
                      {tech.useCases.map((useCase, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'radar' && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Performance Comparison</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedTechs.map((tech) => (
                  <div key={tech.id} className="bg-white rounded-lg p-4">
                    <h5 className="font-semibold text-gray-800 mb-3">{tech.name}</h5>
                    <div className="space-y-2">
                      {[
                        { label: 'Performance', value: tech.performance },
                        { label: 'Scalability', value: tech.scalability },
                        { label: 'Simplicity', value: 11 - tech.complexity },
                        { label: 'Cost', value: 11 - tech.cost },
                        { label: 'Community', value: tech.community },
                        { label: 'Maturity', value: tech.maturity }
                      ].map((metric) => (
                        <div key={metric.label}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">{metric.label}</span>
                            <span className={getScoreColor(metric.value)}>{metric.value}/10</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${getScoreBarColor(metric.value)}`}
                              style={{ width: `${metric.value * 10}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TechnologyComparison; 