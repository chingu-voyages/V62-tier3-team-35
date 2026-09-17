import { GoogleGenAI } from "@google/genai";

//Create Gemini client using API key
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
