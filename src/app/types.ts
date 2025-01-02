import { 
    Node,
    Edge
 } from "@xyflow/react";

export interface XMLChildElement {
  name: string;
  content: string;
  isCDATA: boolean;
}

export interface NodeData extends Record<string, unknown> {
  label: string;
  attributes: Record<string, string>;
  children: XMLChildElement[];
}

export interface LayoutOptions {
  nodes: Node<NodeData>[];
  edges: Edge[];
}

export interface AppProps {
  onError?: (error: Error) => void;
  onSuccess?: () => void;
}