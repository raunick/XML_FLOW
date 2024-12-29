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
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextAlignCenterIcon,
  CopyIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Checkbox } from "@/components/ui/checkbox"

interface CampoNodeProps {
  data: any; // Defina o tipo correto para 'data' conforme necessário
  isConnectable: boolean; // Defina o tipo de 'isConnectable' como boolean
}

const CampoNode: React.FC<CampoNodeProps> = ({ data, isConnectable }) => {
  const handleInputChange = useCallback((evt: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>

      <Card className="w-[350px]">
        <CardHeader>
          <div className='flex flex-row justify-between items-center text-xs'>
            <h6 className='text-gray-300 text-left -mt-4'>ID:1</h6>
            <h6 className='text-green-600 text-right  -mt-4'>ATIVO</h6>
          </div>

          <CardTitle className="text-2xl font-semibold mb-4">Campo</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Titulo:</Label>
                <Input id="name" placeholder="Nome do campo" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="TP_RELATORIO">Tipo:</Label>
                <Select>
                  <SelectTrigger id="TP_RELATORIO">
                    <SelectValue placeholder="---" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Descrição</SelectItem>
                    <SelectItem value="sveltekit">IMG</SelectItem>
                    <SelectItem value="astro">Base</SelectItem>
                    <SelectItem value="nuxt">ID_RELATORIO</SelectItem>
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
                  <Label htmlFor="name">Alinhamento:</Label>
                  <div className="flex flex-col mt-1 space-y-1.5">
                    <div className="flex justify-between space-x-1 p-1 bg-white rounded-lg shadow-lg">
                      <Button variant="ghost" className="w-12 h-12 flex justify-center items-center">
                        <TextAlignLeftIcon />
                      </Button>
                      <Button variant="ghost" className="w-12 h-12 flex justify-center items-center">
                        <TextAlignCenterIcon />
                      </Button>
                      <Button variant="ghost" className="w-12 h-12 flex justify-center items-center">
                        <TextAlignRightIcon />
                      </Button>
                    </div>
                  </div>


                </div>
                <div className="flex flex-col space-y-1.5 pt-2">
                  <Label htmlFor="name">Fonte:</Label>
                  <div className="flex flex-col mt-1 space-y-1.5">
                    <div className="flex justify-between space-x-1 p-1 bg-white rounded-lg shadow-lg">
                      <ToggleGroup type="multiple">
                        <ToggleGroupItem value="bold" aria-label="Toggle bold">
                          <FontBoldIcon className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="italic" aria-label="Toggle italic">
                          <FontItalicIcon className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
                          <UnderlineIcon className="h-4 w-4" />
                        </ToggleGroupItem>
                      </ToggleGroup>
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
                      Forçar quebra pagina
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Reimprimir na quebra
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Alterna cor de fundo
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Fundo Transparente
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Busca parametro pai
                    </label>
                  </div>



                </div>

                <div className="flex flex-col space-y-1.5 pt-2">
                  <Label htmlFor="name">Tolalizar:</Label>

                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Não</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Sempre</Label>
                    </div>
                  </RadioGroup>


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
        className="w-2 h-2 bg-orange-500 rounded-full shadow-md cursor-pointer ml-2 -mt-12"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="r1"
        isConnectable={isConnectable}
        className="w-2 h-2 bg-red-500 rounded-full shadow-md cursor-pointer mr-2"
      />
    </>
  );
}

export default CampoNode;
