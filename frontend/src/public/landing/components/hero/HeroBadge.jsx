// frontend/src/public/landing/hero/HeroBadge.jsx (atualizado)
import React from "react";
import { Sparkles } from "lucide-react";

const HeroBadge = ({ theme, t }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          container: "bg-cyan-500/10 border-cyan-500/30 backdrop-blur-md",
          text: "text-cyan-300",
          icon: "text-cyan-400",
          glow: "shadow-[0_0_15px_rgba(0,240,255,0.15)]",
        };
      case "dark":
        return {
          container: "bg-purple-500/10 border-purple-500/30 backdrop-blur-md",
          text: "text-purple-300",
          icon: "text-purple-400",
          glow: "shadow-lg shadow-purple-500/10",
        };
      case "light":
        return {
          container:
            "bg-gradient-to-r from-blue-50 to-blue-100/80 border-blue-200/80 backdrop-blur-sm",
          text: "text-blue-600 font-semibold",
          icon: "text-blue-500",
          glow: "shadow-lg shadow-blue-500/10",
        };
      default:
        return {
          container: "bg-purple-500/10 border-purple-500/30 backdrop-blur-md",
          text: "text-purple-300",
          icon: "text-purple-400",
          glow: "shadow-lg shadow-purple-500/10",
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div
      className={`inline-flex items-center gap-3 px-5 py-3 rounded-full border ${styles.container} ${styles.glow} animate-float mb-10`}
    >
      <div className={`p-1.5 rounded-full ${styles.icon}`}>
        <Sparkles className="size-4" />
      </div>
      <span className={`text-sm tracking-wide ${styles.text}`}>
        {t("badge.text")}
      </span>
    </div>
  );
};

export default HeroBadge;
