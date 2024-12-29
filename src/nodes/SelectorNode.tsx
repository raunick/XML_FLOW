import React, { useCallback, ChangeEvent, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CopyIcon,
} from '@radix-ui/react-icons';

interface SelectorNodeProps {
  data: any; // Defina o tipo correto para 'data' conforme necessário
  isConnectable: boolean; // Defina o tipo de 'isConnectable' como boolean
}

const SelectorNode: React.FC<SelectorNodeProps> = ({ data, isConnectable }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null); // State for selected value

  const handleChange = useCallback((evt: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(evt.target.value);
  }, []);

  const options = [
    { value: 'option1', label: 'Titulo' },
    { value: 'option2', label: 'Base' },
  ];

  return (
    <>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Selector Node</CardTitle>
        <CardDescription>Utilizado para inclusao de opções</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Selecione</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Opções" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">1</SelectItem>
                  <SelectItem value="sveltekit">2</SelectItem>
                  <SelectItem value="astro">3</SelectItem>
                  <SelectItem value="nuxt">4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
          <Button variant="outline">
            <CopyIcon className='mr-2'/>
            Duplicar</Button>
        </CardFooter>
    </Card>
    <Handle
    type="source"
    position={Position.Right}
    id="r1"
    isConnectable={isConnectable}
    className="w-2 h-2 bg-blue-500 rounded-full shadow-md cursor-pointer mr-2"
  />
</>
  );
}

export default SelectorNode;
