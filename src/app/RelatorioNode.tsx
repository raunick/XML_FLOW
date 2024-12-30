import React, { useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface XMLChildElement {
  name: string;
  content: string;
  isCDATA: boolean;
}

interface NodeData {
  label: string;
  attributes: Record<string, string>;
  children: XMLChildElement[];
}

interface RelatorioNodeProps {
  id: string;
  data: NodeData;
  isConnectable: boolean;
  onDataChange?: (nodeId: string, newData: NodeData) => void;
}

const RelatorioNode: React.FC<RelatorioNodeProps> = ({ 
  id, 
  data, 
  isConnectable,
  onDataChange 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState<NodeData>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleAttributeChange = (key: string, value: string) => {
    const newData = {
      ...formData,
      attributes: {
        ...formData.attributes,
        [key]: value
      }
    };
    setFormData(newData);
    onDataChange?.(id, newData);
  };

  const handleChildChange = (index: number, content: string) => {
    const newChildren = [...formData.children];
    newChildren[index] = {
      ...newChildren[index],
      content
    };
    
    const newData = {
      ...formData,
      children: newChildren
    };
    setFormData(newData);
    onDataChange?.(id, newData);
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div
        onClick={handleToggleExpand}
        className="flex justify-between items-center cursor-pointer mb-2 font-medium text-gray-900"
      >
        <span className="truncate">{formData.label}</span>
        <span className="text-gray-500 transition-transform duration-200" 
              style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          ▼
        </span>
      </div>

      {isExpanded && (
        
        <div className="mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Propriedade</TableHead>
                <TableHead>Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Renderiza os elementos filhos */}
              {formData.children.map((child, index) => (
                <TableRow key={child.name}>
                  <TableCell className="font-medium">
                    {child.name}
                  </TableCell>
                  <TableCell>
                    <Textarea
                      value={child.content}
                      onChange={(e) => handleChildChange(index, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className={
                        child.name === "DS_SQL"
                          ? "w-full min-h-[100px] mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none bg-gray-900 text-green-300 font-mono border border-gray-600 focus:ring-2 focus:ring-indigo-500 resize-none"
                          : "w-full min-h-[100px]" 
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
              {/* Renderiza os atributos */}
              {Object.entries(formData.attributes).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell className="font-medium">
                    {key}
                  </TableCell>
                  <TableCell>
                    <Input
                      value={value}
                      onChange={(e) => handleAttributeChange(key, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-500"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-gray-500"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default RelatorioNode;