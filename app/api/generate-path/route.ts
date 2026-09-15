import { ai } from "@/lib/ai/gemini";

//Request to Gemini
export async function POST() {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents:
      "Generate a short learning path for a beginner frontend developer.",
  });

  console.log(response.text);
  return Response.json({
    result: response.text,
  });
}
