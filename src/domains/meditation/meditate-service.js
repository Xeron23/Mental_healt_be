import prisma from "../../config/db.js";
import BaseError from "../../base_classes/base-error.js";

class MeditateService {
    async getAll({offset, limit}){
        const meditate = await prisma.meditation.findMany({
            skip: offset ?Number(offset) : undefined,
            take: limit ? Number(limit) : undefined,
            orderBy: {createdAt: "asc"}
        })

        // if(meditate.length === 0){
        //     throw BaseError.notFound("Data not found")
        // }
        return meditate;
    }

    async getById(id){
        const meditate = await prisma.meditation.findFirst({
            where: {
                meditation_id: id
            }
        })

        if(!meditate){
            throw BaseError.notFound("meditate not found")
        }

        return meditate;
    }

    async getRecommendedMeditations({ userId, limit}) {
        // Ambil semua riwayat meditasi user
        const userMeditations = await prisma.userMeditation.findMany({
            where: { userId },
            select: { meditationId: true },
        });

        // Kalau user belum punya riwayat sama sekali → langsung random
        if (userMeditations.length === 0) {
            return prisma.meditation.findMany({
            orderBy: { createdAt: "desc" },
            take: limit,
            });
        }

        // Hitung frekuensi tiap meditationId
        const freqMap = {};
        for (const m of userMeditations) {
            if (m.meditationId) {
            freqMap[m.meditationId] = (freqMap[m.meditationId] || 0) + 1;
            }
        }

        // Urutkan berdasarkan frekuensi (jarang → sering)
        const sortedMeditations = Object.entries(freqMap)
            .sort((a, b) => a[1] - b[1]) // ascending by count
            .map(([id]) => parseInt(id));
        

        // Ambil 75% dari behavior-based, 25% random
        const behaviorCount = Math.ceil(limit * 0.75);
        const randomCount = limit - behaviorCount;

        // Ambil kombinasi jarang dan sering dari user behavior
        const half = Math.ceil(behaviorCount / 2);
        const rareIds = sortedMeditations.slice(0, half);
        const frequentIds = sortedMeditations.slice(-half);
        const selectedBehaviorIds = [...new Set([...rareIds, ...frequentIds])];
        
        // Ambil detail meditation dari behavior
        const behaviorMeditations = await prisma.meditation.findMany({
            where: { meditation_id: { in: selectedBehaviorIds } },
            take: behaviorCount,
        });

        const missingCount = limit -behaviorMeditations.length;
        // Ambil random meditation (yang tidak termasuk di behavior)
        const randomMeditations = await prisma.$queryRawUnsafe(`
            SELECT * FROM "Meditation"
            WHERE "meditation_id" NOT IN (${selectedBehaviorIds.length ? selectedBehaviorIds.join(',') : '0'})
            ORDER BY RANDOM()
            LIMIT ${missingCount};
        `);

        // Gabungkan hasilnya
        const recommendations = [...behaviorMeditations, ...randomMeditations];

        return recommendations;
    }


    async getByUserId(userId){
        const userMeditations = await prisma.userMeditation.findMany({
            where: { userId },
        });

        return userMeditations;
    }

    async create(data){
        const checkMeditate = await prisma.meditation.findFirst({
            where: {meditation_id: data.meditationId}
        })

        if(!checkMeditate){
            throw BaseError.badRequest("Meditate not found");
        }

        const userMeditate = await prisma.userMeditation.create({
            data: data
        })

        if(!userMeditate){
            throw BaseError.badRequest("Failed to create user meditate");
        }
        return userMeditate;
    }
}


export default new MeditateService();