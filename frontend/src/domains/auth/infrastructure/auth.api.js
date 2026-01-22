// frontend/src/domains/auth/infrastructure/auth.api.js
import httpClient from "@/shared/services/http/http-client";

// ✅ MUDAR PARA FALSE PARA USAR O BACKEND REAL
const USE_MOCK = false; // ← Mude temporariamente para TRUE para testar

const mockApi = {
  registerUser: async ({ email, password, name }) => {
    console.log("🎭 MOCK API: Registrando usuário:", email);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simular diferentes cenários baseados no email
    const emailParts = email.toLowerCase();

    // Cenário 1: Email já verificado (auto login)
    if (emailParts.includes("verified") || email === "test@test.com") {
      console.log("✅ Mock: Email considerado já verificado");

      const mockUser = {
        id: "user_" + Date.now(),
        email: email,
        name: name || email.split("@")[0],
        avatarUrl: null,
        role: "USER",
        plan: "FREE",
        isEmailVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockTokens = {
        accessToken: "mock_access_token_" + Date.now(),
        refreshToken: "mock_refresh_token_" + Date.now(),
        expiresIn: "1d",
      };

      return {
        success: true,
        user: mockUser,
        accessToken: mockTokens.accessToken,
        refreshToken: mockTokens.refreshToken,
        expiresIn: mockTokens.expiresIn,
        message: "Registro realizado com sucesso",
        redirectTo: "/dashboard",
        requiresEmailVerification: false,
      };
    }

    // Cenário 2: Precisa verificar email (padrão)
    console.log("✅ Mock registro criado, precisa verificar email");

    const mockUser = {
      id: "user_" + Date.now(),
      email: email,
      name: name || email.split("@")[0],
      avatarUrl: null,
      isEmailVerified: false,
      role: "USER",
      plan: "FREE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      user: mockUser,
      requiresEmailVerification: true,
      message: "Registro realizado com sucesso. Verifique seu email.",
      redirectTo: "/auth/verify-email",
      debugToken: "mock_verification_token_" + Date.now(),
    };
  },

  loginUser: async ({ email, password }) => {
    console.log("🎭 MOCK API: Login usuário:", email);

    await new Promise((resolve) => setTimeout(resolve, 800));

    // Verificar credenciais
    if (password !== "123456") {
      throw {
        response: {
          data: {
            success: false,
            message: "Credenciais inválidas",
            error: "Senha incorreta",
          },
          status: 401,
        },
      };
    }

    const mockUser = {
      id: "user_123",
      email: email,
      name: email.split("@")[0],
      avatarUrl: null,
      isEmailVerified: true,
      role: "USER",
      plan: "FREE",
      lastLoginAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const mockTokens = {
      accessToken: "mock_access_token_" + Date.now(),
      refreshToken: "mock_refresh_token_" + Date.now(),
      expiresIn: "1d",
    };

    return {
      success: true,
      user: mockUser,
      accessToken: mockTokens.accessToken,
      refreshToken: mockTokens.refreshToken,
      expiresIn: mockTokens.expiresIn,
      message: "Login realizado com sucesso",
      redirectTo: "/dashboard",
    };
  },

  verifyEmail: async (token) => {
    console.log("🎭 MOCK API: Verificando email com token:", token);

    await new Promise((resolve) => setTimeout(resolve, 800));

    // Verificar se token é válido
    if (!token || token === "invalid") {
      throw {
        response: {
          data: {
            success: false,
            message: "Token inválido ou expirado",
            error: "Invalid token",
          },
          status: 400,
        },
      };
    }

    const mockUser = {
      id: "user_verified_" + Date.now(),
      email: "verified@test.com",
      name: "Usuário Verificado",
      avatarUrl: null,
      isEmailVerified: true,
      role: "USER",
      plan: "FREE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const mockTokens = {
      accessToken: "verified_mock_token_" + Date.now(),
      refreshToken: "verified_mock_refresh_" + Date.now(),
      expiresIn: "1d",
    };

    return {
      success: true,
      user: mockUser,
      accessToken: mockTokens.accessToken,
      refreshToken: mockTokens.refreshToken,
      expiresIn: mockTokens.expiresIn,
      message: "Email verificado com sucesso",
      redirectTo: "/dashboard",
    };
  },

  resendVerificationEmail: async (email) => {
    console.log("🎭 MOCK API: Reenviando verificação para:", email);

    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      message: "Email de verificação reenviado",
    };
  },

  logoutUser: async () => {
    console.log("🎭 MOCK API: Logout usuário");

    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      success: true,
      message: "Logout realizado com sucesso",
    };
  },

  getCurrentUser: async () => {
    console.log("🎭 MOCK API: Obtendo usuário atual");

    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser = {
      id: "user_current",
      email: "current@test.com",
      name: "Usuário Atual",
      avatarUrl: null,
      isEmailVerified: true,
      role: "USER",
      plan: "FREE",
      lastLoginAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      user: mockUser,
      message: "Dados do usuário obtidos com sucesso",
    };
  },

  refreshToken: async (refreshToken) => {
    console.log("🎭 MOCK API: Refresh token:", refreshToken?.substring(0, 20));

    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!refreshToken) {
      throw {
        response: {
          data: {
            success: false,
            message: "Refresh token inválido",
            error: "Invalid refresh token",
          },
          status: 401,
        },
      };
    }

    return {
      success: true,
      accessToken: "refreshed_mock_token_" + Date.now(),
      expiresIn: "1d",
      message: "Token atualizado",
    };
  },

  forgotPassword: async (email) => {
    console.log("🎭 MOCK API: Esqueci senha para:", email);

    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      message: "Se o email existir, enviaremos instruções",
    };
  },

  resetPassword: async (token, newPassword) => {
    console.log(
      "🎭 MOCK API: Resetando senha com token:",
      token?.substring(0, 20),
    );

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!token || token === "invalid") {
      throw {
        response: {
          data: {
            success: false,
            message: "Token inválido ou expirado",
            error: "Invalid token",
          },
          status: 400,
        },
      };
    }

    return {
      success: true,
      message: "Senha alterada com sucesso",
      redirectTo: "/auth/login",
    };
  },

  changePassword: async (currentPassword, newPassword) => {
    console.log("🎭 MOCK API: Alterando senha");

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (currentPassword !== "123456") {
      throw {
        response: {
          data: {
            success: false,
            message: "Senha atual incorreta",
            error: "Current password incorrect",
          },
          status: 400,
        },
      };
    }

    return {
      success: true,
      message: "Senha alterada com sucesso",
    };
  },

  getSessions: async () => {
    console.log("🎭 MOCK API: Obtendo sessões");

    await new Promise((resolve) => setTimeout(resolve, 500));

    const sessions = [
      {
        id: "session_1",
        userId: "user_current",
        deviceInfo: { os: "Windows", browser: "Chrome" },
        ipAddress: "192.168.1.1",
        userAgent: "Mozilla/5.0...",
        lastActivity: new Date().toISOString(),
        expiresAt: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: "session_2",
        userId: "user_current",
        deviceInfo: { os: "Android", browser: "Chrome Mobile" },
        ipAddress: "192.168.1.100",
        userAgent: "Mozilla/5.0...",
        lastActivity: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        expiresAt: new Date(
          Date.now() + 28 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    return {
      success: true,
      sessions,
      message: "Sessões obtidas com sucesso",
    };
  },

  revokeSession: async (sessionId) => {
    console.log("🎭 MOCK API: Revogando sessão:", sessionId);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      success: true,
      message: "Sessão revogada com sucesso",
    };
  },

  revokeAllSessions: async () => {
    console.log("🎭 MOCK API: Revogando todas as sessões");

    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      success: true,
      message: "Todas as outras sessões foram revogadas",
    };
  },

  validateUser: async () => {
    console.log("🎭 MOCK API: Validando usuário");

    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockUser = {
      id: "user_valid",
      email: "valid@test.com",
      name: "Usuário Válido",
      avatarUrl: null,
      isEmailVerified: true,
      role: "USER",
      plan: "FREE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      user: mockUser,
      message: "Usuário válido",
    };
  },
};

// API Real - Conectando ao backend REAL
const realApi = {
  registerUser: async ({ email, password }) => {
    console.log("🌐 API REAL: Registrando usuário no backend:", email);

    try {
      const response = await httpClient.post("/api/v1/auth/register", {
        email,
        password,
        confirmPassword: password,
      });

      console.log("✅ API Real - Resposta do registro:", {
        success: response.data.success,
        userId: response.data.user?.id,
        requiresEmailVerification: response.data.requiresEmailVerification,
      });

      return response.data;
    } catch (error) {
      console.error("❌ API Real - Erro no registro:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      // Lançar erro com mensagem amigável
      if (error.code === "ERR_NETWORK") {
        const networkError = new Error(
          "Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://localhost:5000",
        );
        networkError.code = "ERR_NETWORK";
        throw networkError;
      }
      throw error;
    }
  },

  loginUser: async ({ email, password }) => {
    console.log("🌐 API REAL: Login usuário no backend:", email);

    try {
      const response = await httpClient.post("/api/v1/auth/login", {
        email,
        password,
      });

      console.log("✅ API Real - Login bem-sucedido:", {
        userId: response.data.user?.id,
        hasToken: !!response.data.accessToken,
      });

      return response.data;
    } catch (error) {
      console.error("❌ API Real - Erro no login:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      if (error.code === "ERR_NETWORK") {
        const networkError = new Error(
          "Não foi possível conectar ao servidor. Verifique se o backend está rodando.",
        );
        networkError.code = "ERR_NETWORK";
        throw networkError;
      }
      throw error;
    }
  },

  verifyEmail: async (token) => {
    console.log(
      "🌐 API REAL: Verificando email com token:",
      token?.substring(0, 20),
    );

    try {
      const response = await httpClient.post("/api/v1/auth/verify-email", {
        token,
      });

      console.log("✅ API Real - Email verificado com sucesso");
      return response.data;
    } catch (error) {
      console.error("❌ API Real - Erro na verificação:", error.response?.data);
      throw error;
    }
  },

  resendVerificationEmail: async (email) => {
    console.log("🌐 API REAL: Reenviando verificação para:", email);

    try {
      const response = await httpClient.post(
        "/api/v1/auth/resend-verification",
        {
          email,
        },
      );

      console.log("✅ API Real - Verificação reenviada");
      return response.data;
    } catch (error) {
      console.error("❌ API Real - Erro ao reenviar:", error.response?.data);
      throw error;
    }
  },

  logoutUser: async () => {
    console.log("🌐 API REAL: Logout usuário");

    try {
      const response = await httpClient.post("/api/v1/auth/logout");
      return response.data;
    } catch (error) {
      console.error("❌ API Real - Erro no logout:", error.response?.data);
      throw error;
    }
  },

  getCurrentUser: async () => {
    console.log("🌐 API REAL: Obtendo usuário atual");

    try {
      const response = await httpClient.get("/api/v1/auth/me");
      return response.data;
    } catch (error) {
      console.error(
        "❌ API Real - Erro ao obter usuário:",
        error.response?.data,
      );
      throw error;
    }
  },

  refreshToken: async (refreshToken) => {
    console.log("🌐 API REAL: Refresh token");

    try {
      const response = await httpClient.post("/api/v1/auth/refresh", {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      console.error("❌ API Real - Erro no refresh:", error.response?.data);
      throw error;
    }
  },

  forgotPassword: async (email) => {
    console.log("🌐 API REAL: Esqueci senha para:", email);

    try {
      const response = await httpClient.post("/api/v1/auth/forgot-password", {
        email,
      });
      return response.data;
    } catch (error) {
      console.error(
        "❌ API Real - Erro no esqueci senha:",
        error.response?.data,
      );
      throw error;
    }
  },

  resetPassword: async (token, newPassword) => {
    console.log("🌐 API REAL: Resetando senha");

    try {
      const response = await httpClient.post("/api/v1/auth/reset-password", {
        token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.error(
        "❌ API Real - Erro no reset de senha:",
        error.response?.data,
      );
      throw error;
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    console.log("🌐 API REAL: Alterando senha");

    try {
      const response = await httpClient.post("/api/v1/auth/change-password", {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.error(
        "❌ API Real - Erro na alteração de senha:",
        error.response?.data,
      );
      throw error;
    }
  },

  getSessions: async () => {
    console.log("🌐 API REAL: Obtendo sessões");

    try {
      const response = await httpClient.get("/api/v1/auth/sessions");
      return response.data;
    } catch (error) {
      console.error(
        "❌ API Real - Erro ao obter sessões:",
        error.response?.data,
      );
      throw error;
    }
  },

  revokeSession: async (sessionId) => {
    console.log("🌐 API REAL: Revogando sessão:", sessionId);

    try {
      const response = await httpClient.delete(
        `/api/v1/auth/sessions/${sessionId}`,
      );
      return response.data;
    } catch (error) {
      console.error(
        "❌ API Real - Erro ao revogar sessão:",
        error.response?.data,
      );
      throw error;
    }
  },

  revokeAllSessions: async () => {
    console.log("🌐 API REAL: Revogando todas as sessões");

    try {
      const response = await httpClient.delete("/api/v1/auth/sessions");
      return response.data;
    } catch (error) {
      console.error(
        "❌ API Real - Erro ao revogar todas sessões:",
        error.response?.data,
      );
      throw error;
    }
  },

  validateUser: async () => {
    console.log("🌐 API REAL: Validando usuário");

    try {
      const response = await httpClient.get("/api/v1/auth/validate");
      return response.data;
    } catch (error) {
      console.error("❌ API Real - Erro na validação:", error.response?.data);
      throw error;
    }
  },
};

// ✅ Exportar funções
export const registerUser = USE_MOCK
  ? mockApi.registerUser
  : realApi.registerUser;
export const loginUser = USE_MOCK ? mockApi.loginUser : realApi.loginUser;
export const verifyEmail = USE_MOCK ? mockApi.verifyEmail : realApi.verifyEmail;
export const resendVerificationEmail = USE_MOCK
  ? mockApi.resendVerificationEmail
  : realApi.resendVerificationEmail;
export const logoutUser = USE_MOCK ? mockApi.logoutUser : realApi.logoutUser;
export const getCurrentUser = USE_MOCK
  ? mockApi.getCurrentUser
  : realApi.getCurrentUser;
export const refreshToken = USE_MOCK
  ? mockApi.refreshToken
  : realApi.refreshToken;
export const forgotPassword = USE_MOCK
  ? mockApi.forgotPassword
  : realApi.forgotPassword;
export const resetPassword = USE_MOCK
  ? mockApi.resetPassword
  : realApi.resetPassword;
export const changePassword = USE_MOCK
  ? mockApi.changePassword
  : realApi.changePassword;
export const getSessions = USE_MOCK ? mockApi.getSessions : realApi.getSessions;
export const revokeSession = USE_MOCK
  ? mockApi.revokeSession
  : realApi.revokeSession;
export const revokeAllSessions = USE_MOCK
  ? mockApi.revokeAllSessions
  : realApi.revokeAllSessions;
export const validateUser = USE_MOCK
  ? mockApi.validateUser
  : realApi.validateUser;

// ✅ Exportar flag para debug
export const isUsingMock = USE_MOCK;
