import BaseRoutes from "../../base_classes/base-route.js";

import tryCatch from "../../utils/tryCatcher.js";
import authToken from "../../middlewares/auth-token-middleware.js";
import meditateController from "./meditate-controller.js";
import validateCredentials from "../../middlewares/validate-credentials-middleware.js";
import {
  userMeditateSchema,
  getAllMeditateSchema,
} from "./meditate-schema.js";
import meditateFavoriteController from "./favorite/meditate-favorite-controller.js";
import { createMeditateFavoriteSchema } from "./favorite/meditate-favorite-schema.js";
import meditateQueueController from "./queue/meditate-queue-controller.js";
import { meditateQueueSchema } from "./queue/meditate-queue-schema.js";

class MeditateRoutes extends BaseRoutes {
  routes() {
    // ===============================
    // 🧘 Core Meditation Endpoints
    // ===============================
    this.router.post(
      "/",
      [authToken, validateCredentials(userMeditateSchema), tryCatch(meditateController.create)]
    );

    this.router.get(
      "/user",
      [authToken, tryCatch(meditateController.userMeditations)]
    );

    this.router.get(
      "/recommended",
      [authToken, tryCatch(meditateController.recommended)]
    );

    // ===============================
    // 🌟 Favorite Meditation
    // ===============================
    this.router.get(
      "/meditate-favorite",
      [authToken, validateCredentials(getAllMeditateSchema, "query"), tryCatch(meditateFavoriteController.show)]
    );

    this.router.post(
      "/meditate-favorite",
      [authToken, validateCredentials(createMeditateFavoriteSchema), tryCatch(meditateFavoriteController.create)]
    );

    this.router.delete(
      "/meditate-favorite",
      [authToken, validateCredentials(createMeditateFavoriteSchema), tryCatch(meditateFavoriteController.delete)]
    );

    // ===============================
    // 🎵 Meditation Queue
    // ===============================
    this.router.get(
      "/meditate-queue",
      [authToken, tryCatch(meditateQueueController.show)]
    );

    this.router.post(
      "/meditate-queue",
      [authToken, validateCredentials(meditateQueueSchema), tryCatch(meditateQueueController.create)]
    );

    this.router.post(
      "/meditate-queue/reset",
      [authToken, tryCatch(meditateQueueController.reset)]
    );

    this.router.post(
      "/meditate-queue/next",
      [authToken, tryCatch(meditateQueueController.next)]
    );

    this.router.post(
      "/meditate-queue/prev",
      [authToken, tryCatch(meditateQueueController.prev)]
    );

    this.router.post(
      "/meditate-queue/reorder",
      [authToken, tryCatch(meditateQueueController.reorder)]
    );

    this.router.delete(
      "/meditate-queue/:meditationId",
      [authToken, validateCredentials(meditateQueueSchema, "params"), tryCatch(meditateQueueController.delete)]
    );

    this.router.get(
      "/",
      [authToken, validateCredentials(getAllMeditateSchema, "query"), tryCatch(meditateController.show)]
    );

    this.router.get(
      "/:meditateId",
      [authToken, validateCredentials(userMeditateSchema, "params"), tryCatch(meditateController.index)]
    );
  }
}

export default new MeditateRoutes().router;
