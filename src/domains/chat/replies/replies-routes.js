import BaseRoutes from "../../../base_classes/base-route.js";
import tryCatch from "../../../utils/tryCatcher.js";
import authToken from "../../../middlewares/auth-token-middleware.js";
import repliesController from "./replies-controller.js";
import validateCredentials from "../../../middlewares/validate-credentials-middleware.js";
import { repliesSchema, createRepliesSchema } from "./replies-schema.js";

class RepliesRoutes extends BaseRoutes {
    routes() {
        this.router.post("/", [
            authToken,
            validateCredentials(createRepliesSchema, "body"),
            tryCatch(repliesController.create)
        ]);
        this.router.delete("/:id", [
            authToken,
            validateCredentials(repliesSchema, "params"),
            tryCatch(repliesController.delete)
        ]);
    }
}

export default new RepliesRoutes().router;