import { successResponse } from "../../utils/response.js";

import NewsService from "./news-service.js";

class NewsController {
    async show(req, res) {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const news = await NewsService.getAllNews({ limit: parseInt(limit), page: offset });
        return successResponse(res, news);
    }

    async index(req, res) {
        const { newsId } = req.params;
        const news = await NewsService.getNewsById(newsId);
        return successResponse(res, news);
    }
}

export default new NewsController();
