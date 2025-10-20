-- CreateEnum
CREATE TYPE "public"."QueueStatus" AS ENUM ('queued', 'playing', 'played');

-- CreateTable
CREATE TABLE "public"."MeditationFavorite" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "meditationId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MeditationFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MeditationQueue" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "meditationId" INTEGER,
    "position" INTEGER NOT NULL,
    "status" "public"."QueueStatus" NOT NULL DEFAULT 'queued',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MeditationQueue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MeditationFavorite_userId_meditationId_key" ON "public"."MeditationFavorite"("userId", "meditationId");

-- AddForeignKey
ALTER TABLE "public"."MeditationFavorite" ADD CONSTRAINT "MeditationFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MeditationFavorite" ADD CONSTRAINT "MeditationFavorite_meditationId_fkey" FOREIGN KEY ("meditationId") REFERENCES "public"."Meditation"("meditation_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MeditationQueue" ADD CONSTRAINT "MeditationQueue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MeditationQueue" ADD CONSTRAINT "MeditationQueue_meditationId_fkey" FOREIGN KEY ("meditationId") REFERENCES "public"."Meditation"("meditation_id") ON DELETE SET NULL ON UPDATE CASCADE;
