// frontend/src/public/landing/hero/HeroBackground.jsx (atualizado)
import React from "react";

const HeroBackground = ({ theme }) => {
  if (theme === "cyberpunk") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Grid sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-pink-500/5" />

        {/* Linhas de grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 240, 255, 0.03) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(0, 240, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Elementos flutuantes */}
        <div className="absolute top-1/4 left-1/4 size-96 bg-cyan-500/5 rounded-full blur-3xl animate-float-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 size-96 bg-pink-500/5 rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-3/4 left-1/2 -translate-x-1/2 size-64 bg-purple-500/5 rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "4s" }}
        />

        {/* Scanlines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent 50%, rgba(0, 240, 255, 0.1) 50%)`,
            backgroundSize: "100% 4px",
          }}
        />
      </div>
    );
  }

  if (theme === "dark") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
      </div>
    );
  }

  // Light theme - MUITO MAIS LIMPO E PROFISSIONAL
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Background principal limpo */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100" />

      {/* Elementos geométricos sutis */}
      <div className="absolute top-20 right-20 size-64 bg-blue-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 left-20 size-96 bg-blue-100 rounded-full blur-3xl opacity-30" />

      {/* Linhas de grid muito sutis */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                         linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: "120px 120px",
        }}
      />
    </div>
  );
};

export default HeroBackground;
