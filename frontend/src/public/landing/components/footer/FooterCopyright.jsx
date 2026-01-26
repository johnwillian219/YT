import React from "react";
import { Heart, Shield, Check } from "lucide-react";

const FooterCopyright = ({ theme, t }) => {
  const copyright = t("copyright", { returnObjects: true }) || {};

  const copyrightText =
    copyright.text?.replace("{year}", new Date().getFullYear().toString()) ||
    `© ${new Date().getFullYear()} NinjaTube • All rights reserved`;

  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          text: "text-cyan-300/70",
          accent: "text-cyan-300",
          icon: "text-cyan-400",
          badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
          separator: "text-cyan-500/30",
        };
      case "dark":
        return {
          text: "text-gray-400",
          accent: "text-gray-300",
          icon: "text-purple-400",
          badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
          separator: "text-gray-600",
        };
      case "light":
      default:
        return {
          text: "text-gray-600",
          accent: "text-gray-700",
          icon: "text-blue-500",
          badge: "bg-blue-50 text-blue-600 border-blue-200",
          separator: "text-gray-300",
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className="text-center space-y-4">
      {/* Linha separadora */}
      <div
        className={`h-px w-full ${theme === "light" ? "bg-gray-200" : "bg-gray-800/50"}`}
      />

      {/* Badges informativos */}
      <div className="flex flex-wrap justify-center gap-3">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${styles.badge}`}
        >
          <Check className="w-3 h-3" />
          {copyright.secure || "Site seguro"}
        </div>

        {copyright.notAffiliated && (
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${styles.badge}`}
          >
            <Shield className="w-3 h-3" />
            {copyright.notAffiliated}
          </div>
        )}
      </div>

      {/* Copyright principal */}
      <div className={styles.text}>
        <div className="flex items-center justify-center flex-wrap gap-2">
          <span>{copyrightText}</span>
          <Heart
            className={`w-4 h-4 text-red-500 animate-pulse ${styles.separator}`}
          />
        </div>
      </div>

      {/* Versão */}
      <div className={`text-xs ${styles.text}`}>
        v1.0.0 • {t("copyright.version") || "Always improving"}
      </div>
    </div>
  );
};

export default FooterCopyright;
