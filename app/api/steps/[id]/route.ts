import { errorHandler } from "@/lib/errors/error-handler";
import * as stepsService from "@/services/steps.service";

// Update a step (e.g. mark isCompleted, set completedAt, edit title/description).
// Path params: id (required) — Body: UpdateStepInput (all fields optional)
// Returns: 200 { success: true, data: Step } | 400 { success: false, error }
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const step = await stepsService.updateStep(id, body);

    return Response.json({ success: true, data: step });
  } catch (error) {
    return errorHandler(error);
  }
}