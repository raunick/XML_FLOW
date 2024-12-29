import React, { useCallback, ChangeEvent } from 'react';
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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CopyIcon,
  PlusIcon,
} from '@radix-ui/react-icons';

interface ImpressoraNodeProps {
  data: any; // Ajuste o tipo conforme necessário
  isConnectable: boolean;
}

const ImpressoraNode: React.FC<ImpressoraNodeProps> = ({ data, isConnectable }) => {
  const handleInputChange = useCallback((evt: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>IMPRESSORA</CardTitle>
          <CardDescription>Utilizado para Selecionar uma lista de impressora</CardDescription>
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
                    <SelectItem value="next">ZebraZPL</SelectItem>
                    <SelectItem value="sveltekit">Bematech</SelectItem>
                    <SelectItem value="astro">IMP-SS-ID-01</SelectItem>
                    <SelectItem value="nuxt">IMP-SS-ID-04</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Codigo ZPL</Label>
                <Textarea className='mt-1 block w-full h-80 px-3 py-2 rounded-md shadow-sm focus:outline-none bg-gray-900 text-green-300 font-mono border border-gray-600 focus:ring-2 focus:ring-indigo-500 resize-none' />
              </div>

            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <CopyIcon className='mr-2' />
            Duplicar</Button>
          <Button>
            <PlusIcon className='mr-2' />
            Salvar Modelo</Button>
        </CardFooter>
      </Card>
      <Handle
        type="source"
        position={Position.Right}
        id="r1"
        isConnectable={isConnectable}
        className="w-2 h-2 bg-orange-500 rounded-full shadow-md cursor-pointer mr-2"
      />
    </>
  );
};

export default ImpressoraNode;
