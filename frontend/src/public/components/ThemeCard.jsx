import React from "react";
import { useTheme } from "../app/bootstrap/theme-provider";
import { getThemeClasses } from "../utils/theme-utils";

const ThemeCard = ({ children, className = "", hover = true }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`
      p-6 rounded-2xl transition-all duration-300
      ${getThemeClasses(theme, "card")}
      ${hover ? "hover:scale-[1.02]" : ""}
      ${theme === "cyberpunk" && hover ? "hover:shadow-xl hover:shadow-purple-500/10" : ""}
      ${className}
    `}
    >
      {children}
    </div>
  );
};

export default ThemeCard;
