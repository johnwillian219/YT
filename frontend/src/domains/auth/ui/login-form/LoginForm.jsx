// frontend/src/domains/auth/ui/login-form/LoginForm.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../app/bootstrap/theme-provider";
import { useI18n } from "../../../../app/bootstrap/i18n-provider"; // Mudar para useI18n direto
import GoogleOAuthButton from "../oauth-buttons/GoogleOAuthButton";
import { useLogin } from "../../application/use-login.hook";
import {
  getButtonClasses,
  getInputClasses,
  getCheckboxClasses,
  getTextColor,
  getForgotPasswordColor,
  getDividerClasses,
  getRegisterLinkColor, // Adicionar se necessário
} from "./LoginForm.styles";

export default function LoginForm({
  onSuccess,
  onError,
  showRegisterLink = true,
  showForgotPassword = true,
  showGoogleOAuth = true,
}) {
  const { theme } = useTheme();
  const { t } = useI18n(); // Usar useI18n diretamente

  // Hooks de negócio
  const { login, isLoading, error } = useLogin();

  // Estado do formulário
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({});

  // Função auxiliar para pegar traduções do módulo login
  const translate = (key, params) => t(key, "login", params);

  // Pegar traduções específicas
  const getTranslation = (path) => {
    // Exemplo: path = "form.email.label"
    return translate(path);
  };

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

  // Funções de validação (hardcoded por enquanto)
  const getValidationMessage = (field, type) => {
    const messages = {
      email: {
        required: "Email é obrigatório",
        invalid: "Email inválido",
      },
      password: {
        required: "Senha é obrigatória",
        minLength: "Senha deve ter no mínimo 6 caracteres",
      },
    };

    return messages[field]?.[type] || `Erro de validação: ${field}.${type}`;
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = getValidationMessage("email", "required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = getValidationMessage("email", "invalid");
    }

    if (!formData.password) {
      errors.password = getValidationMessage("password", "required");
    } else if (formData.password.length < 6) {
      errors.password = getValidationMessage("password", "minLength");
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("🔄 Enviando formulário de login...");

    try {
      await login(formData);
      console.log("✅ Login bem-sucedido via formulário");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("❌ Erro no formulário:", err);
      if (onError) onError(err);
    }
  };

  const handleGoogleLogin = () => {
    // Implementar lógica de OAuth
    window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/google`;
  };

  // Render
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Campo de Email */}
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${getTextColor(theme)}`}
        >
          {getTranslation("form.email.label")}
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${getInputClasses(theme)} ${formErrors.email ? "border-red-500" : ""}`}
            placeholder={getTranslation("form.email.placeholder")}
            required
            disabled={isLoading}
          />
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
          )}
        </div>
      </div>

      {/* Campo de Senha */}
      <div>
        <div className="flex justify-between mb-2">
          <label className={`text-sm font-medium ${getTextColor(theme)}`}>
            {getTranslation("form.password.label")}
          </label>
          {showForgotPassword && (
            <Link
              to="/auth/forgot-password"
              className={`text-sm transition ${getForgotPasswordColor(theme)}`}
            >
              {getTranslation("form.password.forgot")}
            </Link>
          )}
        </div>
        <div className="relative">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`${getInputClasses(theme)} ${formErrors.password ? "border-red-500" : ""}`}
            placeholder={getTranslation("form.password.placeholder")}
            required
            disabled={isLoading}
          />
          {formErrors.password && (
            <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
          )}
        </div>
      </div>

      {/* Checkbox Lembrar-me */}
      <div className="flex items-center">
        <input
          id="remember-me"
          name="rememberMe"
          type="checkbox"
          checked={formData.rememberMe}
          onChange={handleChange}
          className={getCheckboxClasses(theme)}
          disabled={isLoading}
        />
        <label
          htmlFor="remember-me"
          className={`ml-2 text-sm ${getTextColor(theme)}`}
        >
          {getTranslation("form.remember")}
        </label>
      </div>

      {/* Mensagem de erro global */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-500">
            {error === "Invalid credentials"
              ? "Email ou senha incorretos"
              : "Erro ao fazer login. Tente novamente."}
          </p>
        </div>
      )}

      {/* Botão de Entrar */}
      <button
        type="submit"
        className={`${getButtonClasses(theme)} w-full`}
        disabled={isLoading}
      >
        <span className="flex items-center justify-center text-lg">
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
              Entrando...
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              {getTranslation("form.submit")}
            </>
          )}
        </span>
      </button>

      {/* Divisor e OAuth */}
      {showGoogleOAuth && (
        <>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${getDividerClasses(theme).border}`}
              ></div>
            </div>
            <div className="relative flex justify-center">
              <span
                className={`px-4 text-sm ${getDividerClasses(theme).bg} ${getDividerClasses(theme).text}`}
              >
                {getTranslation("form.divider")}
              </span>
            </div>
          </div>

          <GoogleOAuthButton
            onClick={handleGoogleLogin}
            label={getTranslation("form.google")}
          />
        </>
      )}

      {/* Link para Cadastro */}
      {showRegisterLink && (
        <p
          className={`text-center text-sm mt-6 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
        >
          {getTranslation("register.text")}{" "}
          <Link
            to="/auth/register"
            className={`font-medium transition ${getRegisterLinkColor?.(theme) || "text-blue-500 hover:text-blue-600"}`}
          >
            {getTranslation("register.link")}
          </Link>
        </p>
      )}
    </form>
  );
}
