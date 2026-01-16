import React, { useState, useRef } from "react";
import {
  Check,
  Zap,
  Crown,
  Star,
  Award,
  ChevronLeft,
  ChevronRight,
  Percent,
  Sparkles,
  TrendingUp,
  Rocket,
} from "lucide-react";
import { useTheme } from "../../app/bootstrap/theme-provider";
import { useTranslation } from "../../shared/hooks/use-translation.hook";
import Container from "../components/Container";

const PricingSection = () => {
  const { theme } = useTheme();
  const { t } = useTranslation("pricing");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  // Preços base
  const PRICE_MONTHLY = 9.99;
  const PRICE_YEARLY = 77.96;
  const YEARLY_DISCOUNT = "35%";
  const PRO_PLUS_MAX_DISCOUNT = "30%";

  // Funções para cores baseadas no tema
  const getTextColors = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          primary: "text-white",
          secondary: "text-gray-300",
          tertiary: "text-gray-400",
          accent: "text-purple-400",
        };
      case "dark":
        return {
          primary: "text-white",
          secondary: "text-gray-300",
          tertiary: "text-gray-400",
          accent: "text-purple-300",
        };
      case "light":
        return {
          primary: "text-gray-900",
          secondary: "text-gray-700",
          tertiary: "text-gray-600",
          accent: "text-blue-600",
        };
      default:
        return getTextColors("cyberpunk");
    }
  };

  const getBackgrounds = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          section: "bg-gradient-to-b from-transparent to-gray-900/30",
          card: "bg-gray-800/30 backdrop-blur-sm",
          featuredCard:
            "bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-blue-900/30 backdrop-blur-sm",
          toggle: "bg-gray-800/50",
          toggleActive:
            "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600",
        };
      case "dark":
        return {
          section: "bg-gradient-to-b from-transparent to-gray-900",
          card: "bg-gray-800/50",
          featuredCard: "bg-gradient-to-br from-purple-900/20 to-pink-900/20",
          toggle: "bg-gray-800",
          toggleActive: "bg-gradient-to-r from-purple-600 to-pink-600",
        };
      case "light":
        return {
          section: "bg-gradient-to-b from-transparent to-gray-50",
          card: "bg-white",
          featuredCard: "bg-gradient-to-br from-blue-50 to-purple-50",
          toggle: "bg-gray-100",
          toggleActive: "bg-gradient-to-r from-blue-600 to-purple-600",
        };
      default:
        return getBackgrounds("cyberpunk");
    }
  };

  const getBorderColors = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          primary: "border-gray-700/50",
          accent: "border-purple-500/30",
          featured: "border-purple-500/50",
        };
      case "dark":
        return {
          primary: "border-gray-700",
          accent: "border-purple-500/20",
          featured: "border-purple-500/30",
        };
      case "light":
        return {
          primary: "border-gray-200",
          accent: "border-blue-200",
          featured: "border-blue-300",
        };
      default:
        return getBorderColors("cyberpunk");
    }
  };

  const textColors = getTextColors();
  const backgrounds = getBackgrounds();
  const borderColors = getBorderColors();

  // Dados dos planos em EURO
  const plans = [
    {
      id: "free",
      name: t("plans.free.name"),
      tagline: t("plans.free.tagline"),
      price: "€0",
      originalPrice: null,
      discount: null,
      billingNote: t("priceDisplay.startNow"),
      ctaText: t("plans.free.cta"),
      featured: false,
      badge: t("plans.free.badge"),
      channels: t("plans.free.channels"),
      features: t("features.free", { returnObjects: true }),
      icon: <Star className="w-5 h-5" />,
      color: "gray",
      marketingTips: t("plans.free.marketingTips", { returnObjects: true }),
    },
    {
      id: "pro",
      name: t("plans.pro.name"),
      tagline: t("plans.pro.tagline"),
      price: `€${PRICE_MONTHLY.toFixed(2)}`,
      monthlyPrice: PRICE_MONTHLY,
      yearlyPrice: PRICE_YEARLY,
      discount: YEARLY_DISCOUNT,
      billingNote:
        billingCycle === "yearly" ?
          t("priceDisplay.saveYearly")
        : t("priceDisplay.perChannelMonth"),
      ctaText: t("plans.pro.cta"),
      featured: true,
      badge: t("plans.pro.badge"),
      channels: t("plans.pro.channels"),
      features: t("features.pro", { returnObjects: true }),
      icon: <Zap className="w-5 h-5" />,
      color: "purple",
      marketingTips: t("plans.pro.marketingTips", { returnObjects: true }),
    },
    {
      id: "proPlus",
      name: t("plans.proPlus.name"),
      tagline: t("plans.proPlus.tagline"),
      price: null,
      discount: `Até ${PRO_PLUS_MAX_DISCOUNT}`,
      billingNote: t("priceDisplay.progressiveDiscount"),
      ctaText: t("plans.proPlus.cta"),
      featured: false,
      badge: t("plans.proPlus.badge"),
      channels: t("plans.proPlus.channels"),
      features: t("features.proPlus", { returnObjects: true }),
      icon: <Crown className="w-5 h-5" />,
      color: "blue",
      marketingTips: t("plans.proPlus.marketingTips", { returnObjects: true }),
    },
  ];

  // Navegação do carrossel
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === plans.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? plans.length - 1 : prev - 1));
  };

  return (
    <section id="pricing" className={`pt-14 pb-10 ${backgrounds.section}`}>
      <Container>
        {/* Cabeçalho com dicas de marketing */}
        <div className="text-center mb-10">
          <div
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${borderColors.accent} ${backgrounds.card} mb-4`}
          >
            <TrendingUp className={`w-5 h-5 ${textColors.accent}`} />
            <span className={`text-sm font-semibold ${textColors.accent}`}>
              {t("header.badge")}
            </span>
          </div>
          <h2 className={`text-2xl font-bold mb-4 ${textColors.primary}`}>
            {t("header.title")}{" "}
            <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("header.highlight")}
            </span>
          </h2>
          {/* Toggle compacto - mensal por padrão */}
          <div className="flex justify-center">
            <div
              className={`inline-flex p-0.5 rounded-lg ${backgrounds.toggle}`}
            >
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 text-sm rounded-md transition-all ${billingCycle === "monthly" ? `${backgrounds.toggleActive} text-white` : `${textColors.secondary}`}`}
              >
                {t("billing.monthly")}
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 text-sm rounded-md transition-all ${billingCycle === "yearly" ? `${backgrounds.toggleActive} text-white` : `${textColors.secondary}`}`}
              >
                {t("billing.yearly")}{" "}
                <span className="text-green-400 ml-1">
                  {t("billing.yearlyDiscount")}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Carrossel para mobile / Grid para desktop */}
        <div className="relative">
          {/* Controles do carrossel (mobile) */}
          <div className="lg:hidden flex items-center justify-between mb-6 px-4">
            <button
              onClick={prevSlide}
              className={`p-2 rounded-full ${backgrounds.card} ${borderColors.primary} border`}
            >
              <ChevronLeft className={`w-5 h-5 ${textColors.primary}`} />
            </button>

            {/* Indicadores */}
            <div className="flex space-x-2">
              {plans.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? `${backgrounds.toggleActive}` : `${backgrounds.toggle}`}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className={`p-2 rounded-full ${backgrounds.card} ${borderColors.primary} border`}
            >
              <ChevronRight className={`w-5 h-5 ${textColors.primary}`} />
            </button>
          </div>

          {/* Cards dos planos */}
          <div ref={carouselRef} className="lg:hidden overflow-hidden">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {plans.map((plan, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <PlanCard plan={plan} />
                </div>
              ))}
            </div>
          </div>

          {/* Grid para desktop */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div key={index} className="w-full">
                <PlanCard plan={plan} />
              </div>
            ))}
          </div>
        </div>

        {/* Tabela de descontos para Pro Plus */}
        <div className="mt-10 max-w-3xl mx-auto px-3">
          <div
            className={`rounded-xl ${backgrounds.card} ${borderColors.primary} border p-3 md:p-6`}
          >
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <Percent
                className={`w-4 h-4 md:w-5 md:h-5 mr-1.5 ${textColors.accent}`}
              />
              <h3
                className={`text-sm md:text-lg font-bold ${textColors.primary}`}
              >
                {t("discountTable.title")}
              </h3>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-3 gap-1.5 md:gap-4">
              {/* 2-5 canais */}
              <div
                className={`text-center p-2 md:p-4 rounded-lg ${backgrounds.featured === backgrounds.card ? backgrounds.featuredCard : backgrounds.card}`}
              >
                <div
                  className={`text-base md:text-2xl font-bold ${textColors.accent} mb-0.5 md:mb-1`}
                >
                  {t("discountTable.levels.level1.discount")}
                </div>
                <div
                  className={`text-[10px] md:text-sm ${textColors.secondary} leading-tight`}
                >
                  {t("discountTable.levels.level1.channels")}
                </div>
                <div
                  className={`text-[9px] md:text-xs ${textColors.tertiary} mt-0.5 md:mt-1`}
                >
                  {t("discountTable.levels.level1.price")}
                </div>
              </div>

              {/* 6-10 canais */}
              <div
                className={`text-center p-2 md:p-4 rounded-lg ${backgrounds.featured === backgrounds.card ? backgrounds.featuredCard : backgrounds.card}`}
              >
                <div
                  className={`text-base md:text-2xl font-bold ${textColors.accent} mb-0.5 md:mb-1`}
                >
                  {t("discountTable.levels.level2.discount")}
                </div>
                <div
                  className={`text-[10px] md:text-sm ${textColors.secondary} leading-tight`}
                >
                  {t("discountTable.levels.level2.channels")}
                </div>
                <div
                  className={`text-[9px] md:text-xs ${textColors.tertiary} mt-0.5 md:mt-1`}
                >
                  {t("discountTable.levels.level2.price")}
                </div>
              </div>

              {/* 11+ canais */}
              <div
                className={`text-center p-2 md:p-4 rounded-lg ${backgrounds.featured === backgrounds.card ? backgrounds.featuredCard : backgrounds.card}`}
              >
                <div
                  className={`text-base md:text-2xl font-bold ${textColors.accent} mb-0.5 md:mb-1`}
                >
                  {t("discountTable.levels.level3.discount")}
                </div>
                <div
                  className={`text-[10px] md:text-sm ${textColors.secondary} leading-tight`}
                >
                  {t("discountTable.levels.level3.channels")}
                </div>
                <div
                  className={`text-[9px] md:text-xs ${textColors.tertiary} mt-0.5 md:mt-1`}
                >
                  {t("discountTable.levels.level3.price")}
                </div>
              </div>
            </div>

            {/* Nota adicional para mobile */}
            <div className="mt-3 md:mt-6 text-center">
              <p className={`text-[10px] md:text-sm ${textColors.tertiary}`}>
                <span className="block md:inline">
                  {t("discountTable.note")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );

  // Componente de card separado
  function PlanCard({ plan }) {
    const planFeatures = Array.isArray(plan.features) ? plan.features : [];

    return (
      <div
        className={`relative rounded-xl border p-6 transition-all duration-300 h-full flex flex-col ${
          plan.featured ?
            `${borderColors.featured} ${backgrounds.featuredCard} shadow-xl`
          : `${borderColors.primary} ${backgrounds.card}`
        }`}
      >
        {/* Badge */}
        {plan.badge && (
          <div
            className={`absolute -top-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full font-bold text-xs ${
              plan.featured ?
                "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              : plan.color === "blue" ?
                "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
              : "bg-gray-600 text-white"
            }`}
          >
            {plan.badge}
          </div>
        )}

        {/* Cabeçalho */}
        <div className="text-center mb-4">
          <div
            className={`inline-flex p-2 rounded-lg mb-3 ${
              plan.featured ?
                "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              : plan.color === "blue" ?
                "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
              : theme === "light" ? "bg-gray-100 text-gray-600"
              : "bg-gray-800 text-gray-300"
            }`}
          >
            {plan.icon}
          </div>

          <h3 className={`text-xl font-bold mb-1 ${textColors.primary}`}>
            {plan.name}
          </h3>
          <p className={`text-xs ${textColors.tertiary} mb-3`}>
            {plan.tagline}
          </p>

          {/* Preço ou Desconto */}
          <div className="mb-2">
            {
              plan.price ?
                <>
                  <div className="flex items-center justify-center">
                    <span
                      className={`text-3xl font-bold ${textColors.primary}`}
                    >
                      {billingCycle === "yearly" && plan.id === "pro" ?
                        `€${plan.yearlyPrice.toFixed(2)}`
                      : plan.price}
                    </span>
                    <span className={`text-lg ${textColors.secondary} ml-1`}>
                      {plan.price !== "€0" &&
                        (billingCycle === "yearly" && plan.id === "pro" ?
                          t("priceDisplay.perYear")
                        : t("priceDisplay.perMonth"))}
                    </span>
                  </div>

                  {/* Mostrar preço mensal se for anual */}
                  {billingCycle === "yearly" && plan.id === "pro" && (
                    <div className="mt-1">
                      <div className={`text-sm ${textColors.secondary}`}>
                        {t("priceDisplay.equivalent")}{" "}
                        <span className="font-bold">
                          €{(plan.yearlyPrice / 12).toFixed(2)}
                          {t("priceDisplay.perMonth")}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                        -{plan.discount}
                      </span>
                    </div>
                  )}
                </>
                // Para Pro Plus: mostrar percentagem de desconto
              : <div className="mb-2">
                  <div className="flex items-center justify-center mb-2">
                    <Percent className={`w-8 h-8 ${textColors.accent} mr-2`} />
                    <span className={`text-3xl font-bold ${textColors.accent}`}>
                      {plan.discount}
                    </span>
                  </div>
                  <div className={`text-sm ${textColors.secondary}`}>
                    {t("priceDisplay.volumeDiscount")}
                  </div>
                </div>

            }

            <p className={`text-xs font-medium ${textColors.accent} mt-2 mb-1`}>
              {plan.channels}
            </p>
            <p className={`text-xs ${textColors.tertiary}`}>
              {plan.billingNote}
            </p>
          </div>

          {/* Dicas de marketing do plano */}
          <div className="mt-3 mb-4">
            {plan.marketingTips &&
              Array.isArray(plan.marketingTips) &&
              plan.marketingTips.map((tip, index) => (
                <div key={index} className="flex items-start mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-2 flex-shrink-0" />
                  <span className={`text-xs ${textColors.secondary}`}>
                    {tip}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Features compactas */}
        <div className="flex-grow mb-6">
          <ul className="space-y-2">
            {planFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                {
                  (
                    typeof feature === "object" &&
                    feature.included !== undefined
                  ) ?
                    <>
                      {feature.included ?
                        <Check
                          className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${
                            plan.featured ? "text-green-400"
                            : plan.color === "blue" ? "text-cyan-500"
                            : "text-green-500"
                          }`}
                        />
                      : <div className="w-4 h-4 mr-2 mt-0.5 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-gray-500" />
                        </div>
                      }
                      <span
                        className={`text-sm ${feature.included ? textColors.secondary : `${textColors.tertiary} line-through`}`}
                      >
                        {feature.text}
                      </span>
                    </>
                    // Para arrays simples de strings
                  : <>
                      <Check
                        className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${
                          plan.featured ? "text-green-400"
                          : plan.color === "blue" ? "text-cyan-500"
                          : "text-green-500"
                        }`}
                      />
                      <span className={`text-sm ${textColors.secondary}`}>
                        {feature}
                      </span>
                    </>

                }
              </li>
            ))}
          </ul>
        </div>

        {/* Botão CTA */}
        <button
          className={`w-full py-3 rounded-lg font-bold text-sm transition-all mt-auto ${
            plan.featured ?
              theme === "cyberpunk" ?
                "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/20"
              : theme === "dark" ?
                "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg"
              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-md"
            : plan.color === "blue" ?
              theme === "light" ?
                "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-md"
              : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg"
            : theme === "light" ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          {plan.ctaText}
        </button>
      </div>
    );
  }
};

export default PricingSection;
