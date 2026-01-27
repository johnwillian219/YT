import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "../../../app/bootstrap/i18n-provider";
import AuthLayout from "../ui/auth-layout/AuthLayout";
import VerifyEmailForm from "../ui/verify-email/VerifyEmailForm";
import { useAuth } from "../../../app/bootstrap/auth-provider";

export default function VerifyEmailPage() {
  const { t, locale, isLoading: i18nLoading, translations } = useI18n();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [initialToken, setInitialToken] = useState("");

  // Debug para verificar traduções
  useEffect(() => {
    console.log("🔍 DEBUG VerifyEmailPage:");
    console.log("🌐 Idioma atual:", locale);
    console.log("🔄 Carregando i18n?:", i18nLoading);
    console.log("📚 Traduções carregadas:", Object.keys(translations));
    console.log(
      "📖 Módulo verify-email existe?:",
      !!translations["verify-email"],
    );
  }, [locale, i18nLoading, translations]);

  // Função de tradução
  const translate = (key) => t(key, "verify-email");

  useEffect(() => {
    // Verificar se tem token na URL (vindo do email)
    const params = new URLSearchParams(location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      console.log("🔑 Token encontrado na URL");
      setInitialToken(urlToken);
    }

    // Pegar email do state ou localStorage
    const stateEmail = location.state?.email;
    const storedEmail = localStorage.getItem("pending_verification_email");

    if (stateEmail) {
      setEmail(stateEmail);
    } else if (storedEmail) {
      setEmail(storedEmail);
    }
  }, [location]);

  const handleVerificationSuccess = (userData) => {
    console.log("✅ Verificação bem-sucedida:", userData);

    // Login automático
    login({
      user: userData.user,
      token: userData.accessToken,
      refreshToken: userData.refreshToken,
    });
  };

  const handleVerificationError = (error) => {
    console.error("❌ Erro na verificação:", error);
  };

  const handleResendSuccess = (message) => {
    console.log("✅ Email reenviado:", message);
  };

  const handleResendError = (error) => {
    console.error("❌ Erro ao reenviar:", error);
  };

  return (
    <AuthLayout
      title={translate("title")}
      subtitle={translate("subtitle")}
      type="verify-email"
      showBackLink={false}
    >
      <VerifyEmailForm
        initialEmail={email}
        initialToken={initialToken}
        onVerificationSuccess={handleVerificationSuccess}
        onVerificationError={handleVerificationError}
        onResendSuccess={handleResendSuccess}
        onResendError={handleResendError}
        showLoginLink={true}
        showRegisterLink={true}
      />
    </AuthLayout>
  );
}
