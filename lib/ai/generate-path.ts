import { ai } from "@/lib/ai/gemini";
import type { RoadmapFormValues } from "@/lib/schemas/generate-path.schema";

export async function generatePath({
  careerGoal,
  skillLevel,
  skills,
  hoursPerWeek,
  learningPace,
}: RoadmapFormValues) {
  const prompt = `
        Create a personalized learning roadmap using the user's information.

        User:
        - Goal: ${careerGoal}
        - Experience level: ${skillLevel}
        - Known technologies/skills: ${skills.length > 0 ? skills.join(", ") : "Not specified"}
        - Weekly learning time:  ${hoursPerWeek}
        - Target pace: ${learningPace}

        Use weekly learning time and target pace together to determine the course duration.
        - Weekly learning time is the maximum hours available per week.
        - Target pace controls how quickly the course progresses.
        - Do not exceed the weekly time limit.
        - Calculate estimatedWeeks from estimatedHours and weekly learning time.

        Use your expertise to fill missing information based on the user's goal, level, and available time.
        Create a practical and realistic roadmap. Start from the user's current level and order technologies logically.

        Include relevant known technologies with only the essential fundamentals needed for the goal, without repeating advanced material they already know.
        For each technology include:
        - technology
        - keyTopics: 3-5 key technologies or concepts, comma-separated
        - description: 2-3 sentences
        - estimatedHours
        - estimatedWeeks
        - include 4 or more topics for each technology. Use as many topics as necessary to cover the technology comprehensively based on its complexity and the user's level; do not stop at 4 if more distinct topics are needed. For known technologies, include only the essential fundamentals.
        - topics must cover distinct practical concepts from basic to advanced without unnecessary overlap

        Each topic must contain ONLY:
        - name
        - resources

        Each topic must have 1-3 relevant resources, including a video when appropriate, preferably from YouTube. Resources must directly match the topic and may include official documentation, tutorials, courses, articles, or videos.

        Each resource must contain:
        - title
        - type
        - url
        - description

        Keep the roadmap focused. Do not add unnecessary technologies or topics.
        Return ONLY valid JSON. Do not use Markdown or add any text outside the JSON.
        Use exactly this structure:

        {
          "roadmap": [
            {
              "technology": "JavaScript",
              "keyTopics": "ES6+, DOM, Events",
              "description": "Learn the core JavaScript concepts needed for modern frontend development.",
              "estimatedHours": 40,
              "estimatedWeeks": 4,
              "topics": [
                {
                  "name": "Variables and data types",
                  "resources": [
                    {
                      "title": "Resource title",
                      "type": "official documentation",
                      "url": "https://example.com",
                      "description": "What this resource teaches."
                    }
                  ]
                }
              ]
            }
          ]
        }
        `;

  const response = await ai.models.generateContent({
    //model: "gemini-3.6-flash",
    model: "gemini-3.5-flash-lite",
    contents: prompt,
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty response");
  }

  return JSON.parse(response.text);
}
