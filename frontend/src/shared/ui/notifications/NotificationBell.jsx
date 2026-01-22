// frontend/src/shared/ui/notifications/NotificationBell.jsx
import React, { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { useTheme } from "../../../app/bootstrap/theme-provider";
import Toast from "../feedback/Toast";

const NotificationBell = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Bem-vindo!",
      message: "Sua conta foi criada com sucesso!",
      type: "success",
      read: false,
      time: "Agora",
    },
    {
      id: 2,
      title: "Novo recurso",
      message: "Análise de SEO disponível",
      type: "info",
      read: false,
      time: "2h atrás",
    },
    {
      id: 3,
      title: "Atualização",
      message: "Sistema otimizado para performance",
      type: "info",
      read: true,
      time: "1d atrás",
    },
  ]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  // Calcular notificações não lidas
  useEffect(() => {
    const count = notifications.filter((n) => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Marcar todas como lidas
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  // Marcar uma como lida
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  // Remover uma notificação
  const removeNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  // Classes baseadas no tema
  const getBellClasses = () => {
    const base = "relative p-2 rounded-lg transition-all duration-200 ";

    if (theme === "light") {
      return (
        base + "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
      );
    } else if (theme === "dark") {
      return (
        base + "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
      );
    } else {
      return (
        base + "bg-gray-800/50 hover:bg-gray-800 text-gray-300 hover:text-white"
      );
    }
  };

  const getDropdownClasses = () => {
    const base =
      "absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-xl shadow-xl border transform transition-all duration-200 ";

    if (isOpen) {
      return base + "visible opacity-100 translate-y-0 ";
    } else {
      return base + "invisible opacity-0 translate-y-2 ";
    }

    // Adicionar cores do tema
    if (theme === "light") {
      return base + "bg-white border-gray-200";
    } else if (theme === "dark") {
      return base + "bg-gray-900 border-gray-700";
    } else {
      return base + "bg-gray-900/95 backdrop-blur-xl border-gray-800";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão do sino */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={getBellClasses()}
        aria-label={`Notificações ${unreadCount > 0 ? `(${unreadCount} não lidas)` : ""}`}
      >
        <Bell className="w-5 h-5" />

        {/* Badge de notificações não lidas */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown de notificações */}
      <div className={getDropdownClasses()}>
        <div className="p-4">
          {/* Cabeçalho */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">
              Notificações
              {unreadCount > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({unreadCount} não lidas)
                </span>
              )}
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
              >
                Marcar todas como lidas
              </button>
            )}
          </div>

          {/* Lista de notificações */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.length === 0 ?
              <div className="text-center py-8 text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Nenhuma notificação</p>
              </div>
            : notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border transition-all ${notification.read ? "opacity-70" : "border-l-4"} ${
                    notification.type === "success" ? "border-l-green-500"
                    : notification.type === "error" ? "border-l-red-500"
                    : notification.type === "warning" ? "border-l-yellow-500"
                    : "border-l-blue-500"
                  } ${
                    theme === "light" ? "bg-gray-50 border-gray-200"
                    : theme === "dark" ? "bg-gray-800/50 border-gray-700"
                    : "bg-gray-800/30 border-gray-800"
                  }`}
                  onClick={() =>
                    !notification.read && markAsRead(notification.id)
                  }
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`font-medium ${
                            theme === "light" ? "text-gray-900" : "text-white"
                          }`}
                        >
                          {notification.title}
                        </span>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p
                        className={`text-sm ${
                          theme === "light" ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="text-xs text-gray-500 hover:text-red-500 transition-colors"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Rodapé */}
          {notifications.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <button
                onClick={() => {
                  // Navegar para página de todas as notificações
                  window.location.href = "/notifications";
                }}
                className="w-full text-center text-sm text-blue-500 hover:text-blue-600 transition-colors"
              >
                Ver todas as notificações
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationBell;
