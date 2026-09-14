# voyage-tasks

Your project's `readme` is as important to success as your code. For 
this reason you should put as much care into its creation and maintenance
as you would any other component of the application.

If you are unsure of what should go into the `readme` let this article,
written by an experienced Chingu, be your starting point - 
[Keys to a well written README](https://tinyurl.com/yk3wubft).

And before we go there's "one more thing"! Once you decide what to include
in your `readme` feel free to replace the text we've provided here.

> Own it & Make it your Own!

## Team Documents

You may find these helpful as you work together to organize your project.

- [Team Project Ideas](./docs/team_project_ideas.md)
- [Team Decision Log](./docs/team_decision_log.md)

Meeting Agenda templates (located in the `/docs` directory in this repo):

- Meeting - Voyage Kickoff --> ./docs/meeting-voyage_kickoff.docx
- Meeting - App Vision & Feature Planning --> ./docs/meeting-vision_and_feature_planning.docx
- Meeting - Sprint Retrospective, Review, and Planning --> ./docs/meeting-sprint_retrospective_review_and_planning.docx
- Meeting - Sprint Open Topic Session --> ./docs/meeting-sprint_open_topic_session.docx

## Our Team

Everyone on your team should add their name along with a link to their GitHub
& optionally their LinkedIn profiles below. Do this in Sprint #1 to validate
your repo access and to practice PR'ing with your team *before* you start
coding!

- Teammate name #1: [GitHub](https://github.com/ghaccountname) / [LinkedIn](https://linkedin.com/in/liaccountname)
- Teammate name #2: [GitHub](https://github.com/ghaccountname) / [LinkedIn](https://linkedin.com/in/liaccountname)

   ...
- Teammate name #n: [GitHub](https://github.com/ghaccountname) / [LinkedIn](https://linkedin.com/in/liaccountname)

## Architecture Overview

- **Reads that build a page** (dashboard list, a single path's detail view) - handled directly in server components calling `lib/data/`, no route handler involved.
- **Any user-triggered mutation** (generating a path, toggling a step, deleting a path) - goes through a route handler in `app/api/`.
- Route handlers only orchestrate: validate input, call one function from `lib/ai/` or `lib/data/`, return a response. All AI-specific logic (including its own validation step) stays inside `lib/ai`; all DB logic stays inside `lib/data`.

Two example flows below show this in practice - one slow/external (AI-backed), one fast/local (DB-only).

## Request Flow: Generating a Path

1. **Client** - form input validated with Zod (`lib/schemas/path.ts`)
2. **Client** - Zustand sets `isGenerating = true`, sends `POST /api/paths`
3. **Route handler** (`app/api/paths/route.ts`):
   - Parses request body
   - Revalidates with the same Zod schema
   - Calls `generatePath(input)` from `lib/ai/`
   - Calls `createPath(userId, steps)` from `lib/data/`
   - Returns the saved path as JSON
4. **`lib/ai/generate-path.ts`** (called from step 3):
   - Builds prompt from validated input
   - Calls AI provider, awaits response
   - Strips/cleans the raw text
   - Parses it as JSON
   - **Validates the parsed result against `aiPathResponseSchema`** - wrong output throws error
5. **`lib/data/paths.ts`** (called from step 3) - saves the validated `Path` + `Step` rows via Prisma
6. **Client** - Zustand receives the response, sets `currentPath`, `isGenerating = false`
7. **Client** - components subscribed to the store re-render with the new path

## Request Flow: Toggling a Step Complete

1. **Client** - checkbox `onChange` calls a Zustand store action, `toggleStep(stepId)`
2. **Zustand** - optimistically flips step's `completed` value in local state immediately (UI updates instantly - no waiting on the network)
3. **Zustand** - fires `PATCH /api/steps/[id]`
4. **Route handler** (`app/api/steps/[id]/route.ts`):
   - Calls `toggleStepCompletion(stepId)` from `lib/data/steps.ts`
   - Returns a success response
5. **`lib/data/steps.ts`** - flips `completed` in the DB
6. **Client** - if success, nothing further needed. **On failure**, Zustand reverts the optimistic update and shows an error.
