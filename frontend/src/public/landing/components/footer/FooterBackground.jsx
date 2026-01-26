import React from "react";

const FooterBackground = ({ theme }) => {
  if (theme === "cyberpunk") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Gradiente cyberpunk */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/40 to-gray-900/60" />

        {/* Efeitos de grade */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(0deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Linhas de conexão sutis */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
      </div>
    );
  }

  if (theme === "dark") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Gradiente dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900/50" />

        {/* Padrão sutil */}
        <div
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>
    );
  }

  // Light theme
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Gradiente light */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-blue-50/40" />

      {/* Padrão geométrico sutil */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(45deg, #3b82f6 1px, transparent 1px),
                         linear-gradient(-45deg, #8b5cf6 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Linha superior sutil */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/30 to-transparent" />
    </div>
  );
};

export default FooterBackground;
