// frontend/src/public/landing/pricing/DiscountTable.jsx
import React, { useState, useEffect } from "react";
import { Percent, TrendingUp, Zap, Crown } from "lucide-react";

const DiscountTable = ({ theme, t }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          container:
            "bg-gradient-to-br from-gray-900/40 via-gray-900/20 to-cyan-900/10 border-cyan-500/30",
          title: "text-cyan-100",
          icon: "text-cyan-400",
          card: "bg-gradient-to-br from-cyan-500/20 via-cyan-500/15 to-pink-500/10 border-cyan-500/40",
          activeCard:
            "border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] scale-105",
          discount: "text-cyan-300 font-black",
          channels: "text-cyan-300/90 font-semibold",
          price: "text-cyan-400/80",
          note: "text-cyan-300/60",
          dot: "bg-cyan-500/40",
          dotActive: "bg-cyan-500",
          featureIcon: "text-cyan-400",
        };
      case "dark":
        return {
          container:
            "bg-gradient-to-br from-gray-800/40 via-gray-900/30 to-purple-900/10 border-purple-500/30",
          title: "text-white",
          icon: "text-purple-400",
          card: "bg-gradient-to-br from-purple-500/20 via-purple-500/15 to-pink-500/10 border-purple-500/40",
          activeCard:
            "border-purple-400 shadow-[0_0_30px_rgba(147,51,234,0.3)] scale-105",
          discount: "text-purple-300 font-black",
          channels: "text-gray-300 font-semibold",
          price: "text-gray-400",
          note: "text-gray-400",
          dot: "bg-gray-600",
          dotActive: "bg-purple-500",
          featureIcon: "text-purple-400",
        };
      case "light":
        return {
          container:
            "bg-gradient-to-br from-white via-blue-50/70 to-white border-blue-300",
          title: "text-gray-800",
          icon: "text-blue-500",
          card: "bg-gradient-to-br from-blue-100 via-blue-50/90 to-blue-100/80 border-blue-300",
          activeCard:
            "border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.2)] scale-105",
          discount: "text-blue-600 font-black",
          channels: "text-gray-700 font-semibold",
          price: "text-gray-600",
          note: "text-gray-500",
          dot: "bg-gray-300",
          dotActive: "bg-blue-500",
          featureIcon: "text-blue-500",
        };
      default:
        return {
          container:
            "bg-gradient-to-br from-gray-800/40 via-gray-900/30 to-purple-900/10 border-purple-500/30",
          title: "text-white",
          icon: "text-purple-400",
          card: "bg-gradient-to-br from-purple-500/20 via-purple-500/15 to-pink-500/10 border-purple-500/40",
          activeCard:
            "border-purple-400 shadow-[0_0_30px_rgba(147,51,234,0.3)] scale-105",
          discount: "text-purple-300 font-black",
          channels: "text-gray-300 font-semibold",
          price: "text-gray-400",
          note: "text-gray-400",
          dot: "bg-gray-600",
          dotActive: "bg-purple-500",
          featureIcon: "text-purple-400",
        };
    }
  };

  const styles = getThemeStyles();
  const levels = ["level1", "level2", "level3"];

  // Ícones para cada nível
  const getLevelIcon = (index) => {
    switch (index) {
      case 0:
        return <Zap className="w-5 h-5" />;
      case 1:
        return <TrendingUp className="w-5 h-5" />;
      case 2:
        return <Crown className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  // Auto-avanço do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % levels.length);
    }, 3000); // Muda a cada 3 segundos

    return () => clearInterval(interval);
  }, [levels.length]);

  return (
    <div className={`rounded-2xl border-2 p-6 md:p-8 ${styles.container}`}>
      {/* Cabeçalho */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`p-2 rounded-lg ${theme === "light" ? "bg-blue-100" : "bg-gray-800/50"}`}
          >
            <Percent className={`w-6 h-6 ${styles.icon}`} />
          </div>
          <h3 className={`text-2xl md:text-3xl font-bold ${styles.title}`}>
            {t("discountTable.title")}
          </h3>
        </div>
      </div>

      {/* Grid para Desktop */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {levels.map((level, index) => (
          <div
            key={level}
            className={`p-7 rounded-xl border-2 transition-all duration-500 hover:scale-[1.03] ${styles.card} ${
              currentSlide === index ? styles.activeCard : ""
            }`}
          >
            <div className="flex items-center justify-between mb-5">
              <div
                className={`p-3 rounded-xl ${theme === "light" ? "bg-blue-50" : "bg-gray-800/50"}`}
              >
                {getLevelIcon(index)}
              </div>
              <div
                className={`text-sm font-bold px-3 py-1 rounded-full ${
                  theme === "light"
                    ? "bg-blue-100 text-blue-600"
                    : theme === "cyberpunk"
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "bg-purple-500/20 text-purple-300"
                }`}
              >
                Nível {index + 1}
              </div>
            </div>

            <div className={`text-4xl font-bold mb-4 ${styles.discount}`}>
              {t(`discountTable.levels.${level}.discount`)}
            </div>

            <div className={`text-lg font-medium mb-3 ${styles.channels}`}>
              {t(`discountTable.levels.${level}.channels`)}
            </div>

            <div className={`text-base ${styles.price} font-medium`}>
              {t(`discountTable.levels.${level}.price`)}
            </div>
          </div>
        ))}
      </div>

      {/* Carrossel Automático para Mobile */}
      <div className="md:hidden">
        <div className="relative overflow-hidden rounded-xl">
          {/* Cards em transição */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {levels.map((level, index) => (
              <div key={level} className="w-full flex-shrink-0 px-4 pt-5">
                <div
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${styles.card} ${
                    currentSlide === index ? styles.activeCard : "opacity-90"
                  }`}
                >
                  {/* Cabeçalho do card */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`p-3 rounded-xl ${theme === "light" ? "bg-blue-50" : "bg-gray-800/50"}`}
                    >
                      {getLevelIcon(index)}
                    </div>
                    <div
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        theme === "light"
                          ? "bg-blue-100 text-blue-600"
                          : theme === "cyberpunk"
                            ? "bg-cyan-500/20 text-cyan-300"
                            : "bg-purple-500/20 text-purple-300"
                      }`}
                    >
                      Nível {index + 1}
                    </div>
                  </div>

                  {/* Conteúdo principal */}
                  <div className={`text-3xl font-bold mb-4 ${styles.discount}`}>
                    {t(`discountTable.levels.${level}.discount`)}
                  </div>

                  <div
                    className={`text-base font-medium mb-3 ${styles.channels}`}
                  >
                    {t(`discountTable.levels.${level}.channels`)}
                  </div>

                  <div className={`text-sm ${styles.price} font-medium`}>
                    {t(`discountTable.levels.${level}.price`)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicadores (dots) */}
          <div className="flex justify-center gap-3 mt-8">
            {levels.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? `${styles.dotActive} w-8`
                    : `${styles.dot} w-3`
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Nota final */}
      <p className={`text-center mt-8 text-sm ${styles.note}`}>
        {t("discountTable.note")}
      </p>
    </div>
  );
};

export default DiscountTable;
