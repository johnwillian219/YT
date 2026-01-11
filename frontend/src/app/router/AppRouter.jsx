import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/public-layout.jsx";
import AuthLayout from "../layouts/auth-layout.jsx";
import DashboardLayout from "../layouts/dashboard-layout.jsx";

function AppRouter() {
  return (
    <Routes>
      <Route path="/*" element={<PublicLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/dashboard/*" element={<DashboardLayout />} />
    </Routes>
  );
}

export default AppRouter;
