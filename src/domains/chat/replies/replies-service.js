import BaseError from "../../../base_classes/base-error.js";
import prisma from "../../../config/db.js";

class RepliesService{
    async create(data){
        const user = await prisma.user.findUnique({
            where: { user_id: data.userId }
        });
        if (!user) throw BaseError.notFound("User not found");
        const post = await prisma.post.findUnique({
            where: { id: data.postId }
        });
        if (!post) throw BaseError.notFound("Post not found");
        console.log(user.user_id, "     ", post.userId);
        
        if(user.user_id === post.userId) throw BaseError.badRequest("You cannot reply to your own post");
        
        const reply = await prisma.reply.create({
            data: data
        });


        return reply;
    }

    async delete(id, user_id){

        const [reply, deleted] = await Promise.all([
            prisma.reply.findFirst({
                where: {
                    id: id,
                    userId: user_id
                },
            }),
            prisma.reply.deleteMany({
                where: {
                    id: id,
                    userId: user_id
                },
            }),
        ]);
        if (deleted.count === 0) {
            throw BaseError.notFound("Reply not found");
        }
        return {
            message: "Reply deleted successfully"
        }
    }
}

export default new RepliesService();
