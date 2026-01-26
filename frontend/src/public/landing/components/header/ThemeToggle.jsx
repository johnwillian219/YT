// frontend/src/public/landing/components/ThemeToggle.jsx
import React from "react";
import { Moon, Sun, Zap } from "lucide-react";

const ThemeToggle = ({ theme, toggleTheme }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          button:
            "bg-gray-900/20 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30",
          tooltip: "bg-gray-900 text-cyan-100 border border-cyan-500/30",
          accent: "text-cyan-400",
          hoverEffect: "hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]",
        };
      case "dark":
        return {
          button:
            "bg-gray-800/20 hover:bg-purple-500/20 text-gray-300 hover:text-white border border-gray-700",
          tooltip: "bg-gray-900 text-gray-200 border border-gray-700",
          accent: "text-purple-400",
          hoverEffect: "hover:shadow-lg",
        };
      case "light":
        return {
          button:
            "bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 border border-gray-300 hover:border-blue-400",
          tooltip: "bg-white text-gray-800 border border-gray-300 shadow-lg",
          accent: "text-blue-500",
          hoverEffect: "hover:shadow-md",
        };
      default:
        return {
          button:
            "bg-gray-800/20 hover:bg-purple-500/20 text-gray-300 hover:text-white border border-gray-700",
          tooltip: "bg-gray-900 text-gray-200 border border-gray-700",
          accent: "text-purple-400",
          hoverEffect: "hover:shadow-lg",
        };
    }
  };

  const themeStyles = getThemeStyles();

  const getThemeName = () => {
    switch (theme) {
      case "cyberpunk":
        return "Cyberpunk";
      case "dark":
        return "Escuro";
      case "light":
        return "Claro";
      default:
        return "Tema";
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2.5 rounded-lg transition-all duration-200 ${themeStyles.button} ${themeStyles.hoverEffect} group`}
      aria-label={`Mudar tema. Tema atual: ${getThemeName()}`}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Cyberpunk icon */}
        <Zap
          className={`w-5 h-5 transition-all duration-300 ${
            theme === "cyberpunk"
              ? "opacity-100 rotate-0"
              : "opacity-0 rotate-90 absolute inset-0"
          }`}
        />

        {/* Dark icon */}
        <Moon
          className={`w-5 h-5 transition-all duration-300 ${
            theme === "dark"
              ? "opacity-100 rotate-0"
              : "opacity-0 -rotate-90 absolute inset-0"
          }`}
        />

        {/* Light icon */}
        <Sun
          className={`w-5 h-5 transition-all duration-300 ${
            theme === "light"
              ? "opacity-100 rotate-0"
              : "opacity-0 rotate-90 absolute inset-0"
          }`}
        />
      </div>

      {/* Tooltip */}
      <div
        className={`absolute top-full right-0 mt-2 px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 text-xs font-medium ${themeStyles.tooltip}`}
      >
        {getThemeName()}
        <div
          className={`absolute -top-1.5 right-2 w-3 h-3 ${theme === "light" ? "bg-white border-t border-l border-gray-300" : "bg-gray-900 border-t border-l border-gray-700"} transform rotate-45`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
