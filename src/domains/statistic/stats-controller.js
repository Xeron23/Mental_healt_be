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
}   

export default new StatsController();
