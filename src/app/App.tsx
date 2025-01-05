import React, { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ConnectionLineType,
  Node,
  Edge,
} from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import RelatorioNode from "./RelatorioNode";
import { toast } from "sonner";
import useFlowStore from './store';

import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import {
  DownloadIcon,
  MagicWandIcon,
  StretchHorizontallyIcon,
  SymbolIcon,
  UploadIcon,
} from "@radix-ui/react-icons";

import { AppProps, NodeData, XMLChildElement } from './types';
import { add } from "date-fns";
import PreviewNode from "./PreviewNode";

// Constants
const CONFIG = {
  NODE: {
    WIDTH: 600,
    HEIGHT: 50,
  },
  ZOOM: {
    MIN: 0.01,
    MAX: 1000,
  },
  FILE: {
    ENCODING: "ISO-8859-1",
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: [".xml"],
  },
} as const;

// Graph layout configuration
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (
  nodes: Node<NodeData>[],
  edges: Edge[],
  direction = "TB"
): { nodes: Node<NodeData>[]; edges: Edge[] } => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: CONFIG.NODE.WIDTH,
      height: CONFIG.NODE.HEIGHT
    });
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
        x: nodeWithPosition.x - CONFIG.NODE.WIDTH / 2,
        y: nodeWithPosition.y - CONFIG.NODE.HEIGHT / 2,
      },
    } as Node<NodeData>;
  });

  return { nodes: newNodes, edges: edges };
};

const App: React.FC<AppProps> = ({ onError, onSuccess }) => {
  // Get state and actions from Zustand store
  const {
    nodes,
    edges,
    xmlDoc,
    isLoading,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setXmlDoc,
    setIsLoading,
    handleNodeDataChange,
  } = useFlowStore();

  // Memoized nodeTypes with the handler
  const nodeTypes = useMemo(
    () => ({
      customNode: (props: any) => (
        <RelatorioNode {...props} onDataChange={handleNodeDataChange} />
      ),
      previewNode: (props: { id: string; data: NodeData; isConnectable: boolean }) => (
        <PreviewNode {...props} />
      ),
    }),
    [handleNodeDataChange]
  );

  // File validation
  const validateFile = (file: File): boolean => {
    if (file.size > CONFIG.FILE.MAX_SIZE) {
      throw new Error('Arquivo muito grande. Tamanho máximo permitido: 5MB');
    }
    if (!CONFIG.FILE.ALLOWED_TYPES.some(type => file.name.toLowerCase().endsWith(type))) {
      throw new Error('Tipo de arquivo inválido. Apenas arquivos XML são permitidos');
    }
    return true;
  };

  // XML Processing
  const processXMLNodes = (xmlDoc: Document) => {
    const tabelas = xmlDoc.getElementsByTagName("Tabela");
    const newNodes: Node<NodeData>[] = [];
    const nodeMap: Record<string, string> = {};

    Array.from(tabelas).forEach((tabela, tabelaIndex) => {
      const tableName = tabela.getAttribute("nm_tabela") || `Tabela ${tabelaIndex + 1}`;
      const registros = tabela.getElementsByTagName("registro");

      Array.from(registros).forEach((registro, registroIndex) => {
        // Processa atributos
        const attributes = Array.from(registro.attributes).reduce((acc, attr) => ({
          ...acc,
          [attr.name]: attr.value,
        }), {} as Record<string, string>);

        // Processa elementos filhos
        const children = Array.from(registro.children).map((child): XMLChildElement => ({
          name: child.tagName,
          content: child.textContent || "",
          isCDATA: child.firstChild?.nodeType === 4
        }));

        const nrSequencia = attributes["NR_SEQUENCIA"] || `Registro ${registroIndex + 1}`;
        const recordId = `node-${tabelaIndex}-${registroIndex}`;

        newNodes.push({
          id: recordId,
          type: "customNode",
          data: {
            label: `Tabela: ${tableName}, NR_SEQUENCIA: ${nrSequencia}`,
            attributes,
            children
          } as NodeData,
          position: { x: 0, y: 0 },
        } as Node<NodeData>);

        nodeMap[nrSequencia] = recordId;
      });
    });

    return { newNodes, nodeMap };
  };

  const determineXMLType = (xmlDoc: Document): 'relatorio' | 'template' => {
    // Pega o elemento raiz do XML
    const rootElement = xmlDoc.documentElement;

    // Verifica o nome do elemento raiz em maiúsculo para evitar problemas de case
    const rootName = rootElement.tagName.toUpperCase();

    // Retorna o tipo baseado no elemento raiz
    if (rootName === 'RELATORIOS') {
      return 'relatorio';
    } else if (rootName === 'TEMPLATE') {
      return 'template';
    }

    // Se não for nenhum dos tipos esperados, lança um erro
    throw new Error('XML inválido: Deve começar com Relatorios ou Template');
  };
  // criar função para templates
  const createEdgesTemplate = (xmlDoc: Document, nodeMap: Record<string, string>) => {
    const tabelas = xmlDoc.getElementsByTagName("Tabela");
    const newEdges: Edge[] = [];

    Array.from(tabelas).forEach((tabela) => {
      const registros = tabela.getElementsByTagName("registro");
      Array.from(registros).forEach((registro) => {
        const nrSequencia = registro.getAttribute("NR_SEQUENCIA");
        const nrSeqTemplate = registro.getAttribute("NR_SEQ_TEMPLATE");
        const nrSeqItem = registro.getAttribute("NR_SEQ_ITEM");

        if (nrSequencia && nrSeqTemplate && nodeMap[nrSeqTemplate]) {
          newEdges.push({
            id: `edge-${nrSeqTemplate}-${nrSequencia}`,
            source: nodeMap[nrSeqTemplate],
            target: nodeMap[nrSequencia],
            animated: true,
            type: ConnectionLineType.Bezier,
          });
        } else if (nrSequencia && nrSeqItem && nodeMap[nrSeqItem]) {
          newEdges.push({
            id: `edge-${nrSeqItem}-${nrSequencia}`,
            source: nodeMap[nrSeqItem],
            target: nodeMap[nrSequencia],
            animated: true,
            type: ConnectionLineType.Bezier,
          });
        }
      });
    });

    return newEdges;
  };

  // Função para relatorio - regras para criar as conexões
  const createEdges = (xmlDoc: Document, nodeMap: Record<string, string>) => {
    const tabelas = xmlDoc.getElementsByTagName("Tabela");
    const newEdges: Edge[] = [];

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

    return newEdges;
  };
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    try {
      const file = event.target.files?.[0];
      if (!file || !validateFile(file)) return;

      const text = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = reject;
        reader.readAsText(file, CONFIG.FILE.ENCODING);
      });

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      const xmlType = determineXMLType(xmlDoc);

      const parserError = xmlDoc.getElementsByTagName("parsererror");
      if (parserError.length > 0) {
        throw new Error("Erro ao processar o arquivo XML");
      }

      const createEdgesFunction = xmlType === 'relatorio' ? createEdges : createEdgesTemplate;

      setXmlDoc(xmlDoc);

      const { newNodes, nodeMap } = processXMLNodes(xmlDoc);
      const newEdges = createEdgesFunction(xmlDoc, nodeMap);

      setNodes(newNodes);
      setEdges(newEdges);

      toast.success("XML carregado com sucesso!");
      onSuccess?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao processar arquivo";
      toast.error(errorMessage);
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [setNodes, setEdges, setXmlDoc, setIsLoading, onError, onSuccess]);

  const handleDownload = useCallback(() => {
    if (!xmlDoc) {
      toast.error("Nenhum XML carregado");
      return;
    }

    try {
      const updatedXmlDoc = xmlDoc.cloneNode(true) as Document;

      nodes.forEach((node: Node<NodeData>) => {
        const { data } = node;
        const nrSequencia = data.attributes?.["NR_SEQUENCIA"];
        if (!nrSequencia) return;

        const registro = updatedXmlDoc.querySelector(
          `registro[NR_SEQUENCIA="${nrSequencia}"]`
        );
        if (!registro) return;

        // Atualiza atributos
        Object.entries(data.attributes).forEach(([key, value]) => {
          if (registro.getAttribute(key) !== value) {
            registro.setAttribute(key, value);
          }
        });

        // Atualiza elementos filhos
        data.children.forEach((child: XMLChildElement) => {
          let element = registro.querySelector(child.name);
          if (!element) {
            element = updatedXmlDoc.createElement(child.name);
            registro.appendChild(element);
          }

          // Limpa o conteúdo atual
          while (element.firstChild) {
            element.removeChild(element.firstChild);
          }

          // Adiciona o novo conteúdo como CDATA se necessário
          if (child.isCDATA) {
            const cdata = updatedXmlDoc.createCDATASection(child.content);
            element.appendChild(cdata);
          } else {
            element.textContent = child.content;
          }
        });
      });

      const serializer = new XMLSerializer();
      const updatedXmlString = serializer.serializeToString(updatedXmlDoc);
      const blob = new Blob([updatedXmlString], { type: "application/xml" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "updated.xml";
      link.click();

      URL.revokeObjectURL(url);
      toast.success("XML baixado com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerar arquivo XML");
      onError?.(error as Error);
    }
  }, [xmlDoc, nodes, onError]);

  const onLayout = useCallback(
    (direction: "TB" | "LR") => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, direction);
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges, setNodes, setEdges]
  );
  const onConnectStart = useCallback(() => {
    // Ativamos o modo de conexão
    useFlowStore.getState().setIsConnecting(true);
  }, []);

  const onConnectEnd = useCallback(
    (event: MouseEvent | TouchEvent) => {
      const isConnecting = useFlowStore.getState().isConnecting;
      const nodes = useFlowStore.getState().nodes;

      if (!isConnecting) return;

      // Só procede se não houver nós no grafo
      if (nodes.length === 0) {
        const bounds = (event.target as HTMLElement)?.getBoundingClientRect();
        const position = {
          x: (event as MouseEvent).clientX - bounds?.left || 0,
          y: (event as MouseEvent).clientY - bounds?.top || 0,
        };

        const previewNode = {
          id: `preview-${Date.now()}`,
          type: 'previewNode',
          position,
          data: {
            label: 'XML Preview',
            attributes: {},
            children: []
          }
        };

        useFlowStore.getState().setNodes([previewNode]);
      }

      // Reseta o estado de conexão
      useFlowStore.getState().setIsConnecting(false);
    },
    []
  );

  const addPreviewNode = useCallback(() => {
    const selectedNodes = useFlowStore.getState().selectedNodes;

    // Calcula a posição baseada nos nós selecionados ou usa posição padrão
    const position = selectedNodes.length > 0
      ? {
        x: Math.max(...selectedNodes.map(node => node.position.x)) + 400,
        y: selectedNodes.reduce((sum, node) => sum + node.position.y, 0) / selectedNodes.length
      }
      : { x: 100, y: 100 };

    const previewNode = {
      id: `preview-${Date.now()}`,
      type: 'previewNode',
      position,
      data: {
        label: 'XML Preview',
        attributes: {},
        children: []
      }
    };

    const currentNodes = useFlowStore.getState().nodes;
    useFlowStore.getState().setNodes([...currentNodes, previewNode]);
  }, []);
  return (
    <div className="w-screen h-screen">
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex space-x-4 z-50">
        <Button
          onClick={() => onLayout("LR")}
          className="z-50"
          aria-label="Organizar horizontalmente"
        >
          <StretchHorizontallyIcon className="mr-2 h-4 w-4" />
          Layout Horizontal
        </Button>
      </div>

      <div className="fixed top-4 right-4 z-50">
        <Button
          className="relative"
          disabled={isLoading}
          aria-label="Enviar arquivo XML"
        >
          <input
            type="file"
            onChange={handleFileUpload}
            accept=".xml"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Selecionar arquivo XML"
          />
          {isLoading ? (
            <SymbolIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <UploadIcon className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Carregando...' : 'XML'}
        </Button>
        <Button
          onClick={handleDownload}
          disabled={!xmlDoc || isLoading}
          className="fixed top-16 right-4 z-50"
          aria-label="Baixar XML atualizado"
        >
          <DownloadIcon className="mr-2 h-4 w-4" />
          XML
        </Button>
        <Button
          onClick={addPreviewNode}
          disabled={!xmlDoc || isLoading}
          className="fixed top-16 left-4 z-50"
          aria-label="Baixar XML atualizado"
        >
          <MagicWandIcon className="mr-2 h-4 w-4" />
          PREVISUALIZADOR
        </Button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        minZoom={CONFIG.ZOOM.MIN}
        maxZoom={CONFIG.ZOOM.MAX}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        selectNodesOnDrag={true}
        selectionOnDrag={true}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.Bezier}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default App;