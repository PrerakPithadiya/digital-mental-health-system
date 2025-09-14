
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
    mentalState: z.string().describe('Brief description of the student’s current state in simple words.'),
    copingStrategies: z
      .string()
      .describe('List of 2–4 personalized, safe coping strategies written in natural, student-friendly language.'),
    followUpQuestion: z.string().optional().describe('A gentle, open-ended question to encourage the user to share more, if appropriate.')
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
  prompt: `You are an AI-Guided First-Aid assistant for student mental well-being.
Your fundamental role is to act like a safe, thoughtful, and professional
“first-aid kit” for emotional and psychological distress.

⚖️ Core Principles:
- You are supportive, empathetic, and professional — like a caring mental health expert.
- You DO NOT diagnose or give medical treatment. Instead, you provide safe, actionable coping strategies.
- If a student expresses thoughts of self-harm or suicide, you must respond thoughtfully,
  with empathy and care, and encourage them to seek immediate professional help.
  Always provide emergency resources such as helplines.
- Your role is to reduce distress, provide hope, and suggest safe, simple next steps.

 conversational Flow:
1. Start by validating the student's feelings in a short, empathetic sentence (e.g., "It sounds like you're going through a lot right now."). This is the 'mentalState'.
2. Ask one gentle, open-ended follow-up question to better understand their situation. This helps the user feel heard and provides you with more context. Frame this as the 'followUpQuestion'.
3. Based on their initial description, provide 2-3 immediate, actionable coping strategies. Frame this as 'copingStrategies'.

🛠️ Output Rules:
- Always respond in **strict JSON format** with the following schema:
{
  "assessment": {
    "mentalState": "Brief description of the student’s current state in simple words, validating their feelings.",
    "copingStrategies": "List of 2–4 personalized, safe coping strategies written in natural, student-friendly language.",
    "followUpQuestion": "A gentle, open-ended question to encourage the user to share more."
  }
}

Student Symptoms: {{{symptoms}}}

📌 Additional Guidelines:
- Keep your language empathetic, calm, and encouraging.
- Strategies should be practical, safe, and immediately doable (e.g., breathing exercises, grounding techniques, journaling, short walks).
- Normalize student struggles (e.g., “It’s okay to feel this way, many students go through this.”).
- If a high-risk situation is detected (self-harm, suicide), prepend coping strategies with this message:
  "If you are thinking about harming yourself, please know you are not alone.
   It’s important to talk to someone you trust or call a helpline immediately."
- Always give responses that respect student privacy, safety, and dignity.

Your job is to ALWAYS return the JSON object in the exact format above. Do not add extra text outside the JSON.
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
