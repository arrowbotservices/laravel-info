"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Terminal as TerminalIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const mockOutputs: Record<string, string> = {
  "php artisan list": `Laravel Framework 11.15.0

Usage:
  command [options] [arguments]

Options:
  -h, --help            Display help for the given command. When no command is given, display help for the list command
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi|--no-ansi  Force (or disable --no-ansi) ANSI output
  -n, --no-interaction  Do not ask any interactive question
      --env[=ENV]       The environment the command should run under
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug
... (list of commands)`,
  "php artisan route:list": `
  GET|HEAD   / .................... 
  POST       _ignition/execute-solution
  GET|HEAD   _ignition/health-check
  POST       _ignition/update-config
  GET|HEAD   api/user ............. 
  GET|HEAD   sanctum/csrf-cookie ...
`,
  "php artisan about": `
Environment ....................................
Application Name ...................... Laravel
Laravel Version ....................... 11.15.0
PHP Version ............................. 8.3.8
...`,
  "help": "Available commands: php artisan list, php artisan route:list, php artisan about, clear, help",
  "clear": "",
};

type HistoryItem = {
  command: string;
  output: string;
};

export default function TerminalPage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);
  
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input.trim();
    if (!command) return;

    if (command === "clear") {
      setHistory([]);
    } else {
      const output = mockOutputs[command] || `Command not found: ${command}. Type 'help' for available commands.`;
      setHistory([...history, { command, output }]);
    }
    
    setInput("");
  };

  return (
    <main className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-8">
       <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight font-headline text-primary">
            Artisan Terminal
          </h1>
          <p className="mt-2 text-muted-foreground">
            A simulated terminal to try out Artisan commands.
          </p>
        </header>
      <div className="flex-grow p-4 bg-gray-900 text-white rounded-lg shadow-lg overflow-y-auto font-code">
        <div className="flex flex-col gap-4">
          {history.map((item, index) => (
            <div key={index}>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">$</span>
                <span>{item.command}</span>
              </div>
              <pre className="whitespace-pre-wrap text-gray-300">{item.output}</pre>
            </div>
          ))}
          <div ref={endOfTerminalRef} />
        </div>

        <form onSubmit={handleCommand} className="flex items-center mt-4">
          <span className="text-green-400 mr-2">$</span>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent border-none text-white focus:ring-0 focus-visible:ring-offset-0 focus-visible:ring-0 p-0"
            autoFocus
            autoComplete="off"
            aria-label="Terminal input"
          />
        </form>
      </div>
    </main>
  );
}
