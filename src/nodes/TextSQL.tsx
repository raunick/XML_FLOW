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
  CopyIcon,
} from '@radix-ui/react-icons';


interface TextSQLProps {
  data: any; // Defina o tipo correto para 'data' conforme necessário
  isConnectable: boolean; // Defina o tipo de 'isConnectable' como boolean
}

const TextSQL: React.FC<TextSQLProps> = ({ data, isConnectable }) => {
  const onChange = useCallback((evt: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>SQL Node</CardTitle>
        <CardDescription>Utilizado para inclusao de codigos SQL</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Codigo SQL</Label>
              <Textarea className='mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none bg-gray-900 text-green-300 font-mono border border-gray-600 focus:ring-2 focus:ring-indigo-500 resize-none'/>
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

export default TextSQL;
