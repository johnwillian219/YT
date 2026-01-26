// frontend/src/public/landing/components/features/FeaturesCarouselMobile.jsx
import React from "react";

const FeaturesCarouselMobile = ({ theme, t, features, currentSlide }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          // Card styles seguindo o padrão TestimonialCard
          card: "border border-cyan-500/30 bg-gradient-to-br from-gray-900/50 via-gray-900/30 to-cyan-900/10 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10",
          title: "text-cyan-100 font-bold",
          iconBg: "bg-cyan-500/20",
          iconColor: "text-cyan-400",
          description: "text-cyan-300/90 leading-relaxed",
          featureNumber: "text-cyan-400/70",
          borderAccent: "border-cyan-500/20",
          shadow: "shadow-lg shadow-cyan-500/5",
        };
      case "dark":
        return {
          card: "border border-gray-700 bg-gradient-to-br from-gray-800/50 via-gray-900/40 to-purple-900/20 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10",
          title: "text-gray-100 font-bold",
          iconBg: "bg-purple-500/20",
          iconColor: "text-purple-400",
          description: "text-gray-300/90 leading-relaxed",
          featureNumber: "text-purple-400/70",
          borderAccent: "border-gray-700",
          shadow: "shadow-lg shadow-purple-500/5",
        };
      case "light":
        return {
          // Seguindo o padrão do TestimonialCard light
          card: "bg-white border border-gray-300 hover:border-blue-400 hover:shadow-xl transition-all duration-300",
          title: "text-gray-900 font-bold",
          iconBg: "bg-blue-50",
          iconColor: "text-blue-600",
          description: "text-gray-700 leading-relaxed",
          featureNumber: "text-blue-600/70",
          borderAccent: "border-gray-200",
          shadow: "shadow-lg",
        };
      default:
        return {
          card: "border border-gray-700 bg-gradient-to-br from-gray-800/50 via-gray-900/40 to-purple-900/20 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10",
          title: "text-gray-100 font-bold",
          iconBg: "bg-purple-500/20",
          iconColor: "text-purple-400",
          description: "text-gray-300/90 leading-relaxed",
          featureNumber: "text-purple-400/70",
          borderAccent: "border-gray-700",
          shadow: "shadow-lg shadow-purple-500/5",
        };
    }
  };

  const styles = getThemeStyles();

  // Filtra para mostrar apenas 9 features no mobile (removendo a última)
  const mobileFeatures = features.slice(0, 9);

  return (
    <div className="md:hidden">
      <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 pb-4">
        <div className="flex gap-4" style={{ minWidth: "min-content" }}>
          {mobileFeatures.map((feature, index) => (
            <div
              key={feature.key}
              className="min-w-[85vw] max-w-[85vw] snap-center"
            >
              <div
                className={`
                  p-6 rounded-2xl border flex flex-col h-[300px]
                  transition-all duration-300 relative
                  ${styles.card} ${styles.shadow}
                  animate-slideUp
                `}
                style={{
                  animationDelay: `${0.1 + index * 0.05}s`,
                }}
              >
                {/* Ícone e número da feature */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl ${styles.iconBg} flex-shrink-0`}
                  >
                    <div className={`${styles.iconColor}`}>
                      {feature.mobileIcon}
                    </div>
                  </div>

                  <span
                    className={`text-sm font-medium ${styles.featureNumber}`}
                  >
                    {index + 1}/{mobileFeatures.length}
                  </span>
                </div>

                {/* Título */}
                <h3 className={`text-xl font-bold mb-4 ${styles.title}`}>
                  {t(`features.${feature.key}.shortTitle`)}
                </h3>

                {/* Descrição - com altura fixa para consistência */}
                <div className="flex-grow overflow-y-auto">
                  <p className={`text-sm ${styles.description} pr-2`}>
                    {t(`features.${feature.key}.description`)}
                  </p>
                </div>

                {/* Linha divisória inferior - seguindo TestimonialCard */}
                <div className={`mt-4 pt-4 border-t ${styles.borderAccent}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${styles.featureNumber}`}>
                      {t(`features.${feature.key}.shortTitle`)}
                    </span>
                    <span className={`text-xs ${styles.featureNumber}`}>
                      Feature
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesCarouselMobile;
