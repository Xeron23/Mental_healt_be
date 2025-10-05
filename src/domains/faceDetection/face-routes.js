import BaseRoutes from "../../base_classes/base-route.js";

import tryCatch from "../../utils/tryCatcher.js";
import authToken from "../../middlewares/auth-token-middleware.js";
import uploadImageUpload from "../../middlewares/upload-image-upload.js";
import faceController from "./face-controller.js";
import validateCredentials from "../../middlewares/validate-credentials-middleware.js";
import { faceSchema, getAllFaceSchema } from "./face-schema.js";

class FaceRoutes extends BaseRoutes {
    routes() {
        this.router.post("/", [
            authToken,
            uploadImageUpload,
            tryCatch(faceController.create)
        ]);
        this.router.get("/:id", [
            authToken,
            validateCredentials(faceSchema, "params"),
            tryCatch(faceController.show)
        ]);
        this.router.delete("/:id", [
            authToken,
            validateCredentials(faceSchema, "params"),
            tryCatch(faceController.delete)
        ]);
        this.router.get("/", [
            authToken,
            validateCredentials(getAllFaceSchema, "query"),
            tryCatch(faceController.index)
        ])

    }
}

export default new FaceRoutes().router;