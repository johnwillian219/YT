import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { storage } from "../../shared/services/storage/localStorage.service";
import httpClient from "../../shared/services/http/http-client";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshTokenValue, setRefreshTokenValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função auxiliar para limpar estado
  const clearAuthState = useCallback(() => {
    setUser(null);
    setToken(null);
    setRefreshTokenValue(null);

    storage.remove("auth_token");
    storage.remove("auth_refresh_token");
    storage.remove("auth_user");

    // Remover token do http client
    delete httpClient.defaults.headers.common["Authorization"];
  }, []);

  // Inicializar do localStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedToken = storage.get("auth_token");
        const savedRefreshToken = storage.get("auth_refresh_token");
        const savedUser = storage.get("auth_user");

        if (savedToken) {
          setToken(savedToken);
          setRefreshTokenValue(savedRefreshToken);
          setUser(savedUser);

          // ✅ Configurar token no http client
          httpClient.defaults.headers.common["Authorization"] =
            `Bearer ${savedToken}`;
          console.log(
            "✅ Token carregado do localStorage:",
            savedToken.substring(0, 20) + "...",
          );
        }
      } catch (error) {
        console.error("Erro ao inicializar autenticação:", error);
        clearAuthState();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [clearAuthState]);

  const login = useCallback(async (authData) => {
    try {
      const {
        user: userData,
        token: newToken,
        refreshToken: newRefreshToken,
      } = authData;

      console.log("✅ Login recebido:", {
        user: userData.email,
        tokenLength: newToken.length,
      });

      setUser(userData);
      setToken(newToken);
      setRefreshTokenValue(newRefreshToken);

      // Salvar no localStorage
      storage.set("auth_token", newToken);
      if (newRefreshToken) {
        storage.set("auth_refresh_token", newRefreshToken);
      }
      storage.set("auth_user", userData);

      // ✅ Configurar token no http client
      httpClient.defaults.headers.common["Authorization"] =
        `Bearer ${newToken}`;
      console.log("✅ Token configurado no httpClient");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      // Se tiver uma API de logout no backend
      // await logoutUser();
    } catch (error) {
      console.error("Erro ao fazer logout no servidor:", error);
    } finally {
      clearAuthState();
    }
  }, [clearAuthState]);

  const updateUser = useCallback((updatedUser) => {
    setUser((prev) => ({ ...prev, ...updatedUser }));
    storage.set("auth_user", updatedUser);
  }, []);

  // Função para refresh token
  const refreshAuthToken = useCallback(async (refreshToken) => {
    try {
      const response = await httpClient.post("/api/v1/auth/refresh", {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }, []);

  // Interceptar 401 para refresh token
  useEffect(() => {
    if (!token || !refreshTokenValue) return;

    const interceptor = httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          refreshTokenValue
        ) {
          originalRequest._retry = true;

          try {
            console.log("🔄 Tentando refresh token...");
            const { accessToken } = await refreshAuthToken(refreshTokenValue);

            setToken(accessToken);
            storage.set("auth_token", accessToken);
            httpClient.defaults.headers.common["Authorization"] =
              `Bearer ${accessToken}`;

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return httpClient(originalRequest);
          } catch (refreshError) {
            console.error("Erro ao refresh token:", refreshError);
            logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      httpClient.interceptors.response.eject(interceptor);
    };
  }, [refreshTokenValue, logout, token, refreshAuthToken]);

  const isAuthenticated = !!token && !!user;

  const value = {
    user,
    token,
    refreshToken: refreshTokenValue,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
