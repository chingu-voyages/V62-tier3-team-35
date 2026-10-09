import { errorHandler } from "@/lib/errors/error-handler";
import * as stepsService from "@/services/steps.service";

// Create all steps for a learning path and return them ordered by `order`.
// Body: { learningPathId: string, steps: GeneratedStepInput[] }
// Returns: 201 { success: true, data: Step[] } | 400 { success: false, error }
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await stepsService.createSteps(body);

    return Response.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}