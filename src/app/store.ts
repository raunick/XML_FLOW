import { create } from 'zustand';
import { Node, Edge, OnNodesChange, OnEdgesChange, OnConnect, addEdge, ConnectionLineType } from '@xyflow/react';
import { XMLChildElement, NodeData } from './types';

interface FlowState {
  nodes: Node<NodeData>[];
  edges: Edge[];
  xmlDoc: Document | null;
  isLoading: boolean;
  setNodes: (nodes: Node<NodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setXmlDoc: (doc: Document | null) => void;
  setIsLoading: (loading: boolean) => void;
  handleNodeDataChange: (nodeId: string, newData: NodeData) => void;
}

const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  xmlDoc: null,
  isLoading: false,
  
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  
  onNodesChange: (changes) => {
    set((state) => ({
      nodes: changes.reduce((acc, change) => {
        // @ts-ignore - type inference issue with zustand
        return applyNodeChanges(change, acc);
      }, state.nodes),
    }));
  },
  
  onEdgesChange: (changes) => {
    set((state) => ({
      edges: changes.reduce((acc, change) => {
        // @ts-ignore - type inference issue with zustand
        return applyEdgeChanges(change, acc);
      }, state.edges),
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
  
  setXmlDoc: (doc) => set({ xmlDoc: doc }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  handleNodeDataChange: (nodeId, newData) => {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: newData,
          };
        }
        return node;
      }),
    }));
  },
}));

export default useFlowStore;