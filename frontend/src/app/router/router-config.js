export const ROUTE_PATHS = {
  PUBLIC: {
    HOME: "/",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
    VERIFY_TOKEN: "/auth/verify/:token?",
    NOT_FOUND: "*", // Adicione esta linha
  },
  PRIVATE: {
    DASHBOARD: "/dashboard",
  },
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
  },
};
