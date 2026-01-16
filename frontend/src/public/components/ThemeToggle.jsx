import React from "react";
import { useTheme } from "../../app/bootstrap/theme-provider";
import { Moon, Sun, Zap } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-lg bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-800 transition-all group"
      aria-label={`Mudar tema. Tema atual: ${theme}`}
    >
      <div className="relative w-5 h-5">
        {/* Cyberpunk icon */}
        <Zap
          className={`w-5 h-5 transition-all duration-300 ${
            theme === "cyberpunk" ?
              "opacity-100 rotate-0 text-purple-400"
            : "opacity-0 rotate-90 absolute inset-0"
          }`}
        />

        {/* Dark icon */}
        <Moon
          className={`w-5 h-5 transition-all duration-300 ${
            theme === "dark" ?
              "opacity-100 rotate-0"
            : "opacity-0 -rotate-90 absolute inset-0"
          }`}
        />

        {/* Light icon */}
        <Sun
          className={`w-5 h-5 transition-all duration-300 ${
            theme === "light" ?
              "opacity-100 rotate-0 text-yellow-400"
            : "opacity-0 rotate-90 absolute inset-0"
          }`}
        />
      </div>

      {/* Tooltip */}
      <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
        {theme === "cyberpunk" && "Tema Cyberpunk"}
        {theme === "dark" && "Tema Escuro"}
        {theme === "light" && "Tema Claro"}
        <div className="absolute -top-1 right-2 w-2 h-2 bg-gray-900 transform rotate-45" />
      </div>
    </button>
  );
};

export default ThemeToggle;
