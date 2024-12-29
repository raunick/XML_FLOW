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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  BorderLeftIcon,
  BorderRightIcon,
  BorderTopIcon,
  BorderBottomIcon,
  CopyIcon,
  PlusIcon,
} from '@radix-ui/react-icons';

interface BandaNodeProps {
  data: any; // Defina o tipo correto para 'data' conforme necessário
  isConnectable: boolean; // Defina o tipo de 'isConnectable' como boolean
}

const BandaNode: React.FC<BandaNodeProps> = ({ data, isConnectable }) => {
  const handleInputChange = useCallback((evt: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>

      <Card className="w-[350px]">
        <CardHeader>
          <div className='flex flex-row justify-between items-center text-xs'>
            <h6 className='text-gray-300 text-left -mt-4'>ID:01</h6>
            <h6 className='text-green-600 text-right  -mt-4'>ATIVO</h6>
          </div>

          <CardTitle className="text-2xl font-semibold mb-4">Banda</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Descrição:</Label>
                <Input id="name" placeholder="Nome da banda" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="TP_BANDA">Tipo:</Label>
                <Select>
                  <SelectTrigger id="TP_BANDA">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Cabeçario</SelectItem>
                    <SelectItem value="sveltekit">Detalhe</SelectItem>
                    <SelectItem value="astro">Subdetalhe</SelectItem>
                    <SelectItem value="nuxt">Rodape</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-col pt-2 space-y-1.5">
                  <Label htmlFor="name">Codigo SQL:</Label>
                  <Textarea className='mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none bg-gray-900 text-green-300 font-mono border border-gray-600 focus:ring-2 focus:ring-indigo-500 resize-none' />
                </div>
                <div className="flex flex-col space-y-1.5 pt-2">
                  <Label htmlFor="name">Bordas:</Label>
                  <div className="flex flex-col mt-1 space-y-1.5">
                    <div className="flex justify-between space-x-1 p-1 bg-white rounded-lg shadow-lg">
                      <Button variant="ghost" className="w-12 h-12 flex justify-center items-center">
                        <BorderLeftIcon />
                      </Button>
                      <Button variant="ghost" className="w-12 h-12 flex justify-center items-center">
                        <BorderRightIcon />
                      </Button>
                      <Button variant="ghost" className="w-12 h-12 flex justify-center items-center">
                        <BorderBottomIcon />
                      </Button>
                      <Button variant="ghost" className="w-12 h-12 flex justify-center items-center">
                        <BorderTopIcon />
                      </Button>
                    </div>
                  </div>


                </div>
                <div className="flex flex-col space-y-1.5 pt-2">
                  <Label htmlFor="name"></Label>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Quebra Pagina
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Transparente
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Extender
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Ajustar tamanho
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Alinhar a banda
                    </label>
                  </div>



                </div>

              </div>
            </div>
          </form>

        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <CopyIcon className='mr-2'/>
            Duplicar</Button>
          <Button>
          <PlusIcon className='mr-2'/>
            Salvar Modelo</Button>
        </CardFooter>
      </Card>
      {/* Handles adicionados aqui */}
      <Handle
        type="target"
        position={Position.Left}
        id="l1"
        isConnectable={isConnectable}
        className="w-2 h-2 bg-blue-500 rounded-full shadow-md cursor-pointer ml-2"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="l2"
        isConnectable={isConnectable}
        className="w-2 h-2 bg-blue-500 rounded-full shadow-md cursor-pointer ml-2 -mt-4"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="l3"
        isConnectable={isConnectable}
        className="w-2 h-2 bg-blue-500 rounded-full shadow-md cursor-pointer ml-2 -mt-8"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="l4"
        isConnectable={isConnectable}
        className="w-2 h-2 bg-red-500 rounded-full shadow-md cursor-pointer ml-2 -mt-12"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="r1"
        isConnectable={isConnectable}
        className="w-2 h-2 bg-orange-500 rounded-full shadow-md cursor-pointer mr-2"
      />
    </>
  );
}

export default BandaNode;
