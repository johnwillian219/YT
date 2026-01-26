import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarouselControls = ({
  theme,
  onPrev,
  onNext,
  currentSlide,
  totalSlides,
  onGoToSlide,
  t,
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

  // Se não houver testimonials, não renderiza nada
  if (totalSlides === 0) {
    return null;
  }

  return (
    <>
      {/* Controles COMPLETOS - APENAS DESKTOP */}
      <div className="hidden md:flex flex-col items-center gap-6 mb-8 md:mb-12">
        {/* Botões e indicadores */}
        <div className="flex items-center gap-6">
          <button
            onClick={onPrev}
            className={`p-3 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed ${styles.button}`}
            aria-label={t("carousel.prev")}
            disabled={totalSlides === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            className={`px-4 py-2 rounded-lg border ${styles.indicatorContainer}`}
          >
            <div className="flex gap-3">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => onGoToSlide(index)}
                  className={`
                    relative h-2 rounded-full transition-all duration-300 hover:scale-110
                    ${
                      index === currentSlide
                        ? `${styles.activeIndicator} w-10`
                        : `${styles.inactiveIndicator} w-3`
                    }
                  `}
                  aria-label={t("carousel.goTo", { index: index + 1 })}
                  disabled={totalSlides === 0}
                />
              ))}
            </div>
          </div>

          <button
            onClick={onNext}
            className={`p-3 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed ${styles.button}`}
            aria-label={t("carousel.next")}
            disabled={totalSlides === 0}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Contador */}
        <div className="text-center">
          <span
            className={`text-sm px-4 py-2 rounded-full border font-medium ${styles.counter}`}
          >
            {t("carousel.counter", {
              current: currentSlide + 1,
              total: totalSlides,
            })}
          </span>
        </div>
      </div>

      {/* Indicadores APENAS - APENAS MOBILE (opcional) */}
      {/* Remova este bloco se não quiser NADA no mobile */}
      {/*
      <div className="md:hidden flex flex-col items-center gap-4 mb-6">
        <div className={`px-4 py-2 rounded-lg border ${styles.indicatorContainer}`}>
          <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <div
                key={index}
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${
                    index === currentSlide
                      ? `${styles.activeIndicator} w-4`
                      : `${styles.inactiveIndicator} w-2`
                  }
                `}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <span className={`text-xs px-3 py-1 rounded-full ${styles.counter}`}>
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>
      </div>
      */}
    </>
  );
};

export default CarouselControls;
