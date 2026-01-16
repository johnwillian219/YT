// frontend/src/app/bootstrap/app-providers.jsx
import React, { useState } from "react";
import { ThemeProvider } from "./theme-provider";
import I18nProvider from "./i18n-provider";

export function AppProviders({ children }) {
  // Estado vazio - o I18nProvider agora detecta automaticamente
  const [locale, setLocale] = useState(null); // null para usar detecção automática

  return (
    <ThemeProvider>
      {/* Passa locale como null para usar detecção automática */}
      <I18nProvider locale={locale} setLocale={setLocale}>
        {children}
      </I18nProvider>
    </ThemeProvider>
  );
}
