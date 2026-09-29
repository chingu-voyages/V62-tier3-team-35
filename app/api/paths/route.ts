import { errorHandler } from "@/lib/errors/error-handler";
import * as pathsService from "@/services/paths.service";

// Create a new learning path for the current user.
// Query params: userId (required)
// Body: { careerGoal, skillLevel, skills?, hoursPerWeek, learningPace }
// Returns: 201 { success: true, data: LearningPath } | 400/404 { success: false, error }
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const body = await request.json();

    const path = await pathsService.createPath(userId, body);

    return Response.json({ success: true, data: path }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}

// List all learning paths for the current user, each with its steps ordered by `order`.
// Query params: userId (required)
// Returns: 200 { success: true, data: LearningPath[] } | 400 { success: false, error }
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const paths = await pathsService.getPathsByUserId(userId);

    return Response.json({ success: true, data: paths });
  } catch (error) {
    return errorHandler(error);
  }
}