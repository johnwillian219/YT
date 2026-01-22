import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useTheme } from "../../../app/bootstrap/theme-provider";
import { useAuth } from "../../../app/bootstrap/auth-provider";
import {
  resendVerificationEmail,
  verifyEmail,
} from "../infrastructure/auth.api";
import LoadingSpinner from "../../../shared/ui/feedback/LoadingSpinner";

export default function VerifyEmailPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    // Verificar se tem token na URL (vindo do email)
    const params = new URLSearchParams(location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      console.log("🔑 Token encontrado na URL, verificando...");
      setToken(urlToken);
      handleVerifyEmail(urlToken);
      return;
    }

    // Pegar email do state ou localStorage
    const stateEmail = location.state?.email;
    const storedEmail = localStorage.getItem("pending_verification_email");

    if (stateEmail) {
      setEmail(stateEmail);
      setMessage(
        location.state?.message || "Verifique seu email para continuar",
      );
    } else if (storedEmail) {
      setEmail(storedEmail);
      setMessage("Verifique seu email para ativar sua conta");
    } else {
      // Se não tem email, redirecionar para registro
      navigate("/auth/register", { replace: true });
    }
  }, [location, navigate]);

  const handleVerifyEmail = async (verifyToken) => {
    setIsLoading(true);
    setError("");

    try {
      console.log("🔄 Verificando email com token...");
      const response = await verifyEmail(verifyToken);

      console.log("✅ Email verificado:", response);

      if (response.accessToken && response.user) {
        // Fazer login automático
        await login({
          user: response.user,
          token: response.accessToken,
          refreshToken: response.refreshToken,
        });

        // Limpar email pendente
        localStorage.removeItem("pending_verification_email");

        // Redirecionar
        navigate(response.redirectTo || "/dashboard", {
          replace: true,
          state: { message: "Email verificado com sucesso!" },
        });
      }
    } catch (err) {
      console.error("❌ Erro na verificação:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Erro ao verificar email. O token pode ter expirado.",
      );

      // Se o token veio da URL e deu erro, limpar da URL
      if (token) {
        window.history.replaceState({}, document.title, "/auth/verify-email");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!email) {
      setError("Email não encontrado");
      return;
    }

    setIsResending(true);
    setError("");

    try {
      console.log("🔄 Reenviando email para:", email);
      const response = await resendVerificationEmail(email);

      setMessage(response.message || "Email reenviado com sucesso!");

      // Em desenvolvimento, mostrar token mock
      if (response.debugToken) {
        console.log("🔑 Token de desenvolvimento:", response.debugToken);
        setMessage((prev) => `${prev} (Token dev: ${response.debugToken})`);
      }
    } catch (err) {
      console.error("❌ Erro ao reenviar:", err);
      setError(
        err.response?.data?.message || err.message || "Erro ao reenviar email",
      );
    } finally {
      setIsResending(false);
    }
  };

  const handleGoToLogin = () => {
    // Limpar email pendente
    localStorage.removeItem("pending_verification_email");

    navigate("/auth/login", {
      state: {
        email,
        message: "Faça login para continuar",
      },
    });
  };

  const handleUseAnotherEmail = () => {
    // Limpar email pendente
    localStorage.removeItem("pending_verification_email");

    navigate("/auth/register", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Verifique seu email
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {message || "Um passo final para ativar sua conta"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {isLoading ? (
            <div className="text-center py-12">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Verificando seu email...
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <svg
                    className="h-10 w-10 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                  Confira sua caixa de entrada
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Enviamos um link de verificação para
                </p>
                <p className="mt-1 font-medium text-gray-900 dark:text-white">
                  {email}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex">
                    <svg
                      className="h-5 w-5 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="ml-3 text-sm text-red-700 dark:text-red-300">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
                >
                  {isResending ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Reenviando...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Reenviar email de verificação
                    </>
                  )}
                </button>

                <div className="flex space-x-3">
                  <button
                    onClick={handleGoToLogin}
                    className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Já verifiquei
                  </button>

                  <button
                    onClick={handleUseAnotherEmail}
                    className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Usar outro email
                  </button>
                </div>
              </div>

              {/* Dicas */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Não recebeu o email?
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li className="flex items-start">
                    <svg
                      className="h-4 w-4 text-gray-400 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Verifique sua pasta de spam ou lixo eletrônico
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-4 w-4 text-gray-400 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Certifique-se de que digitou o email corretamente
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-4 w-4 text-gray-400 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Aguarde alguns minutos e tente reenviar
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Precisa de ajuda?{" "}
            <Link
              to="/contact"
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
            >
              Entre em contato
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
