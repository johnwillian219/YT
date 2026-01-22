// frontend/src/domains/auth/pages/login.page.jsx
import React, { useEffect } from "react";
import { useI18n } from "../../../app/bootstrap/i18n-provider";
import AuthLayout from "../ui/auth-layout/AuthLayout";
import LoginForm from "../ui/login-form/LoginForm";

export default function LoginPage() {
  const { t, locale, isLoading } = useI18n();

  // Função de tradução específica para o módulo login
  const translate = (key, params) => t(key, "login", params);

  // Debug para verificar as traduções
  useEffect(() => {
    console.log("🌐 LoginPage - Idioma:", locale);
    console.log("🌐 LoginPage - Carregando?", isLoading);
    console.log("🌐 Teste tradução título:", translate("title"));
  }, [locale, isLoading]);

  const handleLoginSuccess = () => {
    window.location.href = "/dashboard";
  };

  const handleLoginError = (error) => {
    console.error("Login error:", error);
  };

  return (
    <AuthLayout
      title={translate("title")}
      subtitle={translate("subtitle")}
      showDecoration={true}
    >
      <LoginForm
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
        showRegisterLink={true}
        showForgotPassword={true}
        showGoogleOAuth={true}
      />
    </AuthLayout>
  );
}
