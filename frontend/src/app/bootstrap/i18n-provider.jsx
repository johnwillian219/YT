import React, { useEffect, useState, useRef } from "react";

// Mapeamento de idiomas do navegador para os suportados pelo app
const SUPPORTED_LOCALES = [
  "pt-BR",
  "en-US",
  "es-ES",
  "fr-FR",
  "de-DE",
  "it-IT",
];

// Mapeamento de fallback (idioma do browser -> idioma suportado)
const LANGUAGE_MAP = {
  // Português
  pt: "pt-BR",
  "pt-BR": "pt-BR",
  "pt-PT": "pt-BR",
  "pt-AO": "pt-BR",
  "pt-MZ": "pt-BR",

  // Inglês
  en: "en-US",
  "en-US": "en-US",
  "en-GB": "en-US",
  "en-CA": "en-US",
  "en-AU": "en-US",
  "en-NZ": "en-US",
  "en-IN": "en-US",

  // Espanhol
  es: "es-ES",
  "es-ES": "es-ES",
  "es-MX": "es-ES",
  "es-AR": "es-ES",
  "es-CL": "es-ES",
  "es-CO": "es-ES",
  "es-PE": "es-ES",
  "es-VE": "es-ES",

  // Francês
  fr: "fr-FR",
  "fr-FR": "fr-FR",
  "fr-CA": "fr-FR",
  "fr-BE": "fr-FR",
  "fr-CH": "fr-FR",

  // Alemão
  de: "de-DE",
  "de-DE": "de-DE",
  "de-AT": "de-DE",
  "de-CH": "de-DE",

  // Italiano
  it: "it-IT",
  "it-IT": "it-IT",
  "it-CH": "it-IT",

  // Fallback padrão
  default: "pt-BR",
};

// Função para detectar e normalizar idioma do browser
function detectBrowserLanguage() {
  try {
    // 1. Tenta pegar o idioma salvo no localStorage primeiro (preferência do usuário)
    const savedLocale = localStorage.getItem("ninjatube-locale");
    if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
      console.log("🌐 Usando idioma salvo:", savedLocale);
      return savedLocale;
    }

    // 2. Detecta idioma do navegador
    const browserLanguage =
      navigator.language ||
      navigator.userLanguage ||
      navigator.languages?.[0] ||
      "pt-BR";

    console.log("🌐 Idioma do navegador detectado:", browserLanguage);

    // 3. Normaliza o idioma (ex: 'pt' -> 'pt-BR', 'en' -> 'en-US')
    const normalizedLocale =
      LANGUAGE_MAP[browserLanguage] ||
      LANGUAGE_MAP[browserLanguage.split("-")[0]] ||
      LANGUAGE_MAP.default;

    console.log("🌐 Idioma normalizado para:", normalizedLocale);
    return normalizedLocale;
  } catch (error) {
    console.warn(
      "⚠️ Erro ao detectar idioma, usando pt-BR como fallback:",
      error
    );
    return "pt-BR";
  }
}

// Crie um contexto para compartilhar as traduções
export const I18nContext = React.createContext({
  locale: "pt-BR",
  setLocale: () => {},
  translations: {},
  t: (key) => key,
  isLoading: false,
  isTransitioning: false,
});

export function I18nProvider({ locale, setLocale, children }) {
  // Detecta idioma do browser apenas na primeira renderização
  const [initialLocale] = useState(() => {
    const detectedLocale = detectBrowserLanguage();
    console.log("🌐 Idioma inicial definido como:", detectedLocale);
    return detectedLocale;
  });

  // Se o locale passado como prop for diferente do inicial, usa o passado
  const effectiveLocale = locale || initialLocale;

  // Estados principais
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Refs para cache e controle
  const previousTranslationsRef = useRef({});
  const currentTranslationsRef = useRef({});
  const previousLocaleRef = useRef(effectiveLocale);
  const transitionStartTimeRef = useRef(null);

  // Efeito para carregar traduções quando o locale mudar
  useEffect(() => {
    const loadTranslations = async () => {
      // Salva as traduções atuais como anteriores antes de começar
      previousTranslationsRef.current = { ...currentTranslationsRef.current };
      transitionStartTimeRef.current = Date.now();

      // Só inicia transição se o locale realmente mudou
      if (previousLocaleRef.current !== effectiveLocale) {
        setIsTransitioning(true);
        setIsLoading(true);
        previousLocaleRef.current = effectiveLocale;
      }

      try {
        console.log(`🌐 Carregando traduções para: ${effectiveLocale}`);

        // Carregar módulos de tradução dinamicamente
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
        ];
        const loadedTranslations = {};

        for (const module of modulesToLoad) {
          try {
            const moduleTranslations = await import(
              /* @vite-ignore */
              `../../locales/${effectiveLocale}/${module}.json`
            );
            loadedTranslations[module] =
              moduleTranslations.default || moduleTranslations;
            console.log(`✅ Módulo ${module} carregado`);
          } catch (error) {
            console.warn(
              `⚠️ Módulo ${module} não encontrado para ${effectiveLocale}, usando objeto vazio`
            );
            loadedTranslations[module] = {};
          }
        }

        // Atualiza as traduções atuais
        currentTranslationsRef.current = loadedTranslations;
        setTranslations(loadedTranslations);

        // Atualiza storage e DOM
        localStorage.setItem("ninjatube-locale", effectiveLocale);
        document.documentElement.lang = effectiveLocale;

        // Atualiza o título da página com o idioma
        if (typeof document !== "undefined") {
          const currentTitle = document.title;
          const cleanTitle = currentTitle.replace(/\[.*\]/, "");
          document.title = `${cleanTitle.trim()} [${effectiveLocale}]`;
        }

        console.log(`🌐 Idioma aplicado: ${effectiveLocale}`);
      } catch (error) {
        console.error("❌ Erro ao carregar traduções:", error);
        // Fallback para português se houver erro
        if (effectiveLocale !== "pt-BR") {
          console.log("🔄 Fallback para pt-BR devido a erro");
          setLocale("pt-BR");
        }
      } finally {
        setIsLoading(false);

        // Tempo mínimo de transição para garantir suavidade
        const elapsedTime = Date.now() - transitionStartTimeRef.current;
        const minTransitionTime = 300; // 300ms mínimo
        const remainingTime = Math.max(minTransitionTime - elapsedTime, 0);

        setTimeout(() => {
          setIsTransitioning(false);
        }, remainingTime);
      }
    };

    loadTranslations();
  }, [effectiveLocale, setLocale]);

  // Função auxiliar para obter traduções COM CACHE INTELIGENTE
  const t = (key, module = "common") => {
    const keys = key.split(".");

    // 1. PRIMEIRO: Tenta pegar da NOVA tradução (já carregada)
    let value = translations[module];

    // Navega pelas chaves aninhadas
    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }

    // Se encontrou na nova tradução, retorna
    if (value !== undefined && value !== null && value !== "") {
      return value;
    }

    // 2. SE ESTÁ EM TRANSIÇÃO E NÃO ENCONTROU, USA A TRADUÇÃO ANTERIOR
    if (isTransitioning) {
      let previousValue = previousTranslationsRef.current[module];

      for (const k of keys) {
        if (previousValue && typeof previousValue === "object") {
          previousValue = previousValue[k];
        } else {
          previousValue = undefined;
          break;
        }
      }

      // Se encontrou na tradução anterior, retorna ela
      if (
        previousValue !== undefined &&
        previousValue !== null &&
        previousValue !== ""
      ) {
        return previousValue;
      }
    }

    // 3. SE NÃO ENCONTROU EM LUGAR NENHUM, RETORNA A CHAVE
    // (Apenas logamos em desenvolvimento para debug)
    if (process.env.NODE_ENV === "development") {
      console.warn(`🔍 Tradução não encontrada: ${module}.${key}`);
    }

    return key;
  };

  const value = {
    locale: effectiveLocale,
    setLocale,
    translations,
    t,
    isLoading: isTransitioning,
    isTransitioning,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// Hook para usar o contexto
export const useI18n = () => {
  const context = React.useContext(I18nContext);
  if (!context) {
    console.warn("useI18n usado fora de I18nProvider - retornando fallback");
    return {
      locale: "pt-BR",
      setLocale: () => {},
      translations: {},
      t: (key) => key,
      isLoading: false,
      isTransitioning: false,
    };
  }
  return context;
};

// Exportação padrão para compatibilidade
export default I18nProvider;
