// frontend/src/domains/auth/ui/register-form/RegisterForm.styles.js
export const getButtonClasses = (theme) => {
  const baseClasses =
    "w-full py-3 px-4 font-semibold rounded-lg transition-all active:scale-[0.98]";

  const themeStyles = {
    cyberpunk: {
      classes:
        "bg-gradient-to-r from-cyberpunk-neon-pink to-cyberpunk-neon-blue text-white hover:shadow-lg hover:shadow-cyberpunk-neon-pink/25",
    },
    dark: {
      classes:
        "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-600/25",
    },
    light: {
      classes:
        "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-600/20",
    },
  };

  return `${baseClasses} ${themeStyles[theme]?.classes || themeStyles.cyberpunk.classes}`;
};

export const getInputClasses = (theme) => {
  const baseClasses =
    "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition";

  const themeStyles = {
    cyberpunk:
      "bg-gray-800/20 border-gray-700 text-white placeholder-gray-500 focus:border-cyberpunk-neon-blue focus:ring-cyberpunk-neon-blue/30",
    dark: "bg-gray-800/20 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/30",
    light:
      "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20",
  };

  return `${baseClasses} ${themeStyles[theme] || themeStyles.cyberpunk}`;
};

export const getGoogleButtonClasses = (theme) => {
  const baseClasses =
    "w-full flex items-center justify-center px-4 py-3 border rounded-lg transition-all hover:shadow-sm active:scale-[0.98]";

  const themeStyles = {
    cyberpunk:
      "border-gray-700 bg-gray-800/20 text-white hover:bg-gray-800/30 hover:border-gray-600",
    dark: "border-gray-700 bg-gray-800/20 text-white hover:bg-gray-800/40 hover:border-gray-600",
    light:
      "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400",
  };

  return `${baseClasses} ${themeStyles[theme] || themeStyles.cyberpunk}`;
};

export const getDividerClasses = (theme) => {
  const borderColors = {
    cyberpunk: "border-gray-700",
    dark: "border-gray-700",
    light: "border-gray-300",
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
    cyberpunk: "text-cyberpunk-neon-blue hover:text-cyberpunk-neon-pink",
    dark: "text-blue-400 hover:text-blue-300",
    light: "text-blue-600 hover:text-blue-800",
  };
  return colors[theme] || colors.cyberpunk;
};

export const getCheckboxClasses = (theme) => {
  const baseClasses = "h-4 w-4 rounded border focus:ring focus:ring-offset-1";

  const themeStyles = {
    cyberpunk:
      "border-gray-600 bg-gray-800 text-cyberpunk-neon-blue focus:ring-cyberpunk-neon-blue",
    dark: "border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500",
    light: "border-gray-400 bg-white text-blue-600 focus:ring-blue-500",
  };

  return `${baseClasses} ${themeStyles[theme] || themeStyles.cyberpunk}`;
};
