// frontend/src/app/router/private-routes.jsx
import { lazy } from "react";
import { ROUTE_PATHS } from "./router-config";

// Lazy loading para páginas privadas
const DashboardPage = lazy(() => import("../../domains/dashboard/Dashboard"));

export const privateRoutes = [
  {
    path: ROUTE_PATHS.PRIVATE.DASHBOARD,
    element: <DashboardPage />,
  },
  // Você pode adicionar mais rotas privadas aqui:
  // {
  //   path: ROUTE_PATHS.PRIVATE.PROFILE,
  //   element: <ProfilePage />,
  // },
  // {
  //   path: ROUTE_PATHS.PRIVATE.SETTINGS,
  //   element: <SettingsPage />,
  // },
];
