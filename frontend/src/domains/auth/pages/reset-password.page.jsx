// frontend/src/domains/auth/pages/reset-password.page.jsx
import React from "react";
import { AnimatedBackground } from "./background";
import { useTheme } from "../../../app/bootstrap/theme-provider";
import { useI18n } from "../../../app/bootstrap/i18n-provider";
import ResetPasswordForm from "../ui/reset-password-form/ResetPasswordForm";
import AuthLayout from "../ui/auth-layout/AuthLayout";

export default function ResetPasswordPage() {
  const { theme } = useTheme();
  const { t } = useI18n();

  // Função auxiliar para traduções
  const translate = (key) => t(key, "reset-password");

  const handleSuccess = () => {
    console.log("Senha redefinida com sucesso!");
    // Você pode mostrar um toast ou notificação aqui
  };

  const handleError = (error) => {
    console.error("Reset password error:", error);
    // Você pode mostrar um toast ou notificação aqui
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />

      {theme === "cyberpunk" && (
        <>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyberpunk-pink-30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyberpunk-blue-30 rounded-full blur-3xl animate-pulse delay-1000" />
        </>
      )}

      <div className="relative w-full max-w-md z-20">
        <AuthLayout
          title={translate("title")}
          subtitle={translate("subtitle")}
          showDecoration={true}
        >
          <ResetPasswordForm
            onSuccess={handleSuccess}
            onError={handleError}
            showBackLink={true}
          />
        </AuthLayout>
      </div>
    </div>
  );
}
