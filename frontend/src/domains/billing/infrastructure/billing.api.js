// frontend/src/domains/billing/infrastructure/billing.api.js - VERSÃO MOCK
// Se este arquivo existir, substitua por:

const mockApi = {
  getCurrentPlan: async () => {
    console.log("🎭 MOCK: Obtendo plano atual");
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      data: {
        plan: {
          id: "free",
          name: "Free Plan",
          price: 0,
          features: ["Basic analytics", "3 channels", "Email support"],
        },
      },
    };
  },

  getSubscription: async () => {
    console.log("🎭 MOCK: Obtendo assinatura");
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      data: {
        subscription: {
          status: "active",
          currentPeriodEnd: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      },
    };
  },

  getUsage: async () => {
    console.log("🎭 MOCK: Obtendo uso");
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      data: {
        usage: {
          channels: { used: 1, limit: 3 },
          analytics: { used: 50, limit: 100 },
        },
      },
    };
  },
};

export const getCurrentPlan = mockApi.getCurrentPlan;
export const getSubscription = mockApi.getSubscription;
export const getUsage = mockApi.getUsage;
