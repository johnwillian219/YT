import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/bootstrap/auth-provider";
import { registerUser } from "../infrastructure/auth.api";

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const register = async ({ email, password }) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("🚀 useRegister: Iniciando registro...", { email });

      // Validação básica
      if (!email || !password) {
        throw new Error("Email e senha são obrigatórios");
      }

      // Chama a API
      const response = await registerUser({
        email,
        password,
        // O backend vai gerar o nome automaticamente do email
      });

      console.log("✅ useRegister: Resposta:", {
        success: response.success,
        requiresEmailVerification: response.requiresEmailVerification,
        hasToken: !!response.accessToken,
      });

      // Verificar se a API retornou sucesso
      if (!response.success) {
        throw new Error(response.message || "Erro no registro");
      }

      // ✅ FLUXO 1: Se não precisa verificar email E tem token
      if (!response.requiresEmailVerification && response.accessToken) {
        console.log("✅ Email já verificado, fazendo login automático...");

        await login({
          user: response.user,
          token: response.accessToken,
          refreshToken: response.refreshToken,
        });

        console.log("✅ Redirecionando para:/dashboard");
        navigate("/dashboard", { replace: true });

        return response;
      }

      // ✅ FLUXO 2: Precisa verificar email
      if (response.requiresEmailVerification) {
        console.log("ℹ️ Precisa verificar email, redirecionando...");

        // Salvar email no localStorage para a página de verificação
        localStorage.setItem("pending_verification_email", email);

        console.log("✅ Redirecionando para: /auth/verify-email");

        navigate("/auth/verify-email", {
          replace: true,
          state: {
            email: response.user?.email || email,
            message: response.message || "Verifique seu email para continuar",
          },
        });

        return response;
      }

      // ✅ FLUXO 3: Fallback - ir para login
      console.log("ℹ️ Registro completo, redirecionando para login");
      navigate("/auth/login", {
        replace: true,
        state: {
          message:
            response.message ||
            "Conta criada com sucesso! Faça login para continuar.",
          email: response.user?.email || email,
        },
      });

      return response;
    } catch (err) {
      console.error("❌ useRegister: Erro:", err);

      let message = "Erro ao criar conta";

      // Tratamento de erros específicos
      if (err.code === "ERR_NETWORK") {
        message =
          "Não foi possível conectar ao servidor. Verifique se o backend está rodando.";
      } else if (err.response?.status === 400) {
        if (err.response.data?.message?.includes("já")) {
          message = "Este email já está registrado";
        } else {
          message = err.response.data?.message || "Dados inválidos";
        }
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.response?.data?.error) {
        message = err.response.data.error;
      } else if (err.message) {
        message = err.message;
      }

      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}
