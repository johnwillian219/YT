// frontend/src/app/bootstrap/notification-provider.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import Toast from "../../shared/ui/feedback/Toast";

const NotificationContext = createContext(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback(
    ({ title, message, type = "info", duration = 5000 }) => {
      const id = Date.now().toString();

      const newNotification = {
        id,
        title,
        message,
        type,
        duration,
      };

      setNotifications((prev) => [...prev, newNotification]);

      // Auto-remover após a duração
      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }

      return id;
    },
    []
  );

  const removeNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Métodos de conveniência
  const showSuccess = useCallback(
    (title, message) => {
      return showNotification({ title, message, type: "success" });
    },
    [showNotification]
  );

  const showError = useCallback(
    (title, message) => {
      return showNotification({ title, message, type: "error" });
    },
    [showNotification]
  );

  const showWarning = useCallback(
    (title, message) => {
      return showNotification({ title, message, type: "warning" });
    },
    [showNotification]
  );

  const showInfo = useCallback(
    (title, message) => {
      return showNotification({ title, message, type: "info" });
    },
    [showNotification]
  );

  const value = {
    notifications,
    showNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}

      {/* Container de notificações */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
        {notifications.map((notification) => (
          <Toast
            key={notification.id}
            {...notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
