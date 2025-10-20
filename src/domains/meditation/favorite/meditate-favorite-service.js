import BaseError from "../../../base_classes/base-error.js";
import prisma from "../../../config/db.js";

class meditateFavorite {
     async create(data){
        const [checkMeditaion, checkFavorite] = await Promise.all([
            prisma.meditation.findFirst({
                where: {
                    meditation_id: data.meditationId
                }
            }), 
            prisma.meditationFavorite.findFirst({
                where: {
                    userId: data.userId,
                    meditationId: data.meditationId
                }
            }),

        ]);
        if(!checkMeditaion){
            throw BaseError.badRequest("meditation not foun")
        }
        if(checkFavorite){
            throw BaseError.badRequest("Already on favorite")
        }
        const favorite = await prisma.meditationFavorite.create({
            data: data
        })

        if(!favorite){
            throw new Error("Failed to add favorite")
        }
        return favorite;
     }

     async delete(data){
        const [meditateFavorite, deleted] = await Promise.all([
            prisma.meditationFavorite.findFirst({
                where: {
                    meditationId: data.meditationId,
                    userId: data.userId
                }
            }),
            prisma.meditationFavorite.deleteMany({
                where: {
                    meditationId: data.meditationId,
                    userId: data.userId
                }
            }),
        ]);

        if(deleted.count === 0){
            throw BaseError.notFound("Meditation favorite not found");
        }
        return {
            message: "Meditation favorite deleted succesfully"
        }
     }

     async getAll(userId, {offset, limit}){
        const meditateFavorite = await prisma.meditationFavorite.findMany({
            skip: offset ? Number(offset) : undefined,
            take: limit ? Number(limit) : undefined,
            where: {
                userId: userId
            }
        })
        return meditateFavorite
     }
}

export default new meditateFavorite();