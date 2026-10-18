-- Drop the type if it was left behind
DROP TYPE IF EXISTS "PathStatus_new";

-- CreateEnum
CREATE TYPE "PathStatus_new" AS ENUM ('in_progress', 'completed');

-- Drop default temporarily
ALTER TABLE "learning_paths" ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable: convert existing values
ALTER TABLE "learning_paths"
  ALTER COLUMN "status" TYPE "PathStatus_new"
    USING CASE
      WHEN "status" = 'completed' THEN 'completed'::text::"PathStatus_new"
      ELSE 'in_progress'::text::"PathStatus_new"
    END;

-- Set new default
ALTER TABLE "learning_paths"
  ALTER COLUMN "status" SET DEFAULT 'in_progress';

-- Drop old enum
DROP TYPE "PathStatus";

-- Rename new enum
ALTER TYPE "PathStatus_new" RENAME TO "PathStatus";
