import BaseError from "../../../base_classes/base-error.js";
import prisma from "../../../config/db.js";


class ForumService{
    async create(data){
        const user = await prisma.user.findUnique({
            where: {
                user_id: data.userId
            }
        });
        if(!user){
            throw BaseError.notFound("User not found");
        }
        const forum = await prisma.post.create({
            data: data,
        });
        return forum;
    }
    async getById(id){
        const forum = await prisma.post.findFirst({
            where: {
                id: id
            },
            include: {
                user: {
                    select: {
                        user_id: true,
                        first_name: true,
                        last_name: true,
                        email: true,                   }
                }
            }
        })
        if(!forum){
            throw BaseError.notFound("Forum not found")
        }
        return forum;
    }
    async getAll(){
        const forums = await prisma.post.findMany({
            include: {
                user: {
                    select: {
                        user_id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return forums;
    }
    async delete(id, user_id){
        const deleted = await prisma.post.delete({
            where: {
                id: id,
                userId: user_id
            },
        });
        if(deleted.count === 0){
            throw BaseError.notFound("Forum not found");
        }
        return {
            message: "Forum deleted successfully"
        }
    }
}

export default new ForumService();