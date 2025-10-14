import BaseRoutes from "../../../base_classes/base-route.js";
import tryCatch from "../../../utils/tryCatcher.js";
import authToken from "../../../middlewares/auth-token-middleware.js";
import forumController from "./forum-controller.js";
import validateCredentials from "../../../middlewares/validate-credentials-middleware.js";
import { forumSchema, createForumSchema } from "./forum-schema.js";

class ForumRoutes extends BaseRoutes {
    routes() {
        this.router.post("/", [
            authToken,
            validateCredentials(createForumSchema, "body"),
            tryCatch(forumController.create)
        ]);
        this.router.get("/:id", [
            authToken,
            validateCredentials(forumSchema, "params"),
            tryCatch(forumController.show)
        ]);
        this.router.delete("/:id", [
            authToken,
            validateCredentials(forumSchema, "params"),
            tryCatch(forumController.delete)
        ]);
        this.router.get("/", [
            authToken,
            tryCatch(forumController.index)
        ])
    }
}

export default new ForumRoutes().router;