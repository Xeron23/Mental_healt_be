import BaseError from "../../base_classes/base-error.js";
import prisma from "../../config/db.js";


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
}

export default new StatsService();