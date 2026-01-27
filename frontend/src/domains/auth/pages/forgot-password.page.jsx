// frontend/src/domains/auth/pages/forgot-password.page.jsx
import React, { useEffect } from "react";
import { useI18n } from "../../../app/bootstrap/i18n-provider";
import AuthLayout from "../ui/auth-layout/AuthLayout";
import ForgotPasswordForm from "../ui/forgot-password-form/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const { t, locale, isLoading: i18nLoading, translations } = useI18n();

  useEffect(() => {
    console.log("🔍 DEBUG ForgotPasswordPage:");
    console.log("🌐 Idioma atual:", locale);
    console.log("🔄 Carregando i18n?:", i18nLoading);
    console.log("📚 Traduções carregadas:", Object.keys(translations));
    console.log(
      "📖 Módulo forgot-password existe?:",
      !!translations["forgot-password"],
    );
  }, [locale, i18nLoading, translations]);

  const translate = (key) => t(key, "forgot-password");

  const handleSuccess = (email) => {
    console.log(`Email de recuperação enviado para: ${email}`);
  };

  const handleError = (error) => {
    console.error("Forgot password error:", error);
  };

  return (
    <AuthLayout
      title={translate("title")}
      subtitle={translate("subtitle")}
      type="forgot-password"
      showBackLink={false}
    >
      <ForgotPasswordForm
        onSuccess={handleSuccess}
        onError={handleError}
        showBackLink={true}
      />
    </AuthLayout>
  );
}
