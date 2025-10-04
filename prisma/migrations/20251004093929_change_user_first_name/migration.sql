/*
  Warnings:

  - You are about to drop the column `front_name` on the `User` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "front_name",
ADD COLUMN     "first_name" TEXT NOT NULL;
