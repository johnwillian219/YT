// frontend/src/public/landing/PricingSection.jsx
import React, { useState, useMemo } from "react";
import { useTheme } from "../../app/bootstrap/theme-provider";
import { useTranslation } from "../../shared/hooks/use-translation.hook";
import Container from "../components/Container";

// Componentes
import PricingHeader from "./components/pricing/PricingHeader";
import PlanCard from "./components/pricing/PlanCard";
import DiscountTable from "./components/pricing/DiscountTable";
import PricingBackground from "./components/pricing/PricingBackground";

const PricingSection = () => {
  const { theme = "cyberpunk" } = useTheme();
  const { t } = useTranslation("pricing");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const isYearly = billingCycle === "yearly";

  const plans = useMemo(
    () => [
      {
        id: "free",
        name: t("plans.free.name"),
        tagline: t("plans.free.tagline"),
        badge: t("plans.free.badge"),
        channels: t("plans.free.channels"),
        cta: t("plans.free.cta"),
        featured: false,
      },
      {
        id: "pro",
        name: t("plans.pro.name"),
        tagline: t("plans.pro.tagline"),
        badge: t("plans.pro.badge"),
        channels: t("plans.pro.channels"),
        cta: t("plans.pro.cta"),
        featured: true,
      },
      {
        id: "proPlus",
        name: t("plans.proPlus.name"),
        tagline: t("plans.proPlus.tagline"),
        badge: t("plans.proPlus.badge"),
        channels: t("plans.proPlus.channels"),
        cta: t("plans.proPlus.cta"),
        featured: false,
      },
    ],
    [t],
  );

  return (
    <section id="pricing" className="relative py-16 md:py-16 overflow-hidden">
      <PricingBackground theme={theme} />

      <Container className="relative">
        {/* Header */}
        <PricingHeader
          theme={theme}
          t={t}
          billingCycle={billingCycle}
          setBillingCycle={setBillingCycle}
        />

        {/* Cards de Planos */}
        <div className="mb-16">
          {/* Mobile - Scroll horizontal */}
          <div className="lg:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 pb-4">
            <div className="flex gap-4" style={{ minWidth: "min-content" }}>
              {plans.map((plan, index) => (
                <div
                  key={plan.id}
                  className="min-w-[85vw] max-w-[85vw] snap-center"
                >
                  <PlanCard
                    plan={plan}
                    billingCycle={billingCycle}
                    theme={theme}
                    t={t}
                    isYearly={isYearly}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop - Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                billingCycle={billingCycle}
                theme={theme}
                t={t}
                isYearly={isYearly}
              />
            ))}
          </div>
        </div>

        {/* Tabela de Descontos */}
        <div className="max-w-4xl mx-auto">
          <DiscountTable theme={theme} t={t} />
        </div>
      </Container>

      {/* Estilos de animação */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default PricingSection;
