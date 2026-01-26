// frontend/src/app/bootstrap/app-providers.jsx
import React from "react";
import { ThemeProvider } from "./theme-provider";
import I18nProvider from "./i18n-provider";
import { AuthProvider } from "./auth-provider";
import { NotificationProvider } from "./notification-provider";
import { SubscriptionProvider } from "./subscription-provider";

// Componente dummy para substituir providers problemáticos
const DummyProvider = ({ children }) => <>{children}</>;

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <NotificationProvider>
            <SubscriptionProvider>
              <DummyProvider>{children}</DummyProvider>
            </SubscriptionProvider>
          </NotificationProvider>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
