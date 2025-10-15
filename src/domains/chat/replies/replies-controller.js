import { createdResponse, successResponse } from "../../../utils/response.js";
import repliesService from "../replies/replies-service.js";

class RepliesController{
    async create(req, res){
        const {content, postId} = req.body;
        const userId = req.user.user_id;
        
        const reply = await repliesService.create({content, postId, userId});
        return createdResponse(res, reply);
    }
    async delete(req, res){
        const id = parseInt(req.params.id);
        const reply = await repliesService.delete(id, req.user.user_id);
        return successResponse(res, reply);
    }
}

export default new RepliesController();
