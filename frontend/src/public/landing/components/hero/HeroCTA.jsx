// frontend/src/public/landing/hero/HeroCTA.jsx (atualizado)
import React from "react";
import { Zap, Play, ArrowRight, ExternalLink } from "lucide-react";

const HeroCTA = ({ theme, t, onWatchDemo }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          primaryButton:
            "from-pink-600 via-purple-600 to-cyan-600 hover:from-pink-700 hover:via-purple-700 hover:to-cyan-700",
          primaryShadow:
            "shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/40",
          secondaryButton:
            "bg-gray-900/30 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200 hover:border-cyan-500/50",
          icon: "text-pink-400",
          googleIcon: "bg-white",
          hoverEffect: "hover:scale-105 active:scale-95",
          secondaryHover: "hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]",
        };
      case "dark":
        return {
          primaryButton:
            "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
          primaryShadow:
            "shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40",
          secondaryButton:
            "bg-gray-800/30 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-500",
          icon: "text-purple-300",
          googleIcon: "bg-white",
          hoverEffect: "hover:scale-105 active:scale-95",
          secondaryHover: "hover:shadow-lg",
        };
      case "light":
        return {
          primaryButton:
            "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
          primaryShadow:
            "shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40",
          secondaryButton:
            "bg-white border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-400",
          icon: "text-blue-500",
          googleIcon: "bg-white",
          hoverEffect: "hover:scale-105 active:scale-95",
          secondaryHover: "hover:shadow-lg hover:shadow-blue-500/20",
        };
      default:
        return {
          primaryButton:
            "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
          primaryShadow:
            "shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40",
          secondaryButton:
            "bg-gray-800/30 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-500",
          icon: "text-purple-300",
          googleIcon: "bg-white",
          hoverEffect: "hover:scale-105 active:scale-95",
          secondaryHover: "hover:shadow-lg",
        };
    }
  };

  const styles = getThemeStyles();

  // Ícone do Google
  const GoogleIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24">
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
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-20 animate-fadeIn">
      {/* Botão Principal - Começar Grátis com Google */}
      <button
        className={`group relative px-8 py-4 font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 ${styles.hoverEffect} bg-gradient-to-r ${styles.primaryButton} ${styles.primaryShadow} text-white`}
        aria-label={t("cta.startFree.aria")}
        onClick={() => (window.location.href = "/auth/login")}
      >
        <div className="relative z-10 flex items-center justify-center gap-3">
          <div className={`p-1.5 rounded-lg ${styles.googleIcon}`}>
            <GoogleIcon className="w-4 h-4" />
          </div>
          <span>{t("cta.startFree.text")}</span>
          <ArrowRight className="size-5 group-hover:translate-x-2 transition-transform duration-300" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </button>

      {/* Botão Secundário - Ver Demonstração */}
      <button
        onClick={onWatchDemo}
        className={`group flex items-center gap-3 px-8 py-4 font-bold text-lg rounded-2xl transition-all duration-300 ${styles.hoverEffect} ${styles.secondaryButton} ${styles.secondaryHover}`}
        aria-label={t("cta.watchDemo.aria")}
      >
        <Play className="size-5" />
        <span>{t("cta.watchDemo.text")}</span>
        <ExternalLink className="size-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default HeroCTA;
