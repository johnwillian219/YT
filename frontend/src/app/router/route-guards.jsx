// frontend/src/app/router/route-guards.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../bootstrap/auth-provider";
import LoadingSpinner from "../../shared/ui/feedback/LoadingSpinner";

// Guard para rotas protegidas (requer autenticação)
export function AuthGuard() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Se não está autenticado, redireciona para login
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Se está autenticado, renderiza o conteúdo da rota
  return <Outlet />;
}

// Guard para rotas públicas (somente não autenticados)
export function PublicOnlyRoute() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Se está autenticado, redireciona para dashboard
  if (isAuthenticated && user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Se não está autenticado, renderiza a rota pública
  return <Outlet />;
}

// Guard para verificação de email (opcional)
export function EmailVerifiedGuard() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Se não está autenticado, redireciona para login
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Se email não está verificado, redireciona para página de verificação
  // Nota: ajuste esta verificação conforme sua estrutura de user
  if (user.emailVerified === false) {
    return <Navigate to="/auth/verify-email" replace />;
  }

  // Se tudo OK, renderiza o conteúdo
  return <Outlet />;
}

// Guard para redirecionamento baseado em auth status
export function AuthRedirect() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Se autenticado, vai para dashboard
  if (isAuthenticated && user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Se não autenticado, vai para home
  return <Navigate to="/" replace />;
}
