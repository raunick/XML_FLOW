'use client';

import { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  NodeChange,
  EdgeChange,
  Connection,
  Edge,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './globals.css';
import TextNode from '@/nodes/TextNode';
import SelectorNode from '@/nodes/SelectorNode';
import TextSQL from '@/nodes/TextSQL';
import RelatorioNode from '@/nodes/RelatorioNode';
import CampoNode from '@/nodes/CampoNode';
import BandaNode from '@/nodes/BandaNode';
import ImageNode from '@/nodes/ImageNode';
import ImpressoraNode from '@/nodes/ImpressoraNode';


const initialNodes: Node[] = [
  { id: 'node-1', type: 'TextNode', position: { x: -400, y: 0 }, data: { value: 123 } },
  { id: 'node-2', type: 'SelectorNode', position: { x: -400, y: 300 }, data: { value: 123 } },
  { id: 'node-3', type: 'TextSQL', position: { x: -400, y: 600 }, data: { value: 123 } },

  { id: 'rel', type: 'RelatorioNode', position: { x: 800, y: 0 }, data: { value: 123 } },
  { id: 'ban-1', type: 'BandaNode', position: { x: 400, y: 0 }, data: { value: 123 } },
  { id: 'cam-1', type: 'CampoNode', position: { x: 0, y: 0 }, data: { value: 123 } },
  { id: 'view-1', type: 'ImageNode', position: { x: 1200, y: 0 }, data: { value: 123 } },
  { id: 'imp-1', type: 'ImpressoraNode', position: { x: 400, y: 650 }, data: { value: 123 } },

];

const initialEdges: Edge[] = [
  { id: "rel->view-1", source: "rel", target: "view-1", animated: true },
  { id: "ban-1->rel", source: "ban-1", target: "rel",animated: true },
  { id: "cam-1->ban-1", source: "cam-1", target: "ban-1", animated: true },
  { id: "imp-1->rel", source: "imp-1", target: "rel", animated: true },
  { id: "node-1->cam-1", source: "node-1", target: "cam-1", animated: false },
  { id: "node-2->cam-1", source: "node-2", target: "cam-1", animated: false },
  { id: "node-3->cam-1", source: "node-3", target: "cam-1", animated: false },

];
const nodeTypes = {
  TextNode: TextNode,
  SelectorNode: SelectorNode,
  TextSQL: TextSQL,
  RelatorioNode: RelatorioNode,
  CampoNode: CampoNode,
  BandaNode: BandaNode,
  ImageNode: ImageNode,
  ImpressoraNode: ImpressoraNode,
};

function Flow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [nodeLabels, setNodeLabels] = useState<{ [key: string]: string }>({});

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const { source, target } = params;
      const sourceNode = nodes.find((node) => node.id === source);
      const targetNode = nodes.find((node) => node.id === target);
      if (sourceNode && targetNode) {
        const newLabel = `${sourceNode.data.label} ${targetNode.data.label}`;
        if (typeof target === 'string') { // Garantir que 'target' é uma string
          setNodeLabels((prevLabels) => ({
            ...prevLabels,
            [target]: newLabel,
          }));
        }
      }
      setEdges((eds) => addEdge(params, eds));
    },
    [nodes],
  );

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: { ...node.data, label: nodeLabels[node.id] || node.data.label },
      }))
    );
  }, [nodeLabels]);

  return (
    <div className='h-screen w-screen'>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
