import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  Node,
  Edge,
  OnConnect,
} from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import RelatorioNode from "./RelatorioNode";

import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import { InfoCircledIcon, StretchHorizontallyIcon, StretchVerticallyIcon, UploadIcon } from "@radix-ui/react-icons";

// Define interfaces for better type safety
interface NodeData {
  label: string;
  [key: string]: string;
}

interface LayoutOptions {
  nodes: Node<NodeData>[];
  edges: Edge[];
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 600;
const nodeHeight = 50;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = "TB"): LayoutOptions => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: newNodes, edges };
};

const nodeTypes = {
  customNode: RelatorioNode,
};

const App: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<NodeData>[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const xmlText = e.target?.result;
      if (typeof xmlText !== "string") return;

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      const tabelas = xmlDoc.getElementsByTagName("Tabela");

      const newNodes: Node<NodeData>[] = [];
      const newEdges: Edge[] = [];
      const nodeMap: Record<string, string> = {};

      Array.from(tabelas).forEach((tabela, tabelaIndex) => {
        const tableName = tabela.getAttribute("nm_tabela") || `Tabela ${tabelaIndex + 1}`;
        const registros = tabela.getElementsByTagName("registro");

        Array.from(registros).forEach((registro, registroIndex) => {
          const nrSequencia = registro.getAttribute("NR_SEQUENCIA") || `Registro ${registroIndex + 1}`;
          const recordData = Array.from(registro.attributes).reduce((acc, attr) => ({
            ...acc,
            [attr.name]: attr.value,
          }), {} as Record<string, string>);

          // Capturar elementos filhos
          Array.from(registro.children).forEach((child) => {
            recordData[child.tagName] = child.textContent || "";
          });

          const recordId = `node-${tabelaIndex}-${registroIndex}`;
          newNodes.push({
            id: recordId,
            type: "customNode",
            data: {
              label: `Tabela: ${tableName}, NR_SEQUENCIA: ${nrSequencia}`,
              ...recordData,
            },
            position: { x: 0, y: 0 },
          });

          nodeMap[nrSequencia] = recordId;
        });
      });

      // Create edges
      Array.from(tabelas).forEach((tabela) => {
        const registros = tabela.getElementsByTagName("registro");
        Array.from(registros).forEach((registro) => {
          const nrSequencia = registro.getAttribute("NR_SEQUENCIA");
          const nrSeqRelatorio = registro.getAttribute("NR_SEQ_RELATORIO");
          const nrSeqBanda = registro.getAttribute("NR_SEQ_BANDA");

          if (nrSequencia && nrSeqRelatorio && nodeMap[nrSeqRelatorio]) {
            newEdges.push({
              id: `edge-${nrSeqRelatorio}-${nrSequencia}`,
              source: nodeMap[nrSeqRelatorio],
              target: nodeMap[nrSequencia],
              animated: true,
              type: ConnectionLineType.Bezier,
            });
          } else if (nrSequencia && nrSeqBanda && nodeMap[nrSeqBanda]) {
            newEdges.push({
              id: `edge-${nrSeqBanda}-${nrSequencia}`,
              source: nodeMap[nrSeqBanda],
              target: nodeMap[nrSequencia],
              animated: true,
              type: ConnectionLineType.Bezier,
            });
          }
        });
      });

      setNodes(newNodes);
      setEdges(newEdges);
    };

    reader.readAsText(file, "ISO-8859-1");
  }, [setNodes, setEdges]);

  const onConnect = useCallback<OnConnect>(
    (params) => setEdges((eds) => 
      addEdge({ ...params, type: ConnectionLineType.Bezier, animated: true }, eds)
    ),
    [setEdges]
  );

  const onLayout = useCallback(
    (direction: "TB" | "LR") => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, direction);
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges, setNodes, setEdges]
  );

  return (
    <div className="w-screen h-screen">
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex space-x-4 z-50">
        <Button onClick={() => onLayout("LR")} className="z-50">
          <StretchHorizontallyIcon className="mr-2 h-4 w-4" />
          Horizontal Layout
        </Button>
      </div>

      <div className="fixed top-4 right-4 z-50">
        <Button className="relative">
          <input
            type="file"
            onChange={handleFileUpload}
            accept=".xml"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <UploadIcon className="mr-2 h-4 w-4" />
          Enviar XML
        </Button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        minZoom={0.01} // Permite níveis muito baixos de zoom
        maxZoom={1000} // Permite níveis muito altos de zoom
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.Bezier}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default App;
