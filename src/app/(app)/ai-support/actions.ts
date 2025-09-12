'use server';

import { diagnoseMentalState } from '@/ai/flows/ai-guided-support-initial-assessment';

export async function getAiAssessment(symptoms: string) {
  if (!symptoms) {
    return 'Please describe your symptoms to get an assessment.';
  }

  try {
    const result = await diagnoseMentalState({ symptoms });
    if (result.assessment) {
        return `${result.assessment.mentalState}\n\n${result.assessment.copingStrategies}`;
    }
    return 'I received a response, but it was not in the expected format. Please try rephrasing your concerns.';
  } catch (error) {
    console.error('Error in getAiAssessment:', error);
    return 'I apologize, but I encountered an error while processing your request. Please try again later.';
  }
}
