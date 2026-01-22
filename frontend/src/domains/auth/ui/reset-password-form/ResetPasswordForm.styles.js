// frontend/src/domains/auth/ui/reset-password-form/ResetPasswordForm.styles.js
export const getButtonClasses = (theme) => {
  return `py-3 px-4 font-bold rounded-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 active:scale-95 border ${
    theme === "cyberpunk" ?
      "bg-gradient-to-r from-cyberpunk-neon-pink to-cyberpunk-neon-blue text-white border-cyan-400/50 shadow-cyberpunk-neon-pink/30 hover:shadow-cyberpunk-neon-blue/40"
    : theme === "dark" ?
      "bg-gradient-to-r from-slate-800 to-slate-900 text-white border-slate-700 shadow-slate-900/50 hover:shadow-slate-800/60"
    : "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-500 shadow-blue-600/40 hover:shadow-blue-700/50"
  }`;
};

export const getInputClasses = (theme) => {
  return `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 transition ${
    theme === "cyberpunk" ?
      "bg-gray-800/40 border-gray-700 text-white placeholder-gray-500 focus:border-cyberpunk-neon-blue focus:ring-cyberpunk-neon-blue/30"
    : theme === "dark" ?
      "bg-gray-800/60 border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/30"
    : "bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/30"
  }`;
};

export const getTextColor = (theme) => {
  return theme === "light" ? "text-gray-800" : "text-gray-300";
};

export const getTitleColor = (theme) => {
  return theme === "light" ? "text-gray-900" : "text-white";
};

export const getLinkColor = (theme) => {
  return (
    theme === "cyberpunk" ?
      "text-cyberpunk-neon-blue hover:text-cyberpunk-neon-pink"
    : theme === "dark" ? "text-blue-400 hover:text-blue-300"
    : "text-blue-600 hover:text-blue-800"
  );
};

export const getBorderColor = (theme) => {
  return theme === "light" ? "border-gray-300" : "border-gray-700";
};

export const getRequirementsBg = (theme) => {
  const bgColors = {
    cyberpunk: "bg-gray-800/40 text-gray-300",
    dark: "bg-gray-800/60 text-gray-300",
    light: "bg-gray-100 text-gray-700",
  };
  return bgColors[theme] || bgColors.cyberpunk;
};

export const getContainerClasses = (theme) => {
  return `backdrop-blur-lg rounded-2xl p-6 border shadow-2xl ${
    theme === "cyberpunk" ?
      "bg-gray-900/40 border-cyberpunk-blue-30 shadow-cyberpunk-neon-blue/10"
    : theme === "dark" ? "bg-gray-900/60 border-gray-700 shadow-gray-900/30"
    : "bg-white/90 border-gray-300 shadow-gray-400/20"
  }`;
};
