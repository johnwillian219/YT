import { Router } from "express";
import * as authController from "./auth.controller.js";
import { authMiddleware } from "../../../core/middleware/auth.middleware.js";

const router = Router();

// Rotas públicas
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/verify-email", authController.verifyEmail);
router.post("/resend-verification", authController.resendVerificationEmail);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

// Rotas protegidas (requer autenticação)
router.post("/logout", authMiddleware, authController.logout);
router.get("/me", authMiddleware, authController.getCurrentUser);
router.put("/profile", authMiddleware, authController.updateProfile);
router.put("/change-password", authMiddleware, authController.changePassword);
router.get("/sessions", authMiddleware, authController.getSessions);
router.delete(
  "/sessions/:sessionId",
  authMiddleware,
  authController.revokeSession,
);
router.delete("/sessions", authMiddleware, authController.revokeAllSessions);
router.get("/validate", authMiddleware, authController.validateUser);

export default router;
