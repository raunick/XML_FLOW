// store.ts
import { create } from 'zustand';
import { Node, Edge, OnNodesChange, OnEdgesChange, OnConnect, addEdge, ConnectionLineType, applyNodeChanges, applyEdgeChanges, NodeChange } from '@xyflow/react';
import { XMLChildElement, NodeData } from './types';

interface FlowState {
  getNodeConnections: any;
  selectNodeConnections: any;
  selectFirstNodeConnections(): unknown;
  nodes: Node<NodeData>[];
  edges: Edge[];
  xmlDoc: Document | null;
  isLoading: boolean;
  isConnecting: boolean;
  selectedNodes: Node<NodeData>[];
  xmlType: 'template' | 'relatorio' | null;
  selectedFistNodes: Node<NodeData>[];
  firstNodeData: {
    id: string;
    label: string;
    title: string;
  } | null;
  setNodes: (nodes: Node<NodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setXmlDoc: (doc: Document | null) => void;
  setIsLoading: (loading: boolean) => void;
  setSelectedNodes: (nodes: Node<NodeData>[]) => void;
  setIsConnecting: (isConnecting: boolean) => void;
  handleNodeDataChange: (nodeId: string, newData: NodeData) => void;
  updateFirstNodeData: () => void;
  detectAndSetXmlType: () => void;
}

const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  xmlDoc: null,
  isLoading: false,
  selectedNodes: [],
  selectedFistNodes: [],
  isConnecting: false,
  xmlType: null,
  campos: [],
  firstNodeData: null,

  setIsConnecting: (isConnecting: boolean) => set({ isConnecting }),
  setNodes: (nodes) => {
    set({ nodes });
    get().updateFirstNodeData();
  },
  setEdges: (edges) => set({ edges }),
  setSelectedNodes: (nodes) => set({ selectedNodes: nodes }),

  onNodesChange: (changes) => {
    set((state) => {
      const updatedNodes = applyNodeChanges<Node<NodeData>>(changes as NodeChange<Node<NodeData>>[], state.nodes);
      const selectedNodes = updatedNodes.filter(node => node.selected);
      return {
        nodes: updatedNodes,
        selectedNodes: selectedNodes,
      };
    });
  },

  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },

  onConnect: (connection) => {
    set((state) => ({
      edges: addEdge(
        { ...connection, type: ConnectionLineType.Bezier, animated: true },
        state.edges
      ),
    }));
  },

  setXmlDoc: (doc) => {
    set({ xmlDoc: doc });
    get().detectAndSetXmlType();
  },

  setIsLoading: (loading) => set({ isLoading: loading }),

  handleNodeDataChange: (nodeId, newData) => {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: newData };
        }
        return node;
      }),
    }));
    get().updateFirstNodeData();
  },

  updateFirstNodeData: () => {
    const state = get();
    const firstNode = state.nodes[0];
    if (!firstNode?.data) return;

    const title = state.xmlType === 'template'
      ? firstNode.data.children.find(child => child.name === 'DS_TEMPLATE')?.content
      : firstNode.data.children.find(child => child.name === 'DS_TITULO')?.content;

    set({
      firstNodeData: {
        id: firstNode.id,
        label: firstNode.data.label,
        title: title || ''
      }
    });
  },

  detectAndSetXmlType: () => {
    const xmlDoc = get().xmlDoc;
    if (!xmlDoc) {
      set({ xmlType: null });
      return;
    }
    const templateNode = xmlDoc.querySelector("Template");
    set({ xmlType: templateNode ? 'template' : 'relatorio' });
  },
  // Adicione dentro do create do seu store
  selectFirstNodeConnections: () => {
    const state = get();
    const firstNode = state.nodes[0];
    if (!firstNode) return;

    // Encontra todas as edges conectadas ao primeiro node
    const connectedEdges = state.edges.filter(
      edge => edge.source === firstNode.id || edge.target === firstNode.id
    );

    // Pega os IDs dos nodes conectados
    const connectedNodeIds = new Set(
      connectedEdges.flatMap(edge => [edge.source, edge.target])
    );
    connectedNodeIds.delete(firstNode.id); // Remove o primeiro node da lista

    // Encontra os nodes conectados
    const connectedNodes = state.nodes.filter(node => connectedNodeIds.has(node.id));

    // Atualiza selectedNodes com os nodes conectados
    set({ selectedFistNodes: connectedNodes });
  },

  selectNodeConnections: (nodeId: string) => {
    const state = get();
    const node = state.nodes.find(node => node.id === nodeId);
    if (!node) return [];

    // Encontra todas as edges conectadas ao node
    const connectedEdges = state.edges.filter(
        edge => edge.source === node.id || edge.target === node.id
    );

    // Pega os IDs dos nodes conectados
    const connectedNodeIds = new Set(
        connectedEdges.flatMap(edge => [edge.source, edge.target])
    );

    connectedNodeIds.delete(node.id); // Remove o node da lista

    // Encontra os nodes conectados
    const connectedNodes = state.nodes.filter(node => connectedNodeIds.has(node.id));
    
    // Atualiza o estado com os nodes conectados e retorna os nodes
    set({ selectedNodes: connectedNodes });
    return connectedNodes;
},

getNodeConnections: (nodeId: string) => {
  const state = get();
  const node = state.nodes.find(node => node.id === nodeId);
  if (!node) return [];

  const connectedEdges = state.edges.filter(
      edge => edge.source === node.id || edge.target === node.id
  );

  const connectedNodeIds = new Set(
      connectedEdges.flatMap(edge => [edge.source, edge.target])
  );
  connectedNodeIds.delete(node.id);

  return state.nodes.filter(node => connectedNodeIds.has(node.id));
},

}));

export default useFlowStore;