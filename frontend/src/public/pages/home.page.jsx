//frontend/src/public/pages/home.page.jsx
import React from "react";
import LandingHeader from "../../public/landing/LandingHeader.jsx";
import HeroSection from "../../public/landing/HeroSection.jsx";
import TestimonialsSection from "../../public/landing/TestimonialsSection";
import PricingSection from "../../public/landing/PricingSection.jsx";
import FeaturesSection from "../../public/landing/FeaturesSection.jsx";
import LandingFooter from "../../public/landing/LandingFooter.jsx";
import { useTheme } from "../../app/bootstrap/theme-provider";
import { useTranslation } from "../../shared/hooks/use-translation.hook";

const HomePage = () => {
  const { theme } = useTheme();
  const { t } = useTranslation("common");

  const getBackground = () => {
    switch (theme) {
      case "cyberpunk":
        return "bg-gradient-to-b from-[#0a0a0f] via-[#151522] to-[#0a0a0f]";
      case "dark":
        return "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900";
      case "light":
        return "bg-gradient-to-b from-gray-50 via-white to-gray-50";
      default:
        return "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900";
    }
  };

  return (
    <div
      className={`min-h-screen ${getBackground()} transition-all duration-300`}
    >
      <LandingHeader />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <LandingFooter />
    </div>
  );
};

export default HomePage;
