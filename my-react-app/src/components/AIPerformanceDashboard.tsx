import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PerformanceMetrics {
  totalRecommendations: number;
  recentAccuracy: number;
  averageConfidence: number;
  userSatisfaction: number;
  responseTime: number;
  costPerRecommendation: number;
}

interface RecommendationHistory {
  timestamp: string;
  architecture: string;
  score: number;
  confidence: number;
  userFeedback: number;
  accuracy: 'High' | 'Medium' | 'Low';
}

interface AIPerformanceDashboardProps {
  metrics?: PerformanceMetrics;
  history?: RecommendationHistory[];
}

const AIPerformanceDashboard: React.FC<AIPerformanceDashboardProps> = ({
  metrics = {
    totalRecommendations: 0,
    recentAccuracy: 0,
    averageConfidence: 0,
    userSatisfaction: 0,
    responseTime: 0,
    costPerRecommendation: 0
  },
  history = []
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<'accuracy' | 'confidence' | 'satisfaction'>('accuracy');

  // Generate mock data for demonstration
  const generateMockHistory = (): RecommendationHistory[] => {
    const architectures = ['Monolithic', 'Microservices', 'Serverless', 'SOA'];
    const now = new Date();
    
    return Array.from({ length: 50 }, (_, i) => {
      const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
      return {
        timestamp: date.toISOString(),
        architecture: architectures[Math.floor(Math.random() * architectures.length)],
        score: Math.floor(Math.random() * 40) + 60, // 60-100
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100
        userFeedback: Math.floor(Math.random() * 3) + 3, // 3-5
        accuracy: Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low'
      };
    }).reverse();
  };

  const mockHistory = history.length > 0 ? history : generateMockHistory();

  // Filter data based on timeframe
  const getFilteredData = () => {
    const days = selectedTimeframe === '7d' ? 7 : selectedTimeframe === '30d' ? 30 : 90;
    const cutoffDate = new Date(Date.now() - (days * 24 * 60 * 60 * 1000));
    
    return mockHistory.filter(item => new Date(item.timestamp) >= cutoffDate);
  };

  const filteredData = getFilteredData();

  // Chart data configurations
  const accuracyChartData = {
    labels: filteredData.map(item => new Date(item.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Recommendation Accuracy',
        data: filteredData.map(item => 
          item.accuracy === 'High' ? 100 : item.accuracy === 'Medium' ? 70 : 40
        ),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const confidenceChartData = {
    labels: filteredData.map(item => new Date(item.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'AI Confidence',
        data: filteredData.map(item => item.confidence),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const satisfactionChartData = {
    labels: filteredData.map(item => new Date(item.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'User Satisfaction',
        data: filteredData.map(item => item.userFeedback * 20), // Convert 1-5 to 20-100
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const architectureDistributionData = {
    labels: ['Monolithic', 'Microservices', 'Serverless', 'SOA'],
    datasets: [
      {
        data: [
          filteredData.filter(item => item.architecture === 'Monolithic').length,
          filteredData.filter(item => item.architecture === 'Microservices').length,
          filteredData.filter(item => item.architecture === 'Serverless').length,
          filteredData.filter(item => item.architecture === 'SOA').length
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(139, 92, 246)'
        ],
        borderWidth: 2
      }
    ]
  };

  const performanceRadarData = {
    labels: ['Accuracy', 'Confidence', 'Satisfaction', 'Response Time', 'Cost Efficiency', 'Reliability'],
    datasets: [
      {
        label: 'Current Performance',
        data: [
          metrics.recentAccuracy,
          metrics.averageConfidence,
          metrics.userSatisfaction,
          Math.max(0, 100 - metrics.responseTime), // Invert response time
          Math.max(0, 100 - metrics.costPerRecommendation * 10), // Invert cost
          95 // Mock reliability
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'AI Performance Metrics'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Performance Overview'
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  // Calculate current metrics
  const currentMetrics = {
    totalRecommendations: filteredData.length,
    recentAccuracy: filteredData.filter(item => item.accuracy === 'High').length / filteredData.length * 100,
    averageConfidence: filteredData.reduce((sum, item) => sum + item.confidence, 0) / filteredData.length,
    userSatisfaction: filteredData.reduce((sum, item) => sum + item.userFeedback, 0) / filteredData.length * 20,
    responseTime: 2.5, // Mock average response time
    costPerRecommendation: 0.0002 // Mock cost
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">AI Performance Dashboard</h2>
        <div className="flex space-x-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="accuracy">Accuracy</option>
            <option value="confidence">Confidence</option>
            <option value="satisfaction">Satisfaction</option>
          </select>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{currentMetrics.totalRecommendations}</div>
          <div className="text-sm text-gray-600">Total Recommendations</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{currentMetrics.recentAccuracy.toFixed(1)}%</div>
          <div className="text-sm text-gray-600">Accuracy Rate</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{currentMetrics.averageConfidence.toFixed(1)}%</div>
          <div className="text-sm text-gray-600">Avg Confidence</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{currentMetrics.userSatisfaction.toFixed(1)}%</div>
          <div className="text-sm text-gray-600">User Satisfaction</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend Chart */}
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Performance Trend</h3>
          <Line 
            data={
              selectedMetric === 'accuracy' ? accuracyChartData :
              selectedMetric === 'confidence' ? confidenceChartData :
              satisfactionChartData
            }
            options={chartOptions}
          />
        </div>

        {/* Architecture Distribution */}
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Architecture Distribution</h3>
          <Doughnut 
            data={architectureDistributionData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom' as const,
                }
              }
            }}
          />
        </div>

        {/* Performance Radar Chart */}
        <div className="bg-white p-4 rounded-lg border lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
          <div className="h-80">
            <Radar 
              data={performanceRadarData}
              options={radarOptions}
            />
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Architecture</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Score</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Confidence</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Feedback</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(-10).map((item, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">{item.architecture}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{item.score}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{item.confidence}%</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{item.userFeedback}/5</td>
                  <td className="px-4 py-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      item.accuracy === 'High' ? 'bg-green-100 text-green-800' :
                      item.accuracy === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.accuracy}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Engine Status */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">AI Engine Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-600">Engine Version</div>
            <div className="text-lg font-semibold text-gray-900">2.0.0</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">Algorithm</div>
            <div className="text-lg font-semibold text-gray-900">Advanced ML</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">Response Time</div>
            <div className="text-lg font-semibold text-gray-900">{currentMetrics.responseTime}s</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">Cost/Request</div>
            <div className="text-lg font-semibold text-gray-900">${currentMetrics.costPerRecommendation}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPerformanceDashboard; 