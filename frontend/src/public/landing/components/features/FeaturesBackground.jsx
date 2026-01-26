// frontend/src/public/landing/components/features/FeaturesBackground.jsx
import React from "react";

const FeaturesBackground = ({ theme }) => {
  if (theme === "cyberpunk") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Grid sutil cyberpunk */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 240, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(0, 240, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Elementos de brilho muito sutis */}
        <div className="absolute top-1/4 left-1/4 size-96 bg-gradient-to-r from-cyan-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 size-96 bg-gradient-to-r from-pink-500/5 to-transparent rounded-full blur-3xl" />
      </div>
    );
  }

  if (theme === "dark") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Pontos sutis */}
        <div className="absolute top-1/3 left-1/3 size-64 bg-gradient-to-r from-purple-500/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 size-64 bg-gradient-to-r from-blue-500/3 to-transparent rounded-full blur-3xl" />
      </div>
    );
  }

  // Light theme
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Grid muito sutil para light */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                         linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Elementos geométricos sutis */}
      <div className="absolute top-1/4 -right-20 size-96 bg-gradient-to-r from-blue-100/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-20 size-96 bg-gradient-to-r from-blue-50/30 to-transparent rounded-full blur-3xl" />
    </div>
  );
};

export default FeaturesBackground;
