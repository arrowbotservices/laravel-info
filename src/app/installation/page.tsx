"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Clipboard } from "lucide-react";

const command = "composer create-project laravel/laravel example-app";

export default function InstallationPage() {
  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    toast({
      title: "Copied to clipboard!",
      description: "You can now paste the command in your terminal.",
    });
  };

  const handleCreateProject = () => {
    toast({
      title: "Project creation simulated!",
      description: "In a real environment, this would set up a new Laravel project.",
      action: <CheckCircle className="text-green-500" />,
    });
  };

  return (
    <main className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight font-headline text-primary">
            Laravel Installation
          </h1>
          <p className="mt-2 text-muted-foreground">
            Set up a new Laravel project on your local machine.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Create a New Project</CardTitle>
            <CardDescription>
              Follow these steps to get started with a fresh Laravel application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Step 1: Open Your Terminal</h3>
              <p className="text-muted-foreground">
                Navigate to the directory where you want to create your new project.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Step 2: Run the Composer Command</h3>
              <p className="text-muted-foreground">
                Use Composer to create a new Laravel project. This command will download Laravel and its dependencies.
              </p>
              <div className="flex items-center gap-2 p-3 rounded-md bg-secondary">
                <code className="text-sm text-secondary-foreground flex-grow font-code">{command}</code>
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                  <Clipboard className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Step 3: Start Development Server</h3>
              <p className="text-muted-foreground">
                Once the project is created, navigate into the project directory and start the local development server.
              </p>
              <div className="flex items-center gap-2 p-3 rounded-md bg-secondary">
                <code className="text-sm text-secondary-foreground flex-grow font-code">cd example-app && php artisan serve</code>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleCreateProject}>
                Simulate Project Creation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
