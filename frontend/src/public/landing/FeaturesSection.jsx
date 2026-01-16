import React from "react";
import {
  Search,
  Users,
  Edit3,
  Palette,
  Bot,
  TrendingUp,
  LayoutDashboard,
  Calendar,
  FileText,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Zap,
  Tag,
  Type,
  Hash,
} from "lucide-react";
import { useTheme } from "../../app/bootstrap/theme-provider";
import { useTranslation } from "../../shared/hooks/use-translation.hook";
import Container from "../components/Container";

const FeaturesSection = () => {
  const { theme = "cyberpunk" } = useTheme();
  const { t } = useTranslation("features");

  // Configurações de tema apenas para o background
  const getBackground = () => {
    switch (theme) {
      case "cyberpunk":
        return "bg-gradient-to-b from-[#0a0a0f] via-[#151522] to-[#151522]";
      case "dark":
        return "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-800";
      case "light":
        return "bg-gradient-to-b from-gray-50 via-white to-white";
      default:
        return "bg-gradient-to-b from-[#0a0a0f] via-[#151522] to-[#151522]";
    }
  };

  const features = [
    {
      key: "keywordResearch",
      icon: <Search className="w-5 h-5" />,
      mobileIcon: <Search className="w-4 h-4" />,
      color: "from-blue-500 to-cyan-500",
      delay: "100",
    },
    {
      key: "competitorAnalysis",
      icon: <Users className="w-5 h-5" />,
      mobileIcon: <Users className="w-4 h-4" />,
      color: "from-purple-500 to-pink-500",
      delay: "150",
    },
    {
      key: "optimization",
      icon: <Edit3 className="w-5 h-5" />,
      mobileIcon: <Edit3 className="w-4 h-4" />,
      color: "from-pink-500 to-rose-500",
      delay: "200",
    },
    {
      key: "thumbnailAI",
      icon: <Palette className="w-5 h-5" />,
      mobileIcon: <Palette className="w-4 h-4" />,
      color: "from-green-500 to-emerald-500",
      delay: "250",
    },
    {
      key: "automatedScripts",
      icon: <Bot className="w-5 h-5" />,
      mobileIcon: <Bot className="w-4 h-4" />,
      color: "from-cyan-500 to-blue-500",
      delay: "300",
    },
    {
      key: "trendAnalysis",
      icon: <TrendingUp className="w-5 h-5" />,
      mobileIcon: <TrendingUp className="w-4 h-4" />,
      color: "from-orange-500 to-amber-500",
      delay: "350",
    },
    {
      key: "dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      mobileIcon: <LayoutDashboard className="w-4 h-4" />,
      color: "from-indigo-500 to-purple-500",
      delay: "400",
    },
    {
      key: "contentCalendar",
      icon: <Calendar className="w-5 h-5" />,
      mobileIcon: <Calendar className="w-4 h-4" />,
      color: "from-red-500 to-pink-500",
      delay: "450",
    },
    {
      key: "detailedReports",
      icon: <FileText className="w-5 h-5" />,
      mobileIcon: <FileText className="w-4 h-4" />,
      color: "from-violet-500 to-purple-500",
      delay: "500",
    },
  ];

  return (
    <section className={`relative md:py-20 ${getBackground()}`}>
      {/* Background decorativo - visível apenas no desktop */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${
            theme === "light" ? "bg-blue-50" : "bg-blue-900/10"
          } blur-3xl hidden md:block`}
        />
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full ${
            theme === "light" ? "bg-purple-50" : "bg-purple-900/10"
          } blur-3xl hidden md:block`}
        />
      </div>

      <Container className="relative">
        <div className="text-center md:mb-16">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 dark:text-blue-400 mr-1.5 md:mr-2" />
            <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {t("section.badge")}
            </span>
          </div>

          <h2
            className={`text-2xl md:text-4xl font-bold mb-2 md:mb-6 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            {t("section.title")}
            <br className="hidden md:block" />
            <span className="text-xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 block md:inline">
              {" "}
              {t("section.subtitle")}
            </span>
          </h2>
        </div>

        {/* Versão Mobile Compacta (3 por linha) */}
        <div className="md:hidden pt-5">
          <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={feature.key}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
                  theme === "light" ?
                    "bg-white border border-gray-200"
                  : "bg-gray-800/50 border border-gray-700/50"
                }`}
              >
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${feature.color} text-white mb-2`}
                >
                  {feature.mobileIcon}
                </div>
                <span
                  className={`text-xs font-medium text-center ${
                    theme === "light" ? "text-gray-800" : "text-gray-200"
                  } line-clamp-2`}
                >
                  {t(`features.${feature.key}.shortTitle`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Versão Desktop Completa */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.key}
                className={`group relative p-6 rounded-2xl transition-all duration-500 hover:duration-300 ${
                  theme === "light" ?
                    "bg-white border border-gray-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10"
                  : "bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10"
                } hover:-translate-y-2`}
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <div
                  className={`absolute top-0 left-6 w-12 h-1 bg-gradient-to-r ${feature.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}
                />

                <div className="flex items-start mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mr-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-bold text-lg mb-2 ${
                        theme === "light" ? "text-gray-900" : "text-white"
                      }`}
                    >
                      {t(`features.${feature.key}.title`)}
                    </h3>

                    <p
                      className={`text-sm ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {t(`features.${feature.key}.description`)}
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-center text-sm ${
                    theme === "light" ? "text-blue-600" : "text-blue-400"
                  } opacity-0 group-hover:opacity-100 transition-opacity`}
                >
                  <span className="font-medium">{t("cta.learnMore")}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
