// frontend/src/public/landing/components/features/FeaturesGridDesktop.jsx
import React from "react";

const FeaturesGridDesktop = ({ theme, t, features }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          card: "border-cyan-500/20 bg-gray-900/30 hover:border-cyan-500/40 hover:bg-gray-900/40",
          iconBg: "bg-cyan-500/10",
          iconColor: "text-cyan-400",
          title: "text-cyan-100",
          description: "text-cyan-300/70",
          hoverEffect: "hover:scale-[1.02]",
          shadow: "shadow-md",
        };
      case "dark":
        return {
          card: "border-gray-700/50 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-800/40",
          iconBg: "bg-purple-500/10",
          iconColor: "text-purple-400",
          title: "text-gray-200",
          description: "text-gray-400",
          hoverEffect: "hover:scale-[1.02]",
          shadow: "shadow-md",
        };
      case "light":
        return {
          // Seguindo o padrão do card lateral do TestimonialCard
          card: "bg-white border border-gray-200 rounded-2xl hover:border-blue-400 hover:shadow-lg transition-all duration-300",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-500",
          title: "text-gray-800 font-bold",
          description: "text-gray-600",
          hoverEffect: "hover:scale-[1.02]",
          shadow: "shadow-md",
        };
      default:
        return {
          card: "border-gray-700/50 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-800/40",
          iconBg: "bg-purple-500/10",
          iconColor: "text-purple-400",
          title: "text-gray-200",
          description: "text-gray-400",
          hoverEffect: "hover:scale-[1.02]",
          shadow: "shadow-md",
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
      {features.slice(0, 9).map((feature, index) => (
        <div
          key={feature.key}
          className={`p-5 lg:p-6 rounded-xl border transition-all duration-300 ${styles.card} ${styles.hoverEffect} ${styles.shadow} animate-slideUp`}
          style={{ animationDelay: `${0.1 + index * 0.05}s` }}
        >
          {/* Ícone */}
          <div className="mb-4">
            <div className={`p-3 rounded-lg ${styles.iconBg} inline-flex`}>
              <div className={styles.iconColor}>{feature.icon}</div>
            </div>
          </div>

          {/* Título */}
          <h3
            className={`text-lg lg:text-xl font-semibold mb-3 ${styles.title}`}
          >
            {t(`features.${feature.key}.shortTitle`)}
          </h3>

          {/* Descrição */}
          <p className={`text-sm lg:text-base ${styles.description}`}>
            {t(`features.${feature.key}.description`)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesGridDesktop;
