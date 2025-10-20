import { createdResponse, successResponse } from "../../../utils/response.js";

import meditateQueueService from "./meditate-queue-service.js";


class meditateQueueController {
    async show(req, res){
        const userId = req.user.user_id;
        const queue = await meditateQueueService.getAll(userId);
        if(!queue){
            throw Error("Failed to get queue meditation");
        }

        return successResponse(res, queue);

    }

    async create(req, res){
        const userId = req.user.user_id;
        const {meditationId} = req.body

        const queue = await meditateQueueService.create({userId, meditationId});

        if(!queue){
            throw Error("Failed to create queue meditation")
        }
        return createdResponse(res, queue);
    }

    async reset(req, res){
        const userId = req.user.user_id;
        const queue = await meditateQueueService.reset(userId);

        if(!queue){
            throw Error("Failed to reset queue meditation")
        }
        return successResponse(res, queue);
    }

    async delete(req, res){
        const userId = req.user.user_id;
        const {meditationId} = req.params;      
        const id = parseInt(meditationId)
        const queue = await meditateQueueService.deleteQueueById(userId, id);

        if(!queue){
            throw Error("Failed to delete queue meditation")    
        }
        return successResponse(res, queue)
    }

    async next(req, res){
        const userId = req.user.user_id;
        
        const queue = await meditateQueueService.next(userId);
        
        if(!queue){
            throw Error("Failed to next queue meditation")
        }
        return successResponse(res, queue);
    }
    
    async prev(req, res){
        const userId = req.user.user_id;
        const queue = await meditateQueueService.prev(userId);
        if(!queue){
            throw Error("Failed to prev queue meditation")
        }

        return successResponse(res, queue);
    }

    async reorder(req, res){
        const userId = req.user.user_id;
        const {newOrder} = req.body;

        const queue = await meditateQueueService.reorder(userId, newOrder);

        if(!queue){
            throw Error("Failed to reorder queue meditation");
        }
        return successResponse(res, queue);
    }
}

export default new meditateQueueController();