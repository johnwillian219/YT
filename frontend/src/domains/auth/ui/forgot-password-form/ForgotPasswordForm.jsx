// frontend/src/domains/auth/ui/forgot-password-form/ForgotPasswordForm.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../app/bootstrap/theme-provider";
import { useI18n } from "../../../../app/bootstrap/i18n-provider";
import {
  getButtonClasses,
  getInputClasses,
  getTextColor,
  getLinkColor,
  getBorderColor,
} from "./ForgotPasswordForm.styles";

export default function ForgotPasswordForm({
  onSuccess,
  onError,
  showBackLink = true,
}) {
  const { theme } = useTheme();
  const { t } = useI18n();

  // Função auxiliar para traduções
  const translate = (key, params) => t(key, "forgot-password", params);

  // Estado do formulário
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handlers
  const handleChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const validateForm = () => {
    if (!email.trim()) {
      setEmailError("Email é obrigatório");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Email inválido");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Aqui você implementaria a lógica de recuperação de senha
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar link de recuperação");
      }

      setIsSubmitted(true);
      if (onSuccess) onSuccess(email);
    } catch (error) {
      console.error("Forgot password error:", error);
      if (onError) onError(error.message || "Erro ao enviar email");
    } finally {
      setIsLoading(false);
    }
  };

  // Se o email foi enviado com sucesso
  if (isSubmitted) {
    return (
      <div className="text-center space-y-4">
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
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
          <h3 className={`text-xl font-bold ${getTextColor(theme)}`}>
            {translate("success.title")}
          </h3>
          <p className={`mt-2 ${getTextColor(theme)}`}>
            {translate("success.message", { email })}
          </p>
        </div>

        <div className={`text-sm pt-4 border-t ${getBorderColor(theme)}`}>
          <p className={theme === "light" ? "text-gray-600" : "text-gray-400"}>
            {translate("instructions.expiration")}
            <br />
            {translate("instructions.spam")}
          </p>
        </div>

        {showBackLink && (
          <Link
            to="/auth/login"
            className={`inline-block font-medium transition ${getLinkColor(theme)}`}
          >
            {translate("back.link")}
          </Link>
        )}
      </div>
    );
  }

  // Formulário normal
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Descrição */}
      <div className="text-center">
        <p className={getTextColor(theme)}>{translate("form.description")}</p>
      </div>

      {/* Campo de Email */}
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${getTextColor(theme)}`}
        >
          {translate("form.email.label")}
        </label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={handleChange}
            className={`${getInputClasses(theme)} ${emailError ? "border-red-500" : ""}`}
            placeholder={translate("form.email.placeholder")}
            required
            disabled={isLoading}
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-500">{emailError}</p>
          )}
        </div>
      </div>

      {/* Botão de Enviar */}
      <button
        type="submit"
        className={`${getButtonClasses(theme)} w-full`}
        disabled={isLoading}
      >
        <span className="flex items-center justify-center text-lg">
          {isLoading ?
            <>
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
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
              Enviando...
            </>
          : <>
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
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {translate("form.submit")}
            </>
          }
        </span>
      </button>

      {/* Link para Voltar ao Login */}
      {showBackLink && (
        <div className={`text-center pt-4 border-t ${getBorderColor(theme)}`}>
          <p
            className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
          >
            {translate("back.text")}{" "}
            <Link
              to="/auth/login"
              className={`font-medium transition ${getLinkColor(theme)}`}
            >
              {translate("back.link")}
            </Link>
          </p>
        </div>
      )}
    </form>
  );
}
