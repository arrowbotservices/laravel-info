"use server";

import { explainCode } from "@/ai/flows/explain-code";

type FormState = {
  explanation: string;
  error: string;
};

export async function handleExplainCode(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const phpCode = formData.get("phpCode") as string;

  if (!phpCode || phpCode.trim().length < 10) {
    return {
      explanation: "",
      error: "Please provide a valid code snippet (at least 10 characters).",
    };
  }

  try {
    const result = await explainCode({ phpCode });
    return {
      explanation: result.explanation,
      error: "",
    };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return {
      explanation: "",
      error: `Failed to get explanation: ${errorMessage}`,
    };
  }
}
