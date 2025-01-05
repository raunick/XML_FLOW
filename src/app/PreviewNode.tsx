// PreviewNode.tsx
import React from 'react';
import { Handle, Position } from "@xyflow/react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area";
import useFlowStore from './store';
import { NodeData } from './types';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from '@/components/ui/badge';
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
    const getNodeConnections = useFlowStore(state => state.getNodeConnections);

    // Usando useEffect para chamar apenas quando necessário
    React.useEffect(() => {
        if (firstNodeData?.id) {
            selectFirstNodeConnections();
        }
    }, [firstNodeData?.id]);
    // Função auxiliar para renderizar o componente correto
    const renderFormComponent = (sequenceNumber: string, data: string | undefined) => {
        switch (sequenceNumber) {
            case "518":
                return (
                    <div className="flex items-center space-x-2 mt-2">
                        <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {data}
                        </label>
                    </div>
                )
            case "628":
                return (<div className="grid w-full gap-2 mt-2">
                    <Label htmlFor="message">{data}</Label>
                    <Textarea className="min-h-[100px]" placeholder="Campo de Texto Livre." id="message" />
                </div>)
            case "":
                return <span className="font-bold">{data}</span>
            default:
                return <span className="font-bold">{sequenceNumber} - {data}</span>
        }
    }
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
                                <div className="mt-4">
                                    <h2 className="font-medium mb-2">Nodes Conectados ao Primeiro Node:</h2>
                                    <ul className="space-y-2 list-none">
                                        {selectedFistNodes.map(node => (
                                            <li key={node.id} className='space-y-2 p-2'>
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>
                                                            {xmlType === 'template' ?
                                                                <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                                                                    {node.data.attributes.NR_SEQUENCIA}
                                                                </span> :
                                                                <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
                                                                    {node.data.attributes.NR_SEQUENCIA}
                                                                </span>
                                                            }
                                                        </CardTitle>
                                                        <CardDescription>{xmlType === 'template' ?
                                                            renderFormComponent(node.data.attributes.NR_SEQ_ELEMENTO, node.data.children.find(child => child.name === 'DS_LABEL')?.content) :
                                                            node.data.children.find(child => child.name === 'DS_BANDA')?.content}
                                                        </CardDescription>
                                                        <CardContent>
                                                            {node.data.attributes.NR_SEQ_ELEMENTO === '884' ? (
                                                                <Select>
                                                                    <SelectTrigger className="w-[180px]">
                                                                        <SelectValue placeholder="Selecione" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>opções</SelectLabel>
                                                                            {getNodeConnections(node.id)
                                                                                .filter((childNode: any) => childNode.data.attributes.DS_RESULTADO) // Filtra items vazios
                                                                                .map((childNode: any) => (
                                                                                    <SelectItem
                                                                                        key={childNode.data.attributes.CD_RESULTADO} // Adiciona key única
                                                                                        value={childNode.data.attributes.CD_RESULTADO}
                                                                                    >
                                                                                        {childNode.data.attributes.DS_RESULTADO}
                                                                                    </SelectItem>
                                                                                ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            ) : (
                                                                <></>
                                                            )}

                                                        </CardContent>
                                                        <CardFooter className="p-0">
                                                            <Badge variant="secondary">{node.id}</Badge>
                                                        </CardFooter>
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