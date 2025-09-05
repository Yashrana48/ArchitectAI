import React, { useState } from 'react';

interface DiagramNode {
  id: string;
  label: string;
  type: 'service' | 'database' | 'gateway' | 'queue' | 'cache';
  position: { x: number; y: number };
  connections: string[];
  description: string;
}

interface ArchitectureDiagramProps {
  title: string;
  description: string;
  nodes: DiagramNode[];
  onNodeClick?: (node: DiagramNode) => void;
}

const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  title,
  description,
  nodes,
  onNodeClick
}) => {
  const [selectedNode, setSelectedNode] = useState<DiagramNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'service': return 'bg-blue-500';
      case 'database': return 'bg-green-500';
      case 'gateway': return 'bg-purple-500';
      case 'queue': return 'bg-orange-500';
      case 'cache': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'service': return '⚙️';
      case 'database': return '🗄️';
      case 'gateway': return '🚪';
      case 'queue': return '📬';
      case 'cache': return '⚡';
      default: return '📦';
    }
  };

  const handleNodeClick = (node: DiagramNode) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node);
    onNodeClick?.(node);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Interactive Diagram */}
      <div className="relative bg-gray-50 rounded-xl p-8 min-h-96 border-2 border-dashed border-gray-300">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map((node) =>
            node.connections.map((targetId) => {
              const targetNode = nodes.find(n => n.id === targetId);
              if (!targetNode) return null;

              const startX = node.position.x + 50;
              const startY = node.position.y + 25;
              const endX = targetNode.position.x + 50;
              const endY = targetNode.position.y + 25;

              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke={hoveredNode === node.id || hoveredNode === targetId ? "#3B82F6" : "#D1D5DB"}
                  strokeWidth={hoveredNode === node.id || hoveredNode === targetId ? "3" : "2"}
                  strokeDasharray="5,5"
                  className="transition-all duration-200"
                />
              );
            })
          )}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute cursor-pointer transition-all duration-200 transform hover:scale-110 ${
              selectedNode?.id === node.id ? 'z-20' : 'z-10'
            }`}
            style={{
              left: node.position.x,
              top: node.position.y,
            }}
            onClick={() => handleNodeClick(node)}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div
              className={`w-20 h-12 rounded-lg shadow-lg flex items-center justify-center text-white font-medium text-sm ${
                getNodeColor(node.type)
              } ${
                selectedNode?.id === node.id ? 'ring-4 ring-blue-300' : ''
              }`}
            >
              <span className="mr-1">{getNodeIcon(node.type)}</span>
              {node.label}
            </div>
          </div>
        ))}
      </div>

      {/* Node Details Panel */}
      {selectedNode && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center">
              <span className="mr-2">{getNodeIcon(selectedNode.type)}</span>
              {selectedNode.label}
            </h4>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-600 text-sm">{selectedNode.description}</p>
          <div className="mt-3">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Type: {selectedNode.type}
            </span>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4">
        {['service', 'database', 'gateway', 'queue', 'cache'].map((type) => (
          <div key={type} className="flex items-center">
            <div className={`w-4 h-4 rounded mr-2 ${getNodeColor(type)}`}></div>
            <span className="text-sm text-gray-600 capitalize">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchitectureDiagram; 