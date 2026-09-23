import { generatePath } from "@/lib/ai/generate-path";

export async function POST(request: Request) {
  const data = await request.json();
  const result = await generatePath(data);

  return Response.json(result);

  // try {
  //   const data = await request.json();
  //   const result = await generatePath(data);

  //   if (!result) {
  //     throw new Error("Failed to generate roadmap");
  //   }

  //   const roadmap = JSON.parse(result);

  //   return Response.json(roadmap);
  // } catch (error) {
  //   console.error("Failed to generate roadmap:", error);

  //   return Response.json(
  //     { error: "Failed to generate roadmap" },
  //     { status: 500 },
  //   );
  // }
}
