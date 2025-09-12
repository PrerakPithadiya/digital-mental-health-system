'use server';
/**
 * @fileOverview AI-Guided Support for personalized coping strategies after mental state assessment.
 *
 * - getPersonalizedCopingStrategies - A function that generates personalized coping strategies based on the assessment.
 * - PersonalizedCopingStrategiesInput - The input type for the getPersonalizedCopingStrategies function.
 * - PersonalizedCopingStrategiesOutput - The return type for the getPersonalizedCopingStrategies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCopingStrategiesInputSchema = z.object({
  assessmentResults: z
    .string()
    .describe('The results from the mental state assessment questionnaire.'),
  studentProfile: z
    .string()
    .describe(
      'A brief profile of the student, including age, gender, and any relevant background information.'
    ),
});
export type PersonalizedCopingStrategiesInput = z.infer<
  typeof PersonalizedCopingStrategiesInputSchema
>;

const PersonalizedCopingStrategiesOutputSchema = z.object({
  copingStrategies: z
    .string()
    .describe(
      'A list of personalized coping strategies tailored to the student based on their assessment results and profile.'
    ),
});
export type PersonalizedCopingStrategiesOutput = z.infer<
  typeof PersonalizedCopingStrategiesOutputSchema
>;

export async function getPersonalizedCopingStrategies(
  input: PersonalizedCopingStrategiesInput
): Promise<PersonalizedCopingStrategiesOutput> {
  return personalizedCopingStrategiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCopingStrategiesPrompt',
  input: {schema: PersonalizedCopingStrategiesInputSchema},
  output: {schema: PersonalizedCopingStrategiesOutputSchema},
  prompt: `You are an AI mental health assistant designed to provide personalized coping strategies for students.

  Based on the student's mental state assessment results and profile, generate a list of coping strategies that are most likely to be effective for them.

  Assessment Results: {{{assessmentResults}}}
  Student Profile: {{{studentProfile}}}

  Coping Strategies:
  `,
});

const personalizedCopingStrategiesFlow = ai.defineFlow(
  {
    name: 'personalizedCopingStrategiesFlow',
    inputSchema: PersonalizedCopingStrategiesInputSchema,
    outputSchema: PersonalizedCopingStrategiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
