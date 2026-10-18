-- CreateEnum
CREATE TYPE "ProgressStatus" AS ENUM ('upcoming', 'in_progress', 'done');

-- AlterTable: steps
ALTER TABLE "steps"
  ADD COLUMN "resources" JSONB,
  ADD COLUMN "status" "ProgressStatus" NOT NULL DEFAULT 'upcoming';

-- Preserve legacy completion state before dropping the old column
UPDATE "steps" SET "status" = 'done' WHERE "is_completed" = true;

ALTER TABLE "steps"
  DROP COLUMN "is_completed",
  ALTER COLUMN "key_topics" SET NOT NULL;

-- AlterTable: topics
ALTER TABLE "topics"
  ADD COLUMN "status" "ProgressStatus" NOT NULL DEFAULT 'upcoming';

UPDATE "topics" SET "status" = 'done' WHERE "is_completed" = true;

ALTER TABLE "topics"
  DROP COLUMN "is_completed",
  ALTER COLUMN "resources" DROP NOT NULL;

-- CreateTable
CREATE TABLE "notes" (
    "id" TEXT NOT NULL,
    "step_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notes_step_id_idx" ON "notes"("step_id");

-- CreateIndex
CREATE INDEX "notes_user_id_idx" ON "notes"("user_id");

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_step_id_fkey" FOREIGN KEY ("step_id") REFERENCES "steps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
