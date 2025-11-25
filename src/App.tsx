import { useState } from "react";
import { Layout } from "./components/Layout";
import { DiagramEditor } from "./components/DiagramEditor";
import { CodeEditor } from "./components/CodeEditor";

function App() {
  const [code, setCode] = useState<string>("// Select a node to view its code");

  const handleNodeClick = (_event: React.MouseEvent, node: any) => {
    setCode(`// Code for Node: ${node.data.label}\n\nexport const ${node.data.label.replace(/\s+/g, '')} = {\n  id: "${node.id}",\n  type: "${node.type}",\n  position: ${JSON.stringify(node.position, null, 2)}\n};`);
  };

  return (
    <Layout>
      <div className="flex h-full w-full gap-4">
        <div className="h-full flex-1 rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden">
          <DiagramEditor onNodeClick={handleNodeClick} />
        </div>
        <div className="h-full w-1/3 rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden">
          <CodeEditor code={code} onChange={(value) => setCode(value || "")} />
        </div>
      </div>
    </Layout>
  );
}

export default App;
