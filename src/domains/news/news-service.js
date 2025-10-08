import prisma from "../../config/db.js";
import BaseError from "../../base_classes/base-error.js";

class NewsService{
    async getAllNews({limit, page}) {
        const news = await prisma.news.findMany({
            take: limit,
            skip: page
        });
        return news;
    }

    async getNewsById(id) {
        const news = await prisma.news.findUnique({
            where: {
                news_id: Number(id)
            }
        });
        if(!news){
            throw BaseError.notFound("News not found");
        }
        return news;
    }
}

export default new NewsService();
