import { ai } from "@/lib/ai/gemini";

type GeneratePathData = {
  goal: string;
  level: string;
  skills: string[];
  weeklyTime: string;
  customWeeklyHours?: number;
  target: string;
};

export async function generatePath(data: GeneratePathData) {
  const weeklyTime =
    data.weeklyTime === "custom"
      ? `${data.customWeeklyHours} hours per week`
      : data.weeklyTime;

  const prompt = `
        Create a personalized learning roadmap using the user's information.

        User:
        - Goal: ${data.goal}
        - Experience level: ${data.level}
        - Known technologies/skills: ${data.skills.length > 0 ? data.skills.join(", ") : "Not specified"}
        - Weekly learning time: ${weeklyTime}
        - Target pace: ${data.target}

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

  return response.text;
}
