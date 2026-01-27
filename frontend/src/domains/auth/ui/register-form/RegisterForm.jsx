// frontend/src/domains/auth/ui/register-form/RegisterForm.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../app/bootstrap/theme-provider";
import { useI18n } from "../../../../app/bootstrap/i18n-provider";
import { useRegister } from "../../application/use-register.hook";
import { Mail, Lock, Eye, EyeOff, Check, Shield } from "lucide-react";
import {
  getInputClasses,
  getButtonClasses,
  getTextColor,
  getForgotPasswordColor,
  getDividerClasses,
  getGoogleButtonClasses,
} from "./RegisterForm.styles";

export default function RegisterForm({
  onSuccess,
  onError,
  showLoginLink = true,
  showGoogleOAuth = true,
}) {
  const { theme } = useTheme();
  const { t } = useI18n();
  const { register, isLoading, error: apiError, clearError } = useRegister();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const translate = (key) => t(key, "register");

  // Funções de validação usando traduções
  const getValidationMessage = (field, type) => {
    const errorFromJson = translate(`form.${field}.errors.${type}`);

    if (errorFromJson && !errorFromJson.startsWith("form.")) {
      return errorFromJson;
    }

    // Fallback
    const fallbackMessages = {
      email: {
        required: "Email é obrigatório",
        invalid: "Email inválido",
      },
      password: {
        required: "Senha é obrigatória",
        minLength: "Senha deve ter no mínimo 6 caracteres",
      },
      confirmPassword: {
        required: "Confirme sua senha",
        mismatch: "As senhas não coincidem",
      },
      terms: {
        required: "Você deve aceitar os termos",
      },
    };

    return fallbackMessages[field]?.[type] || translate("errors.generic");
  };

  // Função para obter mensagem de erro da API
  const getApiErrorMessage = (error) => {
    if (error === "Email already exists" || error.includes("email")) {
      return translate("errors.email_exists");
    } else if (error === "Network Error" || error.includes("network")) {
      return translate("errors.network");
    } else if (error.includes("password") || error.includes("weak")) {
      return translate("errors.weak_password");
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

    if (!formData.confirmPassword) {
      errors.confirmPassword = getValidationMessage(
        "confirmPassword",
        "required",
      );
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = getValidationMessage(
        "confirmPassword",
        "mismatch",
      );
    }

    if (!formData.terms) {
      errors.terms = getValidationMessage("terms", "required");
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

    if (apiError) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("🔄 Enviando formulário de registro...");

    try {
      await register({
        email: formData.email,
        password: formData.password,
      });

      console.log("✅ Registro bem-sucedido via formulário");
      onSuccess?.();
    } catch (error) {
      console.error("❌ Erro no registro:", error);
      onError?.(error);
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/google`;
  };

  const authProviders = [
    {
      id: "google",
      name: translate("form.providers.google"),
      onClick: handleGoogleRegister,
    },
  ];

  return (
    <div className="space-y-3">
      {/* Provedores OAuth */}
      {showGoogleOAuth && (
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
      {showGoogleOAuth && (
        <div className="flex items-center my-3">
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

      {/* Formulário de Registro */}
      <form className="space-y-3" onSubmit={handleSubmit} noValidate>
        {/* Campo de Email */}
        <div className="space-y-1">
          <label
            className={`block text-xs font-medium ${getTextColor(theme)}`}
            htmlFor="email"
          >
            {translate("form.email.label")}
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Mail
                className={`w-4 h-4 ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}
              />
            </div>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${getInputClasses(theme)} ${formErrors.email ? "border-red-500" : ""} pl-9 py-2 text-sm`}
              placeholder={translate("form.email.placeholder")}
              required
              disabled={isLoading}
              autoComplete="email"
              aria-invalid={!!formErrors.email}
              aria-describedby={formErrors.email ? "email-error" : undefined}
            />
            {formErrors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-500">
                {formErrors.email}
              </p>
            )}
          </div>
        </div>

        {/* Campos de Senha lado a lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Senha */}
          <div className="space-y-1">
            <label
              className={`block text-xs font-medium ${getTextColor(theme)}`}
              htmlFor="password"
            >
              {translate("form.password.label")}
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Lock
                  className={`w-4 h-4 ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}
                />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`${getInputClasses(theme)} ${formErrors.password ? "border-red-500" : ""} pl-9 pr-8 py-2 text-sm`}
                placeholder={translate("form.password.placeholder")}
                required
                disabled={isLoading}
                autoComplete="new-password"
                aria-invalid={!!formErrors.password}
                aria-describedby={
                  formErrors.password ? "password-error" : undefined
                }
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeOff
                    className={`w-4 h-4 ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}
                  />
                ) : (
                  <Eye
                    className={`w-4 h-4 ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}
                  />
                )}
              </button>
            </div>
            {formErrors.password && (
              <p id="password-error" className="mt-1 text-xs text-red-500">
                {formErrors.password}
              </p>
            )}
          </div>

          {/* Confirmar Senha */}
          <div className="space-y-1">
            <label
              className={`block text-xs font-medium ${getTextColor(theme)}`}
              htmlFor="confirmPassword"
            >
              {translate("form.confirmPassword.label")}
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Shield
                  className={`w-4 h-4 ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}
                />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`${getInputClasses(theme)} ${formErrors.confirmPassword ? "border-red-500" : ""} pl-9 pr-8 py-2 text-sm`}
                placeholder={translate("form.confirmPassword.placeholder")}
                required
                disabled={isLoading}
                autoComplete="new-password"
                aria-invalid={!!formErrors.confirmPassword}
                aria-describedby={
                  formErrors.confirmPassword
                    ? "confirmPassword-error"
                    : undefined
                }
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                aria-label={
                  showConfirmPassword ? "Ocultar senha" : "Mostrar senha"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff
                    className={`w-4 h-4 ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}
                  />
                ) : (
                  <Eye
                    className={`w-4 h-4 ${theme === "light" ? "text-gray-400" : "text-gray-500"}`}
                  />
                )}
              </button>
            </div>
            {formErrors.confirmPassword && (
              <p
                id="confirmPassword-error"
                className="mt-1 text-xs text-red-500"
              >
                {formErrors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        {/* Checkbox Termos - usando TODAS as strings do JSON */}
        <div className="flex items-start space-x-2 pt-1">
          <button
            type="button"
            role="checkbox"
            aria-checked={formData.terms}
            className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${
              formData.terms
                ? theme === "light"
                  ? "bg-blue-600 border-blue-600"
                  : "bg-blue-500 border-blue-500"
                : theme === "light"
                  ? "border-gray-300"
                  : "border-gray-600"
            }`}
            onClick={() =>
              setFormData((prev) => ({ ...prev, terms: !prev.terms }))
            }
            disabled={isLoading}
          >
            {formData.terms && <Check className="w-2.5 h-2.5 text-white" />}
          </button>
          <label
            htmlFor="terms"
            className={`text-xs ${getTextColor(theme)} cursor-pointer select-none leading-tight`}
            onClick={() =>
              setFormData((prev) => ({ ...prev, terms: !prev.terms }))
            }
          >
            {translate("form.terms.accept")}{" "}
            <Link
              to="/terms"
              className={`${getForgotPasswordColor(theme)} hover:underline`}
            >
              {translate("form.terms.terms")}
            </Link>{" "}
            {translate("form.terms.and")}{" "}
            <Link
              to="/privacy"
              className={`${getForgotPasswordColor(theme)} hover:underline`}
            >
              {translate("form.terms.privacy")}
            </Link>
          </label>
        </div>
        {formErrors.terms && (
          <p className="text-xs text-red-500 mt-1">{formErrors.terms}</p>
        )}

        {/* Mensagem de erro da API */}
        {apiError && (
          <div
            className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg"
            role="alert"
          >
            <p className="text-xs text-red-500 flex items-center">
              <svg
                className="w-3 h-3 mr-1.5 flex-shrink-0"
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
              {getApiErrorMessage(apiError)}
            </p>
          </div>
        )}

        {/* Botão de Criar Conta */}
        <button
          type="submit"
          className={`${getButtonClasses(theme)} w-full py-2.5 px-4 font-semibold rounded-lg transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-3.5 w-3.5 mr-2"
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
                className="w-3.5 h-3.5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              {translate("form.submit")}
            </>
          )}
        </button>
      </form>

      {/* Link para Login */}
      {showLoginLink && (
        <div
          className={`text-center pt-2 border-t ${getDividerClasses(theme).border}`}
        >
          <p className={`text-xs ${getTextColor(theme)}`}>
            {translate("login.text")}{" "}
            <Link
              to="/auth/login"
              className={`font-medium ${getForgotPasswordColor(theme)} transition-colors hover:underline`}
            >
              {translate("login.link")}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
