import axios from "axios";
import BaseError from "../../base_classes/base-error.js";
import prisma from "../../config/db.js";
import faceService from "../faceDetection/face-service.js";
import { groq, GROQ_DEFAULT_MODEL, GROQ_DEFAULT_SETTINGS } from "../../config/grok-ai.js";

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
        data.mood = await this.generateMood(data.content);
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
        console.log(journal);
        
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
        console.log(checkData);
        

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
            message: "Journal deleted succesfully"
        }
    }

    async moodAnalysis(data){

        const summary = await this.generateSummary(data);
        return summary;
    }


    async generateSummary(journal){
        journal.mood = await this.generateMood(journal.content);
        console.log(journal);
        
        const prompt = `
        Kamu adalah AI yang menjawab pesan pengguna secara singkat berdasarkan mood mereka.

        Mood pengguna: ${journal.mood}
        Judul: "${journal.title}"
        Pesan: "${journal.content}"

        Tulis respons dalam 1-2 kalimat saja (maksimal 25 kata).
        Gunakan nada yang sesuai dengan mood, lalu akhiri dengan kalimat motivasi singkat yang menenangkan atau menyemangati.
        Jangan pakai emoji, jangan sebut "AI".
        `;

        const response = await groq.chat.completions.create({
            model: GROQ_DEFAULT_MODEL,
            messages: [{ role: "user", content: prompt }],
            ...GROQ_DEFAULT_SETTINGS,
        });

        return response.choices[0]?.message?.content?.trim() || "Maaf, aku tidak bisa memberikan respons.";
    }

    async generateMood(content){
        const mood = await axios.post("https://frazanhibriz-journaling-ai.hf.space/predict", {
            text: content
        });
        return mood.data.dominant_emotion;
    }

}

export default new JournalService();