// frontend/src/domains/auth/ui/auth-layout/AuthLayout.jsx
import React from "react";
import { useTheme } from "../../../../app/bootstrap/theme-provider";

// Importar do caminho CORRETO - baseado no seu diretório
import AnimatedBackground from "../../pages/background/AnimatedBackground";

export default function AuthLayout({
  children,
  title,
  subtitle,
  showDecoration = true,
}) {
  const { theme } = useTheme();

  // Classes condicionais baseadas no tema
  const getContainerClasses = () => {
    const baseClasses = "backdrop-blur-lg rounded-2xl p-6 border shadow-2xl";

    const themeStyles = {
      cyberpunk:
        "bg-gray-900/40 border-cyberpunk-blue-30 shadow-cyberpunk-neon-blue/10",
      dark: "bg-gray-900/60 border-gray-700 shadow-gray-900/30",
      light: "bg-white/90 border-gray-300 shadow-gray-400/20",
    };

    return `${baseClasses} ${themeStyles[theme] || themeStyles.cyberpunk}`;
  };

  const getTitleColor = () => {
    const colors = {
      cyberpunk: "text-white",
      dark: "text-white",
      light: "text-gray-900",
    };
    return colors[theme] || colors.cyberpunk;
  };

  const getTextColor = () => {
    const colors = {
      cyberpunk: "text-gray-300",
      dark: "text-gray-300",
      light: "text-gray-800",
    };
    return colors[theme] || colors.cyberpunk;
  };

  const getForgotPasswordColor = () => {
    const colors = {
      cyberpunk: "text-cyberpunk-neon-blue hover:text-cyberpunk-neon-pink",
      dark: "text-blue-400 hover:text-blue-300",
      light: "text-blue-600 hover:text-blue-800",
    };
    return colors[theme] || colors.cyberpunk;
  };

  const getRegisterLinkColor = () => {
    const colors = {
      cyberpunk: "text-cyberpunk-neon-blue hover:text-cyberpunk-neon-pink",
      dark: "text-blue-400 hover:text-blue-300",
      light: "text-blue-600 hover:text-blue-800",
    };
    return colors[theme] || colors.cyberpunk;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* AnimatedBackground sempre renderizado */}
      <AnimatedBackground />

      {/* Elementos extras só para cyberpunk */}
      {showDecoration && theme === "cyberpunk" && (
        <>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyberpunk-pink-30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyberpunk-blue-30 rounded-full blur-3xl animate-pulse delay-1000" />
        </>
      )}

      <div className="relative w-full max-w-md z-20">
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && (
              <h1 className={`text-3xl font-bold mb-2 ${getTitleColor()}`}>
                {title}
              </h1>
            )}
            {subtitle && <p className={getTextColor()}>{subtitle}</p>}
          </div>
        )}

        <div className={getContainerClasses()}>{children}</div>
      </div>
    </div>
  );
}
