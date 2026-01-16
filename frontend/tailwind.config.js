/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        cyberpunk: {
          "neon-pink": "#ff00ff",
          "neon-blue": "#00ffff",
          "neon-green": "#00ff00",
          "neon-yellow": "#ffff00",
          "neon-purple": "#bf00ff",
        },
      },
      animation: {
        // Animações do background
        "background-float": "float 25s ease-in-out infinite",
        "background-float-slow": "float 35s ease-in-out infinite",
        "background-float-icon": "float-icon 20s ease-in-out infinite",
        "background-pulse": "pulse var(--duration, 8s) ease-out infinite",
        "background-gradient": "gradient-flow 15s ease infinite",
        "money-sparkle": "money-sparkle 2s ease-in-out infinite",

        // Animações gerais
        "slide-down": "slideDown 0.3s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "bounce-slow": "bounce 3s infinite",
        shimmer: "shimmer 2s infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        // Keyframes para animações do Tailwind
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)" },
          "100%": { boxShadow: "0 0 30px rgba(0, 255, 255, 0.7)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-cyberpunk":
          "linear-gradient(135deg, #ff00ff 0%, #00ffff 50%, #ffff00 100%)",
        "gradient-analytics":
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
