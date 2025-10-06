import BaseError from "../../base_classes/base-error.js";
import prisma from "../../config/db.js";
import faceService from "../faceDetection/face-service.js";


class JournalService{
    async create(data){
        const user = await prisma.user.findUnique({
            where: {
                user_id: data.userId
            }
        });

        if(!user){
            throw BaseError.notFound("User not found");
        }
        data.mood = await faceService.generateMood(false);
        const journal = await prisma.journaling.create({
            data: data,
        });

        return journal;
    }

    async getById(id){
        const journal = await prisma.journaling.findFirst({
            where: {
                journal_id: id
            }
        })

        if(!journal){
            throw BaseError.notFound("Journal not found")
        }

        return journal;
    }
    // user_id, mood, week, month
    async getAll(data){
        const where = {};
        if(data.userId){
            where.userId = Number(data.user_id);
        }
        if(data.mood){
            where.mood = data.mood;
        }

        if(data.week){
            const now = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(now.getDate() - 7);
            where.createdAt = { gte: sevenDaysAgo };
        }

        if (data.month) {
            const now = new Date();
            const monthAgo = new Date();
            monthAgo.setDate(now.getDate() - 30);
            where.createdAt = { gte: monthAgo };
        }

        const [journalData, total] = await Promise.all([
            prisma.journaling.findMany({
                where,
                orderBy: {createdAt: "asc"}
            }),
            prisma.journaling.count({where}),
        ]);

        if(total === 0){
            throw BaseError.notFound("Data journal not found");
        }

        return {total, data: journalData}
    }

    async update(id, data){
        const checkData = await prisma.journaling.findFirst({
            where: {
                journal_id: id
            }
        });

        if(!checkData){
            throw BaseError.notFound("Data not found");
        }
        data.mood = await faceService.generateMood(true);
        const journal = await prisma.journaling.update({
            where: {
                journal_id: id
            },
            data: data
        });

        return journal;
    }

    async delete(id, user_id){
        const [journal, deleted] = await Promise.all([
            prisma.journaling.findFirst({
                where: {
                    journal_id: id,
                    userId: user_id
                }
            }),
            prisma.journaling.deleteMany({
                where: {
                    journal_id: id,
                    userId: user_id
                }
            })
        ]);

        if(deleted.count === 0){
            throw BaseError.notFound("Journal not found");
        }
        return {
            message: "Jorunal deleted succesfully"
        }
    }


}

export default new JournalService();