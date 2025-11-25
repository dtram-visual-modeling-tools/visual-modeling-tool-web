import { AppMenubar } from "./MenuBar";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
            <AppMenubar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar className="hidden md:block" />
                <main className="flex-1 overflow-y-auto bg-background/50 p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}
