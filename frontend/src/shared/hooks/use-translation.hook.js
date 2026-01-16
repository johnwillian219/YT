// frontend/src/shared/hooks/use-translation.hook.js
import { useContext } from "react";
import { I18nContext } from "../../app/bootstrap/i18n-provider";

export function useTranslation(module = "common") {
  const context = useContext(I18nContext);

  if (!context) {
    console.warn(
      "useTranslation called outside I18nProvider, returning fallback"
    );
    return {
      locale: "pt-BR",
      setLocale: () => {},
      t: (key, options) => {
        if (options?.returnObjects) return [];
        return key;
      },
      translations: {},
      changeLocale: () => {},
    };
  }

  const { locale, setLocale, t: contextT, translations } = context;

  // Função para traduzir do módulo específico COM SUBSTITUIÇÃO DE VARIÁVEIS
  const translate = (key, options = {}) => {
    // Primeiro obtém a tradução do contexto
    let result = contextT(key, module);

    // Se retornou a própria chave (não encontrou), retorna a chave
    if (result === key) {
      return result;
    }

    // Se pediu para retornar objetos
    if (options.returnObjects && typeof result === "string") {
      try {
        // Tenta parsear como JSON
        const parsed = JSON.parse(result);
        return parsed;
      } catch (error) {
        // Se não for JSON válido, retorna a string
        return result;
      }
    }

    // Processa substituição de variáveis se houver
    if (options && typeof result === "string") {
      Object.entries(options).forEach(([param, value]) => {
        if (param !== "returnObjects") {
          const regex = new RegExp(`\\{${param}\\}`, "g");
          result = result.replace(regex, value.toString());
        }
      });
    }

    return result;
  };

  return {
    locale,
    setLocale,
    t: translate,
    translations,
    changeLocale: setLocale,
  };
}
