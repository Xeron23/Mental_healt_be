import { successResponse } from '../../utils/response.js';
import StatsService from './stats-service.js';

class StatsController {
    async getStats(req, res) {
        const {timeFrame = 'week' } = req.query;
        const userId = req.user.user_id;
        const stats = await StatsService.getStats(userId, timeFrame);

        if(!stats){
            throw Error("Failed to get stats");
        }

        return successResponse(res, stats);
    }

    async getFace(req, res){
        const userId = req.user.user_id;
        const {tgl} = req.query
        const faceStats = await StatsService.getFaceHistory(tgl, userId);
        if(!faceStats){
            throw Error("Failed to get face detection stats");
        }
        return successResponse(res, faceStats);
    }

    async getJournaling(req,res){
        const userId = req.user.user_id;
        const {tgl} = req.query
        const journalStats = await StatsService.getJournalHistory(tgl, userId);
        if(!journalStats){
            throw Error("Failed to get journaling detection stats");
        }
        return successResponse(res, journalStats); 
    }
}   

export default new StatsController();
