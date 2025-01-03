import { create } from 'zustand';
import { Node, Edge, OnNodesChange, OnEdgesChange, OnConnect, addEdge, ConnectionLineType, applyNodeChanges, applyEdgeChanges, NodeChange } from '@xyflow/react';
import { XMLChildElement, NodeData } from './types';

interface FlowState {
  nodes: Node<NodeData>[];
  edges: Edge[];
  xmlDoc: Document | null;
  isLoading: boolean;
  selectedNodes: Node<NodeData>[];
  setNodes: (nodes: Node<NodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setXmlDoc: (doc: Document | null) => void;
  setIsLoading: (loading: boolean) => void;
  setSelectedNodes: (nodes: Node<NodeData>[]) => void;
  handleNodeDataChange: (nodeId: string, newData: NodeData) => void;
}

const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  xmlDoc: null,
  isLoading: false,
  selectedNodes: [],

  setNodes: (nodes) => set({ nodes }),
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