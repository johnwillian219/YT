import React, { useState } from "react";
import { Check, Zap, Crown, Star, TrendingUp, Percent } from "lucide-react";
import { useTheme } from "../../app/bootstrap/theme-provider";
import { useTranslation } from "../../shared/hooks/use-translation.hook";
import Container from "../components/Container";

const PricingSection = () => {
  const { theme } = useTheme();
  const { t } = useTranslation("pricing");
  const [billingCycle, setBillingCycle] = useState("monthly");

  // Preços base
  const PRICE_MONTHLY = 9.99;
  const PRICE_YEARLY = 77.96; // ~6.50€/mês
  const YEARLY_DISCOUNT = "35%";
  const PRO_PLUS_MAX_DISCOUNT = "30%";

  const textColors = {
    primary: theme === "light" ? "text-gray-900" : "text-white",
    secondary: theme === "light" ? "text-gray-700" : "text-gray-300",
    tertiary: theme === "light" ? "text-gray-600" : "text-gray-400",
    accent: theme === "light" ? "text-blue-600" : "text-purple-400",
  };

  const backgrounds = {
    section:
      theme === "light" ? "bg-gray-50/40" : (
        "bg-gradient-to-b from-transparent to-gray-900/30"
      ),
    card: theme === "light" ? "bg-white" : "bg-gray-800/40 backdrop-blur-sm",
    featuredCard:
      theme === "light" ?
        "bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg"
      : "bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-blue-900/30 backdrop-blur-md shadow-xl",
    toggle: theme === "light" ? "bg-gray-200" : "bg-gray-800/60",
    toggleActive:
      theme === "light" ?
        "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
      : "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white",
  };

  const borderColors = {
    primary: theme === "light" ? "border-gray-200" : "border-gray-700/60",
    featured: theme === "light" ? "border-blue-300" : "border-purple-500/50",
  };

  const plans = [
    {
      id: "free",
      name: t("plans.free.name"),
      tagline: t("plans.free.tagline"),
      price: "€0",
      ctaText: t("plans.free.cta"),
      featured: false,
      badge: t("plans.free.badge"),
      channels: t("plans.free.channels"),
      features: t("features.free", { returnObjects: true }),
      icon: <Star className="w-5 h-5" />,
      color: "gray",
    },
    {
      id: "pro",
      name: t("plans.pro.name"),
      tagline: t("plans.pro.tagline"),
      price: `€${PRICE_MONTHLY.toFixed(2)}`,
      yearlyPrice: PRICE_YEARLY,
      discount: YEARLY_DISCOUNT,
      ctaText: t("plans.pro.cta"),
      featured: true,
      badge: t("plans.pro.badge"),
      channels: t("plans.pro.channels"),
      features: t("features.pro", { returnObjects: true }),
      icon: <Zap className="w-5 h-5" />,
      color: "purple",
    },
    {
      id: "proPlus",
      name: t("plans.proPlus.name"),
      tagline: t("plans.proPlus.tagline"),
      discount: `Até ${PRO_PLUS_MAX_DISCOUNT}`,
      ctaText: t("plans.proPlus.cta"),
      featured: false,
      badge: t("plans.proPlus.badge"),
      channels: t("plans.proPlus.channels"),
      features: t("features.proPlus", { returnObjects: true }),
      icon: <Crown className="w-5 h-5" />,
      color: "blue",
    },
  ];

  return (
    <section id="pricing" className={`py-8 md:py-12 ${backgrounds.section}`}>
      <Container>
        {/* Cabeçalho */}
        <div className="text-center mb-8 md:mb-12">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${borderColors.primary} ${backgrounds.card} mb-4 text-xs font-medium ${textColors.accent}`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            {t("header.badge")}
          </div>

          <h2
            className={`text-2xl md:text-3xl font-bold mb-3 ${textColors.primary}`}
          >
            {t("header.title")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("header.highlight")}
            </span>
          </h2>

          {/* Toggle mensal/anual - mais compacto */}
          <div className="flex justify-center mt-4">
            <div
              className={`inline-flex p-0.5 rounded-lg ${backgrounds.toggle} border ${borderColors.primary}`}
            >
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all min-w-[90px] touch-manipulation ${
                  billingCycle === "monthly" ?
                    backgrounds.toggleActive
                  : textColors.secondary
                }`}
              >
                {t("billing.monthly")}
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all min-w-[90px] touch-manipulation ${
                  billingCycle === "yearly" ?
                    backgrounds.toggleActive
                  : textColors.secondary
                }`}
              >
                {t("billing.yearly")}
              </button>
            </div>
          </div>
        </div>

        {/* === CARROSSEL MOBILE + GRID DESKTOP === */}
        <div className="relative">
          {/* Mobile - Carrossel mais compacto */}
          <div className="lg:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-2 px-2">
            <div
              className="flex gap-3 pb-4 pt-1"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="min-w-[78vw] max-w-[80vw] snap-center"
                >
                  <PlanCard plan={plan} billingCycle={billingCycle} />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop - Grid mais compacto */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} billingCycle={billingCycle} />
            ))}
          </div>
        </div>

        {/* Tabela de descontos Pro+ mais compacta */}
        <div className="mt-8 md:mt-12 max-w-4xl mx-auto px-2">
          <div
            className={`rounded-xl ${backgrounds.card} ${borderColors.primary} border p-4 md:p-6`}
          >
            <div className="flex items-center justify-center gap-1.5 mb-4">
              <Percent className={`w-4 h-4 ${textColors.accent}`} />
              <h3
                className={`text-base md:text-lg font-bold ${textColors.primary}`}
              >
                {t("discountTable.title")}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {[
                {
                  level: "level1",
                  discountKey: "discount",
                  channelsKey: "channels",
                  priceKey: "price",
                },
                {
                  level: "level2",
                  discountKey: "discount",
                  channelsKey: "channels",
                  priceKey: "price",
                },
                {
                  level: "level3",
                  discountKey: "discount",
                  channelsKey: "channels",
                  priceKey: "price",
                },
              ].map(({ level, discountKey, channelsKey, priceKey }) => (
                <div
                  key={level}
                  className={`text-center p-3 md:p-4 rounded-lg border ${
                    theme === "light" ?
                      "border-blue-100 bg-blue-50/40"
                    : "border-purple-500/20 bg-purple-900/10"
                  }`}
                >
                  <div
                    className={`text-xl md:text-2xl font-extrabold ${textColors.accent} mb-1`}
                  >
                    {t(`discountTable.levels.${level}.${discountKey}`)}
                  </div>
                  <div
                    className={`text-xs md:text-sm font-medium ${textColors.secondary} mb-0.5`}
                  >
                    {t(`discountTable.levels.${level}.${channelsKey}`)}
                  </div>
                  <div className={`text-xs ${textColors.tertiary}`}>
                    {t(`discountTable.levels.${level}.${priceKey}`)}
                  </div>
                </div>
              ))}
            </div>

            <p className={`text-center mt-4 text-xs ${textColors.tertiary}`}>
              {t("discountTable.note")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );

  function PlanCard({ plan, billingCycle }) {
    const isFeatured = plan.featured;
    const isYearly = billingCycle === "yearly";

    return (
      <div
        className={`relative rounded-xl border p-4 md:p-5 flex flex-col h-full transition-all duration-300 ${
          isFeatured ?
            `${borderColors.featured} ${backgrounds.featuredCard} shadow-lg scale-[1.02] md:scale-[1.03]`
          : `${borderColors.primary} ${backgrounds.card}`
        }`}
      >
        {/* Badge "Mais Popular" - menor */}
        {plan.badge && (
          <div
            className={`absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] md:text-xs font-bold shadow ${
              isFeatured ?
                "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              : "bg-gray-700 text-white"
            }`}
          >
            {plan.badge}
          </div>
        )}

        <div className="text-center mb-4">
          <div
            className={`inline-flex p-2 md:p-2.5 rounded-lg mb-3 text-white ${
              isFeatured ? "bg-gradient-to-r from-purple-600 to-pink-600"
              : plan.color === "blue" ?
                "bg-gradient-to-r from-blue-600 to-cyan-600"
              : theme === "light" ? "bg-gray-200 text-gray-700"
              : "bg-gray-700"
            }`}
          >
            {plan.icon}
          </div>

          <h3
            className={`text-xl md:text-2xl font-bold mb-1 ${textColors.primary}`}
          >
            {plan.name}
          </h3>
          <p className={`text-xs ${textColors.tertiary} mb-3 md:mb-4`}>
            {plan.tagline}
          </p>

          {/* Preço / Desconto */}
          {plan.price ?
            <div className="mb-4">
              <div className="flex items-baseline justify-center gap-1">
                <span
                  className={`text-3xl md:text-4xl font-extrabold ${textColors.primary}`}
                >
                  {isYearly && plan.id === "pro" ?
                    `€${plan.yearlyPrice.toFixed(2)}`
                  : plan.price}
                </span>
                <span className={`text-lg md:text-xl ${textColors.secondary}`}>
                  {plan.price !== "€0" &&
                    (isYearly && plan.id === "pro" ? "/ano" : "/mês")}
                </span>
              </div>

              {isYearly && plan.id === "pro" && (
                <div className="mt-2 space-y-1">
                  <div className={`text-sm ${textColors.secondary}`}>
                    ≈ €{(plan.yearlyPrice / 12).toFixed(2)}{" "}
                    <span className="text-xs">/mês</span>
                  </div>
                  <span className="inline-block px-2 py-0.5 text-xs font-bold bg-green-600/20 text-green-400 rounded-full">
                    Economize {plan.discount}
                  </span>
                </div>
              )}
            </div>
          : <div className="mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Percent
                  className={`w-6 h-6 md:w-7 md:h-7 ${textColors.accent}`}
                />
                <span
                  className={`text-3xl md:text-4xl font-extrabold ${textColors.accent}`}
                >
                  {plan.discount}
                </span>
              </div>
              <p className={`text-sm ${textColors.secondary}`}>
                Desconto progressivo
              </p>
            </div>
          }

          <p className={`text-xs font-medium ${textColors.accent} mb-1`}>
            {plan.channels}
          </p>
        </div>

        {/* Features - mais compacto */}
        <ul className="space-y-2 mb-5 md:mb-6 flex-grow">
          {(Array.isArray(plan.features) ? plan.features : []).map(
            (feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check
                  className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                    isFeatured ? "text-green-400" : "text-green-500"
                  }`}
                />
                <span className={`text-sm ${textColors.secondary}`}>
                  {typeof feature === "string" ? feature : feature.text}
                </span>
              </li>
            ),
          )}
        </ul>

        {/* CTA - mais compacto */}
        <button
          className={`mt-auto w-full py-2.5 md:py-3 rounded-lg font-bold text-sm md:text-base transition-all ${
            isFeatured ?
              "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:brightness-110 hover:shadow-lg hover:shadow-purple-500/20"
            : theme === "light" ? "bg-gray-800 text-white hover:bg-gray-900"
            : "bg-gray-700 hover:bg-gray-600 text-white"
          }`}
        >
          {plan.ctaText}
        </button>
      </div>
    );
  }
};

export default PricingSection;
