import { createdResponse, successResponse } from "../../../utils/response.js";
import forumService from "./forum-service.js";

class ForumController{
    async create(req, res){
        const {content} = req.body;
        const userId = req.user.user_id;
        const forum = await forumService.create({content, userId});

        if(!forum){
            throw Error("Failed to create forum");
        }
        return createdResponse(res, forum);
    }

    async show(req, res){
        const id = parseInt(req.params.id);
        const forum = await forumService.getById(id);
        if(!forum){
            throw Error("Failed to show forum data");
        }
        return successResponse(res, forum);
    }

    async index(req, res){
        const forums = await forumService.getAll();
        if(!forums){
            throw Error("Failed to get index forum data");
        }
        return successResponse(res, forums);
    }
    async delete(req, res){
        const id = parseInt(req.params.id);
        const forum = await forumService.delete(id, req.user.user_id);
        if(!forum){
            throw Error("Failed to delete forum data")
        }
        return successResponse(res, forum);
    }
}
export default new ForumController;