// frontend/src/public/landing/pricing/PricingBackground.jsx
import React from "react";

const PricingBackground = ({ theme }) => {
  if (theme === "cyberpunk") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Grid sutil */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 240, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(0, 240, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Elementos de brilho */}
        <div className="absolute top-20 -right-20 size-64 bg-gradient-to-r from-cyan-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-20 size-64 bg-gradient-to-r from-pink-500/5 to-transparent rounded-full blur-3xl" />
      </div>
    );
  }

  if (theme === "dark") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Gradiente escuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />

        {/* Elementos sutis */}
        <div className="absolute top-1/3 -left-40 size-96 bg-purple-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-40 size-96 bg-blue-500/3 rounded-full blur-3xl" />
      </div>
    );
  }

  // Light theme
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Fundo limpo */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-100" />

      {/* Elementos geométricos sutis */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-50/30 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-50/20 via-transparent to-transparent" />

      {/* Bolhas decorativas */}
      <div className="absolute top-1/4 right-1/4 size-64 bg-blue-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 size-64 bg-blue-200/10 rounded-full blur-3xl" />
    </div>
  );
};

export default PricingBackground;
