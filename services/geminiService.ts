import { GoogleGenAI } from "@google/genai";
import { MOCK_VIDEOS } from '../constants';

// Initialize the client with the API key from environment variables
// Note: In a real production app, you might proxy this through a backend to keep keys safe,
// but for this frontend-only demo, we access the env var directly as per instructions.
const apiKey = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey: apiKey });
}

export const generateWorkoutSuggestion = async (
  goal: string, 
  experienceLevel: string,
  timeAvailable: string
): Promise<string> => {
  if (!ai) {
    return "AI Service unavailable. Please configure your API Key.";
  }

  const videoListString = MOCK_VIDEOS.map(v => `- ${v.title} (${v.category}, ${v.trainer})`).join('\n');

  const prompt = `
    You are an expert boxing and kickboxing coach for the 'Impact Gym' app.
    
    User Profile:
    - Goal: ${goal}
    - Experience: ${experienceLevel}
    - Time Available: ${timeAvailable}

    Available Videos in Library:
    ${videoListString}

    Task:
    Recommend a specific workout routine for this session using the available videos. 
    Explain why you chose these specific videos based on their goal.
    Keep the tone motivating, energetic, and concise (under 150 words).
    Format the output with Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Get in the ring! I couldn't generate a plan right now, but try our 'Heavy Bag Fundamentals' to start.";
  } catch (error) {
    console.error("Error generating AI workout:", error);
    return "Connection error. Train hard anyway! Try restarting the app.";
  }
};
