import React from "react";
import { Link } from "react-router-dom";
import { AnimatedBackground } from "./background";
import { useTheme } from "../../../app/bootstrap/theme-provider";
import { useTranslation } from "../../../shared/hooks/use-translation.hook";

export default function RegisterPage() {
  const { theme } = useTheme();
  const { t } = useTranslation("register");

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

  const getCheckboxClasses = () =>
    `h-4 w-4 rounded border focus:ring ${
      theme === "cyberpunk" ?
        "border-gray-600 bg-gray-800 text-cyberpunk-neon-blue focus:ring-cyberpunk-neon-blue"
      : theme === "dark" ?
        "border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
      : "border-gray-400 bg-white text-blue-600 focus:ring-blue-500"
    }`;

  const getGoogleButtonClasses = () =>
    `w-full flex items-center justify-center px-4 py-3 border rounded-lg transition ${
      theme === "light" ?
        "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
      : "border-gray-700 text-white hover:bg-gray-800/30 hover:border-gray-600"
    }`;

  // Classes condicionais para o divisor
  const getDividerClasses = () => {
    const borderColors = {
      cyberpunk: "border-gray-700",
      dark: "border-gray-700",
      light: "border-gray-300",
    };

    const bgColors = {
      cyberpunk: "bg-gray-900/40",
      dark: "bg-gray-900/60",
      light: "bg-white",
    };

    const textColors = {
      cyberpunk: "text-gray-400",
      dark: "text-gray-400",
      light: "text-gray-500",
    };

    return {
      border: borderColors[theme] || borderColors.cyberpunk,
      bg: bgColors[theme] || bgColors.cyberpunk,
      text: textColors[theme] || textColors.cyberpunk,
    };
  };

  // Obter dados de tradução
  const formData = t("form", { returnObjects: true }) || {};
  const emailData = formData.email || {};
  const passwordData = formData.password || {};
  const confirmPasswordData = formData.confirmPassword || {};
  const termsData = formData.terms || {};
  const loginData = t("login", { returnObjects: true }) || {};

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
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${getTitleColor()}`}>
            {t("title")}
          </h1>
          <p className={getTextColor()}>{t("subtitle")}</p>
        </div>

        <div className={getContainerClasses()}>
          <form className="space-y-4">
            {/* Email */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${getTextColor()}`}
              >
                {emailData.label || "Email"}
              </label>
              <input
                type="email"
                className={getInputClasses()}
                placeholder={emailData.placeholder || "Insira seu email"}
                required
              />
            </div>

            {/* Senha */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${getTextColor()}`}
              >
                {passwordData.label || "Senha"}
              </label>
              <input
                type="password"
                className={getInputClasses()}
                placeholder={passwordData.placeholder || "Insira sua senha"}
                required
              />
            </div>

            {/* Confirmar Senha */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${getTextColor()}`}
              >
                {confirmPasswordData.label || "Confirmar Senha"}
              </label>
              <input
                type="password"
                className={getInputClasses()}
                placeholder={
                  confirmPasswordData.placeholder || "Confirme sua senha"
                }
                required
              />
            </div>

            {/* Termos */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className={`mt-1 ${getCheckboxClasses()}`}
                required
              />
              <label
                htmlFor="terms"
                className={`ml-2 text-sm ${getTextColor()}`}
              >
                {termsData.label ?
                  <>
                    {termsData.label.split("{termsLink}")[0]}
                    <Link to="/terms" className={getLinkColor()}>
                      {termsData.terms || "Termos"}
                    </Link>
                    {
                      termsData.label
                        .split("{termsLink}")[1]
                        ?.split("{privacyLink}")[0]
                    }
                    <Link to="/privacy" className={getLinkColor()}>
                      {termsData.privacy || "Privacidade"}
                    </Link>
                    {termsData.label.split("{privacyLink}")[1]}
                  </>
                : <>
                    Aceito os{" "}
                    <Link to="/terms" className={getLinkColor()}>
                      Termos
                    </Link>{" "}
                    e{" "}
                    <Link to="/privacy" className={getLinkColor()}>
                      Privacidade
                    </Link>
                  </>
                }
              </label>
            </div>

            {/* Botão de Cadastrar */}
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                {formData.submit || "CRIAR CONTA"}
              </span>
            </button>

            {/* Link para Login */}
            <p
              className={`text-center text-sm mt-6 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
            >
              {loginData.text || "Já tem uma conta?"}{" "}
              <Link
                to="/auth/login"
                className={`font-medium transition ${getLinkColor()}`}
              >
                {loginData.link || "Faça login"}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
