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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  BorderLeftIcon,
  BorderRightIcon,
  BorderTopIcon,
  BorderBottomIcon,
  CheckIcon,
  PlusIcon,
} from '@radix-ui/react-icons';

interface RelatorioNodeProps {
  data: any; // Defina o tipo correto para 'data' conforme necessário
  isConnectable: boolean; // Defina o tipo de 'isConnectable' como boolean
}

const RelatorioNode: React.FC<RelatorioNodeProps> = ({ data, isConnectable }) => {
  const handleInputChange = useCallback((evt: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>

      <Card className="w-[350px]">
        <CardHeader>
          <div className='flex flex-row justify-between items-center text-xs'>
            <h6 className='text-gray-300 text-left -mt-4'>REG:23131311</h6>
            <h6 className='text-gray-300 text-right  -mt-4'>CATE:0211</h6>
          </div>

          <CardTitle className="text-2xl font-semibold mb-4">RELATÓRIO</CardTitle>
          <CardDescription>Nó Unico - criação de relatorio</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Titulo:</Label>
                <Input id="name" placeholder="Nome do Relatorio" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="TP_RELATORIO">Tipo de relatorio:</Label>
                <Select>
                  <SelectTrigger id="TP_RELATORIO">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">PDF</SelectItem>
                    <SelectItem value="sveltekit">EXCEL</SelectItem>
                    <SelectItem value="astro">ETIQUETA</SelectItem>
                    <SelectItem value="nuxt">HTML</SelectItem>
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
                  <Label htmlFor="name">Orientação:</Label>

                      <RadioGroup defaultValue="option-one">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option-one" id="option-one" />
                          <Label htmlFor="option-one">Paisagem</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option-two" id="option-two" />
                          <Label htmlFor="option-two">Retrato</Label>
                        </div>
                      </RadioGroup>


                </div>

              </div>
            </div>
          </form>

        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className='bg-green-500'>
            <CheckIcon className='mr-2'/>
            Gerar</Button>
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
        className="w-2 h-2 bg-orange-500 rounded-full shadow-md cursor-pointer ml-2 -mt-12"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="r1"
        isConnectable={isConnectable}
        className="w-2 h-2 bg-green-500 rounded-full shadow-md cursor-pointer mr-2"
      />
    </>
  );
}

export default RelatorioNode;
