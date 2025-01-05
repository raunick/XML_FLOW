"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GearIcon, Pencil2Icon } from "@radix-ui/react-icons";
import App from "./App";
import useFlowStore from "./store";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [commonAttributes, setCommonAttributes] = useState<Record<string, any>>({});

  const { selectedNodes, handleNodeDataChange } = useFlowStore();

  const handleOpen = () => {
    if (selectedNodes.length > 0) {
      const selectedNodesData = selectedNodes.map((node) => node.data.attributes);
      const common = findCommonAttributes(selectedNodesData);
      setCommonAttributes(common);
      setIsOpen(true);
    }
  };

  const handleClose = () => setIsOpen(false);

  const handleAttributeChange = (key: string, value: any) => {
    setCommonAttributes((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    selectedNodes.forEach((selectedNode) => {
      // Make sure we're working with the current node's data
      const currentNodeData = selectedNode.data;
      
      // Create a new attributes object that merges the existing attributes with the updated ones
      const updatedAttributes = {
        ...currentNodeData.attributes,
        ...commonAttributes,
      };

      // Create the complete updated node data
      const updatedData = {
        ...currentNodeData,
        attributes: updatedAttributes,
      };

      // Update the node in the store
      handleNodeDataChange(selectedNode.id, updatedData);
    });

    setIsOpen(false);
  };

  const findCommonAttributes = (attributesArray: Record<string, any>[]) => {
    if (attributesArray.length === 0) return {};
    
    const firstAttributes = attributesArray[0] || {};
    const keys = Object.keys(firstAttributes);
    const common: Record<string, any> = {};

    keys.forEach((key) => {
      const values = attributesArray.map((attr) => attr[key]);
      const allEqual = values.every((val) => val === values[0]);
      if (allEqual) {
        common[key] = values[0];
      }
    });

    return common;
  };

  return (
    <div className="flex flex-col h-screen">
      <Button onClick={handleOpen} className="fixed top-4 left-4 z-50">
        <Pencil2Icon className="mr-4" />
        Nodes selecionados: {selectedNodes.length}
      </Button>
      <div className="flex-grow overflow-y-auto">
        <App />
      </div>

      <Drawer open={isOpen} onClose={handleClose} direction="left">
        <DrawerContent position="left">
          <DrawerHeader>
            <DrawerTitle>Editar Atributos Comuns</DrawerTitle>
            <DrawerDescription>
              <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
                {selectedNodes.length <= 1 ? (
                  <p>Selecione pelo menos dois nós para editar os atributos comuns.</p>
                ) : (
                  <>
                    <h1>Atributos Comuns</h1>
                    <ul>
                      {Object.entries(commonAttributes).map(([key, value]) => (
                        <li key={key}>
                          <strong>{key}:</strong>
                          <input
                            type="text"
                            value={String(value) || ""}
                            onChange={(e) => handleAttributeChange(key, e.target.value)}
                            className="border p-1 w-full"
                          />
                          <Separator className="my-2" />
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </ScrollArea>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="flex-row justify-center">
            <Button onClick={handleSubmit}>Salvar</Button>
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}