import { Box, Layers, ArrowLeftRight, Workflow } from "lucide-react";
import { cn } from "../lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    return (
        <div className={cn("pb-12 w-64 border-r bg-card", className)}>
            <div className="space-y-4 py-4">

                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Layers
                    </h2>
                    <div className="space-y-1">
                        <button className="w-full justify-start flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                            <Layers className="h-4 w-4" />
                            DataFlow
                        </button>
                        <button className="w-full justify-start flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                            <ArrowLeftRight className="h-4 w-4" />
                            Push / Pull Selection
                        </button>
                        <button className="w-full justify-start flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                            <Workflow className="h-4 w-4" />
                            Control Flow
                        </button>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Nodes
                    </h2>
                    <div className="space-y-1 px-4">
                        <div
                            className="flex items-center gap-2 p-2 border rounded-md cursor-grab bg-background hover:border-primary transition-colors"
                            onDragStart={(event) => {
                                event.dataTransfer.setData('application/reactflow', 'custom');
                                event.dataTransfer.effectAllowed = 'move';
                            }}
                            draggable
                        >
                            <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center">
                                <Box className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium">Custom Node</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
