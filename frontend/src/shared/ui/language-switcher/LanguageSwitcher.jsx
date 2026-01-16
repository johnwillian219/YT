// frontend/src/shared/ui/language-switcher/LanguageSwitcher.jsx
import React, { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useI18n } from "../../../app/bootstrap/i18n-provider";
import { useTheme } from "../../../app/bootstrap/theme-provider";

const LanguageSwitcher = () => {
  const { locale, setLocale, isLoading } = useI18n();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fechar dropdown ao clicar fora
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
    {
      code: "pt-BR",
      name: "Português",
      nativeName: "Português (BR)",
      flag: "🇧🇷",
    },
    {
      code: "en-US",
      name: "English",
      nativeName: "English (US)",
      flag: "🇺🇸",
    },
    {
      code: "es-ES",
      name: "Español",
      nativeName: "Español",
      flag: "🇪🇸",
    },
    {
      code: "fr-FR",
      name: "Français",
      nativeName: "Français",
      flag: "🇫🇷",
    },
    {
      code: "de-DE",
      name: "Deutsch",
      nativeName: "Deutsch",
      flag: "🇩🇪",
    },
    {
      code: "it-IT",
      name: "Italiano",
      nativeName: "Italiano",
      flag: "🇮🇹",
    },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  // Estilos baseados no tema
  const getThemeStyles = () => {
    const base = {
      light: {
        bg: "bg-white",
        hoverBg: "hover:bg-gray-50",
        text: "text-gray-700",
        border: "border-gray-200",
        shadow: "shadow-lg",
      },
      dark: {
        bg: "bg-gray-900",
        hoverBg: "hover:bg-gray-800",
        text: "text-gray-200",
        border: "border-gray-700",
        shadow: "shadow-2xl",
      },
      cyberpunk: {
        bg: "bg-gray-900/95 backdrop-blur-lg",
        hoverBg: "hover:bg-gray-800/70",
        text: "text-gray-100",
        border: "border-cyan-500/30",
        shadow: "shadow-2xl shadow-cyan-500/10",
      },
    };

    return base[theme] || base.dark;
  };

  const themeStyles = getThemeStyles();

  const handleLanguageChange = (langCode) => {
    // IMPORTANTE: Verifique se setLocale é uma função
    if (typeof setLocale === "function") {
      setLocale(langCode);
    } else {
      console.error("setLocale não é uma função. Valor atual:", setLocale);
    }
    setIsOpen(false);
  };

  // Se ainda estiver carregando, mostre um botão desabilitado
  if (isLoading) {
    return (
      <button
        disabled
        className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">...</span>
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão do seletor */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center gap-2 px-3 py-2 
          rounded-lg transition-all duration-200
          ${themeStyles.bg} ${themeStyles.text} ${themeStyles.border} border
          hover:scale-105 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-cyan-500/50
        `}
        aria-label={`Idioma atual: ${currentLanguage.name}. Clique para alterar`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">
          {currentLanguage.code === "pt-BR" ?
            "PT"
          : currentLanguage.code === "en-US" ?
            "EN"
          : currentLanguage.code === "es-ES" ?
            "ES"
          : currentLanguage.code === "fr-FR" ?
            "FR"
          : currentLanguage.code === "de-DE" ?
            "DE"
          : currentLanguage.code === "it-IT" ?
            "IT"
          : "PT"}
        </span>
        <span className="sm:hidden">{currentLanguage.flag}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`
            absolute right-0 mt-2 w-56 
            rounded-xl ${themeStyles.shadow} border ${themeStyles.border}
            ${themeStyles.bg} z-50 animate-fadeIn
          `}
        >
          <div className="p-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Selecione o idioma
            </h3>

            <div className="space-y-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5
                    rounded-lg transition-all duration-150
                    ${themeStyles.hoverBg}
                    ${locale === language.code ? "bg-cyan-500/10" : ""}
                    focus:outline-none focus:ring-1 focus:ring-cyan-500/30
                  `}
                  aria-label={`Alterar para ${language.nativeName}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{language.flag}</span>
                    <div className="text-left">
                      <div className={`font-medium ${themeStyles.text}`}>
                        {language.nativeName}
                      </div>
                      <div className="text-xs text-gray-400">
                        {language.name}
                      </div>
                    </div>
                  </div>

                  {locale === language.code && (
                    <Check className="w-4 h-4 text-cyan-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
