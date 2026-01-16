import React from "react";
import { Link } from "react-router-dom";
import { AnimatedBackground } from "./background";
import { useTheme } from "../../../app/bootstrap/theme-provider";
import { useTranslation } from "../../../shared/hooks/use-translation.hook";

export default function ResetPasswordPage() {
  const { theme } = useTheme();
  const { t } = useTranslation("reset-password");

  // Funções helper compactas
  const getButtonClasses = () =>
    `w-full py-3 px-4 font-bold rounded-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 active:scale-95 border ${
      theme === "cyberpunk" ?
        "bg-gradient-to-r from-cyberpunk-neon-pink to-cyberpunk-neon-blue text-white border-cyan-400/50 shadow-cyberpunk-neon-pink/30 hover:shadow-cyberpunk-neon-blue/40"
      : theme === "dark" ?
        "bg-gradient-to-r from-slate-800 to-slate-900 text-white border-slate-700 shadow-slate-900/50 hover:shadow-slate-800/60"
      : "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-500 shadow-blue-600/40 hover:shadow-blue-700/50"
    }`;

  const getContainerClasses = () =>
    `backdrop-blur-lg rounded-2xl p-6 border shadow-2xl ${
      theme === "cyberpunk" ?
        "bg-gray-900/40 border-cyberpunk-blue-30 shadow-cyberpunk-neon-blue/10"
      : theme === "dark" ? "bg-gray-900/60 border-gray-700 shadow-gray-900/30"
      : "bg-white/90 border-gray-300 shadow-gray-400/20"
    }`;

  const getInputClasses = () =>
    `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 transition ${
      theme === "cyberpunk" ?
        "bg-gray-800/40 border-gray-700 text-white placeholder-gray-500 focus:border-cyberpunk-neon-blue focus:ring-cyberpunk-neon-blue/30"
      : theme === "dark" ?
        "bg-gray-800/60 border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/30"
      : "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/30"
    }`;

  const getTextColor = () =>
    theme === "light" ? "text-gray-800" : "text-gray-300";

  const getTitleColor = () =>
    theme === "light" ? "text-gray-900" : "text-white";

  const getLinkColor = () =>
    theme === "cyberpunk" ?
      "text-cyberpunk-neon-blue hover:text-cyberpunk-neon-pink"
    : theme === "dark" ? "text-blue-400 hover:text-blue-300"
    : "text-blue-600 hover:text-blue-800";

  const getBorderColor = () =>
    theme === "light" ? "border-gray-300" : "border-gray-700";

  const getRequirementsBg = () => {
    const bgColors = {
      cyberpunk: "bg-gray-800/40 text-gray-300",
      dark: "bg-gray-800/60 text-gray-300",
      light: "bg-gray-100 text-gray-700",
    };
    return bgColors[theme] || bgColors.cyberpunk;
  };

  // Obter dados de tradução
  const formData = t("form", { returnObjects: true }) || {};
  const passwordData = formData.password || {};
  const confirmPasswordData = formData.confirmPassword || {};
  const requirementsData = t("requirements", { returnObjects: true }) || {};
  const backToLoginData = t("backToLogin", { returnObjects: true }) || {};

  // Garantir que items seja um array
  const requirementItems =
    Array.isArray(requirementsData.items) ?
      requirementsData.items
    : [
        "Pelo menos 8 caracteres",
        "Uma letra maiúscula",
        "Um número ou caractere especial",
      ];

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <AnimatedBackground />

      {theme === "cyberpunk" && (
        <>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyberpunk-pink-30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyberpunk-blue-30 rounded-full blur-3xl animate-pulse delay-1000" />
        </>
      )}

      <div className="relative w-full max-w-md z-20">
        <div className="text-center mb-4">
          <h1 className={`text-3xl font-bold mb-2 ${getTitleColor()}`}>
            {t("title")}
          </h1>
          <p className={getTextColor()}>{t("subtitle")}</p>
        </div>

        <div className={getContainerClasses()}>
          <form className="space-y-4">
            {/* Nova Senha */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${getTextColor()}`}
              >
                {passwordData.label || "Nova Senha"}
              </label>
              <input
                type="password"
                className={getInputClasses()}
                placeholder={
                  passwordData.placeholder || "Digite sua nova senha"
                }
                required
              />
            </div>

            {/* Confirmar Nova Senha */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${getTextColor()}`}
              >
                {confirmPasswordData.label || "Confirmar Nova Senha"}
              </label>
              <input
                type="password"
                className={getInputClasses()}
                placeholder={
                  confirmPasswordData.placeholder || "Confirme sua nova senha"
                }
                required
              />
            </div>

            {/* Requisitos da senha */}
            <div className={`p-3 rounded-lg text-sm ${getRequirementsBg()}`}>
              <p className="font-medium mb-2">
                {requirementsData.title || "Sua senha deve conter:"}
              </p>
              <ul className="space-y-1">
                {requirementItems.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Botão de Redefinir */}
            <button type="submit" className={getButtonClasses()}>
              <span className="flex items-center justify-center text-lg">
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
                {formData.submit || "REDEFINIR SENHA"}
              </span>
            </button>

            {/* Link para Voltar ao Login */}
            <div className={`text-center pt-4 border-t ${getBorderColor()}`}>
              <p
                className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
              >
                {backToLoginData.text || "Voltar para"}{" "}
                <Link
                  to="/auth/login"
                  className={`font-medium transition ${getLinkColor()}`}
                >
                  {backToLoginData.link || "página de login"}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
