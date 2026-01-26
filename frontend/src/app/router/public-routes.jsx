import { lazy } from "react";
import { ROUTE_PATHS } from "./router-config";

// Lazy loading apenas para páginas que existem
const HomePage = lazy(() => import("../../public/pages/home.page.jsx"));
const LoginPage = lazy(() => import("../../domains/auth/pages/login.page.jsx"));
const RegisterPage = lazy(
  () => import("../../domains/auth/pages/register.page.jsx"),
);
const ForgotPasswordPage = lazy(
  () => import("../../domains/auth/pages/forgot-password.page.jsx"),
);
const ResetPasswordPage = lazy(
  () => import("../../domains/auth/pages/reset-password.page.jsx"),
);
const VerifyEmailPage = lazy(
  () => import("../../domains/auth/pages/verify-email.page.jsx"),
);

// Página 404
const NotFoundPage = lazy(
  () => import("../../public/pages/not-found.page.jsx"),
);

export const publicRoutes = [
  {
    path: ROUTE_PATHS.PUBLIC.HOME,
    element: <HomePage />,
  },
  // REMOVA as rotas que não existem (features, pricing, about, contact)
  // Ou crie placeholders se quiser manter as rotas
];

export const authRoutes = [
  {
    path: ROUTE_PATHS.AUTH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTE_PATHS.AUTH.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: ROUTE_PATHS.AUTH.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },
  {
    path: ROUTE_PATHS.AUTH.RESET_PASSWORD,
    element: <ResetPasswordPage />,
  },
  {
    path: ROUTE_PATHS.AUTH.VERIFY_EMAIL,
    element: <VerifyEmailPage />,
  },
  {
    path: ROUTE_PATHS.PUBLIC.VERIFY_TOKEN,
    element: <VerifyEmailPage />,
  },
];

// Rota 404 separada
export const notFoundRoute = {
  path: "*",
  element: <NotFoundPage />,
};
