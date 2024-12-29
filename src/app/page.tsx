"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer"; 
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Flow from "./flow";
import { GearIcon, StretchHorizontallyIcon, StretchVerticallyIcon, UploadIcon } from "@radix-ui/react-icons";
import App from "./App";
import { Badge } from "@/components/ui/badge"


export default function Home() {
  const [isOpen, setIsOpen] = useState(false); // Manage drawer state

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="flex flex-col h-screen">
      <Button onClick={handleOpen} className="fixed top-4 left-4 z-50">
        <GearIcon className="mr-4"/>
      Opções</Button>
      <div className="flex-grow overflow-y-auto">
        <App />
      </div>

      {isOpen && (
        <Drawer open={isOpen} onClose={handleClose} direction="left">
          <DrawerContent position="left">
            <DrawerHeader>
              <DrawerTitle>Em manutenção</DrawerTitle>
              <DrawerDescription>...</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button onClick={handleClose}>Submit</Button>
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
