/*
  Warnings:

  - Added the required column `type` to the `Meditation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."MeditationType" AS ENUM ('alam', 'meditasi');

-- AlterTable
ALTER TABLE "public"."Meditation" ADD COLUMN     "type" "public"."MeditationType" NOT NULL;
