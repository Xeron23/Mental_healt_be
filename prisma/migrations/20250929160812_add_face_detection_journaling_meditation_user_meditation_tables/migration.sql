-- CreateTable
CREATE TABLE "public"."FaceDetection" (
    "detection_id" SERIAL NOT NULL,
    "userId" INTEGER,
    "imageUrl" TEXT NOT NULL,
    "mood" TEXT NOT NULL,
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FaceDetection_pkey" PRIMARY KEY ("detection_id")
);

-- CreateTable
CREATE TABLE "public"."Journaling" (
    "journal_id" SERIAL NOT NULL,
    "userId" INTEGER,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "mood" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Journaling_pkey" PRIMARY KEY ("journal_id")
);

-- CreateTable
CREATE TABLE "public"."meditation" (
    "meditation_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meditation_pkey" PRIMARY KEY ("meditation_id")
);

-- CreateTable
CREATE TABLE "public"."userMeditation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "meditationId" INTEGER,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userMeditation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."FaceDetection" ADD CONSTRAINT "FaceDetection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Journaling" ADD CONSTRAINT "Journaling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."userMeditation" ADD CONSTRAINT "userMeditation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."userMeditation" ADD CONSTRAINT "userMeditation_meditationId_fkey" FOREIGN KEY ("meditationId") REFERENCES "public"."meditation"("meditation_id") ON DELETE SET NULL ON UPDATE CASCADE;
