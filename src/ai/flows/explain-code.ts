// This file uses server-side code, so use the 'use server' directive.
'use server';

/**
 * @fileOverview Explains a block of PHP code in plain English, referencing Laravel and PHP documentation.
 *
 * - explainCode - A function that accepts PHP code and returns an explanation.
 * - ExplainCodeInput - The input type for the explainCode function.
 * - ExplainCodeOutput - The return type for the explainCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainCodeInputSchema = z.object({
  phpCode: z.string().describe('The PHP code to be explained.'),
});
export type ExplainCodeInput = z.infer<typeof ExplainCodeInputSchema>;

const ExplainCodeOutputSchema = z.object({
  explanation: z.string().describe('A plain English explanation of the PHP code.'),
});
export type ExplainCodeOutput = z.infer<typeof ExplainCodeOutputSchema>;

export async function explainCode(input: ExplainCodeInput): Promise<ExplainCodeOutput> {
  return explainCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainCodePrompt',
  input: {schema: ExplainCodeInputSchema},
  output: {schema: ExplainCodeOutputSchema},
  prompt: `You are an expert Laravel PHP developer. Explain the following PHP code in plain English, referencing relevant parts of the Laravel and PHP documentation where applicable.\n\nPHP Code:\n\n{{{phpCode}}}`,
});

const explainCodeFlow = ai.defineFlow(
  {
    name: 'explainCodeFlow',
    inputSchema: ExplainCodeInputSchema,
    outputSchema: ExplainCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
