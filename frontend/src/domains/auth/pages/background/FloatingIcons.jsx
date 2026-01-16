import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BACKGROUND_CONFIG, THEME_CONFIG } from "./background.constants";

// Ícones otimizados: YouTube e dinheiro como foco
const YOUTUBE_ICONS = [
  // Play button (YouTube) - simplificado
  <svg key="play" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </svg>,

  // Money/Dollar - foco principal
  <svg key="dollar" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
  </svg>,

  // YouTube Logo simplificada
  <svg key="youtube" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>,
];

const FloatingIcons = ({ theme = "cyberpunk" }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < BACKGROUND_CONFIG.breakpoints.mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const icons = useMemo(() => {
    const count =
      isMobile ?
        BACKGROUND_CONFIG.icons.mobileCount
      : BACKGROUND_CONFIG.icons.count;
    const themeColors =
      THEME_CONFIG[theme]?.icons?.colors || THEME_CONFIG.cyberpunk.icons.colors;

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      icon: YOUTUBE_ICONS[i % YOUTUBE_ICONS.length],
      size:
        Math.random() *
          (BACKGROUND_CONFIG.icons.size.max -
            BACKGROUND_CONFIG.icons.size.min) +
        BACKGROUND_CONFIG.icons.size.min,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration:
        Math.random() *
          (BACKGROUND_CONFIG.icons.speed.max -
            BACKGROUND_CONFIG.icons.speed.min) +
        BACKGROUND_CONFIG.icons.speed.min,
      delay: Math.random() * 5,
      opacity:
        Math.random() *
          (BACKGROUND_CONFIG.icons.opacity.max -
            BACKGROUND_CONFIG.icons.opacity.min) +
        BACKGROUND_CONFIG.icons.opacity.min,
      color: themeColors[i % themeColors.length],
      rotation: Math.random() * 360,
    }));
  }, [isMobile, theme]);

  // Em mobile, usar CSS animations
  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {icons.map((icon) => (
          <div
            key={icon.id}
            className="absolute bg-icon-glow animate-background-float-icon-mobile"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              width: `${icon.size}px`,
              height: `${icon.size}px`,
              color: icon.color,
              opacity: icon.opacity,
            }}
            // Usando a classe do background.css
          >
            {icon.icon}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute"
          style={{
            width: icon.size,
            height: icon.size,
            color: icon.color,
            opacity: icon.opacity,
            filter: "drop-shadow(0 0 3px currentColor)",
          }}
          initial={{
            x: `${icon.x}vw`,
            y: `${icon.y}vh`,
            rotate: icon.rotation,
          }}
          animate={{
            x: [
              `${icon.x}vw`,
              `${(icon.x + 10 - Math.random() * 20) % 100}vw`,
              `${icon.x}vw`,
            ],
            y: [
              `${icon.y}vh`,
              `${(icon.y + 8 - Math.random() * 16) % 100}vh`,
              `${icon.y}vh`,
            ],
            rotate: [icon.rotation, icon.rotation + 5, icon.rotation],
          }}
          transition={{
            duration: icon.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: icon.delay,
          }}
        >
          {icon.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
