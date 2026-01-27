import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../../app/bootstrap/theme-provider";
import { useI18n } from "../../../../app/bootstrap/i18n-provider";
import {
  resendVerificationEmail,
  verifyEmail,
} from "../../infrastructure/auth.api";
import { useAuth } from "../../../../app/bootstrap/auth-provider";
import {
  getInputClasses,
  getButtonClasses,
  getTextColor,
  getDividerClasses,
  getSuccessButtonClasses,
  getSecondaryButtonClasses,
} from "./VerifyEmailForm.styles";

export default function VerifyEmailForm({
  initialEmail = "",
  initialToken = "",
  onVerificationSuccess,
  onVerificationError,
  onResendSuccess,
  onResendError,
  showLoginLink = true,
  showRegisterLink = true,
}) {
  const { theme } = useTheme();
  const { t } = useI18n();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: initialEmail,
    token: initialToken,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showManualToken, setShowManualToken] = useState(false);

  const translate = (key) => t(key, "verify-email");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      email: initialEmail,
      token: initialToken,
    }));

    // Se tiver token inicial, verificar automaticamente
    if (initialToken) {
      setTimeout(() => {
        handleVerifyWithToken(initialToken);
      }, 1000);
    }
  }, [initialEmail, initialToken]);

  const getApiErrorMessage = (error) => {
    if (
      error === "Invalid token" ||
      error.includes("token") ||
      error.includes("expired")
    ) {
      return translate("errors.invalid_token");
    } else if (error === "Network Error" || error.includes("network")) {
      return translate("errors.network");
    } else if (error.includes("email") || error.includes("not found")) {
      return translate("errors.email_not_found");
    } else {
      return translate("errors.generic");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = translate("form.email.errors.required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = translate("form.email.errors.invalid");
    }

    if (showManualToken && !formData.token.trim()) {
      errors.token = translate("form.token.errors.required");
    }

    return errors;
  };

  const handleVerifyWithToken = async (tokenToVerify = formData.token) => {
    if (!tokenToVerify) {
      setError(translate("form.token.errors.required"));
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log("🔄 Verificando email com token...");
      const response = await verifyEmail(tokenToVerify);

      console.log("✅ Email verificado:", response);

      if (response.accessToken && response.user) {
        setIsVerified(true);
        setMessage(translate("success.message"));

        // Limpar token da URL
        if (initialToken) {
          window.history.replaceState({}, document.title, "/auth/verify-email");
        }

        onVerificationSuccess?.(response);
      }
    } catch (err) {
      console.error("❌ Erro na verificação:", err);
      const errorMsg = getApiErrorMessage(
        err.response?.data?.message || err.message,
      );
      setError(errorMsg);
      onVerificationError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!formData.email.trim()) {
      setError(translate("form.email.errors.required"));
      return;
    }

    setIsResending(true);
    setError("");

    try {
      console.log("🔄 Reenviando email para:", formData.email);
      const response = await resendVerificationEmail(formData.email);

      const successMsg = response.message || translate("resend.success");
      setMessage(successMsg);

      // Salvar email no localStorage para persistência
      localStorage.setItem("pending_verification_email", formData.email);

      // Em desenvolvimento, mostrar token mock
      if (response.debugToken) {
        console.log("🔑 Token de desenvolvimento:", response.debugToken);
        setMessage(
          (prev) =>
            `${prev} (${translate("dev_token")}: ${response.debugToken})`,
        );
      }

      onResendSuccess?.(response);
    } catch (err) {
      console.error("❌ Erro ao reenviar:", err);
      const errorMsg = getApiErrorMessage(
        err.response?.data?.message || err.message,
      );
      setError(errorMsg);
      onResendError?.(err);
    } finally {
      setIsResending(false);
    }
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  const handleGoToLogin = () => {
    navigate("/auth/login");
  };

  const handleGoToRegister = () => {
    navigate("/auth/register");
  };

  // Estado: Email verificado com sucesso
  if (isVerified) {
    return (
      <div className="space-y-6">
        {/* Ícone de sucesso */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-green-600 dark:text-green-400"
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

          <h3 className={`text-xl font-semibold ${getTextColor(theme)}`}>
            {translate("success.title")}
          </h3>
          <p className={`mt-2 ${getTextColor(theme)} opacity-80 text-sm`}>
            {message || translate("success.message")}
          </p>
        </div>

        {/* Botão para Dashboard */}
        <button
          onClick={handleGoToDashboard}
          className={`${getSuccessButtonClasses(theme)} w-full py-3 px-4 font-semibold rounded-lg transition-all active:scale-[0.98]`}
        >
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          {translate("success.go_to_dashboard")}
        </button>

        {/* Link para Login */}
        {showLoginLink && (
          <div
            className={`text-center pt-4 border-t ${getDividerClasses(theme).border}`}
          >
            <p className={`text-xs ${getTextColor(theme)} opacity-80`}>
              {translate("login.text")}{" "}
              <button
                onClick={handleGoToLogin}
                className="font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors hover:underline"
              >
                {translate("login.link")}
              </button>
            </p>
          </div>
        )}
      </div>
    );
  }

  // Estado: Aguardando verificação
  return (
    <div className="space-y-6">
      {/* Email atual */}
      {formData.email && (
        <div
          className={`bg-gray-50 dark:bg-gray-800/30 rounded-lg p-4 ${getTextColor(theme)}`}
        >
          <p className="text-xs opacity-70">
            {translate("form.email.sent_to")}
          </p>
          <p className="font-medium mt-1">{formData.email}</p>
        </div>
      )}

      {/* Mensagens e erros */}
      {message && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-700 dark:text-blue-300">{message}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0"
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

      {/* Formulário para email */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label
            className={`block text-xs font-medium ${getTextColor(theme)}`}
            htmlFor="email"
          >
            {translate("form.email.label")}
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${getInputClasses(theme)} w-full px-4 py-3 text-sm`}
            placeholder={translate("form.email.placeholder")}
            disabled={isLoading || isResending}
            autoComplete="email"
          />
        </div>

        {/* Toggle para token manual */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowManualToken(!showManualToken)}
            className={`text-xs ${getTextColor(theme)} opacity-70 hover:opacity-100 transition-opacity`}
          >
            {showManualToken
              ? translate("form.token.hide")
              : translate("form.token.show")}
          </button>
        </div>

        {/* Campo para token manual */}
        {showManualToken && (
          <div className="space-y-2">
            <label
              className={`block text-xs font-medium ${getTextColor(theme)}`}
              htmlFor="token"
            >
              {translate("form.token.label")}
            </label>
            <input
              id="token"
              type="text"
              name="token"
              value={formData.token}
              onChange={handleChange}
              className={`${getInputClasses(theme)} w-full px-4 py-3 text-sm`}
              placeholder={translate("form.token.placeholder")}
              disabled={isLoading || isResending}
            />
            <p className={`text-xs ${getTextColor(theme)} opacity-60`}>
              {translate("form.token.help")}
            </p>
          </div>
        )}
      </div>

      {/* Botões de ação */}
      <div className="space-y-3">
        {/* Botão de reenviar email */}
        <button
          onClick={handleResendEmail}
          disabled={isResending || isLoading || !formData.email}
          className={`${getButtonClasses(theme)} w-full py-3 px-4 font-semibold rounded-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
        >
          {isResending ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {translate("form.resend.loading")}
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
              {translate("form.resend.submit")}
            </>
          )}
        </button>

        {/* Botão de verificar com token */}
        {showManualToken && formData.token && (
          <button
            onClick={() => handleVerifyWithToken()}
            disabled={isLoading || isResending || !formData.token}
            className={`${getSecondaryButtonClasses(theme)} w-full py-3 px-4 font-semibold rounded-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {translate("form.verify.loading")}
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {translate("form.verify.submit")}
              </>
            )}
          </button>
        )}

        {/* Botões secundários */}
        <div className="grid grid-cols-2 gap-3">
          {showLoginLink && (
            <button
              onClick={handleGoToLogin}
              disabled={isLoading || isResending}
              className="py-3 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {translate("buttons.login")}
            </button>
          )}

          {showRegisterLink && (
            <button
              onClick={handleGoToRegister}
              disabled={isLoading || isResending}
              className="py-3 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {translate("buttons.register")}
            </button>
          )}
        </div>
      </div>

      {/* Dicas úteis */}
      <div className={`pt-4 border-t ${getDividerClasses(theme).border}`}>
        <h4 className={`text-xs font-medium ${getTextColor(theme)} mb-2`}>
          {translate("tips.title")}
        </h4>
        <ul className={`text-xs ${getTextColor(theme)} opacity-70 space-y-1`}>
          <li className="flex items-start">
            <svg
              className="w-3 h-3 mt-0.5 mr-2 flex-shrink-0"
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
            {translate("tips.spam")}
          </li>
          <li className="flex items-start">
            <svg
              className="w-3 h-3 mt-0.5 mr-2 flex-shrink-0"
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
            {translate("tips.correct_email")}
          </li>
          <li className="flex items-start">
            <svg
              className="w-3 h-3 mt-0.5 mr-2 flex-shrink-0"
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
            {translate("tips.wait")}
          </li>
        </ul>
      </div>
    </div>
  );
}
