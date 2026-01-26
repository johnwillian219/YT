// frontend/src/public/landing/components/HeaderLogo.jsx
import React from "react";
import { Zap } from "lucide-react";

const HeaderLogo = ({ theme, scrollToSection, t }) => {
  const getLogoGradient = () => {
    switch (theme) {
      case "cyberpunk":
        return "from-purple-500 via-pink-500 to-blue-500";
      case "dark":
        return "from-purple-600 to-blue-600";
      default:
        return "from-blue-500 to-purple-500";
    }
  };

  const getTextGradient = () => {
    switch (theme) {
      case "cyberpunk":
        return "from-white via-purple-100 to-blue-100";
      case "dark":
        return "from-white to-gray-200";
      default:
        return "from-blue-600 to-purple-600";
    }
  };

  const getSloganColor = () => {
    switch (theme) {
      case "light":
        return "text-gray-500";
      default:
        return "text-gray-400";
    }
  };

  const getNinjaColor = () => {
    switch (theme) {
      case "light":
        return "text-purple-600";
      default:
        return "text-purple-400";
    }
  };

  return (
    <div
      className="flex items-center space-x-3 group cursor-pointer"
      onClick={() => scrollToSection("home")}
    >
      <div className="relative">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform bg-gradient-to-br ${getLogoGradient()}
            ${theme === "cyberpunk" ? "shadow-purple-500/30" : ""}`}
        >
          <Zap className="w-5 h-5 text-white" fill="white" />
        </div>
      </div>
      <div>
        <h1
          className={`text-2xl font-bold bg-gradient-to-r ${getTextGradient()} bg-clip-text text-transparent`}
        >
          Ninja<span className={getNinjaColor()}>Tube</span>
        </h1>
        <p
          className={`text-xs -mt-1 font-medium hidden md:block ${getSloganColor()}`}
        >
          {t("logo.slogan")}
        </p>
      </div>
    </div>
  );
};

export default HeaderLogo;
