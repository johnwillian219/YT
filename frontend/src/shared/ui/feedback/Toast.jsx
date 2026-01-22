// frontend/src/shared/ui/feedback/Toast.jsx
// A Toast component to display brief messages to the user.
import React from "react";
import { useTheme } from "../../../app/bootstrap/theme-provider";

const Toast = ({
  title,
  message,
  type = "info",
  onClose,
  autoClose = true,
}) => {
  const { theme } = useTheme();

  const getTypeClasses = () => {
    const baseClasses = "rounded-lg p-4 shadow-lg border";

    const themeStyles = {
      info: {
        cyberpunk:
          "bg-cyberpunk-blue-20 border-cyberpunk-blue-40 text-cyberpunk-neon-blue",
        dark: "bg-blue-900/30 border-blue-700/50 text-blue-400",
        light: "bg-blue-50 border-blue-200 text-blue-700",
      },
      success: {
        cyberpunk:
          "bg-cyberpunk-green-20 border-cyberpunk-green-40 text-cyberpunk-neon-green",
        dark: "bg-green-900/30 border-green-700/50 text-green-400",
        light: "bg-green-50 border-green-200 text-green-700",
      },
      warning: {
        cyberpunk:
          "bg-cyberpunk-yellow-20 border-cyberpunk-yellow-40 text-cyberpunk-neon-yellow",
        dark: "bg-yellow-900/30 border-yellow-700/50 text-yellow-400",
        light: "bg-yellow-50 border-yellow-200 text-yellow-700",
      },
      error: {
        cyberpunk:
          "bg-cyberpunk-red-20 border-cyberpunk-red-40 text-cyberpunk-neon-red",
        dark: "bg-red-900/30 border-red-700/50 text-red-400",
        light: "bg-red-50 border-red-200 text-red-700",
      },
    };

    const typeStyle = themeStyles[type] || themeStyles.info;
    return `${baseClasses} ${typeStyle[theme] || typeStyle.cyberpunk}`;
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.282 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={`${getTypeClasses()} flex items-start space-x-3 animate-slideIn`}
    >
      <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
      <div className="flex-1">
        {title && <h4 className="font-semibold text-sm mb-1">{title}</h4>}
        {message && <p className="text-sm opacity-90">{message}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-current opacity-70 hover:opacity-100 transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Toast;
