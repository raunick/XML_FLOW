"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GearIcon } from "@radix-ui/react-icons";
import App from "./App";
import useFlowStore from "./store";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false); // Manage drawer state

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const { nodes, edges, selectedNodes, setNodes, setEdges, setSelectedNodes } = useFlowStore();
  console.log(Object.entries(selectedNodes) )
  return (
    <div className="flex flex-col h-screen">
      <Button onClick={handleOpen} className="fixed top-4 left-4 z-50">
        <GearIcon className="mr-4" />
        Opções</Button>
      <div className="flex-grow overflow-y-auto">
        <App />
      </div>

      {isOpen && (
        <Drawer open={isOpen} onClose={handleClose} direction="left">
          <DrawerContent position="left" >
            <DrawerHeader>
              <DrawerTitle>Multi-Seleção</DrawerTitle>
              <DrawerDescription>
              
                <ScrollArea className="h-[calc(100vh-8rem)]">
                
                <h1>Nodes Selecionados</h1>
                <ul>
                  {selectedNodes.map((node) => (
                    <li key={node.id}>{node.data.label}</li>
                  ))}
                </ul>
                <ul>
                  {selectedNodes.map((node) => (
                    <li key={node.id}>
                      {Object.entries(node.data.attributes).map(([key, value]) => (
                        <div key={key}>
                         <strong>{key}:</strong> <input type="text" value={''} defaultValue={''} className="border p-1" />
                        </div>  
                      ))}<Separator className="my-2" />
                    </li>
                  ))}
                </ul>

                
              </ScrollArea>
            </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="flex-row justify-center">
              
              <Button onClick={handleClose}>Submit</Button>
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
