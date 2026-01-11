/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyberpunk: {
          "neon-pink": "#ff00ff",
          "neon-blue": "#00ffff",
          "neon-green": "#00ff00",
          dark: "#0a0a0a",
          gray: "#1a1a1a",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
