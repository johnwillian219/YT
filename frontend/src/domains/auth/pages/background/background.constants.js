// Configurações centralizadas para o background animado
export const BACKGROUND_CONFIG = {
  // Configurações de partículas
  particles: {
    count: 50,
    mobileCount: 20,
    sizes: [1, 1.5, 2],
    speed: {
      min: 30,
      max: 50,
    },
    opacity: {
      min: 0.02,
      max: 0.08,
    },
  },

  // Configurações de ícones flutuantes
  icons: {
    count: 20,
    mobileCount: 10,
    size: {
      min: 24,
      max: 36,
    },
    speed: {
      min: 20,
      max: 40,
    },
    opacity: {
      min: 0.08,
      max: 0.15,
    },
  },

  // Configurações de pulso monetário
  pulse: {
    count: 10,
    size: {
      min: 120,
      max: 250,
    },
    duration: 8,
    opacity: {
      min: 0.08,
      max: 0.15,
    },
  },

  // Breakpoints para responsividade
  breakpoints: {
    mobile: 768,
    tablet: 1024,
  },

  // Configurações de gradiente
  gradient: {
    animationDuration: 20,
  },
};

// Configurações por tema
export const THEME_CONFIG = {
  cyberpunk: {
    particles: {
      colors: [
        "rgba(255, 0, 0, 0.15)", // YouTube red
        "rgba(0, 255, 255, 0.12)", // Cyan
        "rgba(255, 0, 255, 0.12)", // Magenta
        "rgba(255, 215, 0, 0.15)", // Gold
      ],
    },
    icons: {
      colors: ["#FF0000", "#FFD700", "#00FFFF", "#8B5CF6"],
    },
    pulse: {
      colors: ["#FFD700", "#FFFFFF", "#FF6B6B"],
    },
    gradient: {
      colors: [
        "rgba(255, 0, 0, 0.04)",
        "rgba(103, 58, 183, 0.03)",
        "rgba(0, 0, 0, 0)",
        "rgba(255, 215, 0, 0.03)",
      ],
    },
  },
  dark: {
    particles: {
      colors: [
        "rgba(255, 0, 0, 0.12)", // YouTube red
        "rgba(139, 92, 246, 0.12)",
        "rgba(255, 215, 0, 0.12)", // Gold
        "rgba(16, 185, 129, 0.12)",
      ],
    },
    icons: {
      colors: ["#FF0000", "#8B5CF6", "#FFD700", "#10B981"],
    },
    pulse: {
      colors: ["#FFD700", "#FFFFFF", "#3B82F6"],
    },
    gradient: {
      colors: [
        "rgba(255, 0, 0, 0.03)",
        "rgba(139, 92, 246, 0.02)",
        "rgba(0, 0, 0, 0)",
        "rgba(255, 215, 0, 0.02)",
      ],
    },
  },
  light: {
    particles: {
      colors: [
        "rgba(255, 0, 0, 0.12)",
        "rgba(99, 102, 241, 0.12)",
        "rgba(255, 215, 0, 0.12)",
        "rgba(34, 197, 94, 0.12)",
      ],
    },
    icons: {
      colors: ["#FF0000", "#6366F1", "#FFD700", "#22C55E"],
    },
    pulse: {
      colors: ["#FFD700", "#000000", "#6366F1"],
    },
    gradient: {
      colors: [
        "rgba(255, 0, 0, 0.03)",
        "rgba(99, 102, 241, 0.02)",
        "rgba(255, 255, 255, 0)",
        "rgba(255, 215, 0, 0.02)",
      ],
    },
  },
};
