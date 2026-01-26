import React from "react";

const FeaturesCarouselMobile = ({ theme, t, features, currentSlide }) => {
  const getThemeStyles = () => {
    const baseCard =
      "rounded-2xl p-6 sm:p-8 flex flex-col transition-all duration-400 ease-out border min-h-[460px]";

    switch (theme) {
      case "cyberpunk":
        return {
          card: `${baseCard} bg-slate-950/75 border-cyan-700/40`,
          hover:
            "hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px] hover:shadow-cyan-900/40 hover:border-cyan-500/70",
          iconBg: "bg-cyan-950/60 border border-cyan-800/40",
          iconColor: "text-cyan-400",
          title: "text-3xl sm:text-4xl font-bold text-cyan-50 tracking-tight",
          description: "text-xl sm:text-2xl text-cyan-100/90 leading-relaxed",
          number:
            "text-xl font-semibold text-cyan-400 uppercase tracking-wider",
          borderAccent: "border-cyan-800/35",
          dotActive: "bg-cyan-400 w-10",
          dotInactive: "bg-cyan-900/50 w-3",
        };

      case "dark":
        return {
          card: `${baseCard} bg-gray-950/80 border-gray-700/50`,
          hover:
            "hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px] hover:shadow-indigo-950/30 hover:border-indigo-500/60",
          iconBg: "bg-gray-800/60 border border-gray-700/40",
          iconColor: "text-indigo-400",
          title: "text-3xl sm:text-4xl font-bold text-gray-50 tracking-tight",
          description: "text-xl sm:text-2xl text-gray-200 leading-relaxed",
          number:
            "text-xl font-semibold text-indigo-400 uppercase tracking-wider",
          borderAccent: "border-gray-800/40",
          dotActive: "bg-indigo-400 w-10",
          dotInactive: "bg-gray-700/50 w-3",
        };

      case "light":
        return {
          card: `${baseCard} bg-white border-gray-200`,
          hover:
            "hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-200/50 hover:border-blue-500/70",
          iconBg: "bg-blue-50 border border-blue-100",
          iconColor: "text-blue-600",
          title: "text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight",
          description: "text-xl sm:text-2xl text-gray-700 leading-relaxed",
          number:
            "text-xl font-semibold text-blue-700 uppercase tracking-wider",
          borderAccent: "border-gray-200",
          dotActive: "bg-blue-600 w-10",
          dotInactive: "bg-gray-300 w-3",
        };

      default:
        return {
          card: `${baseCard} bg-gray-950/80 border-gray-700/50`,
          hover:
            "hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px] hover:shadow-indigo-950/30 hover:border-indigo-500/60",
          iconBg: "bg-gray-800/60 border border-gray-700/40",
          iconColor: "text-indigo-400",
          title: "text-3xl sm:text-4xl font-bold text-gray-50 tracking-tight",
          description: "text-xl sm:text-2xl text-gray-200 leading-relaxed",
          number:
            "text-xl font-semibold text-indigo-400 uppercase tracking-wider",
          borderAccent: "border-gray-800/40",
          dotActive: "bg-indigo-400 w-10",
          dotInactive: "bg-gray-700/50 w-3",
        };
    }
  };

  const styles = getThemeStyles();
  const visibleFeatures = features.slice(0, 9);

  return (
    <div className="md:hidden">
      <div className="overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-12 scrollbar-hide">
        <div className="flex gap-5 sm:gap-6">
          {visibleFeatures.map((feature, idx) => (
            <article
              key={feature.key}
              className="snap-center shrink-0 min-w-[82vw] max-w-[82vw] sm:min-w-[78vw] sm:max-w-[78vw]"
            >
              <div
                className={`
                  ${styles.card} ${styles.hover}
                  group relative
                  active:scale-[1.015] active:shadow-xl
                `}
              >
                {/* Ícone principal – cresce mais no toque/hover */}
                <div className="mb-7">
                  <div
                    className={`
                      inline-flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center
                      rounded-2xl ${styles.iconBg} transition-all duration-400
                      group-hover:scale-110 group-active:scale-115
                    `}
                  >
                    <div className={`text-5xl sm:text-6xl ${styles.iconColor}`}>
                      {feature.mobileIcon}
                    </div>
                  </div>
                </div>

                {/* Número da feature */}
                <div className="mb-4">
                  <span className={styles.number}>FEATURE {idx + 1}</span>
                </div>

                {/* Título maior */}
                <h3 className={`${styles.title} mb-6 leading-tight`}>
                  {t(`features.${feature.key}.shortTitle`)}
                </h3>

                {/* Descrição maior e mais confortável */}
                <p className={`${styles.description} flex-grow mb-10`}>
                  {t(`features.${feature.key}.description`)}
                </p>

                {/* Rodapé */}
                <div
                  className={`
                    mt-auto pt-7 border-t ${styles.borderAccent}
                    flex items-center gap-5
                  `}
                >
                  <div
                    className={`
                      h-14 w-14 rounded-xl flex items-center justify-center
                      ${styles.iconBg} transition-transform duration-400
                      group-hover:scale-110 group-active:scale-115
                    `}
                  >
                    <div className={`text-3xl ${styles.iconColor}`}>
                      {feature.mobileIcon}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className={`${styles.title} text-2xl mb-1 truncate`}>
                      {t(`features.${feature.key}.shortTitle`)}
                    </h4>
                    <p className="text-base font-medium text-gray-500 dark:text-gray-400">
                      Feature Essencial
                    </p>
                  </div>
                </div>

                {/* Indicador de posição no canto (opcional, discreto) */}
                <div className="absolute bottom-5 right-5 opacity-60">
                  <span className="text-sm font-medium tabular-nums">
                    {idx + 1} / {visibleFeatures.length}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Indicadores centrais */}
      <div className="flex justify-center gap-3 mt-8 px-4">
        {visibleFeatures.map((_, idx) => (
          <div
            key={idx}
            className={`
              h-3 rounded-full transition-all duration-400
              ${idx === currentSlide ? styles.dotActive : styles.dotInactive}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesCarouselMobile;
