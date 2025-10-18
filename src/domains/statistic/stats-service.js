import BaseError from "../../base_classes/base-error.js";
import prisma from "../../config/db.js";
import { groq, GROQ_DEFAULT_MODEL, GROQ_DEFAULT_SETTINGS  } from "../../config/grok-ai.js";


class StatsService {
    async getStats(userId, timeFrame) {
        const where = { userId: Number(userId) };
        const now = new Date();
        let startDate;

        if (timeFrame === 'week') {
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 6); // 7 hari termasuk hari ini
        } else if (timeFrame === 'month') {
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 29); // 30 hari termasuk hari ini
        }

        if (startDate) where.createdAt = { gte: startDate };

        // Ambil semua data paralel
        const [journals, faces] = await Promise.all([
            prisma.journaling.findMany({ where }),
            prisma.faceDetection.findMany({ where })
        ]);

        // Gabungkan dua sumber data
        const combined = [
            ...journals.map(j => ({ ...j, type: 'journal' })),
            ...faces.map(f => ({ ...f, type: 'face' }))
        ];

        // Fungsi bantu format tanggal
        const formatDate = (d) => d.toISOString().split('T')[0];

        const getPeriodKey = (date) => {
            const d = new Date(date);
            if (timeFrame === 'week') {
            return formatDate(d);
            } else {
            const startDay = Math.floor((d.getDate() - 1) / 3) * 3 + 1;
            const endDay = Math.min(
                startDay + 2,
                new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
            );
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(startDay).padStart(2, '0')}_to_${String(endDay).padStart(2, '0')}`;
            }
        };

        // Struktur hasil awal (kosong)
        const stats = {};

        // Generate range default tergantung timeFrame
        if (timeFrame === 'week') {
            for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const key = formatDate(date);
            stats[key] = {}; // nanti diisi mood
            }
        } else if (timeFrame === 'month') {
            const totalDays = 30;
            for (let i = 0; i < totalDays; i += 3) {
            const d = new Date(startDate);
            d.setDate(startDate.getDate() + i);
            const key = getPeriodKey(d);
            stats[key] = {};
            }
        }

        // Masukkan data ke stats
        for (const entry of combined) {
            const period = getPeriodKey(entry.createdAt);
            const mood = entry.mood;

            if (!stats[period]) stats[period] = {};
            if (!stats[period][mood]) {
            stats[period][mood] = { count: 0, journals: [], faces: [] };
            }

            stats[period][mood].count += 1;
            if (entry.type === 'journal') stats[period][mood].journals.push(entry);
            else stats[period][mood].faces.push(entry);
        }

        // Lengkapi tanggal tanpa mood dengan struktur kosong
        for (const period in stats) {
            if (Object.keys(stats[period]).length === 0) {
            stats[period] = {
                EMPTY: { count: 0, journals: [], faces: [] }
            };
            }
        }

        return stats;
    }

    async getFaceHistory(tgl, userId){
        const where = { userId: Number(userId) };
        if(tgl){
            
            const inputDate = new Date(tgl); 
            const start = new Date(inputDate);
            start.setHours(0,0,0,0);
            const end = new Date(inputDate);
            end.setHours(23,59,59,999);

            where.createdAt = { gte: start, lte: end };
        }
        const [dataFace, face] = await Promise.all([
            prisma.faceDetection.findMany({
                where: where,
                orderBy: {createdAt: "asc"}
            }),
            prisma.faceDetection.groupBy({
                by: ['mood'],
                where: where,
                _count: {
                    mood: true
                }
            })
        ]);
        

        let maxCount = Math.max(...face.map(f => f._count.mood));
        
        const maxMoods = face
            .filter(f => f._count.mood === maxCount)
            .map(f => f.mood);

        let summary = "Tidak ada summarize"
            if(maxMoods.length){
                summary = await this.generateSummaryStats(maxMoods);
            }
        
        return {
            mood: dataFace, summary: summary
        }; 
    }
    
    async getJournalHistory(tgl, userId){
        const where = { userId: Number(userId) };
        if(tgl){
            
            const inputDate = new Date(tgl); 
            const start = new Date(inputDate);
            start.setHours(0,0,0,0);
            const end = new Date(inputDate);
            end.setHours(23,59,59,999);

            where.createdAt = { gte: start, lte: end };
        }
        const [dataJournal, journal] = await Promise.all([
            prisma.journaling.findMany({
                where: where,
                orderBy: {createdAt: "asc"}
            }),
            prisma.journaling.groupBy({
                by: ['mood'],
                where: where,
                _count: {
                    mood: true
                }
            })
        ]);
        
        

        let maxCount = Math.max(...journal.map(f => f._count.mood));
        
        const maxMoods = journal
            .filter(f => f._count.mood === maxCount)
            .map(f => f.mood);
            
        let summary = "Tidak ada summarize"
            if(maxMoods.length){
                summary = await this.generateSummaryStats(maxMoods);
            }
        
        return {
            mood: dataJournal, summary: summary
        }; 
    }
    
    async generateSummaryStats(mood){
        const prompt = `
        Kamu adalah asisten yang membuat ringkasan mood pengguna secara natural dan santai. 
        Gunakan Bahasa Indonesia, seolah kamu sedang ngobrol dengan pengguna. 
        Buat kalimat yang menyebutkan semua mood yang ada pada max Moods (hanya dair situ saja), termasuk saran ringan atau tips, misalnya cara menghadapi mood negatif. 
        Hasil harus ramah, natural, mengalir, dan mudah dibaca, maksimal 50 kata. 
        Jangan gunakan simbol \n, tanda kutip, atau format markdown. 

        Max Moods: ${JSON.stringify(mood)}
        `;

            const response = await groq.chat.completions.create({
                model: GROQ_DEFAULT_MODEL,
                messages: [{ role: "user", content: prompt }],
                ...GROQ_DEFAULT_SETTINGS,
            });
    
            return response.choices[0]?.message?.content?.trim() || "Maaf, aku tidak bisa memberikan respons.";
    }
}

export default new StatsService();