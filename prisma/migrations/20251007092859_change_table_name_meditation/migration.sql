/*
  Warnings:

  - You are about to drop the `meditation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userMeditation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."userMeditation" DROP CONSTRAINT "userMeditation_meditationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."userMeditation" DROP CONSTRAINT "userMeditation_userId_fkey";

-- DropTable
DROP TABLE "public"."meditation";

-- DropTable
DROP TABLE "public"."userMeditation";

-- CreateTable
CREATE TABLE "public"."Meditation" (
    "meditation_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meditation_pkey" PRIMARY KEY ("meditation_id")
);

-- CreateTable
CREATE TABLE "public"."UserMeditation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "meditationId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMeditation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."UserMeditation" ADD CONSTRAINT "UserMeditation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserMeditation" ADD CONSTRAINT "UserMeditation_meditationId_fkey" FOREIGN KEY ("meditationId") REFERENCES "public"."Meditation"("meditation_id") ON DELETE SET NULL ON UPDATE CASCADE;
