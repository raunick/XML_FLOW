import { useCallback, ChangeEvent } from 'react';
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
  CopyIcon,
} from '@radix-ui/react-icons';


interface textNodeProps {
  data: any; // Defina o tipo correto para 'data' conforme necessário
  isConnectable: boolean; // Defina o tipo de 'isConnectable' como boolean
}

function textNode({ data, isConnectable }: textNodeProps) {
  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Text Node</CardTitle>
        <CardDescription>Utilizado para inclusao de textos</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Texto</Label>
              <Input id="name" placeholder="Digite um texto ..." />
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

export default textNode;
