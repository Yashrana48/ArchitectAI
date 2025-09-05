import React, { useState, useEffect, useRef } from 'react';

interface ArchitectureNode {
  id: string;
  name: string;
  type: 'monolithic' | 'microservices' | 'serverless' | 'soa';
  x: number;
  y: number;
  size: number;
  score: number;
  confidence: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  isRecommended: boolean;
  details: {
    advantages: string[];
    disadvantages: string[];
    bestFor: string[];
    costAnalysis: any;
    riskAssessment: any;
  };
}

interface InteractiveArchitectureDiagramProps {
  recommendations: any[];
  requirements: any;
  onNodeClick?: (node: ArchitectureNode) => void;
}

const InteractiveArchitectureDiagram: React.FC<InteractiveArchitectureDiagramProps> = ({
  recommendations,
  requirements,
  onNodeClick
}) => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Convert recommendations to nodes
  const nodes: ArchitectureNode[] = recommendations.map((rec, index) => ({
    id: rec.architecture.type,
    name: rec.architecture.name,
    type: rec.architecture.type as any,
    x: 150 + (index * 200),
    y: 200,
    size: 60 + (rec.architecture.score / 10),
    score: rec.architecture.score,
    confidence: rec.architecture.confidence,
    riskLevel: rec.architecture.riskAssessment?.riskLevel || 'Medium',
    isRecommended: index === 0,
    details: {
      advantages: rec.architecture.advantages,
      disadvantages: rec.architecture.disadvantages,
      bestFor: rec.architecture.bestFor,
      costAnalysis: rec.architecture.costAnalysis,
      riskAssessment: rec.architecture.riskAssessment
    }
  }));

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setAnimationPhase(prev => (prev + 1) % 360);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background grid
    drawGrid(ctx, canvas.width, canvas.height);

    // Draw connections between nodes
    drawConnections(ctx, nodes);

    // Draw nodes
    nodes.forEach(node => {
      drawNode(ctx, node, hoveredNode === node.id, selectedNode?.id === node.id, animationPhase);
    });

    // Draw score bars
    drawScoreBars(ctx, nodes);

    // Draw legend
    drawLegend(ctx, canvas.width, canvas.height);

  }, [nodes, hoveredNode, selectedNode, animationPhase]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y < height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawConnections = (ctx: CanvasRenderingContext2D, nodes: ArchitectureNode[]) => {
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < nodes.length - 1; i++) {
      const node1 = nodes[i];
      const node2 = nodes[i + 1];
      
      ctx.beginPath();
      ctx.moveTo(node1.x, node1.y);
      ctx.lineTo(node2.x, node2.y);
      ctx.stroke();
    }
  };

  const drawNode = (
    ctx: CanvasRenderingContext2D, 
    node: ArchitectureNode, 
    isHovered: boolean, 
    isSelected: boolean,
    phase: number
  ) => {
    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size);
    
    // Color based on architecture type and score
    const colors = {
      monolithic: { primary: '#3b82f6', secondary: '#1d4ed8' },
      microservices: { primary: '#10b981', secondary: '#059669' },
      serverless: { primary: '#f59e0b', secondary: '#d97706' },
      soa: { primary: '#8b5cf6', secondary: '#7c3aed' }
    };
    
    const color = colors[node.type];
    const alpha = isHovered ? 0.9 : isSelected ? 0.8 : 0.6;
    
    gradient.addColorStop(0, `${color.primary}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
    gradient.addColorStop(1, `${color.secondary}${Math.floor(alpha * 0.3 * 255).toString(16).padStart(2, '0')}`);
    
    ctx.fillStyle = gradient;
    ctx.strokeStyle = isSelected ? '#000' : isHovered ? color.secondary : '#666';
    ctx.lineWidth = isSelected ? 3 : isHovered ? 2 : 1;
    
    // Animated pulse effect for recommended architecture
    const pulseSize = node.isRecommended ? Math.sin(phase * Math.PI / 180) * 5 : 0;
    
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.size + pulseSize, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    
    // Draw score text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${node.score.toFixed(0)}`, node.x, node.y + 5);
    
    // Draw architecture name
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.fillText(node.name.split(' ')[0], node.x, node.y + node.size + 20);
    
    // Draw confidence indicator
    const confidenceBarWidth = 40;
    const confidenceBarHeight = 4;
    const confidenceX = node.x - confidenceBarWidth / 2;
    const confidenceY = node.y + node.size + 25;
    
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(confidenceX, confidenceY, confidenceBarWidth, confidenceBarHeight);
    
    ctx.fillStyle = node.confidence > 80 ? '#10b981' : node.confidence > 60 ? '#f59e0b' : '#ef4444';
    ctx.fillRect(confidenceX, confidenceY, (confidenceBarWidth * node.confidence) / 100, confidenceBarHeight);
  };

  const drawScoreBars = (ctx: CanvasRenderingContext2D, nodes: ArchitectureNode[]) => {
    const barWidth = 30;
    const barHeight = 120;
    const barSpacing = 200;
    const startX = 50;
    const startY = 50;
    
    nodes.forEach((node, index) => {
      const x = startX + (index * barSpacing);
      const y = startY;
      
      // Background bar
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(x, y, barWidth, barHeight);
      
      // Score bar
      const scoreHeight = (barHeight * node.score) / 100;
      const scoreY = y + barHeight - scoreHeight;
      
      const colors = {
        monolithic: '#3b82f6',
        microservices: '#10b981',
        serverless: '#f59e0b',
        soa: '#8b5cf6'
      };
      
      ctx.fillStyle = colors[node.type];
      ctx.fillRect(x, scoreY, barWidth, scoreHeight);
      
      // Score text
      ctx.fillStyle = '#374151';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(node.score.toFixed(0), x + barWidth / 2, y + barHeight + 15);
    });
  };

  const drawLegend = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const legendX = width - 200;
    const legendY = 20;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(legendX, legendY, 180, 120);
    
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Legend', legendX + 10, legendY + 20);
    
    const items = [
      { color: '#3b82f6', text: 'Monolithic' },
      { color: '#10b981', text: 'Microservices' },
      { color: '#f59e0b', text: 'Serverless' },
      { color: '#8b5cf6', text: 'SOA' }
    ];
    
    items.forEach((item, index) => {
      ctx.fillStyle = item.color;
      ctx.fillRect(legendX + 10, legendY + 30 + (index * 20), 12, 12);
      
      ctx.fillStyle = '#374151';
      ctx.font = '12px Arial';
      ctx.fillText(item.text, legendX + 30, legendY + 40 + (index * 20));
    });
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if click is on a node
    const clickedNode = nodes.find(node => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance <= node.size;
    });

    if (clickedNode) {
      setSelectedNode(clickedNode);
      onNodeClick?.(clickedNode);
    } else {
      setSelectedNode(null);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if mouse is over a node
    const hoveredNode = nodes.find(node => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance <= node.size;
    });

    setHoveredNode(hoveredNode?.id || null);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="border border-gray-200 rounded-lg cursor-pointer"
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        style={{ cursor: hoveredNode ? 'pointer' : 'default' }}
      />
      
      {/* Node Details Panel */}
      {selectedNode && (
        <div className="absolute top-0 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{selectedNode.name}</h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          {/* Score and Confidence */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{selectedNode.score.toFixed(1)}</div>
              <div className="text-sm text-gray-500">Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{selectedNode.confidence.toFixed(1)}%</div>
              <div className="text-sm text-gray-500">Confidence</div>
            </div>
          </div>
          
          {/* Risk Level */}
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Risk Level</div>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              selectedNode.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
              selectedNode.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {selectedNode.riskLevel} Risk
            </div>
          </div>
          
          {/* Advantages */}
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Advantages</div>
            <ul className="text-sm text-gray-600 space-y-1">
              {selectedNode.details.advantages.map((advantage, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {advantage}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Disadvantages */}
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Disadvantages</div>
            <ul className="text-sm text-gray-600 space-y-1">
              {selectedNode.details.disadvantages.map((disadvantage, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  {disadvantage}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Cost Analysis */}
          {selectedNode.details.costAnalysis && (
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Cost Analysis</div>
              <div className="text-sm text-gray-600">
                <div>Development: {selectedNode.details.costAnalysis.developmentCost.toFixed(2)}x</div>
                <div>Maintenance: {selectedNode.details.costAnalysis.maintenanceCost.toFixed(2)}x</div>
                <div>Infrastructure: {selectedNode.details.costAnalysis.infrastructureCost.toFixed(2)}x</div>
              </div>
            </div>
          )}
          
          {/* Best For */}
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Best For</div>
            <div className="text-sm text-gray-600">
              {selectedNode.details.bestFor.join(', ')}
            </div>
          </div>
        </div>
      )}
      
      {/* Hover Tooltip */}
      {hoveredNode && !selectedNode && (
        <div 
          className="absolute bg-gray-900 text-white text-sm px-2 py-1 rounded pointer-events-none z-10"
          style={{
            left: nodes.find(n => n.id === hoveredNode)?.x || 0,
            top: (nodes.find(n => n.id === hoveredNode)?.y || 0) - 40
          }}
        >
          {nodes.find(n => n.id === hoveredNode)?.name}
        </div>
      )}
    </div>
  );
};

export default InteractiveArchitectureDiagram; 