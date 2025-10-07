 import { createdResponse, successResponse } from "../../utils/response.js";
 import journalService from "./journal-service.js";


 class JournalController {
    async create(req, res){
        const {title, content} = req.body;
        const userId = req.user.user_id

        const journal = await journalService.create({title, userId, content});

        if(!journal){
            throw Error("Failed to create journal");
        }

        return createdResponse(res, journal);
    }

    async show(req, res){
        const id = parseInt(req.params.id);

        const journal = await journalService.getById(id);
        if(!journal){
            throw Error("Failed to show journal data");
        }
        return successResponse(res, journal);
    }

    async index(req, res){
        const payload = {...req.query, user_id: req.user.user_id}

        
        const {user_id, mood, week, month} = payload;
        const journal = await journalService.getAll({user_id, mood, week, month});

        if(!journal){
            throw Error("Failed to get index journal data");
        }

        return successResponse(res, journal);
    }

    async update(req, res){
        const {title, content} = req.body;
        const id = parseInt(req.params.id)
        const journal = await journalService.update(id, {title, content});

        if(!journal){
            throw Error("Failed to update jornal data")
        }
        return successResponse(res, journal);
    }

    async delete(req, res){
        const id = parseInt(req.params.id);

        const journal = await journalService.delete(id, req.user.user_id);

        if(!journal){
            throw Error("Failed to delete journal data");
        }

        return successResponse(res, journal);
    }

}

export default new JournalController;