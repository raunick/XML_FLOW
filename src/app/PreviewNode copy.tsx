// PreviewNode.tsx
import React from 'react';
import { Handle, Position } from "@xyflow/react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area";
import useFlowStore from './store';
import { NodeData } from './types';

interface PreviewNodeProps {
    id: string;
    data: NodeData;
    isConnectable: boolean;
    onDataChange?: (nodeId: string, newData: NodeData) => void;
}





const PreviewNode: React.FC<PreviewNodeProps> = ({ id, data, isConnectable }) => {
    const xmlType = useFlowStore(state => state.xmlType);
    const firstNodeData = useFlowStore(state => state.firstNodeData);
    const selectedFistNodes = useFlowStore(state => state.selectedFistNodes);
    const selectFirstNodeConnections = useFlowStore(state => state.selectFirstNodeConnections);


    // Usando useEffect para chamar apenas quando necessário
    React.useEffect(() => {
        if (firstNodeData?.id) {
            selectFirstNodeConnections();
        }
    }, [firstNodeData?.id]);
    console.log(selectedFistNodes);
    return (
        <div className="w-96">
            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 bg-gray-500"
                isConnectable={isConnectable}
            />

            <Card className="bg-white shadow-lg">
                <CardHeader className="bg-gray-50">
                    <CardTitle className="text-lg font-semibold">
                        Prévia do XML
                    </CardTitle>
                    <CardDescription>
                        <span className={`text-xs px-2 py-1 rounded 
                            ${xmlType === 'template' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                            {xmlType} - {firstNodeData?.label?.split('NR_SEQUENCIA: ')[1]}
                        </span>
                    </CardDescription>
                </CardHeader>
                <ScrollArea className="">
                    <CardContent>
                        {firstNodeData ? (
                            <div className="space-y-4">
                                <h1>{firstNodeData.title}</h1>

                                {/* Lista dos nodes conectados ao primeiro node */}
                                <div className="mt-4">
                                    <h2 className="font-medium mb-2">Nodes Conectados ao Primeiro Node:</h2>
                                    <ul className="space-y-2 list-none pl-4">
                                        {selectedFistNodes.map(node => (
                                            <li key={node.id} className='space-y-2 '>
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>{xmlType === 'template' ?
                                                         node.data.attributes.NR_SEQUENCIA : 
                                                         node.data.attributes.NR_SEQUENCIA}
                                                        </CardTitle>
                                                        <CardDescription>{xmlType === 'template' ? 
                                                        node.data.children.find(child => child.name === 'DS_LABEL')?.content: 
                                                        node.data.children.find(child => child.name === 'DS_BANDA')?.content}
                                                        </CardDescription>
                                                        <CardContent>
                                                        
                                                        </CardContent>
                                                        
                                                    </CardHeader>
                                                </Card>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <p>Nenhum node encontrado</p>
                        )}
                    </CardContent>
                </ScrollArea>
            </Card>

            <Handle
                type="source"
                position={Position.Right}
                className="w-3 h-3 bg-gray-500"
                isConnectable={isConnectable}
            />
        </div>
    );
};

export default PreviewNode;