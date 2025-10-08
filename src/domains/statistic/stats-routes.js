import BaseRoutes from "../../base_classes/base-route.js";
import tryCatch from "../../utils/tryCatcher.js";
import authToken from "../../middlewares/auth-token-middleware.js";
import statsController from "./stats-controller.js";
import validateCredentials from "../../middlewares/validate-credentials-middleware.js";

class StatsRoutes extends BaseRoutes {
    routes() {
        this.router.get("/:timeFrame", [
            authToken,
            tryCatch(statsController.getStats),
        ]);
    }
}

export default new StatsRoutes().router;
