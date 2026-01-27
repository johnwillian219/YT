// frontend/src/domains/auth/ui/login-form/LoginForm.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../app/bootstrap/theme-provider";
import { useI18n } from "../../../../app/bootstrap/i18n-provider";
import { useLogin } from "../../application/use-login.hook";
import { Mail, Lock, Eye, EyeOff, Check } from "lucide-react";
import {
  getInputClasses,
  getButtonClasses,
  getTextColor,
  getForgotPasswordColor,
  getDividerClasses,
  getGoogleButtonClasses,
} from "./LoginForm.styles";

export default function LoginForm({
  onSuccess,
  onError,
  showRegisterLink = true,
  showForgotPassword = true,
  showProviders = true,
}) {
  const { theme } = useTheme();
  const { t } = useI18n();
  const { login, isLoading, error } = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const translate = (key) => t(key, "login");

  // Funções de validação usando traduções
  const getValidationMessage = (field, type) => {
    const errorFromJson = translate(`form.${field}.errors.${type}`);

    if (errorFromJson && !errorFromJson.startsWith("form.")) {
      return errorFromJson;
    }

    // Fallback nunca deve acontecer se o JSON estiver completo
    const fallbackMessages = {
      email: {
        required: "Email é obrigatório",
        invalid: "Email inválido",
      },
      password: {
        required: "Senha é obrigatória",
        minLength: "Senha deve ter no mínimo 6 caracteres",
      },
    };

    return fallbackMessages[field]?.[type] || translate("errors.generic");
  };

  // Função para obter mensagem de erro da API
  const getApiErrorMessage = (error) => {
    if (error === "Invalid credentials" || error === "invalid_credentials") {
      return translate("errors.invalid_credentials");
    } else if (error === "Network Error" || error.includes("network")) {
      return translate("errors.network");
    } else {
      return translate("errors.generic");
    }
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
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
    window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/google`;
  };

  // Apenas Google OAuth provider
  const authProviders = [
    {
      id: "google",
      name: translate("form.providers.google"),
      onClick: handleGoogleLogin,
    },
  ];

  return (
    <div className="space-y-3">
      {/* Provedores OAuth com ícones */}
      {showProviders && (
        <div className="space-y-3">
          {authProviders.map((provider) => (
            <button
              key={provider.id}
              type="button"
              className={`${getGoogleButtonClasses(theme)} hover:shadow-sm active:scale-[0.98]`}
              onClick={provider.onClick}
              disabled={isLoading}
            >
              <svg
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
                aria-label="Google"
              >
                <path
                  fill="#4285F4"
                  d="M21.6 12.227c0-.818-.073-1.604-.209-2.364H12v4.482h5.438a4.64 4.64 0 01-2.013 3.045v2.522h3.25c1.902-1.753 2.995-4.337 2.995-7.685z"
                />
                <path
                  fill="#34A853"
                  d="M12 22c2.43 0 4.468-.805 5.957-2.188l-3.25-2.522c-.902.605-2.057.963-3.307.963-2.544 0-4.7-1.719-5.47-4.032H2.57v2.531A9.997 9.997 0 0012 22z"
                />
                <path
                  fill="#FBBC05"
                  d="M6.53 14.221a5.996 5.996 0 010-3.842V7.848H2.57a9.997 9.997 0 000 8.304l3.96-1.931z"
                />
                <path
                  fill="#EA4335"
                  d="M12 6.958c1.324 0 2.51.456 3.444 1.352l2.583-2.583C16.468 4.805 14.43 4 12 4A9.997 9.997 0 002.57 7.848l3.96 3.331C7.3 8.677 9.456 6.958 12 6.958z"
                />
              </svg>
              <span className="font-medium">{provider.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Divisor */}
      {showProviders && (
        <div className="flex items-center my-6">
          <div
            className={`flex-grow border-t ${getDividerClasses(theme).border}`}
          ></div>
          <span
            className={`mx-3 text-xs font-medium uppercase tracking-wider ${getTextColor(theme)}`}
          >
            {translate("form.divider")}
          </span>
          <div
            className={`flex-grow border-t ${getDividerClasses(theme).border}`}
          ></div>
        </div>
      )}

      {/* Formulário de Email */}
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {/* Campo de Email */}
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${getTextColor(theme)}`}
            htmlFor="email"
          >
            {translate("form.email.label")}
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Mail
                className={`w-5 h-5 ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}
              />
            </div>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${getInputClasses(theme)} ${formErrors.email ? "border-red-500" : ""} pl-10`}
              placeholder={translate("form.email.placeholder")}
              required
              disabled={isLoading}
              aria-invalid={!!formErrors.email}
              aria-describedby={formErrors.email ? "email-error" : undefined}
            />
            {formErrors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-500">
                {formErrors.email}
              </p>
            )}
          </div>
        </div>

        {/* Campo de Senha */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              className={`text-sm font-medium ${getTextColor(theme)}`}
              htmlFor="password"
            >
              {translate("form.password.label")}
            </label>
            {showForgotPassword && (
              <Link
                to="/auth/forgot-password"
                className={`text-xs ${getForgotPasswordColor(theme)} transition-colors hover:underline`}
              >
                {translate("form.password.forgot")}
              </Link>
            )}
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Lock
                className={`w-5 h-5 ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}
              />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`${getInputClasses(theme)} ${formErrors.password ? "border-red-500" : ""} pl-10 pr-10`}
              placeholder={translate("form.password.placeholder")}
              required
              disabled={isLoading}
              aria-invalid={!!formErrors.password}
              aria-describedby={
                formErrors.password ? "password-error" : undefined
              }
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <EyeOff
                  className={`w-5 h-5 ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}
                />
              ) : (
                <Eye
                  className={`w-5 h-5 ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}
                />
              )}
            </button>
            {formErrors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-500">
                {formErrors.password}
              </p>
            )}
          </div>
        </div>

        {/* Checkbox Lembrar-me */}
        <div className="flex items-center">
          <button
            type="button"
            role="checkbox"
            aria-checked={formData.rememberMe}
            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
              formData.rememberMe
                ? theme === "light"
                  ? "bg-blue-600 border-blue-600"
                  : "bg-blue-500 border-blue-500"
                : theme === "light"
                  ? "border-gray-300"
                  : "border-gray-600"
            }`}
            onClick={() =>
              setFormData((prev) => ({ ...prev, rememberMe: !prev.rememberMe }))
            }
            disabled={isLoading}
          >
            {formData.rememberMe && <Check className="w-3 h-3 text-white" />}
          </button>
          <label
            htmlFor="remember-me"
            className={`ml-2 text-sm ${getTextColor(theme)} cursor-pointer select-none`}
            onClick={() =>
              setFormData((prev) => ({ ...prev, rememberMe: !prev.rememberMe }))
            }
          >
            {translate("form.remember")}
          </label>
        </div>

        {/* Mensagem de erro global */}
        {error && (
          <div
            className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
            role="alert"
          >
            <p className="text-sm text-red-500 flex items-center">
              <svg
                className="w-4 h-4 mr-2"
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
              {getApiErrorMessage(error)}
            </p>
          </div>
        )}

        {/* Botão de Entrar */}
        <button
          type="submit"
          className={`${getButtonClasses(theme)} w-full py-3 px-4 font-semibold rounded-lg transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={isLoading}
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
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              {translate("form.submit")}
            </>
          )}
        </button>
      </form>

      {/* Link para Cadastro */}
      {showRegisterLink && (
        <div
          className={`text-center pt-4 border-t ${getDividerClasses(theme).border}`}
        >
          <p className={`text-sm ${getTextColor(theme)}`}>
            {translate("register.text")}{" "}
            <Link
              to="/auth/register"
              className={`font-medium ${getForgotPasswordColor(theme)} transition-colors hover:underline`}
            >
              {translate("register.link")}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
