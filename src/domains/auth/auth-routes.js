import BaseRoutes from "../../base_classes/base-route.js";
import AuthController from "./auth-controller.js";

import tryCatch from "../../utils/tryCatcher.js";
import validateCredentials from '../../middlewares/validate-credentials-middleware.js';
import { registerSchema, loginSchema, changePasswordSchema, refreshTokenSchema, profileSchema, resetPasswordSchema } from './auth-schema.js';
import authToken from "../../middlewares/auth-token-middleware.js";
import authController from "./auth-controller.js";

class AuthRoutes extends BaseRoutes {
    routes() {
        this.router.post("/register", [
            validateCredentials(registerSchema),
            tryCatch(AuthController.register)
        ]);
        this.router.post("/login", [
            validateCredentials(loginSchema),
            tryCatch(AuthController.login)
        ]);
        this.router.get("/verify/:token", [
            tryCatch(AuthController.verify)
        ]);
        this.router.post("/refresh-token", [
            validateCredentials(refreshTokenSchema),
            tryCatch(AuthController.refreshToken)
        ]),
        this.router.get("/me", [
            authToken,
            tryCatch(AuthController.getProfile)
        ]);
        this.router.put("/me/update", [
            authToken,
            validateCredentials(profileSchema),
            tryCatch(AuthController.updateProfile)
        ]);
        this.router.patch("/me/update-password", [
            authToken,
            validateCredentials(changePasswordSchema),
            tryCatch(AuthController.updatePassword)
        ]);
        this.router.post("/email-reset-password", [
            tryCatch(authController.emailResetPassword)
        ])
        this.router.get("/verify-reset-password/:token", [
            tryCatch(authController.verifyResetPassword)
        ])
        this.router.post("/reset-password", [
            validateCredentials(resetPasswordSchema),
            tryCatch(AuthController.resetPassword)
        ])
    }
}

export default new AuthRoutes().router;