import React, { useState } from 'react';
import type { EnhancedCaseStudy } from '../data/enhancedCaseStudies';

interface DetailedCaseStudyViewerProps {
  caseStudy: EnhancedCaseStudy;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  isRead: boolean;
  onMarkAsRead: () => void;
}

const DetailedCaseStudyViewer: React.FC<DetailedCaseStudyViewerProps> = ({
  caseStudy,
  onClose,
  isBookmarked,
  onToggleBookmark,
  isRead,
  onMarkAsRead
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  const handleMarkAsRead = () => {
    if (!isRead) {
      onMarkAsRead();
    }
  };

  React.useEffect(() => {
    handleMarkAsRead();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'technical', label: 'Technical Deep Dive', icon: '🔧' },
    { id: 'implementation', label: 'Implementation', icon: '⚙️' },
    { id: 'code', label: 'Code Examples', icon: '💻' },
    { id: 'resources', label: 'External Resources', icon: '🔗' },
    { id: 'metrics', label: 'Key Metrics', icon: '📊' }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article': return '📄';
      case 'video': return '🎥';
      case 'documentation': return '📚';
      case 'github': return '🐙';
      case 'blog': return '✍️';
      case 'whitepaper': return '📋';
      default: return '🔗';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏢</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{caseStudy.company}</h2>
                <h3 className="text-lg text-gray-600">{caseStudy.title}</h3>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isRead && (
                <span className="text-green-500 text-sm" title="Read">
                  ✓
                </span>
              )}
              <button
                onClick={onToggleBookmark}
                className={`text-2xl transition-colors ${
                  isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                }`}
                title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
              >
                {isBookmarked ? '⭐' : '☆'}
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Detailed Description</h4>
                <p className="text-gray-700 leading-relaxed">{caseStudy.detailedDescription}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Challenges</h4>
                  <ul className="space-y-2">
                    {caseStudy.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">⚠️</span>
                        <span className="text-gray-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Solutions</h4>
                  <ul className="space-y-2">
                    {caseStudy.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✅</span>
                        <span className="text-gray-700">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Results</h4>
                <ul className="space-y-2">
                  {caseStudy.results.map((result, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">🎯</span>
                      <span className="text-gray-700">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">Architecture</h5>
                  <p className="text-blue-700">{caseStudy.architecture}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2">Scale</h5>
                  <p className="text-green-700">{caseStudy.scale}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-purple-800 mb-2">Complexity</h5>
                  <p className="text-purple-700">{caseStudy.complexity}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'technical' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Architecture Overview</h4>
                <p className="text-gray-700 leading-relaxed">{caseStudy.technicalDeepDive.architectureOverview}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Components</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {caseStudy.technicalDeepDive.keyComponents.map((component, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-700">{component}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Data Flow</h4>
                <p className="text-gray-700 leading-relaxed">{caseStudy.technicalDeepDive.dataFlow}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Security Measures</h4>
                <ul className="space-y-2">
                  {caseStudy.technicalDeepDive.securityMeasures.map((measure, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">🔒</span>
                      <span className="text-gray-700">{measure}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Scalability Approach</h4>
                <p className="text-gray-700 leading-relaxed">{caseStudy.technicalDeepDive.scalabilityApproach}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Monitoring Strategy</h4>
                <p className="text-gray-700 leading-relaxed">{caseStudy.technicalDeepDive.monitoringStrategy}</p>
              </div>
            </div>
          )}

          {activeTab === 'implementation' && (
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Implementation Phases</h4>
              {caseStudy.implementationPhases.map((phase, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-semibold text-gray-800">{phase.phase}</h5>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {phase.duration}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h6 className="font-semibold text-gray-700 mb-2">Key Activities</h6>
                      <ul className="space-y-1">
                        {phase.keyActivities.map((activity, activityIndex) => (
                          <li key={activityIndex} className="flex items-start">
                            <span className="text-blue-500 mr-2 mt-1">•</span>
                            <span className="text-gray-700 text-sm">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h6 className="font-semibold text-gray-700 mb-2">Outcomes</h6>
                      <ul className="space-y-1">
                        {phase.outcomes.map((outcome, outcomeIndex) => (
                          <li key={outcomeIndex} className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">✓</span>
                            <span className="text-gray-700 text-sm">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Code Examples</h4>
              {caseStudy.codeExamples.map((example, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold text-gray-800">{example.title}</h5>
                        <p className="text-sm text-gray-600">{example.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {example.language}
                        </span>
                        <button
                          onClick={() => setExpandedCode(expandedCode === example.title ? null : example.title)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          {expandedCode === example.title ? 'Collapse' : 'Expand'}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {expandedCode === example.title && (
                    <div className="p-4">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{example.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">External Resources</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {caseStudy.externalResources.map((resource, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{getResourceIcon(resource.type)}</span>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800 mb-1">{resource.title}</h5>
                        <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            {resource.type}
                          </span>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Visit Resource →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Key Metrics</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {caseStudy.keyMetrics.map((metric, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-2">{metric.metric}</h5>
                    <div className="text-2xl font-bold text-blue-600 mb-1">{metric.value}</div>
                    <p className="text-sm text-gray-600">{metric.improvement}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-lg font-semibold text-gray-800 mb-3">Best Practices</h5>
                  <ul className="space-y-2">
                    {caseStudy.bestPractices.map((practice, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✅</span>
                        <span className="text-gray-700">{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-gray-800 mb-3">Anti-Patterns to Avoid</h5>
                  <ul className="space-y-2">
                    {caseStudy.antiPatterns.map((antiPattern, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">❌</span>
                        <span className="text-gray-700">{antiPattern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-gray-800 mb-3">Tools & Frameworks</h5>
                {caseStudy.toolsAndFrameworks.map((category, index) => (
                  <div key={index} className="mb-4">
                    <h6 className="font-semibold text-gray-700 mb-2">{category.category}</h6>
                    <div className="flex flex-wrap gap-2">
                      {category.tools.map((tool, toolIndex) => (
                        <span key={toolIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-xl">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {caseStudy.year} • {caseStudy.industry} • {caseStudy.teamSize}
            </div>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCaseStudyViewer;
