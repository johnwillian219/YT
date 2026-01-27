// frontend/src/domains/auth/ui/forgot-password-form/ForgotPasswordForm.styles.js
export const getButtonClasses = (theme) => {
  const baseClasses =
    "w-full py-3 px-4 font-semibold rounded-lg transition-all active:scale-[0.98]";

  const themeStyles = {
    cyberpunk: {
      classes:
        "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/25 hover:from-cyan-600 hover:to-purple-700",
    },
    dark: {
      classes:
        "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-600/25 hover:from-blue-700 hover:to-purple-700",
    },
    light: {
      classes:
        "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-600/20 hover:from-blue-700 hover:to-purple-700",
    },
  };

  return `${baseClasses} ${themeStyles[theme]?.classes || themeStyles.cyberpunk.classes}`;
};

export const getInputClasses = (theme) => {
  const baseClasses =
    "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition text-sm";

  const themeStyles = {
    cyberpunk:
      "bg-gray-900/40 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/30",
    dark: "bg-gray-800/40 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/30",
    light:
      "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20",
  };

  return `${baseClasses} ${themeStyles[theme] || themeStyles.cyberpunk}`;
};

export const getDividerClasses = (theme) => {
  const borderColors = {
    cyberpunk: "border-gray-800",
    dark: "border-gray-800",
    light: "border-gray-200",
  };

  return {
    border: borderColors[theme] || borderColors.cyberpunk,
  };
};

export const getTextColor = (theme) => {
  const colors = {
    cyberpunk: "text-gray-300",
    dark: "text-gray-300",
    light: "text-gray-800",
  };
  return colors[theme] || colors.cyberpunk;
};

export const getForgotPasswordColor = (theme) => {
  const colors = {
    cyberpunk: "text-cyan-400 hover:text-cyan-300",
    dark: "text-blue-400 hover:text-blue-300",
    light: "text-blue-600 hover:text-blue-800",
  };
  return colors[theme] || colors.cyberpunk;
};
