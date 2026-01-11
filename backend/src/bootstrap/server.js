import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import {
  prisma,
  checkDatabaseConnection,
  disconnect,
} from "../infrastructure/database/client.js";

// Configuração do ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar variáveis de ambiente
dotenv.config();

// Importar configurações
import { config } from "../core/config/index.js";

const app = express();
const PORT = config.port || 5000;
const NODE_ENV = config.nodeEnv || "development";

// ========== MIDDLEWARES ==========
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(
  helmet({
    contentSecurityPolicy: NODE_ENV === "production",
    crossOriginEmbedderPolicy: NODE_ENV === "production",
    hsts: NODE_ENV === "production",
  })
);

// Logging formatado
app.use(morgan(NODE_ENV === "development" ? "dev" : "combined"));

// Parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Servir arquivos estáticos (se necessário)
app.use("/public", express.static(join(__dirname, "../../public")));

// ========== REQUEST LOGGING MIDDLEWARE ==========
app.use((req, res, next) => {
  const start = Date.now();

  // Log da requisição
  if (NODE_ENV === "development") {
    console.log(`📨 ${req.method} ${req.originalUrl}`, {
      ip: req.ip,
      userAgent: req.get("User-Agent"),
      contentType: req.get("Content-Type"),
    });
  }

  // Interceptar resposta para logging
  const originalSend = res.send;
  res.send = function (body) {
    const duration = Date.now() - start;

    if (NODE_ENV === "development") {
      console.log(
        `📤 ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`,
        {
          status: res.statusCode,
          duration: `${duration}ms`,
          contentType: res.get("Content-Type"),
        }
      );
    }

    // Log de erros
    if (res.statusCode >= 400) {
      console.error(`❌ ${req.method} ${req.originalUrl} - ${res.statusCode}`, {
        body: NODE_ENV === "development" ? body : undefined,
        duration: `${duration}ms`,
      });
    }

    originalSend.call(this, body);
  };

  next();
});

// ========== HEALTH CHECK ==========
app.get("/health", async (req, res) => {
  try {
    const [dbStatus, memoryUsage] = await Promise.all([
      checkDatabaseConnection(),
      Promise.resolve(process.memoryUsage()),
    ]);

    const healthStatus =
      dbStatus.status === "connected" ? "healthy" : "degraded";

    res.status(healthStatus === "healthy" ? 200 : 503).json({
      status: healthStatus,
      timestamp: new Date().toISOString(),
      service: "YouTube Analytics API",
      version: process.env.npm_package_version || "1.0.0",
      environment: NODE_ENV,
      uptime: process.uptime(),

      // Informações do sistema
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        memory: {
          rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
          heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
          heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
          external: `${Math.round(memoryUsage.external / 1024 / 1024)}MB`,
        },
        cpu: process.cpuUsage(),
      },

      // Dependências
      dependencies: {
        database: dbStatus,
        // Adicionar outras dependências aqui (Redis, etc.)
      },

      // Links
      links: {
        api: `http://localhost:${PORT}/api/v1`,
        docs: `http://localhost:${PORT}/api-docs`,
        health: `http://localhost:${PORT}/health`,
      },
    });
  } catch (error) {
    console.error("Health check failed:", error);

    res.status(503).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

// ========== API V1 ROUTES ==========
const apiRouter = express.Router();

// API v1 base route
apiRouter.get("/", (req, res) => {
  res.json({
    message: "YouTube Analytics API v1",
    version: "1.0.0",
    documentation: "/api/v1/docs",
    endpoints: {
      auth: {
        login: "POST /api/v1/auth/login",
        register: "POST /api/v1/auth/register",
        refresh: "POST /api/v1/auth/refresh",
        logout: "POST /api/v1/auth/logout",
        me: "GET /api/v1/auth/me",
      },
      youtube: {
        channels: {
          list: "GET /api/v1/youtube/channels",
          connect: "POST /api/v1/youtube/channels/connect",
          sync: "POST /api/v1/youtube/channels/:id/sync",
          stats: "GET /api/v1/youtube/channels/:id/stats",
        },
        videos: {
          list: "GET /api/v1/youtube/videos",
          analyze: "POST /api/v1/youtube/videos/:id/analyze",
          update: "PUT /api/v1/youtube/videos/:id",
        },
      },
      analytics: {
        dashboard: "GET /api/v1/analytics/dashboard",
        reports: "GET /api/v1/analytics/reports",
      },
      billing: {
        plans: "GET /api/v1/billing/plans",
        subscription: "GET /api/v1/billing/subscription",
        invoices: "GET /api/v1/billing/invoices",
      },
    },
  });
});

// Auth routes placeholder
apiRouter.post("/auth/login", (req, res) => {
  res.json({
    message: "Login endpoint - under construction",
    endpoint: "/api/v1/auth/login",
  });
});

apiRouter.post("/auth/register", (req, res) => {
  res.json({
    message: "Register endpoint - under construction",
    endpoint: "/api/v1/auth/register",
  });
});

// YouTube routes placeholder
apiRouter.get("/youtube/channels", (req, res) => {
  res.json({
    message: "List channels endpoint - under construction",
    endpoint: "/api/v1/youtube/channels",
  });
});

// Analytics routes placeholder
apiRouter.get("/analytics/dashboard", (req, res) => {
  res.json({
    message: "Dashboard analytics endpoint - under construction",
    endpoint: "/api/v1/analytics/dashboard",
  });
});

// Billing routes placeholder
apiRouter.get("/billing/plans", (req, res) => {
  res.json({
    message: "Get plans endpoint - under construction",
    endpoint: "/api/v1/billing/plans",
    plans: [
      {
        id: "free",
        name: "Free",
        price: 0,
        features: ["3 channels", "Basic analytics"],
      },
      {
        id: "pro",
        name: "Pro",
        price: 29,
        features: ["10 channels", "AI tools", "SEO analysis"],
      },
      {
        id: "business",
        name: "Business",
        price: 99,
        features: ["50 channels", "Team collaboration", "API access"],
      },
    ],
  });
});

// Mount API router
app.use("/api/v1", apiRouter);

// ========== API DOCS (Swagger placeholder) ==========
app.get("/api-docs", (req, res) => {
  res.json({
    message: "API Documentation",
    swagger: "/api-docs/swagger.json",
    redoc: "/api-docs/redoc",
    postman: "https://www.postman.com/collection-link",
  });
});

app.get("/api-docs/swagger.json", (req, res) => {
  res.json({
    openapi: "3.0.0",
    info: {
      title: "YouTube Analytics API",
      version: "1.0.0",
      description: "API for YouTube Analytics Platform",
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api/v1`,
        description: "Development server",
      },
    ],
  });
});

// ========== ADMIN ROUTES (placeholder) ==========
const adminRouter = express.Router();

adminRouter.use((req, res, next) => {
  // Middleware de autenticação admin
  const token = req.headers["x-admin-token"];
  if (token !== "admin-secret-token") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
});

adminRouter.get("/users", (req, res) => {
  res.json({ message: "Admin users endpoint - under construction" });
});

adminRouter.get("/metrics", (req, res) => {
  res.json({ message: "Admin metrics endpoint - under construction" });
});

app.use("/admin", adminRouter);

// ========== 404 HANDLER ==========
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.originalUrl,
    method: req.method,
    availableEndpoints: {
      api: "/api/v1",
      health: "/health",
      docs: "/api-docs",
      admin: "/admin (requires x-admin-token header)",
    },
  });
});

// ========== ERROR HANDLER ==========
app.use((err, req, res, next) => {
  console.error("🚨 Error:", {
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  const errorResponse = {
    error: {
      message,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method,
    },
  };

  // Adicionar stack trace apenas em desenvolvimento
  if (NODE_ENV === "development") {
    errorResponse.error.stack = err.stack;
  }

  // Adicionar código de erro específico se existir
  if (err.code) {
    errorResponse.error.code = err.code;
  }

  res.status(statusCode).json(errorResponse);
});

// ========== GRACEFUL SHUTDOWN ==========
const gracefulShutdown = async (signal) => {
  console.log(`\n⚠️ Received ${signal}. Starting graceful shutdown...`);

  try {
    // Fechar servidor HTTP
    server.close(() => {
      console.log("✅ HTTP server closed");
    });

    // Fechar conexão com o banco
    await disconnect();
    console.log("✅ Database connection closed");

    // Fechar outras conexões (Redis, etc.)

    console.log("✅ Graceful shutdown completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during shutdown:", error);
    process.exit(1);
  }
};

// Capturar sinais de shutdown
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Capturar exceções não tratadas
process.on("uncaughtException", (error) => {
  console.error("🚨 Uncaught Exception:", error);
  gracefulShutdown("UNCAUGHT_EXCEPTION");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("🚨 Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown("UNHANDLED_REJECTION");
});

// ========== START SERVER ==========
const server = app.listen(PORT, () => {
  console.log(`
🎉 YouTube Analytics Platform Backend
========================================
✅ Server started successfully!
📡 Environment: ${NODE_ENV}
🌐 Port: ${PORT}
🚀 API: http://localhost:${PORT}/api/v1
📊 Health: http://localhost:${PORT}/health
📚 Docs: http://localhost:${PORT}/api-docs
👨‍💻 Admin: http://localhost:${PORT}/admin

📡 Database: ${config.database.url ? "✅ Configured" : "❌ Not configured"}
🔐 JWT Secret: ${config.jwt.secret ? "✅ Set" : "❌ Missing"}

========================================
Press Ctrl+C to stop the server
========================================
  `);
});

// Inicialização assíncrona
(async () => {
  try {
    // Testar conexão com banco
    const dbStatus = await checkDatabaseConnection();
    console.log(
      `🗄️ Database: ${dbStatus.status === "connected" ? "✅ Connected" : "❌ Disconnected"}`
    );

    // Inicializar outras conexões aqui (Redis, etc.)

    console.log("🚀 Initialization completed successfully!\n");
  } catch (error) {
    console.error("❌ Initialization failed:", error);
    process.exit(1);
  }
})();

export default app;
