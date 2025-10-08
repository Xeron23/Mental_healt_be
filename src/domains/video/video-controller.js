import { successResponse } from "../../utils/response.js";

import VideoService from "./video-service.js";

class VideoController {
    async show(req, res) {
        const { limit =10, page=1 } = req.query;
        const offset = (page - 1) * limit;
        const videos = await VideoService.getAll({ limit: parseInt(limit), page: offset });

        if(!videos){
            throw Error("Failed to get videos");
        }
        return successResponse(res, videos);
    }

    async index(req, res) {
        const id = parseInt(req.params.id);
        const video = await VideoService.getById(id);
        if(!video){
            throw Error("Failed to get video");
        }
        return successResponse(res, video);
    }
}

export default new VideoController();