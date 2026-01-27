// frontend/src/domains/auth/pages/login.page.jsx
import React, { useEffect } from "react";
import { useI18n } from "../../../app/bootstrap/i18n-provider";
import AuthLayout from "../ui/auth-layout/AuthLayout";
import LoginForm from "../ui/login-form/LoginForm";

export default function LoginPage() {
  const { t, locale, isLoading: i18nLoading, translations } = useI18n();

  // Debug para verificar traduções
  useEffect(() => {
    console.log("🔍 DEBUG LoginPage:");
    console.log("🌐 Idioma atual:", locale);
    console.log("🔄 Carregando i18n?:", i18nLoading);
    console.log("📚 Traduções carregadas:", Object.keys(translations));
    console.log("📖 Módulo login existe?:", !!translations.login);
    if (translations.login) {
      console.log("📝 Conteúdo do login:", translations.login);
    }
  }, [locale, i18nLoading, translations]);

  // CORREÇÃO: Usar igual ao forgot-password
  const translate = (key) => t(key, "login");

  return (
    <AuthLayout
      title={translate("title")}
      subtitle={translate("subtitle")}
      type="login"
      showBackLink={false}
    >
      <LoginForm
        onSuccess={() => (window.location.href = "/dashboard")}
        onError={(error) => console.error("Login error:", error)}
        showRegisterLink={true}
        showForgotPassword={true}
        showProviders={true}
      />
    </AuthLayout>
  );
}
