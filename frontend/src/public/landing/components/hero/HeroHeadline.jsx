// frontend/src/public/landing/hero/HeroHeadline.jsx (atualizado)
import React from "react";

const HeroHeadline = ({ theme, t }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          line1: "from-white via-cyan-100 to-purple-100",
          line2: "from-cyan-400 via-pink-400 to-purple-400",
          textShadow: "text-shadow-[0_2px_30px_rgba(0,240,255,0.3)]",
        };
      case "dark":
        return {
          line1: "from-white via-gray-100 to-purple-100",
          line2: "from-purple-400 to-pink-400",
          textShadow: "",
        };
      case "light":
        return {
          line1: "from-gray-800 via-gray-700 to-gray-600",
          line2: "from-blue-500 to-blue-600",
          textShadow: "",
        };
      default:
        return {
          line1: "from-white via-gray-100 to-purple-100",
          line2: "from-purple-400 to-pink-400",
          textShadow: "",
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className="mb-12">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[0.9] tracking-tight">
        <div className="overflow-hidden">
          <span
            className={`block bg-gradient-to-r ${styles.line1} bg-clip-text text-transparent animate-slideUp`}
            style={{ animationDelay: "0.1s" }}
          >
            {t("headline.line1")}
          </span>
        </div>
        <div className="overflow-hidden">
          <span
            className={`block mt-4 md:mt-6 bg-gradient-to-r ${styles.line2} bg-clip-text text-transparent animate-slideUp ${styles.textShadow}`}
            style={{ animationDelay: "0.3s" }}
          >
            {t("headline.line2")}
          </span>
        </div>
      </h1>
    </div>
  );
};

export default HeroHeadline;
