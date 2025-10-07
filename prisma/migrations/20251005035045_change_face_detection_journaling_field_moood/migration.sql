/*
  Warnings:

  - The `mood` column on the `FaceDetection` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mood` column on the `Journaling` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."Mood" AS ENUM ('HAPPY', 'SAD', 'ANGRY', 'SURPRISED', 'NEUTRAL', 'FEARFUL');

-- AlterTable
ALTER TABLE "public"."FaceDetection" DROP COLUMN "mood",
ADD COLUMN     "mood" "public"."Mood" NOT NULL DEFAULT 'NEUTRAL';

-- AlterTable
ALTER TABLE "public"."Journaling" DROP COLUMN "mood",
ADD COLUMN     "mood" "public"."Mood" NOT NULL DEFAULT 'NEUTRAL';
