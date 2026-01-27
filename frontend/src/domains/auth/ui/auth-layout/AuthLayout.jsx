// frontend/src/domains/auth/ui/auth-layout/AuthLayout.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../app/bootstrap/theme-provider";
import AuthBackground from "../background/AuthBackground";

export default function AuthLayout({
  title,
  subtitle,
  children,
  showBackLink = false,
  backLinkTo = "/",
  backLinkText = "← Voltar",
  type = "login",
}) {
  const { theme } = useTheme();

  const getColors = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          backLink: "text-gray-400 hover:text-cyberpunk-neon-blue",
          title: "text-white",
          subtitle: "text-gray-400",
        };
      case "dark":
        return {
          backLink: "text-gray-400 hover:text-blue-400",
          title: "text-white",
          subtitle: "text-gray-400",
        };
      case "light":
      default:
        return {
          backLink: "text-gray-600 hover:text-blue-600",
          title: "text-gray-900",
          subtitle: "text-gray-600",
        };
    }
  };

  const colors = getColors();

  return (
    <AuthBackground type={type}>
      {/* Conteúdo direito - limpo e minimalista */}
      <div className="w-full max-w-md">
        {/* Botão voltar (opcional) */}

        {/* Título e subtítulo */}
        <div className="text-center mb-8">
          <h1 className={`text-2xl font-bold mb-2 ${colors.title}`}>{title}</h1>
          {subtitle && (
            <p className={`text-sm ${colors.subtitle}`}>{subtitle}</p>
          )}
        </div>

        {/* Conteúdo do formulário */}
        {children}
      </div>
    </AuthBackground>
  );
}
