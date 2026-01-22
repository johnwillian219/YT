// backend/src/domains/auth/infrastructure/auth.controller.js
import { AuthService } from "../application/auth.service.js";
import { validateRequest } from "../../../core/utils/validation/validator.js";
import { authSchemas } from "./schemas/auth.schema.js";
import { authMiddleware } from "../../../core/middleware/auth.middleware.js";

const authService = new AuthService();

// ✅ REGISTRO - VERSÃO CORRIGIDA
const register = async (req, res, next) => {
  try {
    console.log("🎯 REGISTER CONTROLLER INICIADO");
    console.log("📥 Request body recebido:", req.body);

    // ✅ CORREÇÃO 1: Garantir que temos um name (mesmo que do email)
    if (!req.body.name || req.body.name.trim() === "") {
      req.body.name = req.body.email.split("@")[0];
      console.log("✅ Nome gerado do email:", req.body.name);
    }

    console.log("🔍 Validando schema...");
    await validateRequest(req, authSchemas.register);
    console.log("✅ Schema válido");

    // ✅ CORREÇÃO 2: Verificar se o authService.register retorna algo
    console.log("🚀 Chamando authService.register...");
    const result = await authService.register(req.body);

    if (!result) {
      throw new Error("authService.register retornou undefined");
    }

    if (!result.user) {
      throw new Error("authService.register não retornou objeto user");
    }

    console.log("✅ AuthService retornou:", {
      userId: result.user.id,
      email: result.user.email,
      name: result.user.name,
      hasToken: !!result.accessToken,
      requiresEmailVerification: result.requiresEmailVerification,
    });

    const response = {
      success: true,
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name || req.body.email.split("@")[0], // Fallback
        avatarUrl: result.user.avatarUrl || null,
        role: result.user.role || "USER",
        plan: result.user.plan || "FREE",
        isEmailVerified: result.user.isEmailVerified || false,
        createdAt: result.user.createdAt,
        updatedAt: result.user.updatedAt,
      },
      message: "Registro realizado com sucesso",
    };

    if (result.accessToken) {
      response.accessToken = result.accessToken;
      response.refreshToken = result.refreshToken;
      response.expiresIn = result.expiresIn;
      response.redirectTo = "/dashboard";
      console.log("🔑 Tokens incluídos na resposta");
    } else if (result.requiresEmailVerification) {
      response.requiresEmailVerification = true;
      response.redirectTo = "/auth/verify-email";
      console.log("📧 Requer verificação de email");
    }

    console.log("📤 Enviando resposta...");
    res.status(201).json(response);
  } catch (error) {
    console.error("❌ ERRO NO CONTROLLER DE REGISTRO:", {
      message: error.message,
      stack: error.stack,
      errors: error.errors,
    });
    next(error);
  }
};

// ✅ LOGIN
const login = async (req, res, next) => {
  try {
    console.log("🔑 LOGIN CONTROLLER INICIADO");
    console.log("📥 Login attempt for:", req.body.email);

    await validateRequest(req, authSchemas.login);

    const result = await authService.login(req.body);

    console.log("✅ Login bem-sucedido:", {
      userId: result.user?.id,
      email: result.user?.email,
    });

    res.status(200).json({
      success: true,
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      expiresIn: result.expiresIn,
      message: "Login realizado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro no login:", error.message);
    next(error);
  }
};

// ✅ VERIFICAÇÃO DE EMAIL
const verifyEmail = async (req, res, next) => {
  try {
    console.log("📧 VERIFY EMAIL CONTROLLER INICIADO");
    console.log("🔑 Token recebido:", req.body.token?.substring(0, 20) + "...");

    await validateRequest(req, authSchemas.verifyEmail);

    const { token } = req.body;
    const result = await authService.verifyEmail(token);

    console.log("✅ Email verificado com sucesso:", {
      userId: result.user.id,
      email: result.user.email,
    });

    res.json({
      success: true,
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        avatarUrl: result.user.avatarUrl,
        role: result.user.role,
        plan: result.user.plan,
        isEmailVerified: result.user.isEmailVerified,
        createdAt: result.user.createdAt,
        updatedAt: result.user.updatedAt,
      },
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      expiresIn: result.expiresIn,
      message: "Email verificado com sucesso",
      redirectTo: "/dashboard",
    });
  } catch (error) {
    console.error("❌ Erro na verificação de email:", error.message);
    next(error);
  }
};

// ✅ REENVIO DE VERIFICAÇÃO
const resendVerificationEmail = async (req, res, next) => {
  try {
    console.log("📨 RESEND VERIFICATION CONTROLLER INICIADO");
    console.log("📧 Email para reenviar:", req.body.email);

    await validateRequest(req, authSchemas.resendVerificationEmail);

    const { email } = req.body;
    const result = await authService.resendVerificationEmail(email);

    console.log("✅ Email de verificação reenviado:", { email });

    res.json({
      success: true,
      data: result,
      message: result.message || "Email de verificação reenviado",
    });
  } catch (error) {
    console.error("❌ Erro ao reenviar verificação:", error.message);
    next(error);
  }
};

// ✅ LOGOUT
const logout = async (req, res, next) => {
  try {
    console.log("🚪 LOGOUT CONTROLLER INICIADO");
    console.log("👤 User ID:", req.user?.id);

    await validateRequest(req, authSchemas.logout);

    const { refreshToken } = req.body;
    const result = await authService.logout(req.user.id, refreshToken);

    console.log("✅ Logout bem-sucedido");

    res.json({
      success: true,
      data: result,
      message: "Logout realizado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro no logout:", error.message);
    next(error);
  }
};

// ✅ REFRESH TOKEN
const refreshToken = async (req, res, next) => {
  try {
    console.log("🔄 REFRESH TOKEN CONTROLLER INICIADO");

    await validateRequest(req, authSchemas.refreshToken);

    const { refreshToken } = req.body;
    const result = await authService.refreshAccessToken(refreshToken);

    console.log("✅ Token atualizado com sucesso");

    res.json({
      success: true,
      accessToken: result.accessToken,
      expiresIn: result.expiresIn,
      message: "Token atualizado",
    });
  } catch (error) {
    console.error("❌ Erro no refresh token:", error.message);
    next(error);
  }
};

// ✅ ESQUECI SENHA
const forgotPassword = async (req, res, next) => {
  try {
    console.log("🔐 FORGOT PASSWORD CONTROLLER INICIADO");
    console.log("📧 Email para reset:", req.body.email);

    await validateRequest(req, authSchemas.forgotPassword);

    const { email } = req.body;
    const result = await authService.forgotPassword(email);

    console.log("✅ Instruções de reset enviadas:", { email });

    res.json({
      success: true,
      data: result,
      message: result.message,
    });
  } catch (error) {
    console.error("❌ Erro em 'esqueci senha':", error.message);
    next(error);
  }
};

// ✅ RESET DE SENHA
const resetPassword = async (req, res, next) => {
  try {
    console.log("🔐 RESET PASSWORD CONTROLLER INICIADO");
    console.log("🔑 Token:", req.body.token?.substring(0, 20) + "...");

    await validateRequest(req, authSchemas.resetPassword);

    const { token, newPassword } = req.body;
    const result = await authService.resetPassword(token, newPassword);

    console.log("✅ Senha resetada com sucesso");

    res.json({
      success: true,
      data: result,
      message: "Senha alterada com sucesso",
      redirectTo: "/auth/login",
    });
  } catch (error) {
    console.error("❌ Erro no reset de senha:", error.message);
    next(error);
  }
};

// ✅ ALTERAR SENHA
const changePassword = async (req, res, next) => {
  try {
    console.log("🔐 CHANGE PASSWORD CONTROLLER INICIADO");
    console.log("👤 User ID:", req.user?.id);

    await validateRequest(req, authSchemas.changePassword);

    const { currentPassword, newPassword } = req.body;
    const result = await authService.changePassword(
      req.user.id,
      currentPassword,
      newPassword,
    );

    console.log("✅ Senha alterada com sucesso");

    res.json({
      success: true,
      data: result,
      message: "Senha alterada com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro na alteração de senha:", error.message);
    next(error);
  }
};

// ✅ OBTER DADOS DO USUÁRIO ATUAL
const getCurrentUser = async (req, res, next) => {
  try {
    console.log("👤 GET CURRENT USER CONTROLLER INICIADO");
    console.log("👤 User ID:", req.user?.id);

    const user = await authService.getCurrentUser(req.user.id);

    console.log("✅ Dados do usuário obtidos:", { email: user.email });

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        role: user.role,
        plan: user.plan,
        isEmailVerified: user.isEmailVerified,
        provider: user.provider,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      message: "Dados do usuário obtidos com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao buscar usuário atual:", error.message);
    next(error);
  }
};

// ✅ ATUALIZAR PERFIL
const updateProfile = async (req, res, next) => {
  try {
    console.log("📝 UPDATE PROFILE CONTROLLER INICIADO");
    console.log("👤 User ID:", req.user?.id);
    console.log("📦 Update data:", req.body);

    await validateRequest(req, authSchemas.updateProfile);

    const updatedUser = await authService.updateProfile(req.user.id, req.body);

    console.log("✅ Perfil atualizado com sucesso");

    res.json({
      success: true,
      user: updatedUser,
      message: "Perfil atualizado com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro na atualização de perfil:", error.message);
    next(error);
  }
};

// ✅ OBTER SESSÕES DO USUÁRIO
const getSessions = async (req, res, next) => {
  try {
    console.log("📋 GET SESSIONS CONTROLLER INICIADO");
    console.log("👤 User ID:", req.user?.id);

    const sessions = await authService.getUserSessions(req.user.id);

    console.log("✅ Sessões obtidas:", sessions.length);

    res.json({
      success: true,
      sessions,
      message: "Sessões obtidas com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao buscar sessões:", error.message);
    next(error);
  }
};

// ✅ REVOGAR SESSÃO
const revokeSession = async (req, res, next) => {
  try {
    console.log("🗑️ REVOKE SESSION CONTROLLER INICIADO");
    console.log("👤 User ID:", req.user?.id);
    console.log("🗑️ Session ID to revoke:", req.params.sessionId);

    await validateRequest(req, authSchemas.revokeSession);

    await authService.revokeSession(req.params.sessionId, req.user.id);

    console.log("✅ Sessão revogada com sucesso");

    res.json({
      success: true,
      message: "Sessão revogada com sucesso",
    });
  } catch (error) {
    console.error("❌ Erro ao revogar sessão:", error.message);
    next(error);
  }
};

// ✅ REVOGAR TODAS AS SESSÕES (EXCETO ATUAL)
const revokeAllSessions = async (req, res, next) => {
  try {
    console.log("🗑️ REVOKE ALL SESSIONS CONTROLLER INICIADO");
    console.log("👤 User ID:", req.user?.id);

    // Obter sessionId atual do header Authorization
    const currentSessionId = req.headers["x-session-id"] || null;

    await authService.revokeAllSessions(req.user.id, currentSessionId);

    console.log("✅ Todas as outras sessões revogadas");

    res.json({
      success: true,
      message: "Todas as outras sessões foram revogadas",
    });
  } catch (error) {
    console.error("❌ Erro ao revogar sessões:", error.message);
    next(error);
  }
};

// ✅ VALIDAR USUÁRIO
const validateUser = async (req, res, next) => {
  try {
    console.log("👤 VALIDATE USER CONTROLLER INICIADO");
    console.log("👤 User ID:", req.user?.id);

    const user = await authService.validateUser(req.user.id);

    console.log("✅ Usuário validado:", { email: user.email });

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        role: user.role,
        plan: user.plan,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      message: "Usuário válido",
    });
  } catch (error) {
    console.error("❌ Erro ao validar usuário:", error.message);
    next(error);
  }
};

// ✅ TEST ENDPOINT (para debug)
const testEndpoint = async (req, res, next) => {
  try {
    console.log("🧪 TEST ENDPOINT CHAMADO");

    res.json({
      success: true,
      message: "API is working",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL ? "configured" : "not configured",
    });
  } catch (error) {
    next(error);
  }
};

// Exportar todas as funções
export {
  register,
  login,
  verifyEmail,
  resendVerificationEmail,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  getCurrentUser,
  updateProfile,
  getSessions,
  revokeSession,
  revokeAllSessions,
  validateUser,
  testEndpoint,
};
