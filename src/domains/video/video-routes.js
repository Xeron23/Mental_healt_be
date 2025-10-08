import BaseRoutes from "../../base_classes/base-route.js";

import tryCatch from "../../utils/tryCatcher.js";
import authToken from "../../middlewares/auth-token-middleware.js";
import VideoController from "./video-controller.js";

import validateCredentials from "../../middlewares/validate-credentials-middleware.js";
import { getAllVideoSchema, videoSchema } from "./video-schema.js";

class VideoRoutes extends BaseRoutes {
    routes(){
        this.router.get("/:id", [
            authToken,
            validateCredentials(videoSchema, "params"),
            tryCatch(VideoController.index)
        ]);
        this.router.get("/", [
            authToken,
            validateCredentials(getAllVideoSchema, "query"),
            tryCatch(VideoController.show)
        ]);
    }
}

export default new VideoRoutes().router;
