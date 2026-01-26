import React from "react";
import {
  CheckCircle,
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  Target,
  TrendingUp,
  Clock,
  Star,
  Rocket,
} from "lucide-react";

const CTASection = ({ theme, t }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          container:
            "border-cyan-500/40 bg-gradient-to-br from-gray-900/50 via-gray-900/30 to-cyan-900/20 relative overflow-hidden",
          title: "text-white drop-shadow-lg",
          subtitle: "text-cyan-300/90",
          badge: "bg-cyan-500/20 border-cyan-500/40 text-cyan-300",
          button:
            "bg-gradient-to-r from-cyan-500 via-pink-500 to-cyan-500 bg-[length:200%_auto] animate-gradient text-white hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] hover:shadow-cyan-500/50",
          glowEffect: "bg-cyan-500/10",
        };
      case "dark":
        return {
          container:
            "border-purple-500/40 bg-gradient-to-br from-gray-800/50 via-gray-900/40 to-purple-900/25 relative overflow-hidden",
          title: "text-white drop-shadow-lg",
          subtitle: "text-gray-200",
          badge: "bg-purple-500/20 border-purple-500/40 text-purple-300",
          button:
            "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_auto] animate-gradient text-white hover:shadow-[0_0_50px_rgba(147,51,234,0.5)] hover:shadow-purple-500/50",
          glowEffect: "bg-purple-500/10",
        };
      case "light":
        return {
          container:
            "border-blue-400 bg-gradient-to-br from-white via-blue-50/70 to-white relative overflow-hidden",
          title: "text-gray-900 drop-shadow-sm",
          subtitle: "text-gray-600",
          badge:
            "bg-gradient-to-r from-blue-100 to-blue-50 border-blue-300 text-blue-600",
          button:
            "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-blue-500/40",
          glowEffect: "bg-blue-500/10",
        };
      default:
        return {
          container:
            "border-purple-500/40 bg-gradient-to-br from-gray-800/50 via-gray-900/40 to-purple-900/25 relative overflow-hidden",
          title: "text-white drop-shadow-lg",
          subtitle: "text-gray-200",
          badge: "bg-purple-500/20 border-purple-500/40 text-purple-300",
          button:
            "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_auto] animate-gradient text-white hover:shadow-[0_0_50px_rgba(147,51,234,0.5)] hover:shadow-purple-500/50",
          glowEffect: "bg-purple-500/10",
        };
    }
  };

  const styles = getThemeStyles();
  const features = t("cta.features", { returnObjects: true }) || [];

  return (
    <div className={`rounded-2xl border-2 p-6 md:p-10 ${styles.container}`}>
      {/* Efeito de brilho de fundo */}
      <div
        className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl ${styles.glowEffect}`}
      />
      <div
        className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl ${styles.glowEffect}`}
      />

      <div className="relative z-10">
        {/* Cabeçalho com efeito especial */}
        <div className="text-center mb-8 md:mb-10">
          <h3 className={`text-2xl md:text-4xl font-bold mb-4 ${styles.title}`}>
            {t("cta.title")}
          </h3>

          <p
            className={`text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto ${styles.subtitle}`}
          >
            {t("cta.subtitle")}
          </p>
        </div>

        {/* Botão CTA com efeitos */}
        <div className="flex justify-center mb-12 relative">
          {/* Efeito de partículas */}
          <div className="absolute -top-2 -left-2">
            <Sparkles
              className={`w-4 h-4 ${
                theme === "light"
                  ? "text-blue-400"
                  : theme === "cyberpunk"
                    ? "text-cyan-400"
                    : "text-purple-400"
              } animate-pulse`}
            />
          </div>
          <div className="absolute -bottom-2 -right-2">
            <Star
              className={`w-4 h-4 ${
                theme === "light"
                  ? "text-blue-400"
                  : theme === "cyberpunk"
                    ? "text-cyan-400"
                    : "text-purple-400"
              } animate-pulse`}
            />
          </div>

          <button
            type="button"
            onClick={() => (window.location.href = "/auth/login")}
            className={`px-8 md:px-12 py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl relative overflow-hidden group ${styles.button}`}
          >
            {/* Efeito de brilho no hover */}
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

            <div className="flex items-center justify-center gap-3 relative">
              <Rocket className="w-5 h-5 animate-bounce" />
              <span className="drop-shadow-sm">{t("cta.button")}</span>
              <ArrowRight className="w-5 h-5 animate-pulse group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </button>
        </div>

        {/* Rodapé com informações */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle
              className={`w-4 h-4 ${
                theme === "light" ? "text-green-600" : "text-green-400"
              }`}
            />
            <span
              className={`text-xs ${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {t("cta.footer.noCommitment") ||
                "Sem compromisso • Cancele quando quiser"}
            </span>
          </div>

          <div className="hidden md:block">
            <div
              className={`h-4 w-px ${
                theme === "light" ? "bg-gray-300" : "bg-gray-600"
              }`}
            />
          </div>

          <div className="flex items-center gap-2">
            <Sparkles
              className={`w-4 h-4 animate-pulse ${
                theme === "light"
                  ? "text-blue-500"
                  : theme === "cyberpunk"
                    ? "text-cyan-400"
                    : "text-purple-400"
              }`}
            />
            <span
              className={`text-xs font-semibold ${
                theme === "light" ? "text-gray-700" : "text-gray-300"
              }`}
            >
              {t("cta.footer.featuresCount", { count: features.length }) ||
                `${features.length}+ vantagens incluídas`}
            </span>
          </div>
        </div>
      </div>

      {/* Estilos de animação */}
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }

        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default CTASection;
