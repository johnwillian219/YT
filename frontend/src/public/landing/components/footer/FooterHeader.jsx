import React from "react";
import { Zap, Sparkles } from "lucide-react";

const FooterHeader = ({ theme, t }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          logoBg:
            "bg-gradient-to-r from-cyan-500 to-pink-500 shadow-lg shadow-cyan-500/30",
          logoIcon: "text-white",
          logoText: "text-white",
          logoAccent: "text-cyan-300",
          tagline: "text-cyan-300/80",
          description: "text-cyan-200/70",
        };
      case "dark":
        return {
          logoBg:
            "bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30",
          logoIcon: "text-white",
          logoText: "text-white",
          logoAccent: "text-purple-300",
          tagline: "text-purple-300/80",
          description: "text-gray-300",
        };
      case "light":
      default:
        return {
          logoBg:
            "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30",
          logoIcon: "text-white",
          logoText: "text-gray-900",
          logoAccent: "text-blue-600",
          tagline: "text-blue-600/90",
          description: "text-gray-700",
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className="lg:col-span-2">
      <div className="flex items-center mb-8">
        <div className={`p-3 rounded-2xl mr-4 ${styles.logoBg}`}>
          <Zap className="w-7 h-7" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-3xl font-bold ${styles.logoText}`}>
              Ninja
            </span>
            <span className={`text-3xl font-bold ${styles.logoAccent}`}>
              Tube
            </span>
            <div
              className={`px-2 py-1 rounded-full text-xs font-bold ${styles.logoAccent} bg-opacity-10 ${theme === "light" ? "bg-blue-500/10" : theme === "cyberpunk" ? "bg-cyan-500/10" : "bg-purple-500/10"}`}
            >
              PRO
            </div>
          </div>
          <div className={`text-sm font-medium mt-1 ${styles.tagline}`}>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {t("brand.tagline")}
            </div>
          </div>
        </div>
      </div>

      <p
        className={`text-lg leading-relaxed max-w-md mb-10 ${styles.description}`}
      >
        {t("brand.description")}
      </p>
    </div>
  );
};

export default FooterHeader;
