import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../app/bootstrap/theme-provider";
import { useI18n } from "../../../../app/bootstrap/i18n-provider";
import { useRegister } from "../../application/use-register.hook";
import GoogleOAuthButton from "../oauth-buttons/GoogleOAuthButton";
import {
  getButtonClasses,
  getInputClasses,
  getCheckboxClasses,
  getTextColor,
  getLinkColor,
  getDividerClasses,
} from "./RegisterForm.styles";

export default function RegisterForm({
  onSuccess,
  onError,
  showLoginLink = true,
  showGoogleOAuth = true,
}) {
  const { theme } = useTheme();
  const { t } = useI18n();
  const {
    register,
    isLoading: registerLoading,
    error: registerError,
    clearError,
  } = useRegister();

  // Estado do formulário - REMOVIDO O CAMPO "name"
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Limpar erros quando o formulário muda
  useEffect(() => {
    if (registerError) {
      clearError();
    }
  }, [formData, registerError, clearError]);

  // Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validação de email
    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email inválido";
    }

    // Validação de senha
    if (!formData.password) {
      errors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      errors.password = "Senha deve ter no mínimo 6 caracteres";
    }

    // Validação de confirmação de senha
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirme sua senha";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem";
    }

    // Validação de termos
    if (!formData.terms) {
      errors.terms = "Você deve aceitar os termos";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("🔄 Enviando formulário de registro...");

    setIsSubmitting(true);
    try {
      // Enviar apenas email e password (sem nome)
      await register({
        email: formData.email,
        password: formData.password,
      });

      console.log("✅ Registro bem-sucedido via formulário");
      onSuccess?.();
    } catch (error) {
      console.error("❌ Erro no formulário:", error);
      // Melhorar mensagem de erro de network
      const errorMessage =
        error.message === "Network Error"
          ? "Servidor não disponível. Verifique se o backend está rodando."
          : error.message;
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = () => {
    const googleAuthUrl = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/v1/auth/google`;
    console.log("🔗 Redirecionando para Google OAuth:", googleAuthUrl);
    window.location.href = googleAuthUrl;
  };

  const isLoading = isSubmitting || registerLoading;

  // Textos (hardcoded para simplificar)
  const getText = (key) => {
    const texts = {
      // Email field
      "form.email.label": "Email",
      "form.email.placeholder": "seu@email.com",

      // Password field
      "form.password.label": "Senha",
      "form.password.placeholder": "Sua senha",

      // Confirm password field
      "form.confirmPassword.label": "Confirmar senha",
      "form.confirmPassword.placeholder": "Confirme sua senha",

      // Terms checkbox
      "form.terms.label": "Aceito os {termsLink} e {privacyLink}",
      "form.terms.terms": "Termos de Uso",
      "form.terms.privacy": "Política de Privacidade",

      // Submit button
      "form.submit": "Criar conta",

      // Divider
      "oauth.divider": "Ou",

      // Google button
      "oauth.google.register": "Cadastrar com Google",

      // Login link
      "login.text": "Já tem uma conta?",
      "login.link": "Faça login",
    };

    return texts[key] || key;
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      {/* Campo de Email */}
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${getTextColor(theme)}`}
          htmlFor="email"
        >
          {getText("form.email.label")}
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${getInputClasses(theme)} ${formErrors.email ? "border-red-500" : ""}`}
            placeholder={getText("form.email.placeholder")}
            required
            disabled={isLoading}
            autoComplete="email"
          />
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
          )}
        </div>
      </div>

      {/* Campo de Senha */}
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${getTextColor(theme)}`}
          htmlFor="password"
        >
          {getText("form.password.label")}
        </label>
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`${getInputClasses(theme)} ${formErrors.password ? "border-red-500" : ""}`}
            placeholder={getText("form.password.placeholder")}
            required
            disabled={isLoading}
            autoComplete="new-password"
          />
          {formErrors.password && (
            <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
          )}
        </div>
      </div>

      {/* Campo de Confirmar Senha */}
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${getTextColor(theme)}`}
          htmlFor="confirmPassword"
        >
          {getText("form.confirmPassword.label")}
        </label>
        <div className="relative">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`${getInputClasses(theme)} ${formErrors.confirmPassword ? "border-red-500" : ""}`}
            placeholder={getText("form.confirmPassword.placeholder")}
            required
            disabled={isLoading}
            autoComplete="new-password"
          />
          {formErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {formErrors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      {/* Checkbox Termos */}
      <div className="flex items-start">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          checked={formData.terms}
          onChange={handleChange}
          className={`mt-1 ${getCheckboxClasses(theme)}`}
          required
          disabled={isLoading}
        />
        <label
          htmlFor="terms"
          className={`ml-2 text-sm ${getTextColor(theme)} cursor-pointer`}
        >
          {getText("form.terms.label") ? (
            <>
              Aceito os{" "}
              <Link
                to="/terms"
                className={getLinkColor(theme) + " hover:underline"}
              >
                {getText("form.terms.terms")}
              </Link>{" "}
              e{" "}
              <Link
                to="/privacy"
                className={getLinkColor(theme) + " hover:underline"}
              >
                {getText("form.terms.privacy")}
              </Link>
            </>
          ) : (
            <>
              Aceito os{" "}
              <Link
                to="/terms"
                className={getLinkColor(theme) + " hover:underline"}
              >
                Termos de Uso
              </Link>{" "}
              e{" "}
              <Link
                to="/privacy"
                className={getLinkColor(theme) + " hover:underline"}
              >
                Política de Privacidade
              </Link>
            </>
          )}
        </label>
      </div>
      {formErrors.terms && (
        <p className="text-sm text-red-500">{formErrors.terms}</p>
      )}

      {/* Mensagem de erro da API */}
      {registerError && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-red-500 mr-2"
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
            <p className="text-sm text-red-500">{registerError}</p>
          </div>
        </div>
      )}

      {/* Botão de Cadastrar */}
      <button
        type="submit"
        className={`${getButtonClasses(theme)} w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]`}
        disabled={isLoading}
      >
        <span className="flex items-center justify-center text-lg font-medium">
          {isLoading ? (
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
              Criando conta...
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              {getText("form.submit")}
            </>
          )}
        </span>
      </button>

      {/* Google OAuth */}
      {showGoogleOAuth && (
        <>
          <div className={getDividerClasses(theme)}>
            <span>{getText("oauth.divider")}</span>
          </div>
          <GoogleOAuthButton
            text={getText("oauth.google.register")}
            onClick={handleGoogleRegister}
            disabled={isLoading}
          />
        </>
      )}

      {/* Link para Login */}
      {showLoginLink && (
        <p
          className={`text-center text-sm mt-6 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
        >
          {getText("login.text")}{" "}
          <Link
            to="/auth/login"
            className={`font-medium transition ${getLinkColor(theme)} hover:underline`}
          >
            {getText("login.link")}
          </Link>
        </p>
      )}
    </form>
  );
}
