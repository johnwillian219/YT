// frontend/src/public/landing/components/DesktopDropdown.jsx
import React from "react";
import {
  Search,
  Users,
  Edit3,
  Palette,
  Bot,
  TrendingUp,
  LayoutDashboard,
  Calendar,
  FileText,
} from "lucide-react";

const DesktopDropdown = ({ theme, t, features, isOpen, scrollToSection }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          bg: "bg-gray-900/95 backdrop-blur-xl border-cyan-500/30",
          text: {
            primary: "text-cyan-100",
            secondary: "text-cyan-300/80",
            muted: "text-cyan-400/60",
            accent: "text-pink-400",
          },
          border: "border-t-cyan-500/20",
          category: "text-cyan-400",
          button:
            "from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700",
          card: "bg-cyan-500/5 hover:bg-cyan-500/10",
        };
      case "dark":
        return {
          bg: "bg-gray-900 border-gray-800",
          text: {
            primary: "text-white",
            secondary: "text-gray-300",
            muted: "text-gray-500",
            accent: "text-purple-400",
          },
          border: "border-t-gray-800",
          category: "text-purple-400",
          button:
            "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
          card: "bg-gray-800/50 hover:bg-gray-800",
        };
      case "light":
        return {
          bg: "bg-white border-gray-200",
          text: {
            primary: "text-gray-900",
            secondary: "text-gray-700",
            muted: "text-gray-500",
            accent: "text-blue-600",
          },
          border: "border-t-gray-200",
          category: "text-blue-600",
          button:
            "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600",
          card: "bg-gray-50 hover:bg-gray-100",
        };
      default:
        return {
          bg: "bg-gray-900 border-gray-800",
          text: {
            primary: "text-white",
            secondary: "text-gray-300",
            muted: "text-gray-500",
            accent: "text-purple-400",
          },
          border: "border-t-gray-800",
          category: "text-purple-400",
          button:
            "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
          card: "bg-gray-800/50 hover:bg-gray-800",
        };
    }
  };

  const themeStyles = getThemeStyles();
  const iconColors = {
    Search: "text-blue-500",
    Users: "text-purple-500",
    Edit3: "text-pink-500",
    Palette: "text-green-500",
    Bot: "text-cyan-500",
    TrendingUp: "text-orange-500",
    LayoutDashboard: "text-yellow-500",
    Calendar: "text-red-500",
    FileText: "text-indigo-500",
  };

  return (
    <div
      className={`absolute top-full left-0 mt-2 w-[800px] rounded-2xl border shadow-2xl transition-all duration-300 p-6 ${themeStyles.bg}
        ${isOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 translate-y-2"}`}
    >
      <div className="grid grid-cols-3 gap-8">
        {features.map((category, idx) => (
          <div key={idx}>
            <h3
              className={`text-sm font-semibold uppercase tracking-wider mb-4 ${themeStyles.category}`}
            >
              {category.category}
            </h3>
            <div className="space-y-3">
              {category.items.map((item, itemIdx) => {
                const IconComponent = item.Icon;
                return (
                  <a
                    key={itemIdx}
                    href="#"
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all group/item ${themeStyles.card}`}
                  >
                    <div
                      className={`p-2 rounded-lg ${iconColors[IconComponent.name] || "text-gray-500"}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div
                        className={`font-medium transition-colors ${themeStyles.text.primary}`}
                      >
                        {item.name}
                      </div>
                      <div className={`text-xs mt-1 ${themeStyles.text.muted}`}>
                        {item.description}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-6 pt-6 border-t ${themeStyles.border}`}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className={`font-semibold ${themeStyles.text.primary}`}>
              {t("dropdown.title")}
            </h4>
            <p className={`text-sm ${themeStyles.text.secondary}`}>
              {t("dropdown.description")}
            </p>
          </div>
          <button
            className={`px-6 py-3 text-white font-semibold rounded-xl transition-all hover:scale-105 bg-gradient-to-r ${themeStyles.button}`}
            onClick={() => scrollToSection("pricing")}
          >
            {t("dropdown.button")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopDropdown;
