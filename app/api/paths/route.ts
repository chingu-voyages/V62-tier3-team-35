import { errorHandler } from "@/lib/errors/error-handler";
import * as pathsService from "@/services/paths.service";
import * as stepsService from "@/services/steps.service";
import { generatePath } from "@/lib/ai/generate-path";
import { getCurrentUserId } from "@/lib/auth";

// Create a new learning path for the current user.
// The current user is determined from the Better Auth session.
// Body: { careerGoal, skillLevel, skills?, hoursPerWeek, learningPace }
// Returns: 201 { success: true, data: { path, steps: savedSteps } | 400/404 { success: false, error }
export async function POST(request: Request) {
  let pathId: string | undefined;
  let userId: string | undefined;
  try {
    const userId = await getCurrentUserId();

    const formInput = await request.json();

    const aiRoadmap = await generatePath(formInput);
    const path = await pathsService.createPath(userId, formInput);
    const savedSteps = await stepsService.createSteps({
      learningPathId: path.id,
      steps: aiRoadmap.roadmap,
    });

    return Response.json(
      { success: true, data: { path, steps: savedSteps } },
      { status: 201 },
    );
  } catch (error) {
    if (pathId && userId) {
      await pathsService.deletePath(pathId, userId).catch(() => {});
    }
    return errorHandler(error);
  }
}

// List all learning paths for the current user, each with its steps ordered by `order`.
// The current user is determined from the Better Auth session.
// Query: sort=newest | oldest (defaults to newest first)
//        status=in_progress | completed (omit for all)
// Returns: 200 { success: true, data: LearningPath[], counts } | 400 { success: false, error }
export async function GET(request: Request) {
  try {
    const userId = await getCurrentUserId();
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get("sort");
    const status = searchParams.get("status");

    const [paths, counts] = await Promise.all([
      pathsService.getPathsByUserId(userId, { sort, status }),
      pathsService.getPathCountsByUserId(userId),
    ]);

    return Response.json({ success: true, data: paths, counts });
  } catch (error) {
    return errorHandler(error);
  }
}
