import { errorHandler } from "@/lib/errors/error-handler";
import * as pathsService from "@/services/paths.service";

// Fetch a single learning path (with its steps ordered by `order`).
// Path params: id (required)
// Returns: 200 { success: true, data: LearningPath } | 404 { success: false, error }
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const path = await pathsService.getPathById(id);

    return Response.json({ success: true, data: path });
  } catch (error) {
    return errorHandler(error);
  }
}

// Update a learning path (e.g. change status, goal, or time commitment).
// Path params: id (required) — Body: UpdatePathInput (all fields optional)
// Returns: 200 { success: true, data: LearningPath } | 400 { success: false, error }
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const path = await pathsService.updatePath(id, body);

    return Response.json({ success: true, data: path });
  } catch (error) {
    return errorHandler(error);
  }
}

// Delete a learning path and its steps (cascade).
// Path params: id (required)
// Returns: 200 { success: true, data: LearningPath } | 400 { success: false, error }
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const path = await pathsService.deletePath(id);

    return Response.json({ success: true, data: path });
  } catch (error) {
    return errorHandler(error);
  }
}