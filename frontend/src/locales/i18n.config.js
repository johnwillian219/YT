// frontend/src/locales/i18n.config.js
export const i18nConfig = {
  locales: ["pt-BR", "en-US", "es-ES"],
  defaultLocale: "pt-BR",
  localeNames: {
    "pt-BR": "Português (BR)",
    "en-US": "English (US)",
    "es-ES": "Español (ES)",
  },
  localeFlags: {
    "pt-BR": "🇧🇷",
    "en-US": "🇺🇸",
    "es-ES": "🇪🇸",
  },
};

// Detectar idioma do navegador
export const getBrowserLocale = () => {
  if (typeof window === "undefined") return i18nConfig.defaultLocale;

  const browserLang = navigator.language || navigator.userLanguage;

  // Mapear para os idiomas suportados
  if (browserLang.startsWith("pt")) return "pt-BR";
  if (browserLang.startsWith("en")) return "en-US";
  if (browserLang.startsWith("es")) return "es-ES";

  return i18nConfig.defaultLocale;
};
