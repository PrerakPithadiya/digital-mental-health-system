'use server';

import { diagnoseMentalState, DiagnoseMentalStateOutput } from '@/ai/flows/ai-guided-support-initial-assessment';

export async function getAiAssessment(symptoms: string): Promise<{
  success: boolean;
  message: string;
  data?: DiagnoseMentalStateOutput;
}> {
  if (!symptoms) {
    return { success: false, message: 'Please describe your symptoms to get an assessment.' };
  }

  try {
    const result = await diagnoseMentalState({ symptoms });
    if (result.responseMarkdown) {
        return {
          success: true,
          message: 'Assessment successful.',
          data: result,
        };
    }
    return { success: false, message: 'I received a response, but it was not in the expected format. Please try rephrasing your concerns.' };
  } catch (error) {
    console.error('Error in getAiAssessment:', error);
    return { success: false, message: 'I apologize, but I encountered an error while processing your request. Please try again later.' };
  }
}
