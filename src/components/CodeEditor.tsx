import Editor from '@monaco-editor/react';

// Actually, I'll just use 'vs-dark' as requested "Dark mode by default".

interface CodeEditorProps {
    code: string;
    onChange?: (value: string | undefined) => void;
}

export function CodeEditor({ code, onChange }: CodeEditorProps) {
    return (
        <div className="h-full w-full overflow-hidden rounded-md border bg-card">
            <div className="flex items-center justify-between border-b bg-muted px-4 py-2">
                <span className="text-sm font-medium">Source Code</span>
            </div>
            <Editor
                height="100%"
                defaultLanguage="typescript"
                theme="vs-dark"
                value={code}
                onChange={onChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 },
                }}
            />
        </div>
    );
}
