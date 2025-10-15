-- DropForeignKey
ALTER TABLE "public"."Reply" DROP CONSTRAINT "Reply_postId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Reply" ADD CONSTRAINT "Reply_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
