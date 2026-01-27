// frontend/src/domains/auth/ui/background/AuthBackground.jsx
import React, { useEffect, useState } from "react";
import { useTheme } from "../../../../app/bootstrap/theme-provider";
import { Zap, Sparkles, TrendingUp, Shield, Users, Play } from "lucide-react";
import { useI18n } from "../../../../app/bootstrap/i18n-provider";

// Componente simples de partículas flutuantes
const FloatingParticles = ({ theme }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Criar algumas partículas estáticas
    const initialParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 4,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.2 + 0.05,
    }));
    setParticles(initialParticles);
  }, []);

  const getParticleColor = () => {
    switch (theme) {
      case "cyberpunk":
        return "#22d3ee";
      case "dark":
        return "#8b5cf6";
      default:
        return "#3b82f6";
    }
  };

  const color = getParticleColor();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: color,
            opacity: particle.opacity,
            animationDelay: `${particle.id * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

// Componente de stats simplificado (sem animação de números)
const SimpleStats = ({ theme, statsData, isLightTheme = false }) => {
  // Se não receber statsData, usar valores padrão
  const defaultStats = {
    views: { value: "2.5M+", label: "Views" },
    channels: { value: "50K+", label: "Canais" },
    growth: { value: "300%", label: "Crescimento" },
  };

  const stats = statsData || defaultStats;

  // Mapeamento dos ícones
  const statItems = [
    {
      key: "views",
      icon: Play,
      value: stats.views?.value || "2.5M+",
      label: stats.views?.label || "Views",
      color: "#FF0000",
    },
    {
      key: "channels",
      icon: Users,
      value: stats.channels?.value || "50K+",
      label: stats.channels?.label || "Canais",
      color: "#3B82F6",
    },
    {
      key: "growth",
      icon: TrendingUp,
      value: stats.growth?.value || "300%",
      label: stats.growth?.label || "Crescimento",
      color: "#10B981",
    },
  ];

  return (
    <div className="mt-8 flex justify-center gap-6">
      {statItems.map((stat) => (
        <div key={stat.key} className="text-center">
          <div className="flex items-center justify-center mb-1">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${stat.color}20` }}
            >
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
            </div>
          </div>
          <div
            className={`text-lg font-bold ${isLightTheme ? "text-gray-800" : "text-white"}`}
          >
            {stat.value}
          </div>
          <div
            className={`text-xs ${isLightTheme ? "text-gray-600" : "text-gray-400"}`}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

const AuthBackground = ({ children, type = "login" }) => {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isLightTheme = theme === "light";

  const translate = (key) => t(key, type);

  const getSlogan = () => {
    if (type === "login") {
      return translate("slogan");
    }
    const fallbacks = {
      register: "Transforme seu canal em um império digital",
      "forgot-password": "Sua jornada continua com segurança",
      "reset-password": "Redefinindo para o próximo nível",
    };
    return fallbacks[type] || "Domine o YouTube como Ninja";
  };

  // Função para obter stats do JSON
  const getStatsData = () => {
    try {
      // Tentar obter stats do JSON via função de tradução
      const statsFromJson = {
        views: {
          value: t("stats.views.value", type) || "2.5M+",
          label: t("stats.views.label", type) || "Views",
        },
        channels: {
          value: t("stats.channels.value", type) || "50K+",
          label: t("stats.channels.label", type) || "Canais",
        },
        growth: {
          value: t("stats.growth.value", type) || "300%",
          label: t("stats.growth.label", type) || "Crescimento",
        },
      };
      return statsFromJson;
    } catch (error) {
      // Fallback em caso de erro
      console.warn("Erro ao carregar stats do JSON:", error);
      return {
        views: { value: "2.5M+", label: "Views" },
        channels: { value: "50K+", label: "Canais" },
        growth: { value: "300%", label: "Crescimento" },
      };
    }
  };

  const getBackgroundStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          container: "min-h-screen",
          leftPanel:
            "bg-gradient-to-br from-gray-900 via-black to-purple-900/20",
          rightPanel: "bg-transparent",
          logoGradient: "from-cyan-500 via-purple-500 to-pink-500",
          textGradient: "from-cyan-300 via-purple-300 to-pink-300",
          sloganColor: "text-gray-300",
          ninjaColor: "text-cyan-400",
          decoration: "border-r border-cyan-500/20",
          pattern:
            "bg-[radial-gradient(circle_at_30%_40%,rgba(34,211,238,0.1)_0%,transparent_50%)]",
          glowColor: "#22d3ee",
          particleGlow: "from-cyan-500/5 to-purple-500/5",
          statBg: "bg-white/10",
        };
      case "dark":
        return {
          container: "min-h-screen",
          leftPanel:
            "bg-gradient-to-br from-gray-900 via-gray-950 to-purple-900/20",
          rightPanel: "bg-transparent",
          logoGradient: "from-purple-600 via-blue-500 to-purple-600",
          textGradient: "from-white to-gray-200",
          sloganColor: "text-gray-300",
          ninjaColor: "text-purple-400",
          decoration: "border-r border-purple-500/20",
          pattern:
            "bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.1)_0%,transparent_50%)]",
          glowColor: "#8b5cf6",
          particleGlow: "from-purple-500/5 to-blue-500/5",
          statBg: "bg-white/10",
        };
      case "light":
      default:
        return {
          container: "min-h-screen",
          leftPanel: "bg-gradient-to-br from-blue-50 via-white to-purple-50/30",
          rightPanel: "bg-transparent",
          logoGradient: "from-blue-600 to-purple-600",
          textGradient: "from-blue-700 to-purple-700",
          sloganColor: "text-gray-700",
          ninjaColor: "text-purple-700",
          decoration: "border-r border-gray-300",
          pattern:
            "bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.08)_0%,transparent_50%)]",
          glowColor: "#3b82f6",
          particleGlow: "from-blue-500/3 to-purple-500/3",
          statBg: "bg-gray-800/5",
          statText: "text-gray-800",
          statLabel: "text-gray-600",
        };
    }
  };

  const styles = getBackgroundStyles();
  const slogan = getSlogan();
  const statsData = getStatsData();

  return (
    <div className={`relative ${styles.container}`}>
      {/* Layout dividido */}
      <div className="relative z-10 min-h-screen flex">
        {/* Painel Esquerdo - Versão melhorada mas sem scroll */}
        <div
          className={`hidden lg:flex lg:w-1/2 ${styles.leftPanel} ${styles.decoration} flex-col items-center justify-center p-12 relative overflow-hidden`}
        >
          {/* Efeitos de fundo simples */}
          <FloatingParticles theme={theme} />

          {/* Glow spots sutis */}
          <div
            className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br ${styles.particleGlow} blur-3xl`}
          />
          <div
            className={`absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-tr ${styles.particleGlow.replace("from-", "to-").replace("to-", "from-")} blur-3xl`}
          />

          {/* Pattern overlay para tema light */}
          {isLightTheme && (
            <div
              className={`absolute inset-0 ${styles.pattern} pointer-events-none`}
            />
          )}

          <div className="relative z-10 text-center max-w-xs">
            {/* Logo com efeito de brilho */}
            <div className="flex justify-center mb-6 relative">
              <div
                className={`absolute -inset-3 rounded-full bg-gradient-to-r ${theme === "cyberpunk" ? "from-cyan-500/20 via-purple-500/20 to-pink-500/20" : theme === "dark" ? "from-purple-500/20 via-blue-500/20 to-purple-500/20" : "from-blue-500/20 to-purple-500/20"} blur-xl`}
              />

              <div
                className={`relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl bg-gradient-to-br ${styles.logoGradient}
                ${
                  theme === "cyberpunk"
                    ? "shadow-cyan-500/40"
                    : theme === "dark"
                      ? "shadow-purple-500/30"
                      : "shadow-blue-500/20"
                }`}
              >
                <Zap className="w-10 h-10 text-white" fill="white" />

                {/* Brilho sutil apenas para cyberpunk */}
                {theme === "cyberpunk" && (
                  <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 blur-lg"></div>
                )}
              </div>
            </div>

            {/* Título NinjaTube */}
            <h1
              className={`text-5xl font-bold bg-gradient-to-r ${styles.textGradient} bg-clip-text text-transparent mb-4 relative`}
            >
              Ninja<span className={styles.ninjaColor}>Tube</span>
            </h1>

            {/* Descrição */}
            <p
              className={`text-xl font-medium ${styles.sloganColor} tracking-tight mb-6`}
            >
              {slogan}
            </p>

            {/* Linha decorativa animada */}
            <div className="relative h-px w-40 mx-auto mb-6 overflow-hidden rounded-full">
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-current to-transparent"
                style={{
                  opacity: isLightTheme ? 0.15 : 0.3,
                  animation: "slide 3s ease-in-out infinite",
                }}
              />
            </div>

            {/* Stats simplificados usando dados do JSON */}
            <SimpleStats
              theme={theme}
              statsData={statsData}
              isLightTheme={isLightTheme}
            />

            {/* Pontos decorativos */}
            <div className="mt-8 flex justify-center items-center gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="relative"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      theme === "cyberpunk"
                        ? "bg-cyan-500/70"
                        : theme === "dark"
                          ? "bg-purple-500/70"
                          : "bg-blue-500/70"
                    } animate-pulse`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Overlay sutil para melhor contraste */}
          {isLightTheme ? (
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent pointer-events-none" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
          )}
        </div>

        {/* Painel Direito - Mantido igual (limpo) */}
        <div
          className={`flex-1 ${styles.rightPanel} flex flex-col ${isLightTheme ? "bg-white" : ""}`}
        >
          {/* Header mobile */}
          <div className="lg:hidden p-6">
            <div className="flex items-center justify-center">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${styles.logoGradient}`}
              >
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <h1
                className={`ml-3 text-xl font-bold bg-gradient-to-r ${styles.textGradient} bg-clip-text text-transparent`}
              >
                Ninja<span className={styles.ninjaColor}>Tube</span>
              </h1>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1 flex items-center justify-center p-4 lg:p-12">
            {children}
          </div>
        </div>
      </div>

      {/* Animations CSS */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(0, -10px);
          }
        }

        @keyframes slide {
          0%,
          100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthBackground;
