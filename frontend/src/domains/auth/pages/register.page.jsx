// frontend/src/domains/auth/pages/register.page.jsx
import React, { useEffect } from "react";
import { useI18n } from "../../../app/bootstrap/i18n-provider";
import AuthLayout from "../ui/auth-layout/AuthLayout";
import RegisterForm from "../ui/register-form/RegisterForm";

export default function RegisterPage() {
  const { t, locale, isLoading: i18nLoading, translations } = useI18n();

  // Debug para verificar traduções
  useEffect(() => {
    console.log("🔍 DEBUG RegisterPage:");
    console.log("🌐 Idioma atual:", locale);
    console.log("🔄 Carregando i18n?:", i18nLoading);
    console.log("📚 Traduções carregadas:", Object.keys(translations));
    console.log("📖 Módulo register existe?:", !!translations.register);
    if (translations.register) {
      console.log("📝 Conteúdo do register:", translations.register);
    }
  }, [locale, i18nLoading, translations]);

  // Usar a mesma lógica do login
  const translate = (key) => t(key, "register");

  const handleRegisterSuccess = () => {
    // Redirecionar para verificação de email ou dashboard
    window.location.href = "/auth/verify-email";
  };

  const handleRegisterError = (error) => {
    console.error("Registration error:", error);
  };

  return (
    <AuthLayout
      title={translate("title")}
      subtitle={translate("subtitle")}
      type="register"
      showBackLink={false}
    >
      <RegisterForm
        onSuccess={handleRegisterSuccess}
        onError={handleRegisterError}
        showLoginLink={true}
        showGoogleOAuth={true}
      />
    </AuthLayout>
  );
}
