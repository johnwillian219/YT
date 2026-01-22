// frontend/src/domains/auth/ui/reset-password-form/ResetPasswordForm.jsx
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
  getRequirementsBg,
} from "./ResetPasswordForm.styles";

export default function ResetPasswordForm({
  onSuccess,
  onError,
  showBackLink = true,
}) {
  const { theme } = useTheme();
  const { t } = useI18n();

  // Função auxiliar para traduções
  const translate = (key, params) => t(key, "reset-password", params);

  // Estado do formulário
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validação de senha
    if (!formData.password) {
      errors.password = "Senha é obrigatória";
    } else if (formData.password.length < 8) {
      errors.password = "Senha deve ter no mínimo 8 caracteres";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      errors.password = "Senha deve conter pelo menos uma letra maiúscula";
    } else if (!/(?=.*[0-9!@#$%^&*])/.test(formData.password)) {
      errors.password = "Senha deve conter um número ou caractere especial";
    }

    // Validação de confirmação de senha
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirme sua senha";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Aqui você implementaria a lógica de redefinição de senha
      const token = new URLSearchParams(window.location.search).get("token");

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao redefinir senha");
      }

      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Reset password error:", error);
      if (onError) onError(error.message || "Erro ao redefinir senha");
    } finally {
      setIsLoading(false);
    }
  };

  // Obter requisitos da senha do JSON
  const requirementItems = translate("requirements.items", {
    returnObjects: true,
  }) || [
    "At least 8 characters",
    "One uppercase letter",
    "One number or special character",
  ];

  // Se a senha foi redefinida com sucesso
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className={`text-xl font-bold ${getTextColor(theme)}`}>
            Senha redefinida com sucesso!
          </h3>
          <p className={`mt-2 ${getTextColor(theme)}`}>
            Sua senha foi alterada. Você já pode fazer login com a nova senha.
          </p>
        </div>

        {showBackLink && (
          <div className={`text-center pt-4 border-t ${getBorderColor(theme)}`}>
            <Link
              to="/auth/login"
              className={`font-medium transition ${getLinkColor(theme)}`}
            >
              Ir para página de login
            </Link>
          </div>
        )}
      </div>
    );
  }

  // Formulário normal
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Nova Senha */}
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${getTextColor(theme)}`}
        >
          {translate("form.password.label")}
        </label>
        <div className="relative">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`${getInputClasses(theme)} ${formErrors.password ? "border-red-500" : ""}`}
            placeholder={translate("form.password.placeholder")}
            required
            disabled={isLoading}
          />
          {formErrors.password && (
            <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
          )}
        </div>
      </div>

      {/* Confirmar Nova Senha */}
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${getTextColor(theme)}`}
        >
          {translate("form.confirmPassword.label")}
        </label>
        <div className="relative">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`${getInputClasses(theme)} ${formErrors.confirmPassword ? "border-red-500" : ""}`}
            placeholder={translate("form.confirmPassword.placeholder")}
            required
            disabled={isLoading}
          />
          {formErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {formErrors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      {/* Requisitos da senha */}
      <div className={`p-3 rounded-lg text-sm ${getRequirementsBg(theme)}`}>
        <p className="font-medium mb-2">{translate("requirements.title")}</p>
        <ul className="space-y-1">
          {Array.isArray(requirementItems) ?
            requirementItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span>
                {item}
              </li>
            ))
          : <>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Pelo menos 8 caracteres
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Uma letra maiúscula
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Um número ou caractere especial
              </li>
            </>
          }
        </ul>
      </div>

      {/* Botão de Redefinir */}
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
              Redefinindo...
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
            {translate("backToLogin.text")}{" "}
            <Link
              to="/auth/login"
              className={`font-medium transition ${getLinkColor(theme)}`}
            >
              {translate("backToLogin.link")}
            </Link>
          </p>
        </div>
      )}
    </form>
  );
}
