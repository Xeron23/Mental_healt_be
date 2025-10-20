import { successResponse } from "../../../utils/response.js";

import meditateFavoriteService from "./meditate-favorite-service.js";

class MeditateFavoriteController {
    async show(req, res){
        const {page=1, limit=10} = req.query;
        const userId = req.user.user_id
        const offset = (page-1)*limit;
        
        const meditateFavorite = await meditateFavoriteService.getAll(userId, {offset, limit});
        
        return successResponse(res, meditateFavorite)
    }
    
    async create(req, res){
        const userId = req.user.user_id;
        const meditationId = parseInt(req.body.meditationId);
        
        const meditateFavorite = await meditateFavoriteService.create({userId, meditationId});
        
        if(!meditateFavorite){
            throw Error("Failed to create meditation favorite");
        }
        
        return successResponse(res, meditateFavorite)
    }
    
    async delete(req, res){
        const userId = req.user.user_id;
        const meditationId = parseInt(req.body.meditationId);

        const deleteMeditateFavorite = await meditateFavoriteService.delete({userId, meditationId});

        if(!deleteMeditateFavorite){
            throw Error("Failed to create meditation favorite");
        }
        
        return successResponse(res, deleteMeditateFavorite)
    }
}

export default new MeditateFavoriteController();