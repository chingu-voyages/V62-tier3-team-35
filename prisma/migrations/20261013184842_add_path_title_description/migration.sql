-- AlterTable
ALTER TABLE "learning_paths"
  ADD COLUMN "title" VARCHAR(300),
  ADD COLUMN "description" TEXT;

-- Backfill existing paths: use the career goal as the title and the
-- ordered step titles as the description. Paths without steps keep a
-- NULL description.
UPDATE "learning_paths" lp
SET "title" = lp."career_goal",
    "description" = (
      SELECT string_agg(s."title", ' · ' ORDER BY s."order")
      FROM "steps" s
      WHERE s."learning_path_id" = lp."id"
    );
