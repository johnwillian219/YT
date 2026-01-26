// frontend/src/public/landing/pricing/PricingHeader.jsx
import React from "react";
import { TrendingUp } from "lucide-react";

const PricingHeader = ({ theme, t, billingCycle, setBillingCycle }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          badge: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
          icon: "text-cyan-400",
          title: "text-white",
          highlight: "from-cyan-400 to-pink-400",
          toggleBg: "bg-gray-900/30 border-cyan-500/20",
          toggleActive: "bg-gradient-to-r from-cyan-500 to-pink-500 text-white",
          toggleInactive: "text-cyan-300 hover:text-cyan-200",
        };
      case "dark":
        return {
          badge: "bg-purple-500/10 border-purple-500/30 text-purple-300",
          icon: "text-purple-400",
          title: "text-white",
          highlight: "from-purple-400 to-pink-400",
          toggleBg: "bg-gray-800/50 border-gray-700",
          toggleActive:
            "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
          toggleInactive: "text-gray-300 hover:text-gray-200",
        };
      case "light":
        return {
          badge:
            "bg-gradient-to-r from-blue-50 to-blue-100/80 border-blue-200 text-blue-600",
          icon: "text-blue-500",
          title: "text-gray-800",
          highlight: "from-blue-500 to-blue-600",
          toggleBg: "bg-white border-gray-300",
          toggleActive: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
          toggleInactive: "text-gray-600 hover:text-gray-800",
        };
      default:
        return {
          badge: "bg-purple-500/10 border-purple-500/30 text-purple-300",
          icon: "text-purple-400",
          title: "text-white",
          highlight: "from-purple-400 to-pink-400",
          toggleBg: "bg-gray-800/50 border-gray-700",
          toggleActive:
            "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
          toggleInactive: "text-gray-300 hover:text-gray-200",
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className="text-center mb-10">
      {/* Badge */}
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-5 ${styles.badge}`}
      >
        <TrendingUp className="w-4 h-4" />
        <span className="text-sm font-semibold">{t("header.badge")}</span>
      </div>

      {/* Título */}
      <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${styles.title}`}>
        {t("header.title")}{" "}
        <span
          className={`bg-gradient-to-r ${styles.highlight} bg-clip-text text-transparent`}
        >
          {t("header.highlight")}
        </span>
      </h2>

      {/* Toggle Billing */}
      <div className="flex justify-center mt-8">
        <div className={`inline-flex p-1 rounded-xl border ${styles.toggleBg}`}>
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 min-w-[100px] ${
              billingCycle === "monthly"
                ? `${styles.toggleActive} shadow-lg`
                : `${styles.toggleInactive} hover:bg-white/5`
            }`}
          >
            {t("billing.monthly")}
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 min-w-[100px] ${
              billingCycle === "yearly"
                ? `${styles.toggleActive} shadow-lg`
                : `${styles.toggleInactive} hover:bg-white/5`
            }`}
          >
            {t("billing.yearly")}{" "}
            <span className="text-xs ml-1 opacity-80">(-35%)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingHeader;
