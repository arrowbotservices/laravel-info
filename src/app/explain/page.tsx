import { ExplainForm } from "./explain-form";

export default function ExplainPage() {
  return (
    <main className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight font-headline text-primary">
            Code Explanation
          </h1>
          <p className="mt-2 text-muted-foreground">
            Get a plain English explanation of any Laravel or PHP code snippet.
            Powered by AI.
          </p>
        </header>
        <ExplainForm />
      </div>
    </main>
  );
}
