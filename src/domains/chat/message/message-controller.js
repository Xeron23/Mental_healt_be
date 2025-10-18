import { createdResponse, successResponse } from "../../../utils/response.js";
import messageService from "./message-service.js";

class MessgaeController {
    async create(req, res){
        const userId = req.user.user_id;    
        const data = {userId, ...req.body}
        const message = await messageService.create(data);
        if(!message){
            throw Error("Failed to create message")
        }
        return createdResponse(res, message);
    }

    async update(req, res){
        const userId = req.user.user_id;
        const id =  parseInt(req.params.id) 
        const {content} = req.body;
        const message = await messageService.update({userId, content, id});
        if(!message){
            throw Error("failed to update message")
        }
        return successResponse(res, message);
    }

    async delete(req, res){
        const userId = req.user.user_id;
        const id =  parseInt(req.params.id) 
        const message = await messageService.delete(userId, id)
        if(!message){
            throw Error("failed to delete message");
        }
        return successResponse(res, message);
    }

    async index(req, res){
        const message = await messageService.getAll();
        return successResponse(res, message);
    }
}


export default new MessgaeController;