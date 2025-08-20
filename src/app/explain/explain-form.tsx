"use client";

import { useFormState, useFormStatus } from "react-dom";
import { handleExplainCode } from "./actions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const initialState = {
  explanation: "",
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Explaining..." : "Explain Code"}
    </Button>
  );
}

export function ExplainForm() {
  const [state, formAction] = useFormState(handleExplainCode, initialState);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Enter PHP Code</CardTitle>
          <CardDescription>
            Paste your code below and let our AI assistant explain it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <Textarea
              name="phpCode"
              placeholder="
<?php
  Route::middleware('auth')->get('/profile', function () {
      // ...
  });
?>"
              className="min-h-[200px] font-code"
              required
            />
            <div className="flex justify-end">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>

      {state.error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>An Error Occurred</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.explanation && (
        <Card>
          <CardHeader>
            <CardTitle>Explanation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-purple dark:prose-invert max-w-none">
              <p>{state.explanation}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
