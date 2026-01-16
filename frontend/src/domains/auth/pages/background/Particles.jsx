import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BACKGROUND_CONFIG, THEME_CONFIG } from "./background.constants";

const Particles = ({ theme = "cyberpunk" }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < BACKGROUND_CONFIG.breakpoints.mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const particles = useMemo(() => {
    const count =
      isMobile ?
        BACKGROUND_CONFIG.particles.mobileCount
      : BACKGROUND_CONFIG.particles.count;
    const themeColors =
      THEME_CONFIG[theme]?.particles?.colors ||
      THEME_CONFIG.cyberpunk.particles.colors;

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: BACKGROUND_CONFIG.particles.sizes[
        Math.floor(Math.random() * BACKGROUND_CONFIG.particles.sizes.length)
      ],
      color: themeColors[Math.floor(Math.random() * themeColors.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration:
        Math.random() *
          (BACKGROUND_CONFIG.particles.speed.max -
            BACKGROUND_CONFIG.particles.speed.min) +
        BACKGROUND_CONFIG.particles.speed.min,
      delay: Math.random() * 7,
      opacity:
        Math.random() *
          (BACKGROUND_CONFIG.particles.opacity.max -
            BACKGROUND_CONFIG.particles.opacity.min) +
        BACKGROUND_CONFIG.particles.opacity.min,
      blur: Math.random() * 2,
    }));
  }, [isMobile, theme]);

  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              filter: `blur(${particle.blur}px)`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            filter: `blur(${particle.blur}px)`,
          }}
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
          }}
          animate={{
            x: [
              `${particle.x}vw`,
              `${(particle.x + 15 - Math.random() * 30) % 100}vw`,
              `${particle.x}vw`,
            ],
            y: [
              `${particle.y}vh`,
              `${(particle.y + 10 - Math.random() * 20) % 100}vh`,
              `${particle.y}vh`,
            ],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
