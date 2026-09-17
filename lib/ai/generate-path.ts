import { ai } from "@/lib/ai/gemini";

// Request to Gemini
export async function generatePath() {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents:
      "Generate a short learning path for a beginner frontend developer.",
  });

  return response.text;
}
