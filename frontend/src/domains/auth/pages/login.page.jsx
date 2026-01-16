import React from "react";
import { Link } from "react-router-dom";
import { AnimatedBackground } from "./background";
import { useTheme } from "../../../app/bootstrap/theme-provider";
import { useTranslation } from "../../../shared/hooks/use-translation.hook";

export default function LoginPage() {
  const { theme } = useTheme();
  const { t } = useTranslation("login");

  // Função para classes do botão baseada no tema
  const getButtonClasses = () => {
    const baseClasses =
      "w-full py-3 px-4 font-bold rounded-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 active:scale-95 border";

    const themeStyles = {
      cyberpunk: {
        classes:
          "bg-gradient-to-r from-cyberpunk-neon-pink to-cyberpunk-neon-blue text-white border-cyan-400/50 shadow-cyberpunk-neon-pink/30 hover:shadow-cyberpunk-neon-blue/40",
      },
      dark: {
        classes:
          "bg-gradient-to-r from-slate-800 to-slate-900 text-white border-slate-700 shadow-slate-900/50 hover:shadow-slate-800/60",
      },
      light: {
        classes:
          "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-500 shadow-blue-600/40 hover:shadow-blue-700/50",
      },
    };

    return `${baseClasses} ${themeStyles[theme]?.classes || themeStyles.cyberpunk.classes}`;
  };

  // Classes condicionais para o container baseado no tema
  const getContainerClasses = () => {
    const baseClasses = "backdrop-blur-lg rounded-2xl p-6 border shadow-2xl";

    const themeStyles = {
      cyberpunk:
        "bg-gray-900/40 border-cyberpunk-blue-30 shadow-cyberpunk-neon-blue/10",
      dark: "bg-gray-900/60 border-gray-700 shadow-gray-900/30",
      light: "bg-white/90 border-gray-300 shadow-gray-400/20",
    };

    return `${baseClasses} ${themeStyles[theme] || themeStyles.cyberpunk}`;
  };

  // Classes condicionais para inputs
  const getInputClasses = () => {
    const baseClasses =
      "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 transition pl-10";

    const themeStyles = {
      cyberpunk:
        "bg-gray-800/40 border-gray-700 text-white placeholder-gray-500 focus:border-cyberpunk-neon-blue focus:ring-cyberpunk-neon-blue/30",
      dark: "bg-gray-800/60 border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/30",
      light:
        "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/30",
    };

    return `${baseClasses} ${themeStyles[theme] || themeStyles.cyberpunk}`;
  };

  // Classes condicionais para texto
  const getTextColor = () => {
    const colors = {
      cyberpunk: "text-gray-300",
      dark: "text-gray-300",
      light: "text-gray-800",
    };

    return colors[theme] || colors.cyberpunk;
  };

  // Classes condicionais para o título
  const getTitleColor = () => {
    const colors = {
      cyberpunk: "text-white",
      dark: "text-white",
      light: "text-gray-900",
    };

    return colors[theme] || colors.cyberpunk;
  };

  // Classes condicionais para link "esqueceu a senha"
  const getForgotPasswordColor = () => {
    const colors = {
      cyberpunk: "text-cyberpunk-neon-blue hover:text-cyberpunk-neon-pink",
      dark: "text-blue-400 hover:text-blue-300",
      light: "text-blue-600 hover:text-blue-800",
    };

    return colors[theme] || colors.cyberpunk;
  };

  // Classes condicionais para link "cadastre-se"
  const getRegisterLinkColor = () => {
    const colors = {
      cyberpunk: "text-cyberpunk-neon-blue hover:text-cyberpunk-neon-pink",
      dark: "text-blue-400 hover:text-blue-300",
      light: "text-blue-600 hover:text-blue-800",
    };

    return colors[theme] || colors.cyberpunk;
  };

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

  // Classes condicionais para o botão do Google
  const getGoogleButtonClasses = () => {
    const baseClasses =
      "w-full flex items-center justify-center px-4 py-3 border rounded-lg transition";

    const themeStyles = {
      cyberpunk:
        "border-gray-700 text-white hover:bg-gray-800/30 hover:border-gray-600",
      dark: "border-gray-700 text-white hover:bg-gray-800/40 hover:border-gray-600",
      light:
        "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400",
    };

    return `${baseClasses} ${themeStyles[theme] || themeStyles.cyberpunk}`;
  };

  // Classes condicionais para o checkbox
  const getCheckboxClasses = () => {
    const baseClasses = "h-4 w-4 rounded border focus:ring";

    const themeStyles = {
      cyberpunk:
        "border-gray-600 bg-gray-800 text-cyberpunk-neon-blue focus:ring-cyberpunk-neon-blue",
      dark: "border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500",
      light: "border-gray-400 bg-white text-blue-600 focus:ring-blue-500",
    };

    return `${baseClasses} ${themeStyles[theme] || themeStyles.cyberpunk}`;
  };

  // Obter dados de tradução
  const formData = t("form", { returnObjects: true }) || {};
  const emailData = formData.email || {};
  const passwordData = formData.password || {};
  const registerData = t("register", { returnObjects: true }) || {};

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* AnimatedBackground sempre renderizado */}
      <AnimatedBackground />

      {/* Elementos extras só para cyberpunk */}
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
            {/* Campo de Email */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${getTextColor()}`}
              >
                {emailData.label || "Email"}
              </label>
              <div className="relative">
                <input
                  type="email"
                  className={getInputClasses()}
                  placeholder={emailData.placeholder || "Insira seu email"}
                  required
                />
              </div>
            </div>

            {/* Campo de Senha */}
            <div>
              <div className="flex justify-between mb-2">
                <label className={`text-sm font-medium ${getTextColor()}`}>
                  {passwordData.label || "Senha"}
                </label>
                <Link
                  to="/auth/forgot-password"
                  className={`text-sm transition ${getForgotPasswordColor()}`}
                >
                  {passwordData.forgot || "Esqueceu a senha?"}
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  className={getInputClasses()}
                  placeholder={passwordData.placeholder || "Insira sua senha"}
                  required
                />
              </div>
            </div>

            {/* Checkbox Lembrar-me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className={getCheckboxClasses()}
              />
              <label
                htmlFor="remember-me"
                className={`ml-2 text-sm ${getTextColor()}`}
              >
                {formData.remember || "Lembrar-me por 30 dias"}
              </label>
            </div>

            {/* Botão de Entrar */}
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
                {formData.submit || "ENTRAR AGORA"}
              </span>
            </button>

            {/* Divisor */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div
                  className={`w-full border-t ${getDividerClasses().border}`}
                ></div>
              </div>
              <div className="relative flex justify-center">
                <span
                  className={`px-4 text-sm ${getDividerClasses().bg} ${getDividerClasses().text}`}
                >
                  {formData.divider || "Ou continue com"}
                </span>
              </div>
            </div>

            {/* Botão do Google */}
            <button className={getGoogleButtonClasses()} type="button">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {formData.google || "Continuar com Google"}
            </button>

            {/* Link para Cadastro */}
            <p
              className={`text-center text-sm mt-6 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
            >
              {registerData.text || "Não tem uma conta?"}{" "}
              <Link
                to="/auth/register"
                className={`font-medium transition ${getRegisterLinkColor()}`}
              >
                {registerData.link || "Cadastre-se"}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
