import { useCallback, useRef, useState } from 'react';
import ReactFlow, {
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    type Connection,
    type Edge,
    BackgroundVariant,
    ReactFlowProvider,
    type ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { CustomNode } from './CustomNode';

const nodeTypes = {
    custom: CustomNode,
};

const initialNodes = [
    { id: '1', type: 'custom', position: { x: 0, y: 0 }, data: { label: 'Start Node' } },
];
const initialEdges: Edge[] = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

interface DiagramEditorProps {
    onNodeClick?: (event: React.MouseEvent, node: any) => void;
}

function DiagramEditorContent({ onNodeClick }: DiagramEditorProps) {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    const onConnect = useCallback(
        (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance?.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            if (!position) return;

            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, setNodes],
    );

    return (
        <div className="w-full h-full" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                fitView
                className="bg-background"
            >
                <Controls className="!bg-card !border-muted [&>button]:!bg-card [&>button]:!border-muted [&>button]:!fill-foreground [&>button]:!text-foreground [&>button:hover]:!bg-accent" />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}

export function DiagramEditor({ onNodeClick }: DiagramEditorProps) {
    return (
        <ReactFlowProvider>
            <DiagramEditorContent onNodeClick={onNodeClick} />
        </ReactFlowProvider>
    );
}
