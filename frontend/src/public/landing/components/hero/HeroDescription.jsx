// frontend/src/public/landing/hero/HeroDescription.jsx (atualizado)
import React from "react";

const HeroDescription = ({ theme, t }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case "cyberpunk":
        return {
          text: "text-cyan-100/90",
          aiHighlight:
            "bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/30 text-pink-400 font-bold",
          border: "border-pink-500/30",
        };
      case "dark":
        return {
          text: "text-gray-300/90",
          aiHighlight:
            "bg-purple-500/10 border-purple-500/30 text-purple-300 font-bold",
          border: "border-purple-500/30",
        };
      case "light":
        return {
          text: "text-gray-700",
          aiHighlight:
            "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 text-blue-600 font-semibold",
          border: "border-blue-300",
        };
      default:
        return {
          text: "text-gray-300/90",
          aiHighlight:
            "bg-purple-500/10 border-purple-500/30 text-purple-300 font-bold",
          border: "border-purple-500/30",
        };
    }
  };

  const styles = getThemeStyles();
  const description = t("description.text");
  const aiText = t("description.ai");

  return (
    <div className="mb-16 max-w-3xl">
      <p
        className={`text-xl md:text-2xl leading-relaxed ${styles.text} animate-fadeIn`}
      >
        {description.split("{ai}").map((part, index, array) => (
          <React.Fragment key={index}>
            {part}
            {index < array.length - 1 && (
              <span
                className={`relative inline-block mx-1 px-3 py-1 rounded-lg ${styles.aiHighlight} ${styles.border}`}
              >
                {aiText}
              </span>
            )}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default HeroDescription;
