// frontend/src/domains/auth/ui/reset-password-form/ResetPasswordForm.styles.js
export const getButtonClasses = (theme) => {
  const baseClasses =
    "w-full py-3 px-4 font-semibold rounded-lg transition-all active:scale-[0.98]";
  const themeStyles = {
    cyberpunk:
      "bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-purple-500/25",
    dark: "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-600/25",
    light:
      "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-600/20",
  };
  return `${baseClasses} ${themeStyles[theme] || themeStyles.cyberpunk}`;
};

export const getInputClasses = (theme) => {
  const baseClasses =
    "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition text-sm";
  const themeStyles = {
    cyberpunk:
      "bg-gray-900/40 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/30",
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
  return { border: borderColors[theme] || borderColors.cyberpunk };
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
