// frontend/src/public/landing/FeaturesSection.jsx (atualizado)
import React, { useMemo, useState, useCallback, useEffect } from "react";
import {
  Search,
  Users,
  Edit3,
  Palette,
  Bot,
  TrendingUp,
  LayoutDashboard,
  Calendar,
  FileText,
  MessageSquare,
} from "lucide-react";
import { useTheme } from "../../app/bootstrap/theme-provider";
import { useTranslation } from "../../shared/hooks/use-translation.hook";
import Container from "../components/Container";

// Componentes
import FeaturesHeader from "./components/features/FeaturesHeader";
import FeaturesGridDesktop from "./components/features/FeaturesGridDesktop";
import FeaturesCarouselMobile from "./components/features/FeaturesCarouselMobile";
import FeaturesBackground from "./components/features/FeaturesBackground";
import FeaturesCarouselControls from "./components/features/FeaturesCarouselControls";

const FeaturesSection = () => {
  const { theme = "cyberpunk" } = useTheme();
  const { t } = useTranslation("features");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Dados das features - desktop (9 features, excluindo a última)
  const desktopFeatures = useMemo(
    () => [
      {
        key: "keywordResearch",
        icon: <Search className="w-5 h-5" />,
        mobileIcon: <Search className="w-6 h-6" />,
      },
      {
        key: "competitorAnalysis",
        icon: <Users className="w-5 h-5" />,
        mobileIcon: <Users className="w-6 h-6" />,
      },
      {
        key: "optimization",
        icon: <Edit3 className="w-5 h-5" />,
        mobileIcon: <Edit3 className="w-6 h-6" />,
      },
      {
        key: "thumbnailAI",
        icon: <Palette className="w-5 h-5" />,
        mobileIcon: <Palette className="w-6 h-6" />,
      },
      {
        key: "automatedScripts",
        icon: <Bot className="w-5 h-5" />,
        mobileIcon: <Bot className="w-6 h-6" />,
      },
      {
        key: "trendAnalysis",
        icon: <TrendingUp className="w-5 h-5" />,
        mobileIcon: <TrendingUp className="w-6 h-6" />,
      },
      {
        key: "dashboard",
        icon: <LayoutDashboard className="w-5 h-5" />,
        mobileIcon: <LayoutDashboard className="w-6 h-6" />,
      },
      {
        key: "contentCalendar",
        icon: <Calendar className="w-5 h-5" />,
        mobileIcon: <Calendar className="w-6 h-6" />,
      },
      {
        key: "detailedReports",
        icon: <FileText className="w-5 h-5" />,
        mobileIcon: <FileText className="w-6 h-6" />,
      },
      // A última feature não aparece no desktop
    ],
    [],
  );

  // Dados das features - mobile (9 features, excluindo a última)
  const mobileFeatures = useMemo(
    () => desktopFeatures.slice(0, 9), // Apenas 9 features
    [desktopFeatures],
  );

  // Funções de navegação
  const slideTo = useCallback(
    (index) => {
      if (isAnimating || mobileFeatures.length === 0) return;

      setIsAnimating(true);
      setCurrentSlide(index);

      setTimeout(() => setIsAnimating(false), 300);
    },
    [isAnimating, mobileFeatures.length],
  );

  const nextSlide = useCallback(() => {
    slideTo(currentSlide === mobileFeatures.length - 1 ? 0 : currentSlide + 1);
  }, [currentSlide, mobileFeatures.length, slideTo]);

  const prevSlide = useCallback(() => {
    slideTo(currentSlide === 0 ? mobileFeatures.length - 1 : currentSlide - 1);
  }, [currentSlide, mobileFeatures.length, slideTo]);

  return (
    <section className="relative py-4 md:py-10 overflow-hidden">
      <FeaturesBackground theme={theme} />

      <Container className="relative">
        {/* Header compacto */}
        <FeaturesHeader theme={theme} t={t} />

        {/* Controles do carrossel - Oculto no mobile, mantido para desktop se quiser */}
        <div className="hidden md:block mb-6">
          <FeaturesCarouselControls
            theme={theme}
            onPrev={prevSlide}
            onNext={nextSlide}
            currentSlide={currentSlide}
            totalSlides={mobileFeatures.length}
            onGoToSlide={slideTo}
          />
        </div>

        {/* Grid Desktop - 9 features */}
        <FeaturesGridDesktop theme={theme} t={t} features={desktopFeatures} />

        {/* Carrossel Mobile - 9 features */}
        <FeaturesCarouselMobile
          theme={theme}
          t={t}
          features={mobileFeatures}
          currentSlide={currentSlide}
        />
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
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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

export default FeaturesSection;
