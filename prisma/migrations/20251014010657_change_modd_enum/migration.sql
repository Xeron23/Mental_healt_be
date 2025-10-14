/*
  Warnings:

  - The values [HAPPY,SAD,ANGRY,SURPRISED,NEUTRAL,FEARFUL] on the enum `Mood` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Mood_new" AS ENUM ('sad', 'joy', 'anger', 'fear');
ALTER TABLE "public"."FaceDetection" ALTER COLUMN "mood" DROP DEFAULT;
ALTER TABLE "public"."Journaling" ALTER COLUMN "mood" DROP DEFAULT;
ALTER TABLE "public"."FaceDetection" ALTER COLUMN "mood" TYPE "public"."Mood_new" USING ("mood"::text::"public"."Mood_new");
ALTER TABLE "public"."Journaling" ALTER COLUMN "mood" TYPE "public"."Mood_new" USING ("mood"::text::"public"."Mood_new");
ALTER TYPE "public"."Mood" RENAME TO "Mood_old";
ALTER TYPE "public"."Mood_new" RENAME TO "Mood";
DROP TYPE "public"."Mood_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."FaceDetection" ALTER COLUMN "mood" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Journaling" ALTER COLUMN "mood" DROP DEFAULT;
