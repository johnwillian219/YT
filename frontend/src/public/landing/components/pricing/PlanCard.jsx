// frontend/src/public/landing/pricing/PlanCard.jsx
import React from "react";
import { Check, Star, Zap, Crown } from "lucide-react";

const PlanCard = ({ plan, billingCycle, theme, t, isYearly }) => {
  const getThemeStyles = () => {
    const base = {
      card: "border rounded-2xl p-6 md:p-7 flex flex-col h-full transition-all duration-300 relative",
      title: "font-bold",
      tagline: "text-sm",
      price: "font-extrabold",
      cta: "mt-auto py-3 rounded-xl font-bold text-base transition-all duration-200",
      feature: "text-sm",
    };

    if (plan.featured) {
      switch (theme) {
        case "cyberpunk":
          return {
            ...base,
            card: `${base.card} border-cyan-500/40 bg-gradient-to-br from-gray-900/50 via-gray-900/30 to-cyan-900/10 hover:border-cyan-500/60 hover:shadow-2xl hover:shadow-cyan-500/20 scale-[1.02] md:scale-[1.03]`,
            title: `${base.title} text-white`,
            tagline: `${base.tagline} text-cyan-300/80`,
            price: `${base.price} text-white`,
            cta: `${base.cta} bg-gradient-to-r from-cyan-500 to-pink-500 text-white hover:from-cyan-600 hover:to-pink-600 hover:shadow-xl hover:shadow-cyan-500/30`,
            feature: `${base.feature} text-cyan-200/90`,
            icon: "bg-gradient-to-r from-cyan-500 to-pink-500 text-white",
          };
        case "dark":
          return {
            ...base,
            card: `${base.card} border-purple-500/40 bg-gradient-to-br from-gray-800/50 via-gray-900/40 to-purple-900/20 hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/20 scale-[1.02] md:scale-[1.03]`,
            title: `${base.title} text-white`,
            tagline: `${base.tagline} text-purple-300/80`,
            price: `${base.price} text-white`,
            cta: `${base.cta} bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:shadow-xl hover:shadow-purple-500/30`,
            feature: `${base.feature} text-gray-200`,
            icon: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
          };
        case "light":
          return {
            ...base,
            card: `${base.card} border-blue-300 bg-gradient-to-br from-white via-blue-50/50 to-white hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/20 scale-[1.02] md:scale-[1.03]`,
            title: `${base.title} text-gray-800`,
            tagline: `${base.tagline} text-blue-600/90`,
            price: `${base.price} text-gray-800`,
            cta: `${base.cta} bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-500/30`,
            feature: `${base.feature} text-gray-700`,
            icon: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
          };
        default:
          return {
            ...base,
            card: `${base.card} border-purple-500/40 bg-gradient-to-br from-gray-800/50 via-gray-900/40 to-purple-900/20 hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/20 scale-[1.02] md:scale-[1.03]`,
            title: `${base.title} text-white`,
            tagline: `${base.tagline} text-purple-300/80`,
            price: `${base.price} text-white`,
            cta: `${base.cta} bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:shadow-xl hover:shadow-purple-500/30`,
            feature: `${base.feature} text-gray-200`,
            icon: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
          };
      }
    } else {
      switch (theme) {
        case "cyberpunk":
          return {
            ...base,
            card: `${base.card} border-cyan-500/20 bg-gray-900/30 hover:border-cyan-500/40 hover:bg-gray-900/40`,
            title: `${base.title} text-cyan-100`,
            tagline: `${base.tagline} text-cyan-300/70`,
            price: `${base.price} text-cyan-100`,
            cta: `${base.cta} bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-200 border border-cyan-500/30`,
            feature: `${base.feature} text-cyan-300/80`,
            icon:
              plan.id === "proPlus"
                ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400"
                : "bg-gray-800 text-gray-400",
          };
        case "dark":
          return {
            ...base,
            card: `${base.card} border-gray-700/50 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-800/40`,
            title: `${base.title} text-white`,
            tagline: `${base.tagline} text-gray-400`,
            price: `${base.price} text-white`,
            cta: `${base.cta} bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white`,
            feature: `${base.feature} text-gray-300`,
            icon:
              plan.id === "proPlus"
                ? "bg-blue-500/20 text-blue-400"
                : "bg-gray-700 text-gray-400",
          };
        case "light":
          return {
            ...base,
            card: `${base.card} border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg`,
            title: `${base.title} text-gray-800`,
            tagline: `${base.tagline} text-gray-600`,
            price: `${base.price} text-gray-800`,
            cta: `${base.cta} bg-gray-800 text-white hover:bg-gray-900`,
            feature: `${base.feature} text-gray-700`,
            icon:
              plan.id === "proPlus"
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600",
          };
        default:
          return {
            ...base,
            card: `${base.card} border-gray-700/50 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-800/40`,
            title: `${base.title} text-white`,
            tagline: `${base.tagline} text-gray-400`,
            price: `${base.price} text-white`,
            cta: `${base.cta} bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white`,
            feature: `${base.feature} text-gray-300`,
            icon:
              plan.id === "proPlus"
                ? "bg-blue-500/20 text-blue-400"
                : "bg-gray-700 text-gray-400",
          };
      }
    }
  };

  const styles = getThemeStyles();

  // Preços fixos
  const PRICES = {
    free: 0,
    pro: {
      monthly: 9.99,
      yearly: 77.96, // ≈6.50€/mês
    },
    proPlus: {
      monthly: 8.99,
      yearly: 71.92,
    },
  };

  const getPlanIcon = () => {
    switch (plan.id) {
      case "free":
        return <Star className="w-6 h-6" />;
      case "pro":
        return <Zap className="w-6 h-6" />;
      case "proPlus":
        return <Crown className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  const getPriceDisplay = () => {
    if (plan.id === "free") {
      return "€0";
    }

    const price = isYearly ? PRICES[plan.id].yearly : PRICES[plan.id].monthly;
    return `€${price.toFixed(2)}`;
  };

  const getPeriodDisplay = () => {
    if (plan.id === "free") return "";
    return isYearly ? t("priceDisplay.perYear") : t("priceDisplay.perMonth");
  };

  const getYearlySavings = () => {
    if (plan.id === "free" || !isYearly) return null;
    const monthly = PRICES[plan.id].monthly;
    const yearly = PRICES[plan.id].yearly;
    const monthlyEquivalent = yearly / 12;
    const savings = (((monthly - monthlyEquivalent) / monthly) * 100).toFixed(
      0,
    );
    return `${savings}%`;
  };

  return (
    <div className={`${styles.card} animate-slideUp`}>
      {/* Badge - APENAS NO DESKTOP */}
      {plan.badge && (
        <div
          className={`hidden md:block absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg z-10 ${
            plan.featured
              ? theme === "cyberpunk"
                ? "bg-gradient-to-r from-cyan-500 to-pink-500 text-white"
                : theme === "dark"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
              : theme === "cyberpunk"
                ? "bg-gray-800 text-cyan-300"
                : theme === "dark"
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-800 text-white"
          }`}
        >
          {t(`plans.${plan.id}.badge`)}
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="flex flex-col h-full">
        {/* Ícone */}
        <div className={`inline-flex p-3 rounded-xl mb-4 ${styles.icon}`}>
          {getPlanIcon()}
        </div>

        {/* Título e Tagline */}
        <h3 className={`text-2xl mb-2 ${styles.title}`}>
          {t(`plans.${plan.id}.name`)}
        </h3>
        <p className={`mb-6 ${styles.tagline}`}>
          {t(`plans.${plan.id}.tagline`)}
        </p>

        {/* Preço */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1 mb-1">
            <span className={`text-4xl ${styles.price}`}>
              {getPriceDisplay()}
            </span>
            <span className={`text-lg ${styles.tagline}`}>
              {getPeriodDisplay()}
            </span>
          </div>

          {/* Canais - Inclui o badge do mobile aqui */}
          <div className="flex items-center gap-2 mb-2">
            <p className={`text-sm ${styles.tagline}`}>
              {t(`plans.${plan.id}.channels`)}
            </p>
            {/* Badge mobile - APENAS NO MOBILE */}
            {plan.badge && (
              <span
                className={`md:hidden px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  plan.featured
                    ? theme === "cyberpunk"
                      ? "bg-gradient-to-r from-cyan-500 to-pink-500 text-white"
                      : theme === "dark"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                    : theme === "cyberpunk"
                      ? "bg-gray-800 text-cyan-300"
                      : theme === "dark"
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-800 text-white"
                }`}
              >
                {t(`plans.${plan.id}.badge`)}
              </span>
            )}
          </div>

          {/* Economia anual */}
          {getYearlySavings() && (
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
              <span>Economize {getYearlySavings()}</span>
            </div>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-grow">
          {t(`features.${plan.id}`, { returnObjects: true }).map(
            (feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check
                  className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.featured ? "text-green-400" : "text-green-500"}`}
                />
                <span className={styles.feature}>{feature}</span>
              </li>
            ),
          )}
        </ul>

        {/* CTA */}
        <button className={styles.cta}>{t(`plans.${plan.id}.cta`)}</button>
      </div>
    </div>
  );
};

export default PlanCard;
