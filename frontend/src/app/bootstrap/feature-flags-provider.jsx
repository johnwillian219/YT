// frontend/src/app/bootstrap/feature-flags-provider.jsx
// A Feature Flags Provider to manage application feature toggles.
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSubscription } from "./subscription-provider";
import { useAuth } from "./auth-provider";

const FeatureFlagsContext = createContext(null);

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagsContext);
  if (!context) {
    throw new Error(
      "useFeatureFlags must be used within a FeatureFlagsProvider",
    );
  }
  return context;
};

export const FeatureFlagsProvider = ({ children }) => {
  const [flags, setFlags] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { currentPlan } = useSubscription();
  const { user } = useAuth();

  useEffect(() => {
    const loadFeatureFlags = async () => {
      setIsLoading(true);

      // Baseado no plano
      const planFlags = currentPlan?.features || {};

      // Baseado no usuário (admin, beta tester, etc.)
      const userFlags = {
        isAdmin: user?.role === "ADMIN",
        isModerator: user?.role === "MODERATOR",
        isBetaTester: user?.isBetaTester || false,
      };

      // Flags de ambiente - usando import.meta.env para Vite
      const envFlags = {
        enableAiFeatures: import.meta.env.VITE_ENABLE_AI_FEATURES === "true",
        enableAdvancedAnalytics:
          import.meta.env.VITE_ENABLE_ADVANCED_ANALYTICS === "true",
      };

      // Combinar todas as flags
      setFlags({
        ...planFlags,
        ...userFlags,
        ...envFlags,
      });

      setIsLoading(false);
    };

    loadFeatureFlags();
  }, [currentPlan, user]);

  const isEnabled = (feature) => {
    return flags[feature] || false;
  };

  const value = {
    flags,
    isLoading,
    isEnabled,
  };

  return (
    <FeatureFlagsContext.Provider value={value}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};
