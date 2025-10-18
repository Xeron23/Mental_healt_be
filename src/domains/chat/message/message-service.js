import BaseError from "../../../base_classes/base-error.js";
import prisma from "../../../config/db.js";
import { checkTgl } from "../../../utils/checkTanggal.js";

class MessageService{
    async create(data){
        if(data.parentId){
            const checkParent = await prisma.message.findFirst({
                where: {
                    id: data.parentId
                }
            })
            if(!checkParent){
                throw BaseError.notFound("Data parent not found");
            }
            // if(checkParent.userId === data.userId){
            //     throw BaseError.badRequest("Cannot self replay")
            // }
        }

        const message = await prisma.message.create({
            data: {
                userId: data.userId,
                content: data.content,
                parentId: data.parentId || null
            },
            include: {
                user: true,
                replies: true
            }
        });
        if(!message){
            throw BaseError.badRequest("failed to create message")
        } 

        return message;
    }

    async update(data){
        const checkMessage = await prisma.message.findFirst({
            where: {id: data.id, userId: data.userId}
        })

        if(!checkMessage){
            throw BaseError.notFound("Message not found");
        }
        
        if(!checkTgl(checkMessage.createdAt)){
            throw BaseError.badRequest("Tidak bisa update, sudah lewat 5 menit");
        }

        const messgae = await prisma.message.update({
            where: {
                id: data.id,
                userId: data.userId
            },
            data: {
                userId: data.userId,
                content: data.content
            }
        })
        return messgae;
    }



    async delete(userId, id){
        const message = await prisma.message.findFirst({
            where: {id: id, userId: userId}
        })
        if(!message){
            throw BaseError.notFound("message not found");
        }

        await prisma.message.delete({
            where: {
                id: message.id
            }
        });

        return {
            message: "Message deleted succesfully",
        }
    }

    async getAll(){
        const message = await prisma.message.findMany({
            include: {
                user: true,
                replies: {
                    include: {
                        user: true
                    },
                    orderBy: {createdAt: "asc"}
                }
            },
            orderBy: {createdAt: "asc"}
        })
        return message;
    }
}

export default new MessageService();