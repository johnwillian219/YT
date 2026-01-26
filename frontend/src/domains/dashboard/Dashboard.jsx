// frontend/src/domains/dashboard/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpa sessão simples (ajustamos depois)
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          🚀 NinjaTube Dashboard
        </h1>

        <p className="text-gray-600 mb-6">
          Bem-vindo! Se estás aqui, o login funcionou corretamente ✅
        </p>

        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded">
            <strong>Status:</strong> Autenticado
          </div>

          <div className="p-3 bg-gray-50 rounded">
            <strong>Ambiente:</strong> Development
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
