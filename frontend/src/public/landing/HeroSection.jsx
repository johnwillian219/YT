import React, { useState, useMemo, useEffect } from "react";
import {
  Play,
  Zap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users,
  BarChart3,
  Shield,
  X,
} from "lucide-react";
import { useTheme } from "../../app/bootstrap/theme-provider";
import { useTranslation } from "../../shared/hooks/use-translation.hook";
import { useI18n } from "../../app/bootstrap/i18n-provider";
import Container from "../components/Container";

const HeroSection = () => {
  const { theme = "cyberpunk" } = useTheme();
  const { t } = useTranslation("herosection");
  const { isTransitioning } = useI18n();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [localTransition, setLocalTransition] = useState(false);

  // Sincroniza transição local com global
  useEffect(() => {
    if (isTransitioning) {
      setLocalTransition(true);
    } else {
      // Pequeno delay para garantir que o conteúdo já foi atualizado
      const timer = setTimeout(() => {
        setLocalTransition(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Configurações de tema otimizadas com useMemo
  const themeConfig = useMemo(() => {
    const configs = {
      cyberpunk: {
        bg: {
          main: "from-[#0a0a0f] via-[#151522]",
          card: "bg-gray-800/30 backdrop-blur-sm",
          accent: "from-purple-600 via-pink-600 to-blue-600",
        },
        text: {
          primary: "text-white",
          secondary: "text-gray-300",
          tertiary: "text-gray-400",
          accent: "text-purple-400",
          headline1: "from-white via-purple-100 to-blue-100",
          headline2: "from-purple-400 via-pink-400 to-blue-400",
        },
        border: {
          primary: "border-gray-700/50",
          secondary: "border-purple-500/30",
        },
      },
      dark: {
        bg: {
          main: "from-gray-900 via-gray-800",
          card: "bg-gray-800/50",
          accent: "from-purple-600 to-pink-600",
        },
        text: {
          primary: "text-white",
          secondary: "text-gray-300",
          tertiary: "text-gray-400",
          accent: "text-purple-300",
          headline1: "from-white to-gray-200",
          headline2: "from-purple-400 to-pink-400",
        },
        border: {
          primary: "border-gray-700",
          secondary: "border-gray-600",
        },
      },
      light: {
        bg: {
          main: "from-gray-50 via-white",
          card: "bg-white",
          accent: "from-blue-600 to-purple-600",
        },
        text: {
          primary: "text-gray-900",
          secondary: "text-gray-700",
          tertiary: "text-gray-600",
          accent: "text-blue-600",
          headline1: "from-gray-900 to-gray-700",
          headline2: "from-blue-600 to-purple-600",
        },
        border: {
          primary: "border-gray-200",
          secondary: "border-gray-300",
        },
      },
    };

    return configs[theme] || configs.cyberpunk;
  }, [theme]);

  // Features com cores adaptadas ao tema e textos internacionalizados
  const features = useMemo(
    () => [
      {
        icon: <TrendingUp className="size-6" />,
        title: t("features.analytics.title"),
        description: t("features.analytics.description"),
        gradient:
          theme === "cyberpunk" ? "from-blue-500 to-cyan-500"
          : theme === "dark" ? "from-blue-500 to-blue-600"
          : "from-blue-400 to-blue-500",
      },
      {
        icon: <BarChart3 className="size-6" />,
        title: t("features.seo.title"),
        description: t("features.seo.description"),
        gradient:
          theme === "cyberpunk" ? "from-purple-500 to-pink-500"
          : theme === "dark" ? "from-purple-500 to-pink-600"
          : "from-purple-400 to-pink-500",
      },
      {
        icon: <Users className="size-6" />,
        title: t("features.competitorAnalysis.title"),
        description: t("features.competitorAnalysis.description"),
        gradient:
          theme === "cyberpunk" ? "from-green-500 to-emerald-500"
          : theme === "dark" ? "from-green-500 to-emerald-600"
          : "from-green-400 to-emerald-500",
      },
      {
        icon: <Shield className="size-6" />,
        title: t("features.contentProtection.title"),
        description: t("features.contentProtection.description"),
        gradient:
          theme === "cyberpunk" ? "from-orange-500 to-red-500"
          : theme === "dark" ? "from-orange-500 to-red-600"
          : "from-orange-400 to-red-500",
      },
    ],
    [theme, t]
  );

  // Função para processar texto com placeholders
  const processTextWithPlaceholders = (text) => {
    if (!text || typeof text !== "string") return "";

    if (text.includes("{ai}")) {
      const parts = text.split("{ai}");
      return (
        <>
          <span className="inline transition-opacity duration-300">
            {parts[0]}
          </span>
          <span
            className={`font-semibold ${themeConfig.text.accent} inline transition-opacity duration-300`}
          >
            {t("description.ai")}
          </span>
          <span className="inline transition-opacity duration-300">
            {parts[1]}
          </span>
        </>
      );
    }

    return text;
  };

  // Função otimizada para classes de botão
  const getButtonClasses = (type = "primary") => {
    if (type === "primary") {
      return `bg-gradient-to-r ${themeConfig.bg.accent} text-white hover:shadow-xl transition-all duration-300`;
    }

    return theme === "light" ?
        "bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200 transition-all duration-300"
      : "bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-800 transition-all duration-300";
  };

  // Renderiza background elements apenas para cyberpunk
  const renderBackgroundElements = () => {
    if (theme !== "cyberpunk") return null;

    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 size-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 size-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-3/4 size-64 bg-pink-500/10 rounded-full blur-3xl" />
      </div>
    );
  };

  const handleDemoClick = () => {
    setShowPreview(true);
    setTimeout(() => {
      const previewElement = document.getElementById("video-preview");
      if (previewElement) {
        previewElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setIsPlaying(false);
  };

  // Classes de transição baseadas no estado
  const sectionTransitionClass =
    localTransition ?
      "opacity-80 transition-all duration-500 ease-in-out"
    : "opacity-100 transition-all duration-500 ease-in-out";

  const textTransitionClass =
    localTransition ?
      "opacity-70 transition-opacity duration-500 ease-in-out"
    : "opacity-100 transition-opacity duration-500 ease-in-out";

  return (
    <section
      className={`relative pt-32 bg-gradient-to-b ${themeConfig.bg.main} to-transparent ${sectionTransitionClass}`}
    >
      {renderBackgroundElements()}

      <Container>
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${themeConfig.border.secondary} ${themeConfig.bg.card} backdrop-blur-sm mb-8 ${textTransitionClass}`}
        >
          <Sparkles className={`size-4 ${themeConfig.text.accent}`} />
          <span className={`text-sm font-semibold ${themeConfig.text.accent}`}>
            {t("badge.text")}
          </span>
        </div>

        {/* Headline */}
        <div className={`mb-10 ${textTransitionClass}`}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span
              className={`block bg-gradient-to-r ${themeConfig.text.headline1} bg-clip-text text-transparent`}
            >
              {t("headline.line1")}
            </span>
            <span
              className={`block mt-2 bg-gradient-to-r ${themeConfig.text.headline2} bg-clip-text text-transparent`}
            >
              {t("headline.line2")}
            </span>
          </h1>

          <p
            className={`text-xl md:text-2xl max-w-3xl ${themeConfig.text.secondary}`}
          >
            {processTextWithPlaceholders(t("description.text"))}
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-20 ${textTransitionClass}`}
        >
          <button
            className={`group relative px-8 py-4 font-bold text-lg rounded-2xl overflow-hidden ${getButtonClasses(
              "primary"
            )}`}
            aria-label={t("cta.startFree.aria")}
            onClick={() => (window.location.href = "/auth/login")}
            disabled={localTransition}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              <Zap className="size-5" />
              <span>{t("cta.startFree.text")}</span>
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={handleDemoClick}
            className={`group flex items-center gap-3 px-8 py-4 font-bold text-lg rounded-2xl ${getButtonClasses(
              "secondary"
            )}`}
            aria-label={t("cta.watchDemo.aria")}
            disabled={localTransition}
          >
            <Play className="size-5" />
            <span>{t("cta.watchDemo.text")}</span>
          </button>
        </div>

        {/* Video Preview - Mostra apenas quando clicado */}
        {showPreview && (
          <div
            id="video-preview"
            className="mb-20 max-w-5xl mx-auto animate-fadeIn"
          >
            <div
              className={`relative rounded-2xl overflow-hidden ${themeConfig.border.primary} shadow-2xl transition-all duration-500`}
            >
              <div
                className={`aspect-video flex items-center justify-center ${
                  theme === "light" ?
                    "bg-gradient-to-br from-gray-50 to-gray-100"
                  : "bg-gradient-to-br from-gray-900 to-gray-800"
                }`}
              >
                <div className="text-center">
                  {/* Botão de Play Simples como YouTube */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`
                      group relative flex items-center justify-center
                      w-20 h-20 md:w-24 md:h-24 rounded-full mb-6 mx-auto
                      ${
                        theme === "light" ?
                          "bg-white hover:bg-gray-100"
                        : "bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                      }
                      transition-all duration-300
                      hover:scale-110 active:scale-95
                      shadow-2xl
                    `}
                    aria-label={
                      isPlaying ?
                        t("videoPreview.aria.pause")
                      : t("videoPreview.aria.play")
                    }
                  >
                    {/* Ícone Play/Pause simples */}
                    <div className="relative ml-1">
                      {isPlaying ?
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-1.5 h-8 ${
                              theme === "light" ? "bg-gray-700" : "bg-white"
                            } rounded-full`}
                          />
                          <div
                            className={`w-1.5 h-8 ${
                              theme === "light" ? "bg-gray-700" : "bg-white"
                            } rounded-full`}
                          />
                        </div>
                      : <div
                          className={`
                          w-0 h-0 
                          border-t-[14px] md:border-t-[16px] border-t-transparent
                          border-l-[22px] md:border-l-[24px] ${
                            theme === "light" ? "border-l-gray-700" : (
                              "border-l-white"
                            )
                          }
                          border-b-[14px] md:border-b-[16px] border-b-transparent
                          ml-1
                        `}
                        />
                      }
                    </div>

                    {/* Efeito de onda sutil no hover */}
                    <div
                      className={`
                      absolute inset-0 rounded-full
                      border-2 ${theme === "light" ? "border-gray-200" : "border-white/20"}
                      group-hover:border-current
                      transition-all duration-300
                    `}
                    />

                    {/* Efeito de brilho interno */}
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/5 to-transparent" />
                  </button>

                  <p className={`${themeConfig.text.tertiary} text-lg`}>
                    {isPlaying ?
                      t("videoPreview.playing")
                    : t("videoPreview.title")}
                  </p>

                  {/* Barra de progresso quando playing */}
                  {isPlaying && (
                    <div className="mt-6 max-w-md mx-auto">
                      <div className="h-1.5 w-full bg-gray-700/30 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Botão X para fechar (sempre visível) */}
              <button
                onClick={handleClosePreview}
                className={`
                  absolute top-4 right-4 p-2 rounded-full
                  ${
                    theme === "light" ?
                      "bg-white/90 hover:bg-white text-gray-800"
                    : "bg-gray-900/90 hover:bg-gray-800 text-gray-300"
                  }
                  backdrop-blur-sm border ${themeConfig.border.secondary}
                  transition-all duration-300
                  hover:scale-110 active:scale-95
                  shadow-lg
                `}
                aria-label={t("videoPreview.aria.close")}
              >
                <X className="size-5" />
              </button>

              {/* Badge de demonstração (apenas desktop) */}
              <div className="hidden md:block absolute top-4 left-4">
                <div
                  className={`
                  px-3 py-1.5 rounded-full text-xs font-semibold
                  ${
                    theme === "light" ?
                      "bg-white/90 text-gray-800"
                    : "bg-gray-900/90 text-gray-300"
                  }
                  backdrop-blur-sm border ${themeConfig.border.secondary}
                `}
                >
                  {t("videoPreview.demoBadge")}
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>

      {/* Estilo para animação de fade in */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
