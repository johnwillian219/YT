import React from "react";
import { Link } from "react-router-dom";
import { AnimatedBackground } from "./background";
import { useTheme } from "../../../app/bootstrap/theme-provider";
import { useTranslation } from "../../../shared/hooks/use-translation.hook";

export default function ForgotPasswordPage() {
  const { theme } = useTheme();
  const { t } = useTranslation("forgot-password");

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

  // Obter dados de tradução
  const formData = t("form", { returnObjects: true }) || {};
  const emailData = formData.email || {};
  const rememberedData = t("remembered", { returnObjects: true }) || {};
  const instructionsData = t("instructions", { returnObjects: true }) || {};

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
          <form className="space-y-6">
            {/* Descrição */}
            <div className="text-center">
              <p className={getTextColor()}>
                {formData.description ||
                  "Digite seu email cadastrado para receber instruções de recuperação."}
              </p>
            </div>

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

            {/* Botão de Enviar */}
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
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {formData.submit || "ENVIAR LINK"}
              </span>
            </button>

            {/* Link para Voltar ao Login */}
            <div className={`text-center pt-4 border-t ${getBorderColor()}`}>
              <p
                className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
              >
                {rememberedData.text || "Lembrou sua senha?"}{" "}
                <Link
                  to="/auth/login"
                  className={`font-medium transition ${getLinkColor()}`}
                >
                  {rememberedData.link || "Voltar ao login"}
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Informações adicionais */}
        <div className="mt-6 text-center">
          <p
            className={`text-xs ${theme === "light" ? "text-gray-500" : "text-gray-500"}`}
          >
            {instructionsData.expiration ||
              "O link de recuperação expira em 1 hora."}
            <br />
            {instructionsData.spam ||
              "Verifique sua pasta de spam se não encontrar o email."}
          </p>
        </div>
      </div>
    </div>
  );
}
