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

interface ImpressoraNodeProps {
  data: any; // Defina o tipo correto para 'data' conforme necessário
  isConnectable: boolean; // Defina o tipo de 'isConnectable' como boolean
}

const ImpressoraNode: React.FC<ImpressoraNodeProps> = ({ data, isConnectable }) => {
  const onChange = useCallback((evt: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
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
                  <SelectItem value="next">1</SelectItem>
                  <SelectItem value="sveltekit">2</SelectItem>
                  <SelectItem value="astro">3</SelectItem>
                  <SelectItem value="nuxt">4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Codigo ZPL</Label>
              <Textarea className='mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none bg-gray-900 text-green-300 font-mono border border-gray-600 focus:ring-2 focus:ring-indigo-500 resize-none'/>
            </div>
            
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}

export default ImpressoraNode;
