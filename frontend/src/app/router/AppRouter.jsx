// frontend/src/app/router/AppRouter.jsx
import { Routes, Route } from "react-router-dom";
import { LazyLoader } from "./lazy-loader";
import { AuthGuard, PublicOnlyRoute } from "./route-guards";
import { publicRoutes, authRoutes, notFoundRoute } from "./public-routes";
import { privateRoutes } from "./private-routes";

function AppRouter() {
  return (
    <LazyLoader>
      <Routes>
        {/* Rotas públicas */}
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {/* Rotas de auth (somente para não autenticados) */}
        <Route element={<PublicOnlyRoute />}>
          {authRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Rotas protegidas (requer auth) */}
        <Route element={<AuthGuard />}>
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* 404 Route - Página customizada */}
        <Route path={notFoundRoute.path} element={notFoundRoute.element} />
      </Routes>
    </LazyLoader>
  );
}

export default AppRouter;
