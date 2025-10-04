import deleteImage from "../../utils/deleteImage.js";
import { successResponse } from "../../utils/response.js";

class FaceController {
    async create(req, res) {
        return successResponse(res, req.fileUrl);
    }
}

export default new FaceController;