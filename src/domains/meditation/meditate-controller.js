import { successResponse } from "../../utils/response.js";

import MeditateService from "./meditate-service.js";

class MeditateController {
    // get all, get by id, get recommended, get by user id, create
    async show(req, res){
        const {page=1, limit=10} = req.query;
        
        const offset = (page - 1) * limit;

        const meditate = await MeditateService.getAll({offset, limit});

        return successResponse(res, meditate);
    }

    async index(req, res){
        const id = parseInt(req.params.meditateId, 10);
        const meditate = await MeditateService.getById(id);

        if(!meditate){
            throw Error("Failed to show meditate data");
        }

        return successResponse(res, meditate);
    }

    async recommended(req, res){
        const {limit= 12} = req.query;
        const userId = req.user.user_id;
        const meditate = await MeditateService.getRecommendedMeditations({ userId, limit});
        
        if(!meditate){
            throw Error("Failed to show recommended user meditate data");
        }
        return successResponse(res, meditate);
    }

    async userMeditations(req, res){
        const userId = req.user.user_id;
        const meditate = await MeditateService.getByUserId(userId);
        if(!meditate){
            throw Error("Failed to show user meditate data");
        }
        return successResponse(res, meditate);
    }

    async create(req, res){
        const data = {userId: req.user.user_id, meditationId: req.body.meditateId};
        const meditate = await MeditateService.create(data);
        if(!meditate){
            throw Error("Failed to create user meditate data");
        }
        return successResponse(res, meditate);
    }
}

export default new MeditateController();