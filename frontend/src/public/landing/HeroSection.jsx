// frontend/src/public/landing/HeroSection.jsx
import React, { useState, useMemo } from "react";
import { useTheme } from "../../app/bootstrap/theme-provider";
import { useTranslation } from "../../shared/hooks/use-translation.hook";
import Container from "../components/Container";

// Componentes do Hero
import HeroBackground from "./components/hero/HeroBackground";
import HeroBadge from "./components/hero/HeroBadge";
import HeroHeadline from "./components/hero/HeroHeadline";
import HeroDescription from "./components/hero/HeroDescription";
import HeroCTA from "./components/hero/HeroCTA";
import HeroVideoPreview from "./components/hero/HeroVideoPreview";

const HeroSection = () => {
  const { theme = "cyberpunk" } = useTheme();
  const { t } = useTranslation("herosection");
  const [showVideoPreview, setShowVideoPreview] = useState(false);

  const getThemeStyles = useMemo(() => {
    switch (theme) {
      case "cyberpunk":
        return {
          bg: "from-[#0a0a0f] via-[#151522]",
          text: "text-white",
        };
      case "dark":
        return {
          bg: "from-gray-900 via-gray-800",
          text: "text-white",
        };
      case "light":
        return {
          bg: "from-gray-50 via-white",
          text: "text-gray-900",
        };
      default:
        return {
          bg: "from-gray-900 via-gray-800",
          text: "text-white",
        };
    }
  }, [theme]);

  const themeStyles = getThemeStyles;

  const handleWatchDemo = () => {
    setShowVideoPreview(true);
  };

  return (
    <>
      <section
        className={`relative min-h-screen pt-32 pb-2 bg-gradient-to-b ${themeStyles.bg} to-transparent overflow-hidden`}
      >
        <HeroBackground theme={theme} />

        <Container className="relative z-10">
          {/* Badge */}
          <HeroBadge theme={theme} t={t} />

          {/* Headline */}
          <HeroHeadline theme={theme} t={t} />

          {/* Description */}
          <HeroDescription theme={theme} t={t} />

          {/* CTA Buttons */}
          <HeroCTA theme={theme} t={t} onWatchDemo={handleWatchDemo} />
        </Container>
      </section>

      {/* Video Preview Modal */}
      <HeroVideoPreview
        theme={theme}
        t={t}
        isOpen={showVideoPreview}
        onClose={() => setShowVideoPreview(false)}
      />

      {/* Estilos de animação */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-slideUp {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .text-gradient {
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </>
  );
};

export default HeroSection;
