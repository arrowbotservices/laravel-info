"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Clipboard } from "lucide-react";

function CodeBlock({ code }: { code: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({ title: "Code copied to clipboard!" });
  };

  return (
    <div className="relative p-4 rounded-md bg-secondary text-secondary-foreground">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-7 w-7"
        onClick={handleCopy}
      >
        <Clipboard className="w-4 h-4" />
      </Button>
      <pre className="text-sm whitespace-pre-wrap font-code">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function CrudPage() {
  const [modelName, setModelName] = useState("Product");
  const [generated, setGenerated] = useState(false);

  const pascalCase = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  const plural = (str: string) => {
    if (!str) return "";
    if (str.endsWith('y')) return str.slice(0, -1) + 'ies';
    if (str.endsWith('s')) return str + 'es';
    return str + 's';
  }

  const { modelCode, controllerCode, routesCode } = useMemo(() => {
    const formattedModelName = pascalCase(modelName);
    const variableName = formattedModelName.toLowerCase();
    const pluralVariableName = plural(variableName);

    const modelCode = `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class ${formattedModelName} extends Model
{
    use HasFactory;

    protected $fillable = [
        // Add your fillable properties here
    ];
}
`;

    const controllerCode = `<?php

namespace App\\Http\\Controllers;

use App\\Models\\${formattedModelName};
use Illuminate\\Http\\Request;

class ${formattedModelName}Controller extends Controller
{
    public function index()
    {
        return ${formattedModelName}::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            // Add validation rules here
        ]);

        return ${formattedModelName}::create($validated);
    }

    public function show(${formattedModelName} $${variableName})
    {
        return $${variableName};
    }

    public function update(Request $request, ${formattedModelName} $${variableName})
    {
        $validated = $request->validate([
            // Add validation rules here
        ]);

        $${variableName}->update($validated);
        return $${variableName};
    }

    public function destroy(${formattedModelName} $${variableName})
    {
        $${variableName}->delete();
        return response()->noContent();
    }
}
`;

    const routesCode = `use App\\Http\\Controllers\\${formattedModelName}Controller;
use Illuminate\\Support\\Facades\\Route;

Route::apiResource('/${pluralVariableName}', ${formattedModelName}Controller::class);
`;

    return { modelCode, controllerCode, routesCode };
  }, [modelName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modelName) {
      setGenerated(true);
    } else {
      toast({
        title: "Model name is required",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight font-headline text-primary">
            CRUD Scaffolding
          </h1>
          <p className="mt-2 text-muted-foreground">
            Generate Model, Controller, and Routes for a new resource.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Resource Generator</CardTitle>
            <CardDescription>
              Enter a singular, PascalCase model name to generate the boilerplate.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex items-end gap-4">
              <div className="flex-grow">
                <Label htmlFor="model-name">Model Name</Label>
                <Input
                  id="model-name"
                  placeholder="e.g., Product"
                  value={modelName}
                  onChange={(e) => {
                    setGenerated(false);
                    setModelName(e.target.value);
                  }}
                />
              </div>
              <Button type="submit">Generate Code</Button>
            </form>
          </CardContent>
        </Card>

        {generated && (
          <div className="mt-8">
            <Tabs defaultValue="model">
              <TabsList>
                <TabsTrigger value="model">Model</TabsTrigger>
                <TabsTrigger value="controller">Controller</TabsTrigger>
                <TabsTrigger value="routes">Routes</TabsTrigger>
              </TabsList>
              <TabsContent value="model" className="mt-4">
                <CodeBlock code={modelCode} />
              </TabsContent>
              <TabsContent value="controller" className="mt-4">
                <CodeBlock code={controllerCode} />
              </TabsContent>
              <TabsContent value="routes" className="mt-4">
                <CodeBlock code={routesCode} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </main>
  );
}
