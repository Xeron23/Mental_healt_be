import BaseRoutes from "../../../base_classes/base-route.js"
import messageController from "./message-controller.js"
import tryCatch from "../../../utils/tryCatcher.js"
import validateCredentials from "../../../middlewares/validate-credentials-middleware.js"
import authToken from "../../../middlewares/auth-token-middleware.js"
import { createMessageSchema, messageSchema } from "./message-schema.js"

class MessageRoutes extends BaseRoutes {
    routes(){
        this.router.post("/", [
            authToken,
            validateCredentials(createMessageSchema),
            tryCatch(messageController.create)
        ]);
        this.router.put("/:id", [
            authToken,
            validateCredentials(messageSchema, "params"),
            tryCatch(messageController.update)
        ]);

        this.router.delete("/:id", [
            authToken,
            validateCredentials(messageSchema, "params"),
            tryCatch(messageController.delete)
        ]);
    }
}


export default new MessageRoutes().router;