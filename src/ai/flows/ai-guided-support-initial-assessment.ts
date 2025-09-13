
'use server';
/**
 * @fileOverview This file defines the Genkit flow for the AI-Guided Support initial assessment.
 *
 * It takes a student's responses to a symptom questionnaire as input and provides personalized coping strategies.
 * The file exports the diagnoseMentalState function, DiagnoseMentalStateInput type, and DiagnoseMentalStateOutput type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiagnoseMentalStateInputSchema = z.object({
  symptoms: z
    .string()
    .describe(
      'A description of the student symptoms with as much details as possible.'
    ),
});
export type DiagnoseMentalStateInput = z.infer<typeof DiagnoseMentalStateInputSchema>;

const DiagnoseMentalStateOutputSchema = z.object({
  assessment: z.object({
    mentalState: z.string().describe('The mental state of the student.'),
    copingStrategies: z
      .string()
      .describe('Personalized coping strategies for the student.'),
  }),
});
export type DiagnoseMentalStateOutput = z.infer<typeof DiagnoseMentalStateOutputSchema>;

export async function diagnoseMentalState(input: DiagnoseMentalStateInput): Promise<DiagnoseMentalStateOutput> {
  return diagnoseMentalStateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diagnoseMentalStatePrompt',
  input: {schema: DiagnoseMentalStateInputSchema},
  output: {schema: DiagnoseMentalStateOutputSchema},
  prompt: `You are an AI mental health support assistant. A student will describe their symptoms to you, and you will suggest coping strategies.

Student Symptoms: {{{symptoms}}}

Based on these symptoms, provide a brief assessment of the student's mental state and suggest personalized coping strategies.

Make sure to provide guidance, and be professional.

`,
});

const diagnoseMentalStateFlow = ai.defineFlow(
  {
    name: 'diagnoseMentalStateFlow',
    inputSchema: DiagnoseMentalStateInputSchema,
    outputSchema: DiagnoseMentalStateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
