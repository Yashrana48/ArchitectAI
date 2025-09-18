import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AIPerformanceDashboard from '../components/AIPerformanceDashboard';
import InteractiveArchitectureDiagram from '../components/InteractiveArchitectureDiagram';
import { useUser } from '../contexts/UserContext';
import { savedRecommendationService } from '../services/savedRecommendationService';
import type { SavedRecommendation, ProjectMetrics } from '../services/savedRecommendationService';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useUser();
  const [savedRecommendations, setSavedRecommendations] = useState<SavedRecommendation[]>([]);
  const [projectMetrics, setProjectMetrics] = useState<ProjectMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<SavedRecommendation | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'analytics' | 'performance'>('overview');

  // Load saved recommendations for the current user
  useEffect(() => {
    const loadUserRecommendations = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const recommendations = await savedRecommendationService.getUserRecommendations(user._id);
        setSavedRecommendations(recommendations);
        const metrics = await savedRecommendationService.getDashboardMetrics(user._id);
        setProjectMetrics(metrics);
      } catch (err: any) {
        console.error('Error loading user recommendations:', err);
        setError('Failed to load your recommendations. Please try again.');
        setSavedRecommendations([]);
        setProjectMetrics(null);
      } finally {
        setLoading(false);
      }
    };
    loadUserRecommendations();
  }, [isAuthenticated, user]);

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Authentication Required</h2>
          <p className="text-slate-600 mb-6">
            Please log in to access your personalized dashboard and saved recommendations.
          </p>
          <div className="space-y-3">
            <a
              href="/login"
              className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Login
            </a>
            <a
              href="/register"
              className="block w-full px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Error Loading Dashboard</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Welcome back, {user?.name}! 👋</h1>
          <p className="text-slate-600">Manage your architecture projects and track your AI recommendations</p>
        </div>

        {/* Quick Stats */}
        {projectMetrics && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <div className="text-2xl">📊</div>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Total Projects</p>
                  <p className="text-2xl font-bold text-slate-800">{projectMetrics.totalProjects}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <div className="text-2xl">🚀</div>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Active Projects</p>
                  <p className="text-2xl font-bold text-slate-800">{projectMetrics.activeProjects}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <div className="text-2xl">✅</div>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Implemented</p>
                  <p className="text-2xl font-bold text-slate-800">{projectMetrics.implementedProjects}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <div className="text-2xl">🎯</div>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-slate-600">Avg Confidence</p>
                  <p className="text-2xl font-bold text-slate-800">{projectMetrics.averageConfidence}%</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'projects'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Projects ({savedRecommendations.length})
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'analytics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'performance'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                AI Performance
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-800">Project Overview</h2>
                  <button
                    onClick={() => setShowNewProjectModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    + New Project
                  </button>
                </div>
                
                {savedRecommendations.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🏗️</div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">No projects yet</h3>
                    <p className="text-slate-600 mb-6">Start by creating your first architecture project</p>
                    <div className="space-x-4">
                      <Link
                        to="/questionnaire"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Get Recommendations
                      </Link>
                      <button
                        onClick={() => setShowNewProjectModal(true)}
                        className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        Create Project
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedRecommendations.slice(0, 6).map((project) => (
                      <div
                        key={project._id}
                        className="bg-slate-50 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-slate-800">{project.projectName}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            project.status === 'active' ? 'bg-green-100 text-green-800' :
                            project.status === 'implemented' ? 'bg-blue-100 text-blue-800' :
                            'bg-slate-100 text-slate-800'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{project.projectType}</p>
                        <div className="flex items-center text-sm text-slate-500">
                          <span>Team: {project.teamSize}</span>
                          <span className="mx-2">•</span>
                          <span>Budget: {project.budget}</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <p className="text-xs text-slate-500">
                            {project.recommendations.length} recommendations
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-800">All Projects</h2>
                  <button
                    onClick={() => setShowNewProjectModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    + New Project
                  </button>
                </div>
                
                {savedRecommendations.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📋</div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">No projects found</h3>
                    <p className="text-slate-600 mb-6">Create your first project to get started</p>
                    <Link
                      to="/questionnaire"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Start New Project
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedRecommendations.map((project) => (
                      <div
                        key={project._id}
                        className="bg-slate-50 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-slate-800 text-lg">{project.projectName}</h3>
                            <p className="text-slate-600">{project.projectType} • {project.industry}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              project.status === 'active' ? 'bg-green-100 text-green-800' :
                              project.status === 'implemented' ? 'bg-blue-100 text-blue-800' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {project.status}
                            </span>
                            <p className="text-xs text-slate-500 mt-1">
                              {new Date(project.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-500">Team Size:</span>
                            <span className="ml-2 font-medium">{project.teamSize}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Budget:</span>
                            <span className="ml-2 font-medium">{project.budget}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Recommendations:</span>
                            <span className="ml-2 font-medium">{project.recommendations.length}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800">Project Analytics</h2>
                
                {projectMetrics ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 rounded-lg p-6">
                      <h3 className="font-semibold text-slate-800 mb-4">Industry Distribution</h3>
                      <div className="space-y-3">
                        {Object.entries(projectMetrics.industryDistribution).map(([industry, count]) => (
                          <div key={industry} className="flex justify-between items-center">
                            <span className="text-slate-600">{industry}</span>
                            <span className="font-medium">{count} projects</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 rounded-lg p-6">
                      <h3 className="font-semibold text-slate-800 mb-4">Complexity Distribution</h3>
                      <div className="space-y-3">
                        {Object.entries(projectMetrics.complexityDistribution).map(([complexity, count]) => (
                          <div key={complexity} className="flex justify-between items-center">
                            <span className="text-slate-600">{complexity}</span>
                            <span className="font-medium">{count} recommendations</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">No analytics data</h3>
                    <p className="text-slate-600">Create some projects to see analytics</p>
                  </div>
                )}
              </div>
            )}

            {/* AI Performance Tab */}
            {activeTab === 'performance' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800">AI Performance Dashboard</h2>
                <AIPerformanceDashboard />
              </div>
            )}
          </div>
        </div>

        {/* Selected Project Modal */}
        {selectedProject && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <div 
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Debug info - remove in production */}
              {import.meta.env.DEV && (
                <div className="p-2 bg-yellow-50 text-xs text-slate-600">
                  Debug: Recommendations: {selectedProject.recommendations?.length || 0}, 
                  AI Recommendations: {selectedProject.aiRecommendations?.length || 0}
                </div>
              )}
              <div className="p-6 border-b border-slate-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-slate-800">{selectedProject.projectName}</h2>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    title="Close"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Project Details</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-slate-500">Type:</span> {selectedProject.projectType}</div>
                      <div><span className="text-slate-500">Industry:</span> {selectedProject.industry}</div>
                      <div><span className="text-slate-500">Team Size:</span> {selectedProject.teamSize}</div>
                      <div><span className="text-slate-500">Budget:</span> {selectedProject.budget}</div>
                      <div><span className="text-slate-500">Status:</span> {selectedProject.status}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Architecture Diagram</h3>
                    <div className="bg-slate-50 rounded-lg p-4 h-48 flex items-center justify-center">
                      {selectedProject.aiRecommendations && selectedProject.aiRecommendations.length > 0 ? (
                        <InteractiveArchitectureDiagram 
                          recommendations={selectedProject.aiRecommendations}
                          requirements={selectedProject.requirements}
                        />
                      ) : (
                        <div className="text-center text-slate-500">
                          <div className="text-4xl mb-2">🏗️</div>
                          <p>No interactive diagram available</p>
                          <p className="text-sm">This project was created before interactive diagrams were added</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4">Recommendations</h3>
                  {selectedProject.recommendations && selectedProject.recommendations.length > 0 ? (
                    <div className="space-y-4">
                      {selectedProject.recommendations.map((rec, index) => (
                        <div key={index} className="bg-slate-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-800">{rec.name}</h4>
                            <span className="text-sm text-slate-500">{rec.category}</span>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{rec.description}</p>
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>Confidence: {rec.confidence}%</span>
                            <span>Complexity: {rec.complexity}</span>
                            <span>Cost: {rec.estimatedCost}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <div className="text-4xl mb-2">📋</div>
                      <p>No recommendations available</p>
                    </div>
                  )}
                </div>
                
                {/* Close Button */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <div className="flex justify-end">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Project Modal */}
        {showNewProjectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-800">Create New Project</h2>
              </div>
              
              <div className="p-6">
                <p className="text-slate-600 mb-6">
                  Start a new architecture project by taking our comprehensive questionnaire.
                </p>
                
                <div className="space-y-3">
                  <Link
                    to="/questionnaire"
                    className="block w-full px-4 py-3 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition-colors"
                    onClick={() => setShowNewProjectModal(false)}
                  >
                    Start Questionnaire
                  </Link>
                  <button
                    onClick={() => setShowNewProjectModal(false)}
                    className="block w-full px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 