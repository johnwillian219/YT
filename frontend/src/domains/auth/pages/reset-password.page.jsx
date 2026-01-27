// frontend/src/domains/auth/pages/reset-password.page.jsx
import React, { useEffect } from "react";
import { useI18n } from "../../../app/bootstrap/i18n-provider";
import AuthLayout from "../ui/auth-layout/AuthLayout";
import ResetPasswordForm from "../ui/reset-password-form/ResetPasswordForm";

export default function ResetPasswordPage() {
  const { t, locale, isLoading: i18nLoading, translations } = useI18n();

  useEffect(() => {
    console.log("🔍 DEBUG ResetPasswordPage:");
    console.log("🌐 Idioma atual:", locale);
    console.log("🔄 Carregando i18n?:", i18nLoading);
    console.log("📚 Traduções carregadas:", Object.keys(translations));
    console.log(
      "📖 Módulo reset-password existe?:",
      !!translations["reset-password"],
    );
  }, [locale, i18nLoading, translations]);

  const translate = (key) => t(key, "reset-password");

  const handleSuccess = () => {
    console.log("✅ Senha redefinida com sucesso!");
  };

  const handleError = (error) => {
    console.error("❌ Reset password error:", error);
  };

  return (
    <AuthLayout
      title={translate("title")}
      subtitle={translate("subtitle")}
      type="reset-password"
      showBackLink={false}
    >
      <ResetPasswordForm
        onSuccess={handleSuccess}
        onError={handleError}
        showBackLink={false}
      />
    </AuthLayout>
  );
}
