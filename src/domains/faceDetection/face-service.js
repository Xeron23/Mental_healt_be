 import axios from "axios";
 import deleteImage from "../../utils/deleteImage.js";

import prisma from "../../config/db.js";
import BaseError from "../../base_classes/base-error.js";

 class FaceService {
    async detectFace(data){
        const testMood = await this.generateMood(data);

        if(!testMood){
            await deleteImage(data.image_url);
        }

        data.mood = testMood;
        console.log(data);
        
        const faceDetect = await prisma.faceDetection.create({
            data: data
        });


        return faceDetect;
    }

    async delete(id, user_id){

        const [faceDetect, deleted] = await Promise.all([
            prisma.faceDetection.findFirst({
                where: {
                    detection_id: id,
                    userId: user_id
                },
            }),
            prisma.faceDetection.deleteMany({
                where: {
                    detection_id: id,
                    userId: user_id
                },
            }),
        ]);

        if (deleted.count === 0) {
            throw BaseError.notFound("Data not found");
        }
        await deleteImage(faceDetect.imageUrl);
        return {
            message: "Face deteceted deleted successfully"
        }
    }

    async getById(id){
        const faceDetect = await prisma.faceDetection.findFirst({
            where: {
                detection_id: id,
            }
        });
        if(!faceDetect){
            throw BaseError.notFound("Data not found");
        }

        return faceDetect;
    }

    async getAll(data) {
        const where = {};
        if (data.user_id) {
            where.userId = Number(data.user_id);
        }

        if (data.mood) {
            where.mood = data.mood;
        }

        if (data.week) {
            const now = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(now.getDate() - 7);
            where.detectedAt = { gte: sevenDaysAgo };
        }

        if (data.month) {
            const now = new Date();
            const monthAgo = new Date();
            monthAgo.setDate(now.getDate() - 30);
            where.detectedAt = { gte: monthAgo };
        }
        

        const [faceData, total] = await Promise.all([
            prisma.faceDetection.findMany({
                skip: data.offset ? Number(data.offset) : undefined,
                take: data.limit ? Number(data.limit) : undefined,
                where,
                orderBy: { createdAt: "asc" },
            }),
            prisma.faceDetection.count({ where }),
        ]);
        
        if(total === 0){
            throw BaseError.notFound("Data face detection not found")
        }

        return { total, data: faceData };
    }

    async generateMood(image_url) {
        const moods = ["HAPPY", "SAD", "ANGRY", "SURPRISED", "NEUTRAL", "FEARFUL"];

        if (image_url) {
            const randomIndex = Math.floor(Math.random() * moods.length);
            return moods[randomIndex];
        }

        return "NEUTRAL";
    }
}

export default new FaceService();