// frontend/src/app/router/lazy-loader.jsx
import { Suspense } from "react";
import LoadingSpinner from "../../shared/ui/feedback/LoadingSpinner";

export function LazyLoader({ children }) {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
}
