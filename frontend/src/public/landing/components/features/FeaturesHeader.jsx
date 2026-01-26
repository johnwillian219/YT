// frontend/src/public/landing/features/FeaturesHeader.jsx (atualizado para ser mais compacto)
import React from "react";
import { Sparkles } from "lucide-react";

const FeaturesHeader = ({ theme, t }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          badge: "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300",
          icon: "text-cyan-400",
          title: "text-white font-bold",
          subtitle: "from-cyan-400 to-pink-400",
        };
      case "dark":
        return {
          badge: "bg-purple-500/10 border border-purple-500/30 text-purple-300",
          icon: "text-purple-400",
          title: "text-white font-bold",
          subtitle: "from-purple-400 to-pink-400",
        };
      case "light":
        return {
          badge: "bg-blue-50 border border-blue-200 text-blue-600",
          icon: "text-blue-500",
          title: "text-gray-800 font-bold",
          subtitle: "from-blue-500 to-blue-600",
        };
      default:
        return {
          badge: "bg-purple-500/10 border border-purple-500/30 text-purple-300",
          icon: "text-purple-400",
          title: "text-white font-bold",
          subtitle: "from-purple-400 to-pink-400",
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className="text-center mb-12">
      {/* Badge mais compacto */}
      <div
        className={`inline-flex items-center px-3 py-1.5 rounded-full border mb-4 ${styles.badge}`}
      >
        <Sparkles className={`w-6.5 h-6.5 mr-1.5 ${styles.icon}`} />
        <span className="text-sm font-semibold tracking-wide">
          {t("section.badge")}
        </span>
      </div>

      {/* Títulos mais compactos */}
      <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${styles.title}`}>
        {t("section.title")}
      </h2>

      <h3
        className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${styles.subtitle} bg-clip-text text-transparent`}
      >
        {t("section.subtitle")}
      </h3>
    </div>
  );
};

export default FeaturesHeader;
