import BaseError from "../../base_classes/base-error.js";
import prisma from "../../config/db.js";


class StatsService {
    async getStats(userId, timeFrame) {
        const where = { userId: Number(userId) };
        const now = new Date();
        let startDate;
        if (timeFrame === 'week') {
            startDate = new Date();
            startDate.setDate(now.getDate() - 7);
        } else if (timeFrame === 'month') {
            startDate = new Date();
            startDate.setDate(now.getDate() - 30);
        }
        if (startDate) {
            where.createdAt = { gte: startDate };
        }
        // get all journals and total
        const [totalJournals, journals] = await Promise.all([
            prisma.journaling.count({ where }),
            prisma.journaling.findMany({ where })
        ]);
        // get all faces and total
        const [totalFaces, faces] = await Promise.all([
            prisma.faceDetection.count({ where }),
            prisma.faceDetection.findMany({ where })
        ]);
        
        if (totalJournals === 0 && totalFaces === 0) {
            throw BaseError.notFound("No data found for the given time frame");
        }
        

        const mood = {...journals, ...faces};
        
        const freqMood = {};
        for (const entry of mood) {
            if (entry.mood) {
                freqMood[entry.mood] = (freqMood[entry.mood] || 0) + 1;
            }
        }
        console.log(freqMood);

        return freqMood;
        
    }
}

export default new StatsService();