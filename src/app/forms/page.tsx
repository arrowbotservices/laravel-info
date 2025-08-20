"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Clipboard, PlusCircle, Trash2 } from "lucide-react";

type Field = {
  id: number;
  name: string;
  type: "text" | "email" | "password" | "textarea" | "number";
  label: string;
};

function CodeBlock({ code }: { code: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({ title: "Code copied to clipboard!" });
  };

  return (
    <div className="relative p-4 mt-4 rounded-md bg-secondary text-secondary-foreground">
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

export default function FormBuilderPage() {
  const [fields, setFields] = useState<Field[]>([
    { id: 1, name: "name", type: "text", label: "Full Name" },
    { id: 2, name: "email", type: "email", label: "Email Address" },
  ]);

  const addField = () => {
    const newField: Field = {
      id: Date.now(),
      name: `field_${fields.length + 1}`,
      type: "text",
      label: "New Field",
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateField = (id: number, key: keyof Omit<Field, 'id'>, value: string) => {
    setFields(
      fields.map((field) => (field.id === id ? { ...field, [key]: value } : field))
    );
  };
  
  const toKebabCase = (str: string) => str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

  const generatedCode = useMemo(() => {
    const fieldsHtml = fields
      .map((field) => {
        const id = toKebabCase(field.name);
        if (field.type === "textarea") {
          return `
    <div class="mb-4">
        <label for="${id}" class="block text-gray-700 text-sm font-bold mb-2">${field.label}</label>
        <textarea id="${id}" name="${field.name}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4"></textarea>
    </div>`;
        }
        return `
    <div class="mb-4">
        <label for="${id}" class="block text-gray-700 text-sm font-bold mb-2">${field.label}</label>
        <input type="${field.type}" id="${id}" name="${field.name}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>`;
      })
      .join("");

    return `<form>
${fieldsHtml}
    <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign In
        </button>
    </div>
</form>`;
  }, [fields]);

  return (
    <main className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight font-headline text-primary">
            Form Builder
          </h1>
          <p className="mt-2 text-muted-foreground">
            Visually create your form and get the Blade code.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Form Fields</CardTitle>
              <CardDescription>Add, edit, or remove fields.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {fields.map((field) => (
                <div key={field.id} className="p-3 space-y-2 rounded-md border">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Label"
                      value={field.label}
                      onChange={(e) => updateField(field.id, "label", e.target.value)}
                    />
                    <Input
                      placeholder="name (e.g., full_name)"
                      value={field.name}
                      onChange={(e) => updateField(field.id, "name", e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={field.type}
                      onValueChange={(value: Field['type']) => updateField(field.id, "type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Field Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="password">Password</SelectItem>
                        <SelectItem value="textarea">Textarea</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => removeField(field.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={addField}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Field
              </Button>
            </CardContent>
          </Card>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Generated Code</CardTitle>
                <CardDescription>Copy and paste this into your Blade file.</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock code={generatedCode} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
