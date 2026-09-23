import { generatePath } from "@/lib/ai/generate-path";

export async function POST() {
  const result = await generatePath();

  return Response.json({
    result,
  });
}
