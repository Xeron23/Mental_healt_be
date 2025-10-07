import { successResponse, createdResponse } from "../../utils/response.js";
import FaceService from "./face-service.js";

class FaceController {
    async create(req, res) {
        let data = {};

        if(!req.fileUrl){
            throw Error("Failed to get file image");
        }
        data.imageUrl = req.fileUrl;
        data.userId = req.user.user_id;
        const faceDetect = await FaceService.detectFace(data);
        if(!faceDetect){
            throw Error("failed to detect face");
        }
        return createdResponse(res, faceDetect);
    }

    async show(req, res){
        const id = parseInt(req.params.id, 10);
        const faceDetect = await FaceService.getById(id);
        if(!faceDetect){
            throw Error("Failed to show face detection data");
        }
        return successResponse(res, faceDetect);
    }

    async index(req, res){
        const payload = {...req.query, user_id: req.user.user_id}

        const {page=1, limit=10, user_id, mood, week, month} = payload;
        
        const offset = (page - 1) * limit;

        const faceDetect = await FaceService.getAll({offset, limit, mood, user_id, week, month});

        if(!faceDetect){
            throw Error("Failed to get index face detection data")
        }

        return successResponse(res, faceDetect);
    }

    async delete(req, res){
        const id = parseInt(req.params.id, 10);
        const face = await FaceService.delete(id, req.user.user_id);
        if(!face){
            throw Error("Failed to delete face data")
        }
        return successResponse(res, face);
    }
}

export default new FaceController;