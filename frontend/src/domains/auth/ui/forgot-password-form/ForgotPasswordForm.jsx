// frontend/src/domains/auth/ui/forgot-password-form/ForgotPasswordForm.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../app/bootstrap/theme-provider";
import { useI18n } from "../../../../app/bootstrap/i18n-provider";
import { Mail, KeyRound, ArrowLeft, CheckCircle, Send } from "lucide-react";
import {
  getInputClasses,
  getButtonClasses,
  getTextColor,
  getForgotPasswordColor,
  getDividerClasses,
} from "./ForgotPasswordForm.styles";

export default function ForgotPasswordForm({
  onSuccess,
  onError,
  showBackLink = true,
}) {
  const { theme } = useTheme();
  const { t } = useI18n();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");

  const translate = (key) => t(key, "forgot-password");

  // Funções de validação usando traduções
  const getValidationMessage = (field, type) => {
    const errorFromJson = translate(`form.${field}.errors.${type}`);

    if (errorFromJson && !errorFromJson.startsWith("form.")) {
      return errorFromJson;
    }

    const fallbackMessages = {
      email: {
        required: "Email é obrigatório",
        invalid: "Email inválido",
      },
    };

    return fallbackMessages[field]?.[type] || translate("errors.generic");
  };

  // Função para obter mensagem de erro da API
  const getApiErrorMessage = (error) => {
    if (error.includes("not found") || error.includes("email")) {
      return translate("errors.email_not_found");
    } else if (error.includes("network") || error === "Network Error") {
      return translate("errors.network");
    } else {
      return translate("errors.generic");
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
    if (apiError) setApiError("");
  };

  const validateForm = () => {
    if (!email.trim()) {
      setEmailError(getValidationMessage("email", "required"));
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(getValidationMessage("email", "invalid"));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      // Simulação de API call - substituir com sua implementação real
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simula delay

      // Para demo, vamos sempre ter sucesso
      // Em produção, implemente a chamada real à API:
      // const response = await fetch("/api/auth/forgot-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      // if (!response.ok) throw new Error("Erro ao enviar email");

      setIsSubmitted(true);
      onSuccess?.(email);

      // Log para desenvolvimento
      console.log(`📧 Email de recuperação enviado para: ${email}`);
    } catch (error) {
      console.error("Forgot password error:", error);
      const errorMsg = getApiErrorMessage(error.message);
      setApiError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Tela de sucesso
  if (isSubmitted) {
    return (
      <div className="space-y-4">
        {/* Ícone de sucesso */}
        <div className="text-center">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              theme === "cyberpunk"
                ? "bg-cyan-900/20"
                : theme === "dark"
                  ? "bg-purple-900/20"
                  : "bg-blue-100"
            }`}
          >
            <CheckCircle
              className={`w-8 h-8 ${
                theme === "cyberpunk"
                  ? "text-cyan-400"
                  : theme === "dark"
                    ? "text-purple-400"
                    : "text-blue-600"
              }`}
            />
          </div>

          <h3 className={`text-xl font-bold ${getTextColor(theme)} mb-2`}>
            {translate("success.title")}
          </h3>

          <p className={`text-sm ${getTextColor(theme)} mb-4 opacity-90`}>
            {translate("success.message").replace("{email}", email)}
          </p>
        </div>

        {/* Instruções */}
        <div
          className={`p-4 rounded-lg ${
            theme === "cyberpunk"
              ? "bg-gray-800/30 border border-gray-700/50"
              : theme === "dark"
                ? "bg-gray-800/30 border border-gray-700/50"
                : "bg-gray-50 border border-gray-200"
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-start">
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                  theme === "light" ? "bg-blue-100" : "bg-blue-900/20"
                }`}
              >
                <svg
                  className="w-3 h-3 text-blue-500"
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
              </div>
              <span className={`text-xs ${getTextColor(theme)} opacity-90`}>
                {translate("success.instructions.check_inbox")}
              </span>
            </div>

            <div className="flex items-start">
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                  theme === "light" ? "bg-yellow-100" : "bg-yellow-900/20"
                }`}
              >
                <svg
                  className="w-3 h-3 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <span className={`text-xs ${getTextColor(theme)} opacity-90`}>
                {translate("success.instructions.check_spam")}
              </span>
            </div>

            <div className="flex items-start">
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                  theme === "light" ? "bg-purple-100" : "bg-purple-900/20"
                }`}
              >
                <svg
                  className="w-3 h-3 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className={`text-xs ${getTextColor(theme)} opacity-90`}>
                {translate("success.instructions.expiration")}
              </span>
            </div>
          </div>
        </div>

        {/* Botão para voltar ao login */}
        {showBackLink && (
          <div className="pt-2">
            <Link
              to="/auth/login"
              className={`group flex items-center justify-center ${getForgotPasswordColor(theme)} transition-colors hover:underline text-sm font-medium`}
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              {translate("back.link")}
            </Link>
          </div>
        )}
      </div>
    );
  }

  // Formulário de recuperação
  return (
    <div className="space-y-4">
      {/* Descrição e ícone */}
      <div className="text-center">
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 ${
            theme === "cyberpunk"
              ? "bg-cyan-900/20"
              : theme === "dark"
                ? "bg-purple-900/20"
                : "bg-blue-100"
          }`}
        >
          <KeyRound
            className={`w-7 h-7 ${
              theme === "cyberpunk"
                ? "text-cyan-400"
                : theme === "dark"
                  ? "text-purple-400"
                  : "text-blue-600"
            }`}
          />
        </div>
        <p className={`text-sm ${getTextColor(theme)} opacity-90 mb-6`}>
          {translate("form.description")}
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {/* Campo de Email */}
        <div className="space-y-2">
          <label
            className={`block text-sm font-medium ${getTextColor(theme)}`}
            htmlFor="email"
          >
            {translate("form.email.label")}
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Mail
                className={`w-5 h-5 ${
                  theme === "light" ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleChange}
              className={`${getInputClasses(theme)} ${emailError ? "border-red-500 focus:border-red-500" : ""} pl-10 py-3 text-sm`}
              placeholder={translate("form.email.placeholder")}
              required
              disabled={isLoading}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "email-error" : undefined}
            />
          </div>
          {emailError && (
            <p id="email-error" className="text-xs text-red-500 mt-1">
              {emailError}
            </p>
          )}
        </div>

        {/* Mensagem de erro da API */}
        {apiError && (
          <div
            className={`p-3 rounded-lg ${
              theme === "cyberpunk"
                ? "bg-red-900/20 border border-red-700/50"
                : theme === "dark"
                  ? "bg-red-900/20 border border-red-700/50"
                  : "bg-red-50 border border-red-200"
            }`}
          >
            <p className="text-xs text-red-500 flex items-center">
              <svg
                className="w-4 h-4 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              {apiError}
            </p>
          </div>
        )}

        {/* Botão de Enviar */}
        <button
          type="submit"
          className={`${getButtonClasses(theme)} group w-full py-3 px-4 font-semibold rounded-lg transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={isLoading || !email.trim()}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 mr-2"
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
              {translate("form.submit_loading")}
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
              {translate("form.submit")}
            </>
          )}
        </button>
      </form>

      {/* Link para Voltar ao Login */}
      {showBackLink && (
        <div
          className={`text-center pt-4 border-t ${getDividerClasses(theme).border}`}
        >
          <p className={`text-xs ${getTextColor(theme)}`}>
            {translate("back.text")}{" "}
            <Link
              to="/auth/login"
              className={`font-medium ${getForgotPasswordColor(theme)} transition-colors hover:underline`}
            >
              {translate("back.link")}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
