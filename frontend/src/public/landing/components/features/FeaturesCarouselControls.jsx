// frontend/src/public/landing/components/features/FeaturesCarouselControls.jsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeaturesCarouselControls = ({
  theme,
  onPrev,
  onNext,
  currentSlide,
  totalSlides,
  onGoToSlide,
}) => {
  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          button:
            "bg-cyan-500/10 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20 hover:text-cyan-200 hover:border-cyan-500/40",
          activeIndicator: "bg-cyan-400",
          inactiveIndicator: "bg-cyan-500/40",
          counter: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
          indicatorContainer: "bg-gray-900/30 border-cyan-500/20",
        };
      case "dark":
        return {
          button:
            "bg-gray-800/50 text-gray-300 border-gray-700 hover:bg-gray-700/50 hover:text-gray-200 hover:border-gray-600",
          activeIndicator: "bg-purple-400",
          inactiveIndicator: "bg-gray-600",
          counter: "bg-gray-800/50 text-gray-300 border-gray-700",
          indicatorContainer: "bg-gray-800/30 border-gray-700/50",
        };
      case "light":
        return {
          button:
            "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400",
          activeIndicator: "bg-blue-500",
          inactiveIndicator: "bg-gray-300",
          counter: "bg-white text-gray-700 border-gray-300",
          indicatorContainer: "bg-white/80 border-gray-300",
        };
      default:
        return {
          button:
            "bg-gray-800/50 text-gray-300 border-gray-700 hover:bg-gray-700/50 hover:text-gray-200 hover:border-gray-600",
          activeIndicator: "bg-purple-400",
          inactiveIndicator: "bg-gray-600",
          counter: "bg-gray-800/50 text-gray-300 border-gray-700",
          indicatorContainer: "bg-gray-800/30 border-gray-700/50",
        };
    }
  };

  const styles = getThemeStyles();

  if (totalSlides === 0) {
    return null;
  }

  return (
    <div className="hidden">
      {/* Botões e indicadores */}
      <div className="flex items-center gap-4">
        <button
          onClick={onPrev}
          className={`p-2 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 ${styles.button}`}
          aria-label="Feature anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicadores */}
        <div
          className={`px-3 py-1.5 rounded-lg border ${styles.indicatorContainer}`}
        >
          <div className="flex gap-2">
            {Array.from({ length: Math.min(5, totalSlides) }).map(
              (_, index) => {
                // Para muitos slides, mostramos apenas alguns indicadores
                const slideIndex = index;
                return (
                  <button
                    key={index}
                    onClick={() => onGoToSlide(slideIndex)}
                    className={`
                    relative h-1.5 rounded-full transition-all duration-300 hover:scale-110
                    ${
                      slideIndex === currentSlide
                        ? `${styles.activeIndicator} w-6`
                        : `${styles.inactiveIndicator} w-2`
                    }
                  `}
                    aria-label={`Ir para feature ${slideIndex + 1}`}
                  />
                );
              },
            )}
          </div>
        </div>

        <button
          onClick={onNext}
          className={`p-2 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 ${styles.button}`}
          aria-label="Próxima feature"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Contador */}
      <div className="text-center">
        <span
          className={`text-xs px-3 py-1 rounded-full border font-medium ${styles.counter}`}
        >
          {currentSlide + 1} / {totalSlides}
        </span>
      </div>
    </div>
  );
};

export default FeaturesCarouselControls;
