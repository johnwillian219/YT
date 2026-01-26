// frontend/src/public/landing/components/LanguageSwitcher.jsx
import React, { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";

const LanguageSwitcher = ({
  locale,
  setLocale,
  isLoading,
  theme,
  size = "desktop",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: "pt-BR", name: "Português", flag: "🇧🇷" },
    { code: "en-US", name: "English", flag: "🇺🇸" },
    { code: "es-ES", name: "Español", flag: "🇪🇸" },
    { code: "fr-FR", name: "Français", flag: "🇫🇷" },
    { code: "de-DE", name: "Deutsch", flag: "🇩🇪" },
    { code: "it-IT", name: "Italiano", flag: "🇮🇹" },
  ];

  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          button:
            "bg-gray-900/20 hover:bg-cyan-500/20 border-cyan-500/30 text-cyan-100 hover:text-white",
          dropdown:
            "bg-gray-900/95 backdrop-blur-xl border-cyan-500/30 text-cyan-100",
          hover: "hover:bg-cyan-500/20 hover:text-cyan-300",
          active: "bg-cyan-500/10 text-cyan-300",
          accent: "text-cyan-400",
          check: "text-cyan-400",
          hoverEffect: "hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]",
        };
      case "dark":
        return {
          button:
            "bg-gray-800/20 hover:bg-purple-500/20 border-gray-700 text-gray-300 hover:text-white",
          dropdown: "bg-gray-900 border-gray-700 text-gray-200",
          hover: "hover:bg-purple-500/10 hover:text-white",
          active: "bg-purple-500/10 text-purple-300",
          accent: "text-purple-400",
          check: "text-purple-400",
          hoverEffect: "hover:shadow-lg",
        };
      case "light":
        return {
          button:
            "bg-white hover:bg-blue-50 border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-400",
          dropdown: "bg-white border-gray-200 text-gray-800 shadow-xl",
          hover: "hover:bg-blue-50 hover:text-blue-600",
          active: "bg-blue-500/10 text-blue-600 border-blue-200",
          accent: "text-blue-500",
          check: "text-blue-500",
          hoverEffect: "hover:shadow-md",
        };
      default:
        return {
          button:
            "bg-gray-800/20 hover:bg-purple-500/20 border-gray-700 text-gray-300 hover:text-white",
          dropdown: "bg-gray-900 border-gray-700 text-gray-200",
          hover: "hover:bg-purple-500/10 hover:text-white",
          active: "bg-purple-500/10 text-purple-300",
          accent: "text-purple-400",
          check: "text-purple-400",
          hoverEffect: "hover:shadow-lg",
        };
    }
  };

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];
  const themeStyles = getThemeStyles();

  const handleLanguageChange = (langCode) => {
    if (typeof setLocale === "function") {
      setLocale(langCode);
    }
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <button
        disabled
        className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border ${themeStyles.button} cursor-not-allowed opacity-50 ${size === "mobile" ? "h-11" : ""}`}
      >
        {size === "mobile" ? (
          <span className="text-lg">{currentLanguage.flag}</span>
        ) : (
          <Globe className="w-4 h-4" />
        )}
        <span className="text-sm font-medium hidden sm:inline">
          {currentLanguage.code.split("-")[0].toUpperCase()}
        </span>
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border transition-all duration-200 ${themeStyles.button} ${themeStyles.hoverEffect} hover:scale-105 active:scale-95 ${size === "mobile" ? "h-11" : ""}`}
        aria-label={`Idioma: ${currentLanguage.name}`}
      >
        {size === "mobile" ? (
          <span className="text-lg">{currentLanguage.flag}</span>
        ) : (
          <Globe className="w-4 h-4" />
        )}

        {/* Mostrar código do idioma apenas em desktop e telas maiores */}
        <span className="text-sm font-medium hidden sm:inline">
          {currentLanguage.code.split("-")[0].toUpperCase()}
        </span>

        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-xl border shadow-lg z-50 animate-fadeIn ${themeStyles.dropdown} backdrop-blur-xl`}
        >
          <div className="p-2 space-y-1">
            <div className="px-3 py-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Idioma
              </h3>
            </div>
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-150 ${themeStyles.hover}
                  ${locale === language.code ? themeStyles.active : ""} border border-transparent hover:border-current/20`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{language.flag}</span>
                  <span className="font-medium">{language.name}</span>
                </div>
                {locale === language.code && (
                  <Check className={`w-4 h-4 ${themeStyles.check}`} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
