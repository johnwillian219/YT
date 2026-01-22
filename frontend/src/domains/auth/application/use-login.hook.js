// frontend/src/domains/auth/application/use-login.hook.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/bootstrap/auth-provider";
import { loginUser } from "../infrastructure/auth.api";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("🚀 Iniciando login...", { email: credentials.email });

      // Validar dados localmente
      if (!credentials.email || !credentials.password) {
        throw new Error("Email e senha são obrigatórios");
      }

      // Chamar API - IMPORTANTE: Use o email correto que foi registrado
      const response = await loginUser(credentials);

      console.log("✅ Resposta do login:", {
        success: response.success,
        hasToken: !!response.accessToken,
        hasUser: !!response.user,
        userEmail: response.user?.email,
      });

      // Verificar estrutura da resposta
      if (!response.success) {
        throw new Error(response.message || "Erro no login");
      }

      if (!response.accessToken || !response.user) {
        throw new Error("Resposta da API inválida: falta token ou usuário");
      }

      // Salvar tokens e atualizar estado
      await setAuth({
        user: response.user,
        token: response.accessToken,
        refreshToken: response.refreshToken,
      });

      console.log("✅ Login realizado, redirecionando...");

      // Redirecionar
      navigate("/dashboard", { replace: true });

      return response;
    } catch (err) {
      console.error("❌ Erro no login:", err);

      let errorMessage = "Erro ao fazer login. Tente novamente.";

      // Tratamento de erros específicos
      if (err.code === "ERR_NETWORK") {
        errorMessage =
          "Não foi possível conectar ao servidor. Verifique sua conexão.";
      } else if (err.response?.status === 401) {
        errorMessage = "Email ou senha incorretos";
      } else if (err.response?.status === 403) {
        errorMessage = "Email não verificado. Verifique sua caixa de entrada.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};
