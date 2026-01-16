// frontend/src/app/router/AppRouter.jsx
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinner from "../../shared/ui/feedback/LoadingSpinner.jsx";

// Lazy load pages
const HomePage = lazy(() => import("../../public/pages/home.page.jsx"));
const LoginPage = lazy(() => import("../../domains/auth/pages/login.page.jsx"));
const RegisterPage = lazy(
  () => import("../../domains/auth/pages/register.page.jsx")
);
const ForgotPassword = lazy(
  () => import("../../domains/auth/pages/forgot-password.page.jsx")
);
const ResetPasswordPage = lazy(
  () => import("../../domains/auth/pages/reset-password.page.jsx")
);

function AppRouter() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<div>Features Page</div>} />
        <Route path="/pricing" element={<div>Pricing Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />

        {/* Auth Routes */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

        {/* Dashboard Routes - serão protegidas */}
        <Route path="/dashboard/*" element={<div>Dashboard Area</div>} />

        {/* 404 Route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
