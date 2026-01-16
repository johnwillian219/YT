import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BACKGROUND_CONFIG, THEME_CONFIG } from "./background.constants";

const MoneyPulse = ({ theme = "cyberpunk" }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < BACKGROUND_CONFIG.breakpoints.mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const pulses = useMemo(() => {
    const currentTheme = THEME_CONFIG[theme] || THEME_CONFIG.cyberpunk;
    const pulseColors = currentTheme?.pulse?.colors || [
      "#FFD700",
      "#FFFFFF",
      "#FF6B6B",
    ];

    return Array.from({ length: BACKGROUND_CONFIG.pulse.count }, (_, i) => ({
      id: i,
      color: pulseColors[i % pulseColors.length],
      size:
        Math.random() *
          (BACKGROUND_CONFIG.pulse.size.max -
            BACKGROUND_CONFIG.pulse.size.min) +
        BACKGROUND_CONFIG.pulse.size.min,
      x: Math.random() * 70 + 15,
      y: Math.random() * 70 + 15,
      duration: BACKGROUND_CONFIG.pulse.duration + Math.random() * 3,
      delay: i * 2,
      opacity: Math.random() * 0.07 + 0.08,
    }));
  }, [theme]);

  if (!pulses || pulses.length === 0) {
    return null;
  }

  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {pulses.map((pulse) => (
          <div
            key={pulse.id}
            className="absolute rounded-full border-2"
            style={{
              left: `${pulse.x}%`,
              top: `${pulse.y}%`,
              width: `${pulse.size}px`,
              height: `${pulse.size}px`,
              borderColor: pulse.color,
              opacity: pulse.opacity,
              transform: "translate(-50%, -50%)",
              animation: `pulse ${pulse.duration}s ease-out ${pulse.delay}s infinite`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {pulses.map((pulse) => (
        <React.Fragment key={pulse.id}>
          <motion.div
            className="absolute rounded-full border-2"
            style={{
              borderColor: pulse.color,
              opacity: pulse.opacity,
              left: `${pulse.x}%`,
              top: `${pulse.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{
              width: 0,
              height: 0,
              scale: 0.3,
              opacity: 0,
            }}
            animate={{
              width: pulse.size,
              height: pulse.size,
              scale: [0.3, 1, 1.1],
              opacity: [0, pulse.opacity, 0],
            }}
            transition={{
              duration: pulse.duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeOut",
              delay: pulse.delay,
            }}
          />
          {/* Efeito de brilho secundário */}
          <motion.div
            className="absolute rounded-full"
            style={{
              backgroundColor: pulse.color,
              left: `${pulse.x}%`,
              top: `${pulse.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{
              width: 0,
              height: 0,
              opacity: 0,
            }}
            animate={{
              width: pulse.size * 0.3,
              height: pulse.size * 0.3,
              opacity: [0, pulse.opacity * 2, 0],
            }}
            transition={{
              duration: pulse.duration * 0.7,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeOut",
              delay: pulse.delay + 0.5,
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default MoneyPulse;
