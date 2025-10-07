import BaseRoutes from "../../base_classes/base-route.js";

import tryCatch from "../../utils/tryCatcher.js";
import authToken from "../../middlewares/auth-token-middleware.js";
import validateCredentials from "../../middlewares/validate-credentials-middleware.js";
import journalController from "./journal-controller.js";
import { createJournalSchema, getAllJournalSchema, journalSchema, updateJournaslSchema } from "./journal-schema.js";


class JournalRoutes extends BaseRoutes {
    routes() {
        this.router.post("/", [
            authToken,
            validateCredentials(createJournalSchema),
            tryCatch(journalController.create)
        ]);
        this.router.get("/", [
            authToken,
            validateCredentials(getAllJournalSchema, "query"),
            tryCatch(journalController.index)
        ]);
        this.router.get("/:id", [
            authToken,
            validateCredentials(journalSchema, "params"),
            tryCatch(journalController.show)
        ]);
        this.router.delete("/:id", [
            authToken,
            validateCredentials(journalSchema, "params"),
            tryCatch(journalController.delete)
        ]);
        this.router.put("/:id", [
            authToken,
            validateCredentials(journalSchema, "params"),
            validateCredentials(updateJournaslSchema),  
            tryCatch(journalController.update)
        ])
    } 
}

export default new JournalRoutes().router;