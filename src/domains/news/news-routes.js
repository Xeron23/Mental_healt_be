import BaseRoutes from "../../base_classes/base-route.js";

import tryCatch from "../../utils/tryCatcher.js";
import newsController from "./news-controller.js";
import authToken from "../../middlewares/auth-token-middleware.js";
import validateCredentials from "../../middlewares/validate-credentials-middleware.js";
import newsSchema from "./news-schema.js";

class NewsRoutes extends BaseRoutes {
    routes() {
        this.router.get("/:newsId", [
            authToken,
            validateCredentials(newsSchema, "params"),
            tryCatch(newsController.index)
        ]);
        this.router.get("/", [
            authToken,
            tryCatch(newsController.show)
        ]);
    }
}

export default new NewsRoutes().router;
