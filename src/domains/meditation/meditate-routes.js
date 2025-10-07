import BaseRoutes from "../../base_classes/base-route.js";

import tryCatch from "../../utils/tryCatcher.js";
import authToken from "../../middlewares/auth-token-middleware.js";
import meditateController from "./meditate-controller.js";
import validateCredentials from "../../middlewares/validate-credentials-middleware.js";
import {userMeditateSchema, getAllMeditateSchema} from "./meditate-schema.js";

class MeditateRoutes extends BaseRoutes {
    routes() {
        this.router.post("/", [
            authToken,
            validateCredentials(userMeditateSchema),
            tryCatch(meditateController.create)
        ]);
        this.router.get("/user", [
            authToken,
            tryCatch(meditateController.userMeditations)
        ]);
        this.router.get("/recommended", [
            authToken,
            tryCatch(meditateController.recommended)
        ]);
        this.router.get("/:meditateId", [
            authToken,
            validateCredentials(userMeditateSchema, "params"),
            tryCatch(meditateController.index)
        ]);
        this.router.get("/", [
            authToken,
            validateCredentials(getAllMeditateSchema, "query"),
            tryCatch(meditateController.show)
        ]);
    }
}

export default new MeditateRoutes().router;