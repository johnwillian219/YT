// frontend/src/app/bootstrap/subscription-provider.jsx - VERSÃO MOCK
import React, { createContext, useContext, useState, useEffect } from "react";

const SubscriptionContext = createContext(null);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscription must be used within SubscriptionProvider");
  }
  return context;
};

export const SubscriptionProvider = ({ children }) => {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [usage, setUsage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // ✅ MOCK: Carregar dados fake
    const loadMockData = async () => {
      setIsLoading(true);

      // Simular delay de carregamento
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Dados MOCK
      setCurrentPlan({
        id: "free",
        name: "Free Plan",
        price: 0,
        features: ["Analytics básicos", "3 canais", "Suporte por email"],
      });

      setSubscription({
        status: "active",
        currentPeriodEnd: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        cancelAtPeriodEnd: false,
      });

      setUsage({
        channels: { used: 1, limit: 3 },
        analytics: { used: 50, limit: 100 },
        exports: { used: 2, limit: 5 },
      });

      setIsLoading(false);
    };

    loadMockData();
  }, []);

  const upgradePlan = async (planId) => {
    console.log(`🎭 MOCK: Upgrading to plan ${planId}`);
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, message: "Plano atualizado (MOCK)" };
  };

  const cancelSubscription = async () => {
    console.log("🎭 MOCK: Cancelling subscription");
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, message: "Assinatura cancelada (MOCK)" };
  };

  const value = {
    currentPlan,
    subscription,
    usage,
    isLoading,
    upgradePlan,
    cancelSubscription,
    isSubscribed: subscription?.status === "active",
    isOnFreePlan: currentPlan?.id === "free",
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionProvider;
