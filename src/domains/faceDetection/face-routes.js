import BaseRoutes from "../../base_classes/base-route.js";

import tryCatch from "../../utils/tryCatcher.js";
import authToken from "../../middlewares/auth-token-middleware.js";
import uploadImageUpload from "../../middlewares/upload-image-upload.js";
import faceController from "./face-controller.js";

class FaceRoutes extends BaseRoutes {
    routes() {
        this.router.post("/", [
            authToken,
            uploadImageUpload,
            tryCatch(faceController.create)
        ]);
    }
}

export default new FaceRoutes().router;