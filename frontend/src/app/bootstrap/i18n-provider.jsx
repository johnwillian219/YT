import React, { useEffect, useState, useRef, useCallback } from "react";

// Mapeamento de idiomas suportados
const SUPPORTED_LOCALES = {
  "pt-BR": "Português (Brasil)",
  "en-US": "English (US)",
  "es-ES": "Español",
  "fr-FR": "Français",
  "de-DE": "Deutsch",
  "it-IT": "Italiano",
};

// Mapeamento de fallback
const LANGUAGE_MAP = {
  // Português
  pt: "pt-BR",
  "pt-BR": "pt-BR",
  "pt-PT": "pt-BR", // Poderia criar pt-PT separado se necessário

  // Inglês
  en: "en-US",
  "en-US": "en-US",
  "en-GB": "en-US",
  "en-CA": "en-US",
  "en-AU": "en-US",

  // Espanhol
  es: "es-ES",
  "es-ES": "es-ES",
  "es-MX": "es-ES",
  "es-AR": "es-ES",

  // Francês
  fr: "fr-FR",
  "fr-FR": "fr-FR",
  "fr-CA": "fr-FR",

  // Alemão
  de: "de-DE",
  "de-DE": "de-DE",

  // Italiano
  it: "it-IT",
  "it-IT": "it-IT",
};

// Cache de traduções já carregadas
const translationsCache = new Map();

// Criar contexto
export const I18nContext = React.createContext({
  locale: "pt-BR",
  setLocale: () => {},
  translations: {},
  t: (key) => key,
  isLoading: false,
  supportedLocales: SUPPORTED_LOCALES,
  changeLanguage: async () => {},
});

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState("pt-BR");
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Detectar idioma inicial apenas uma vez
  const detectInitialLocale = useCallback(() => {
    try {
      // 1. Verificar localStorage primeiro (preferência do usuário)
      const saved = localStorage.getItem("ninjatube-locale");
      if (saved && SUPPORTED_LOCALES[saved]) {
        console.log("🌐 Usando idioma salvo:", saved);
        return saved;
      }

      // 2. Verificar URL parameter (para testes)
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get("lang");
      if (urlLang && SUPPORTED_LOCALES[urlLang]) {
        console.log("🌐 Usando idioma da URL:", urlLang);
        return urlLang;
      }

      // 3. Detectar do navegador
      const browserLang =
        navigator.language || navigator.userLanguage || "pt-BR";
      console.log("🌐 Idioma do navegador:", browserLang);

      // Normalizar o idioma
      const normalized =
        LANGUAGE_MAP[browserLang] ||
        LANGUAGE_MAP[browserLang.split("-")[0]] ||
        "pt-BR";

      console.log("🌐 Idioma normalizado:", normalized);
      return normalized;
    } catch (error) {
      console.warn("⚠️ Erro na detecção de idioma:", error);
      return "pt-BR";
    }
  }, []);

  // Função para mudar idioma
  const changeLanguage = useCallback(
    async (newLocale) => {
      if (!SUPPORTED_LOCALES[newLocale] || newLocale === locale) {
        return;
      }

      try {
        setIsLoading(true);
        console.log(`🌐 Mudando para idioma: ${newLocale}`);

        // Carregar traduções
        await loadTranslations(newLocale);

        // Atualizar estado
        setLocaleState(newLocale);
        localStorage.setItem("ninjatube-locale", newLocale);

        // Atualizar atributo lang do HTML
        document.documentElement.lang = newLocale;

        console.log(`✅ Idioma alterado para: ${newLocale}`);
      } catch (error) {
        console.error("❌ Erro ao mudar idioma:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [locale],
  );

  // Função para carregar traduções
  const loadTranslations = useCallback(async (targetLocale) => {
    // Verificar cache primeiro
    if (translationsCache.has(targetLocale)) {
      console.log(`🌐 Usando traduções em cache para: ${targetLocale}`);
      setTranslations(translationsCache.get(targetLocale));
      return;
    }

    try {
      const modulesToLoad = [
        "common",
        "auth",
        "landingheader",
        "herosection",
        "features",
        "pricing",
        "testimonials",
        "footer",
        "login",
        "register",
        "forgot-password",
        "reset-password",
        "common",
      ];

      const allTranslations = {};

      // Carregar todos os módulos
      for (const module of modulesToLoad) {
        try {
          const moduleData = await import(
            `../../locales/${targetLocale}/${module}.json`
          );
          allTranslations[module] = moduleData.default || moduleData;
        } catch (error) {
          console.warn(
            `⚠️ Módulo ${module} não encontrado para ${targetLocale}`,
          );
          allTranslations[module] = {};
        }
      }

      // Salvar no cache e estado
      translationsCache.set(targetLocale, allTranslations);
      setTranslations(allTranslations);
    } catch (error) {
      console.error(
        `❌ Erro ao carregar traduções para ${targetLocale}:`,
        error,
      );
      throw error;
    }
  }, []);

  // Inicialização
  useEffect(() => {
    const initialize = async () => {
      if (isInitialized) return;

      setIsLoading(true);
      const initialLocale = detectInitialLocale();

      try {
        await loadTranslations(initialLocale);
        setLocaleState(initialLocale);
        document.documentElement.lang = initialLocale;
        setIsInitialized(true);
        console.log(`🌐 Sistema i18n inicializado com: ${initialLocale}`);
      } catch (error) {
        console.error("❌ Falha na inicialização do i18n:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [detectInitialLocale, loadTranslations, isInitialized]);

  // Função de tradução
  const t = useCallback(
    (key, module = "common", params = {}) => {
      try {
        // Buscar tradução
        const moduleTranslations = translations[module];
        if (!moduleTranslations) {
          console.warn(`📂 Módulo não encontrado: ${module}`);
          return key;
        }

        // Navegar pelas chaves
        const keys = key.split(".");
        let value = moduleTranslations;

        for (const k of keys) {
          if (value && typeof value === "object" && k in value) {
            value = value[k];
          } else {
            console.warn(`🔍 Tradução não encontrada: ${module}.${key}`);
            return key;
          }
        }

        // Aplicar parâmetros se for string
        if (typeof value === "string" && params) {
          return Object.keys(params).reduce((str, paramKey) => {
            return str.replace(
              new RegExp(`{{${paramKey}}}`, "g"),
              params[paramKey],
            );
          }, value);
        }

        return value || key;
      } catch (error) {
        console.warn(`⚠️ Erro na tradução de ${module}.${key}:`, error);
        return key;
      }
    },
    [translations],
  );

  // Valor do contexto
  const contextValue = {
    locale,
    setLocale: changeLanguage,
    translations,
    t,
    isLoading,
    supportedLocales: SUPPORTED_LOCALES,
    changeLanguage,
  };

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
}

// Hook
export const useI18n = () => {
  const context = React.useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n deve ser usado dentro de I18nProvider");
  }
  return context;
};

export default I18nProvider;
