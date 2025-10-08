import prisma from "../../config/db.js";
import BaseError from "../../base_classes/base-error.js";

class VideoService{
    async getAll({limit, page}){
        const videos = await prisma.video.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: limit,
            skip: page
        });
        return videos;
    }
    async getById(id){
        const video = await prisma.video.findFirst({
            where: {
                video_id: id
            }
        });
        if(!video){
            throw BaseError.notFound("Video not found");
        }
        return video;
    }
}

export default new VideoService();