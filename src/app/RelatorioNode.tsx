import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface RelatorioNodeProps {
  data: any; // Define as necessary
  isConnectable: boolean;
}

const RelatorioNode: React.FC<RelatorioNodeProps> = ({ data, isConnectable }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Controla se o nó está expandido
  const [formData, setFormData] = useState({ ...data });

  // Alterna entre os estados expandido e fechado
  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // Manipula a mudança nos campos editáveis
  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "5px",
        padding: "10px",
        backgroundColor: "#fff",
        cursor: "pointer",
        maxWidth: "600px",
      }}
    >
      {/* Cabeçalho do nó */}
      <div
        onClick={handleToggleExpand} // Alterna ao clicar no cabeçalho
        style={{
          marginBottom: "10px",
          fontWeight: "bold",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {formData.label} <span>{isExpanded ? "▼" : "▶"}</span> {/* Indicador de estado */}
      </div>

      {/* Exibe os campos somente se o nó estiver expandido */}
      {isExpanded && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Propriedade</TableHead>
              <TableHead>Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(formData).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>
                  <strong>{key}</strong>
                </TableCell>
                <TableCell>
                  {key === "label" ? (
                    <span>{value}</span> // Label não é editável
                  ) : (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleChange(key, e.target.value)}
                      style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                      onClick={(e) => e.stopPropagation()} // Evita que o nó feche
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Handles para conexões */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default RelatorioNode;
