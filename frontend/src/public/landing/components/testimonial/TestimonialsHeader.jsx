import React from "react";
import { Users, TrendingUp } from "lucide-react";

const TestimonialsHeader = ({ theme, t }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          badge: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
          icon: "text-cyan-400",
          title: "text-white",
          highlight: "from-cyan-400 to-pink-400",
          subtitle: "text-cyan-300/80",
        };
      case "dark":
        return {
          badge: "bg-purple-500/10 border-purple-500/30 text-purple-300",
          icon: "text-purple-400",
          title: "text-white",
          highlight: "from-purple-400 to-pink-400",
          subtitle: "text-gray-300",
        };
      case "light":
        return {
          badge:
            "bg-gradient-to-r from-blue-50 to-blue-100/80 border-blue-200 text-blue-600",
          icon: "text-blue-500",
          title: "text-gray-800",
          highlight: "from-blue-500 to-blue-600",
          subtitle: "text-gray-600",
        };
      default:
        return {
          badge: "bg-purple-500/10 border-purple-500/30 text-purple-300",
          icon: "text-purple-400",
          title: "text-white",
          highlight: "from-purple-400 to-pink-400",
          subtitle: "text-gray-300",
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className="text-center mb-12 md:mb-16">
      {/* Badge */}
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${styles.badge}`}
      >
        <Users className="w-4 h-4" />
        <span className="text-sm font-semibold">{t("header.badge")}</span>
      </div>

      {/* Título */}
      <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${styles.title}`}>
        {t("header.title")}{" "}
        <span
          className={`bg-gradient-to-r ${styles.highlight} bg-clip-text text-transparent`}
        >
          {t("header.highlight")}
        </span>
      </h2>

      {/* Subtítulo */}
      <p
        className={`text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto ${styles.subtitle}`}
      >
        {t("header.subtitle")}
      </p>
    </div>
  );
};

export default TestimonialsHeader;
