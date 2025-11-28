import { Handle, Position } from 'reactflow';
import { cn } from '../../lib/utils';
import { Box } from 'lucide-react';

interface CustomNodeProps {
    data: {
        label: string;
    };
    selected?: boolean;
}

export function CustomNode({ data, selected }: CustomNodeProps) {
    return (
        <div
            className={cn(
                "px-4 py-2 shadow-md rounded-md bg-card border-2 border-muted transition-all min-w-[150px]",
                selected ? "border-primary shadow-lg ring-1 ring-primary" : "hover:border-primary/50"
            )}
        >
            <Handle type="target" position={Position.Top} className="w-3 h-3 bg-muted-foreground" />
            <div className="flex items-center">
                <div className="rounded-full bg-primary/10 p-2 mr-2">
                    <Box className="w-4 h-4 text-primary" />
                </div>
                <div className="ml-2">
                    <div className="text-sm font-bold text-card-foreground">{data.label}</div>
                    <div className="text-xs text-muted-foreground">Custom Node</div>
                </div>
            </div>
            <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-muted-foreground" />
        </div>
    );
}
