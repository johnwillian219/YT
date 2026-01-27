// frontend/src/domains/auth/ui/reset-password-form/ResetPasswordForm.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../app/bootstrap/theme-provider";
import { useI18n } from "../../../../app/bootstrap/i18n-provider";
import {
  Lock,
  Key,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import {
  getInputClasses,
  getButtonClasses,
  getTextColor,
  getForgotPasswordColor,
  getDividerClasses,
} from "./ResetPasswordForm.styles";

export default function ResetPasswordForm({
  onSuccess,
  onError,
  showBackLink = true,
}) {
  const { theme } = useTheme();
  const { t } = useI18n();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [redirectCount, setRedirectCount] = useState(20); // Iniciar com 8 segundos

  const translate = (key) => t(key, "reset-password");

  // Tempo de exibição do resultado antes do redirecionamento (em segundos)
  const REDIRECT_SECONDS = 20;

  // Analisar força da senha
  const checkPasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return strength;
  };

  // Atualizar força da senha quando mudar
  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(formData.password));
  }, [formData.password]);

  // Contagem regressiva para redirecionamento - ÚNICA IMPLEMENTAÇÃO
  useEffect(() => {
    if (isSubmitted && redirectCount > 0) {
      const timer = setTimeout(() => {
        setRedirectCount((prev) => prev - 1);
      }, 1000); // 1 segundo
      return () => clearTimeout(timer);
    } else if (isSubmitted && redirectCount === 0) {
      // Aguardar 500ms extra antes de redirecionar para dar tempo de ver "0s"
      const redirectTimer = setTimeout(() => {
        window.location.href = "/auth/login";
      }, 1000);
      return () => clearTimeout(redirectTimer);
    }
  }, [isSubmitted, redirectCount]);

  // Resetar contador quando o formulário é enviado com sucesso
  useEffect(() => {
    if (isSubmitted) {
      setRedirectCount(REDIRECT_SECONDS);
    }
  }, [isSubmitted]);

  // Funções de validação usando traduções
  const getValidationMessage = (field, type) => {
    const errorFromJson = translate(`form.${field}.errors.${type}`);

    if (errorFromJson && !errorFromJson.startsWith("form.")) {
      return errorFromJson;
    }

    const fallbackMessages = {
      password: {
        required: "Senha é obrigatória",
        minLength: "Senha deve ter no mínimo 6 caracteres",
        weak: "Sua senha é muito fraca",
      },
      confirmPassword: {
        required: "Confirme sua senha",
        mismatch: "As senhas não coincidem",
      },
    };

    return fallbackMessages[field]?.[type] || translate("errors.generic");
  };

  // Função para obter mensagem de erro da API
  const getApiErrorMessage = (error) => {
    if (error.includes("token") || error.includes("invalid")) {
      return translate("errors.invalid_token");
    } else if (error.includes("weak") || error.includes("password")) {
      return translate("errors.weak_password");
    } else if (error.includes("same")) {
      return translate("errors.same_password");
    } else if (error.includes("network") || error === "Network Error") {
      return translate("errors.network");
    } else {
      return translate("errors.generic");
    }
  };

  // Obter texto da força da senha
  const getStrengthText = () => {
    if (formData.password.length === 0) return "";

    const texts = {
      1: translate("form.strength.weak"),
      2: translate("form.strength.medium"),
      3: translate("form.strength.medium"),
      4: translate("form.strength.strong"),
    };

    return texts[passwordStrength] || translate("form.strength.weak");
  };

  // Obter cor da força da senha
  const getStrengthColor = () => {
    if (formData.password.length === 0) return "transparent";

    if (passwordStrength <= 1) {
      return theme === "light" ? "bg-red-500" : "bg-red-600";
    } else if (passwordStrength <= 3) {
      return theme === "light" ? "bg-yellow-500" : "bg-yellow-600";
    } else {
      return theme === "light" ? "bg-green-500" : "bg-green-600";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }

    if (apiError) setApiError("");
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.password) {
      errors.password = getValidationMessage("password", "required");
    } else if (formData.password.length < 6) {
      errors.password = getValidationMessage("password", "minLength");
    } else if (passwordStrength <= 1) {
      errors.password = getValidationMessage("password", "weak");
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

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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
      // const token = new URLSearchParams(window.location.search).get("token");
      // const response = await fetch("/api/auth/reset-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ token, password: formData.password }),
      // });
      // if (!response.ok) throw new Error(await response.text());

      setIsSubmitted(true);
      onSuccess?.();

      // Log para desenvolvimento
      console.log("✅ Senha redefinida com sucesso");
    } catch (error) {
      console.error("Reset password error:", error);
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
                ? "bg-green-900/20"
                : theme === "dark"
                  ? "bg-green-900/20"
                  : "bg-green-100"
            }`}
          >
            <CheckCircle
              className={`w-8 h-8 ${
                theme === "cyberpunk"
                  ? "text-green-400"
                  : theme === "dark"
                    ? "text-green-400"
                    : "text-green-600"
              }`}
            />
          </div>

          <h3 className={`text-xl font-bold ${getTextColor(theme)} mb-2`}>
            {translate("success.title")}
          </h3>

          <p className={`text-sm ${getTextColor(theme)} mb-4 opacity-90`}>
            {translate("success.message")}
          </p>

          <div
            className={`inline-flex items-center justify-center px-4 py-2 rounded-lg ${
              theme === "cyberpunk"
                ? "bg-gray-800/30"
                : theme === "dark"
                  ? "bg-gray-800/30"
                  : "bg-gray-100"
            }`}
          >
            <span className={`text-xs ${getTextColor(theme)} opacity-90`}>
              {translate("success.redirect_message")}{" "}
              <span className="font-bold text-blue-500">{redirectCount}s</span>
            </span>
          </div>
        </div>

        {/* Botão para ir ao login agora */}
        <div className="pt-2">
          <Link
            to="/auth/login"
            className={`group flex items-center justify-center w-full py-3 rounded-lg font-medium transition-all ${
              theme === "cyberpunk"
                ? "bg-gray-800/40 hover:bg-gray-800/60 text-cyan-400 hover:text-cyan-300"
                : theme === "dark"
                  ? "bg-gray-800/40 hover:bg-gray-800/60 text-blue-400 hover:text-blue-300"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {translate("success.redirect_now")}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Link de volta (alternativo) */}
        {showBackLink && (
          <div
            className={`text-center pt-2 border-t ${getDividerClasses(theme).border}`}
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

  // Formulário de redefinição
  return (
    <div className="space-y-4">
      {/* Título e ícone */}
      <div className="text-center">
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 ${
            theme === "cyberpunk"
              ? "bg-purple-900/20"
              : theme === "dark"
                ? "bg-purple-900/20"
                : "bg-purple-100"
          }`}
        >
          <RefreshCw
            className={`w-7 h-7 ${
              theme === "cyberpunk"
                ? "text-purple-400"
                : theme === "dark"
                  ? "text-purple-400"
                  : "text-purple-600"
            }`}
          />
        </div>
        <h3 className={`text-lg font-semibold ${getTextColor(theme)} mb-2`}>
          {translate("form.title")}
        </h3>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {/* Campo de Nova Senha */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label
              className={`block text-sm font-medium ${getTextColor(theme)}`}
              htmlFor="password"
            >
              {translate("form.password.label")}
            </label>
            {formData.password.length > 0 && (
              <span
                className={`text-xs ${
                  passwordStrength <= 1
                    ? "text-red-500"
                    : passwordStrength <= 3
                      ? "text-yellow-500"
                      : "text-green-500"
                }`}
              >
                {getStrengthText()}
              </span>
            )}
          </div>

          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Lock
                className={`w-5 h-5 ${
                  theme === "light" ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`${getInputClasses(theme)} ${formErrors.password ? "border-red-500 focus:border-red-500" : ""} pl-10 pr-10 py-3 text-sm`}
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
                  className={`w-5 h-5 ${
                    theme === "light" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              ) : (
                <Eye
                  className={`w-5 h-5 ${
                    theme === "light" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              )}
            </button>
          </div>

          {/* Força da senha - barra de progresso */}
          {formData.password.length > 0 && (
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded-full bg-gray-700/30 overflow-hidden">
                <div
                  className={`h-full ${getStrengthColor()} transition-all duration-300`}
                  style={{ width: `${(passwordStrength / 4) * 100}%` }}
                />
              </div>
              <p className={`text-xs ${getTextColor(theme)} opacity-70`}>
                {translate("form.strength.requirements")}
              </p>
            </div>
          )}

          {formErrors.password && (
            <p id="password-error" className="text-xs text-red-500 mt-1">
              {formErrors.password}
            </p>
          )}
        </div>

        {/* Campo de Confirmar Senha */}
        <div className="space-y-2">
          <label
            className={`block text-sm font-medium ${getTextColor(theme)}`}
            htmlFor="confirmPassword"
          >
            {translate("form.confirmPassword.label")}
          </label>

          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Shield
                className={`w-5 h-5 ${
                  theme === "light" ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`${getInputClasses(theme)} ${formErrors.confirmPassword ? "border-red-500 focus:border-red-500" : ""} pl-10 pr-10 py-3 text-sm`}
              placeholder={translate("form.confirmPassword.placeholder")}
              required
              disabled={isLoading}
              aria-invalid={!!formErrors.confirmPassword}
              aria-describedby={
                formErrors.confirmPassword ? "confirmPassword-error" : undefined
              }
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
              aria-label={
                showConfirmPassword ? "Ocultar senha" : "Mostrar senha"
              }
            >
              {showConfirmPassword ? (
                <EyeOff
                  className={`w-5 h-5 ${
                    theme === "light" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              ) : (
                <Eye
                  className={`w-5 h-5 ${
                    theme === "light" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              )}
            </button>
          </div>

          {formErrors.confirmPassword && (
            <p id="confirmPassword-error" className="text-xs text-red-500 mt-1">
              {formErrors.confirmPassword}
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

        {/* Botão de Redefinir */}
        <button
          type="submit"
          className={`${getButtonClasses(theme)} group w-full py-3 px-4 font-semibold rounded-lg transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={
            isLoading || !formData.password || !formData.confirmPassword
          }
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
              <Key className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
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
