// frontend/src/public/landing/components/MobileMenu.jsx
import React, { useState } from "react";
import {
  ChevronRight,
  UserPlus,
  LogIn,
  X,
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

// Ícone do Google para mobile
const GoogleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const MobileMenu = ({
  theme,
  t,
  navLinks,
  features,
  isMenuOpen,
  setIsMenuOpen,
  goToLogin,
  scrollToSection,
}) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          bg: "bg-gray-900/95 backdrop-blur-xl border-t-cyan-500/20",
          text: {
            primary: "text-cyan-100",
            secondary: "text-cyan-300/80",
            muted: "text-cyan-400/60",
            accent: "text-pink-400",
          },
          border: "border-cyan-500/20",
          card: "bg-cyan-500/5 hover:bg-cyan-500/15 hover:shadow-[0_0_10px_rgba(0,240,255,0.1)]",
          button: {
            primary:
              "from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 hover:shadow-[0_0_20px_rgba(255,0,255,0.3)]",
            secondary:
              "border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/15 hover:text-cyan-200 hover:border-cyan-500/50",
            google:
              "border-gray-700/50 text-gray-300 hover:bg-gray-800/70 hover:text-white hover:border-gray-600",
          },
          icon: "text-cyan-400",
        };
      case "dark":
        return {
          bg: "bg-gray-900 border-t-gray-800",
          text: {
            primary: "text-white",
            secondary: "text-gray-300",
            muted: "text-gray-500",
            accent: "text-purple-400",
          },
          border: "border-gray-800",
          card: "bg-gray-800/50 hover:bg-gray-800 hover:shadow-lg",
          button: {
            primary:
              "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-lg",
            secondary:
              "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-600",
            google:
              "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-600",
          },
          icon: "text-purple-400",
        };
      case "light":
        return {
          bg: "bg-white/95 backdrop-blur-sm border-t-gray-200",
          text: {
            primary: "text-gray-900",
            secondary: "text-gray-700",
            muted: "text-gray-500",
            accent: "text-blue-600",
          },
          border: "border-gray-200",
          card: "bg-gray-50 hover:bg-blue-50 hover:shadow-md border border-gray-200 hover:border-blue-300",
          button: {
            primary:
              "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-lg",
            secondary:
              "border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-400",
            google:
              "border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-400",
          },
          icon: "text-blue-500",
        };
      default:
        return {
          bg: "bg-gray-900 border-t-gray-800",
          text: {
            primary: "text-white",
            secondary: "text-gray-300",
            muted: "text-gray-500",
            accent: "text-purple-400",
          },
          border: "border-gray-800",
          card: "bg-gray-800/50 hover:bg-gray-800 hover:shadow-lg",
          button: {
            primary:
              "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-lg",
            secondary:
              "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-600",
            google:
              "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-600",
          },
          icon: "text-purple-400",
        };
    }
  };

  if (!isMenuOpen) return null;

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

  const FeatureIcon = ({ name }) => {
    switch (name) {
      case t("navigation.features"):
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        );
      case t("navigation.pricing"):
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case t("navigation.blog"):
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        );
      case t("navigation.help"):
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`lg:hidden mt-4 fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto animate-slideIn border-t ${themeStyles.bg} backdrop-blur-xl`}
    >
      <div className="p-6">
        <div className="space-y-2 mb-8">
          {navLinks.map((link, idx) => (
            <div
              key={idx}
              className={`rounded-xl overflow-hidden border ${themeStyles.border}`}
            >
              {link.hasDropdown ? (
                <>
                  <button
                    onClick={() =>
                      setExpandedSection(
                        expandedSection === "features" ? null : "features",
                      )
                    }
                    className={`flex items-center justify-between w-full text-left font-medium p-4 transition-all duration-200 ${themeStyles.card} ${themeStyles.text.primary}`}
                  >
                    <div className="flex items-center space-x-3">
                      <FeatureIcon name={link.label} />
                      <span className="font-semibold">{link.label}</span>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform duration-200 ${themeStyles.icon} ${
                        expandedSection === "features" ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {expandedSection === "features" && (
                    <div className="px-4 pb-4 space-y-2">
                      {features.map((category, catIdx) => (
                        <div key={catIdx} className="mb-4">
                          <h4
                            className={`text-xs font-semibold uppercase tracking-wider mb-2 ${themeStyles.text.muted}`}
                          >
                            {category.category}
                          </h4>
                          <div className="space-y-2">
                            {category.items.map((item, itemIdx) => {
                              const ItemIcon = item.Icon;
                              return (
                                <button
                                  key={itemIdx}
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    scrollToSection("features");
                                  }}
                                  className={`flex items-center space-x-3 p-2.5 rounded-lg transition-all duration-200 w-full text-left ${themeStyles.card} ${themeStyles.text.secondary}`}
                                >
                                  <div
                                    className={`p-1.5 rounded ${iconColors[ItemIcon.name] || "text-gray-500"}`}
                                  >
                                    <ItemIcon className="w-4 h-4" />
                                  </div>
                                  <span>{item.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => {
                    if (link.onClick) link.onClick();
                    else if (link.href) window.open(link.href, "_blank");
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full text-left p-4 transition-all duration-200 ${themeStyles.card} ${themeStyles.text.primary}`}
                >
                  <FeatureIcon name={link.label} />
                  <span className="font-semibold">{link.label}</span>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-4 mb-8">
          <button
            onClick={goToLogin}
            className={`w-full flex items-center justify-center space-x-3 px-6 py-4 font-bold rounded-xl transition-all duration-200 border ${themeStyles.button.google}`}
          >
            <div className="flex items-center justify-center w-6 h-6">
              <GoogleIcon className="w-5 h-5" />
            </div>
            <span>{t("mobile.googleSignIn")}</span>
          </button>

          <button
            onClick={() => {
              setIsMenuOpen(false);
              scrollToSection("pricing");
            }}
            className={`w-full flex items-center justify-center space-x-3 px-6 py-4 font-bold rounded-xl transition-all duration-200 bg-gradient-to-r ${themeStyles.button.primary} text-white`}
          >
            <div className="flex items-center justify-center w-6 h-6">
              <GoogleIcon className="w-5 h-5" />
            </div>
            <span>{t("mobile.emailSignUp")}</span>
          </button>

          <div className="text-center pt-4">
            <span className={`text-sm ${themeStyles.text.secondary}`}>
              {t("mobile.haveAccount")}{" "}
            </span>
            <button
              onClick={goToLogin}
              className={`text-sm font-semibold ${themeStyles.text.accent} hover:underline transition-all duration-200`}
            >
              <span className="flex items-center space-x-1">
                <LogIn className="w-4 h-4" />
                <span>{t("mobile.login")}</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
