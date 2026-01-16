import React, { useState, useEffect } from "react";
import GradientWaves from "./GradientWaves";
import Particles from "./Particles";
import FloatingIcons from "./FloatingIcons";
import MoneyPulse from "./MoneyPulse";
import { BACKGROUND_CONFIG } from "./background.constants";

const AnimatedBackground = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [theme, setTheme] = useState("cyberpunk");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);

    const updateTheme = () => {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "cyberpunk";
      setTheme(currentTheme);
    };

    updateTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          updateTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    window.addEventListener("theme-changed", updateTheme);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      observer.disconnect();
      window.removeEventListener("theme-changed", updateTheme);
    };
  }, []);

  if (isReducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" data-theme={theme}>
      {/* Camada 1: Gradiente base refinado */}
      <div className="absolute inset-0">
        <GradientWaves theme={theme} />
      </div>

      {/* Camada 2: Partículas minimalistas */}
      <div className="absolute inset-0">
        <Particles theme={theme} />
      </div>

      {/* Camada 3: Ícones flutuantes otimizados */}
      <div className="absolute inset-0">
        <FloatingIcons theme={theme} />
      </div>

      {/* Camada 4: MoneyPulse com melhor visibilidade */}
      <div className="absolute inset-0">
        <MoneyPulse theme={theme} />
      </div>

      {/* Overlays de gradiente para melhor contraste */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-950/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent" />
    </div>
  );
};

export default AnimatedBackground;
