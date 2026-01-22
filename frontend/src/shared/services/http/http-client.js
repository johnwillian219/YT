//frontend/src/shared/services/http/http-client.js
import axios from "axios";
import { storage } from "../storage/localStorage.service";

// Verificar se a URL do backend está correta
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
console.log("🌐 Configurando httpClient para:", API_URL);

const http = axios.create({
  baseURL: API_URL,
  timeout: 15000, // Aumentar timeout
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Importante para CORS e cookies
});

// Testar conexão com backend na inicialização
if (typeof window !== "undefined") {
  // Verificar se backend está acessível
  fetch(`${API_URL}/health`)
    .then((res) => {
      console.log("✅ Backend está acessível em:", API_URL);
    })
    .catch((err) => {
      console.error("❌ Backend não acessível em:", API_URL);
      console.error("Execute: npm run dev no backend ou verifique a URL");
    });
}

// Interceptor para adicionar token automaticamente
http.interceptors.request.use(
  (config) => {
    // Obter token do localStorage
    const token = storage.get("auth_token");

    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log para debug
    if (import.meta.env.VITE_DEBUG === "true") {
      console.log(
        `📤 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
        {
          hasToken: !!token,
        },
      );
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor de resposta
http.interceptors.response.use(
  (response) => {
    if (import.meta.env.VITE_DEBUG === "true") {
      console.log(
        `✅ ${response.config.method?.toUpperCase()} ${response.config.url}:`,
        response.status,
      );
    }
    return response;
  },
  (error) => {
    const url = error.config?.url;
    const method = error.config?.method?.toUpperCase();

    console.error(`❌ ${method || "ERROR"} ${url || "unknown"}:`, {
      code: error.code,
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Diagnóstico automático
    if (error.code === "ERR_NETWORK") {
      console.error("🚨 NETWORK ERROR - Verifique:");
      console.error(`1. Backend rodando? Teste: curl ${API_URL}/health`);
      console.error("2. CORS configurado no backend?");
      console.error("3. URL do backend configurada:", API_URL);
      console.error("4. Erro detalhado:", error.message);
    }

    // Se for 401 e não for rota de auth, limpar token
    if (error.response?.status === 401 && url && !url.includes("/auth/")) {
      console.warn("⚠️ Token inválido ou expirado");
      storage.remove("auth_token");
      storage.remove("auth_user");
      storage.remove("auth_refresh_token");

      // Redirecionar para login se estiver no navegador
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/auth/")
      ) {
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  },
);

// Métodos auxiliares
http.setAuthToken = function (token) {
  if (token) {
    this.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("✅ Token manualmente configurado no httpClient");
  } else {
    delete this.defaults.headers.common["Authorization"];
  }
  return this;
};

http.removeAuthToken = function () {
  delete this.defaults.headers.common["Authorization"];
  return this;
};

export default http;
