"use client";

import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Folder, File as FileIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type File = { name: string };
type Folder = { name: string; children: (File | Folder)[] };
type FileSystemNode = File | Folder;

const fileStructure: Folder = {
  name: "laravel-project",
  children: [
    { name: "app", children: [
        { name: "Http", children: [
            { name: "Controllers", children: [
                { name: "Controller.php" }
            ]},
            { name: "Kernel.php" }
        ]},
        { name: "Models", children: [
            { name: "User.php" }
        ]},
        { name: "Providers", children: []}
    ]},
    { name: "bootstrap", children: [] },
    { name: "config", children: [
        { name: "app.php" },
        { name: "database.php" }
    ]},
    { name: "database", children: [
        { name: "factories", children: [] },
        { name: "migrations", children: [] },
        { name: "seeders", children: [] },
    ]},
    { name: "public", children: [
        { name: "index.php" }
    ]},
    { name: "resources", children: [
        { name: "css", children: [] },
        { name: "js", children: [] },
        { name: "views", children: [
            { name: "welcome.blade.php" }
        ]},
    ]},
    { name: "routes", children: [
        { name: "api.php" },
        { name: "web.php" }
    ]},
    { name: ".env" },
    { name: "artisan" },
    { name: "composer.json" },
    { name: "package.json" },
    { name: "tailwind.config.js" },
  ],
};

const FileSystemTree = ({ node, level = 0 }: { node: FileSystemNode; level?: number }) => {
  const [isOpen, setIsOpen] = useState(level === 0);

  if ("children" in node) { // It's a folder
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} style={{ paddingLeft: `${level * 1}rem` }}>
        <CollapsibleTrigger className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-secondary w-full text-left">
          <ChevronRight className={cn("w-4 h-4 transition-transform", isOpen && "rotate-90")} />
          <Folder className="w-4 h-4 text-accent" />
          <span>{node.name}</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {node.children.map((child, index) => (
            <FileSystemTree key={index} node={child} level={level + 1} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  } else { // It's a file
    return (
      <div className="flex items-center gap-2 py-1 px-2" style={{ paddingLeft: `${level * 1.5}rem` }}>
        <FileIcon className="w-4 h-4 text-muted-foreground" />
        <span>{node.name}</span>
      </div>
    );
  }
};

export default function FileBrowserPage() {
  return (
    <main className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight font-headline text-primary">
            File Browser
          </h1>
          <p className="mt-2 text-muted-foreground">
            Explore the file and folder structure of a typical Laravel project.
          </p>
        </header>
        <div className="p-4 border rounded-lg bg-card text-card-foreground">
            <FileSystemTree node={fileStructure} />
        </div>
      </div>
    </main>
  );
}
