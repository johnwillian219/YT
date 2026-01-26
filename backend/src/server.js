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
} from "./infrastructure/database/client.js";

import { authConfig, databaseConfig } from "./core/config/index.js";

// ================================
// ENV & PATH SETUP
// ================================
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ================================
// APP & ENV CONFIG
// ================================
const app = express();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// ================================
// CORS CONFIG - CORRIGIDO PARA MÚLTIPLOS IPS
// ================================

// Lista de origens permitidas - INCLUA TODOS SEUS IPS AQUI
const ALLOWED_ORIGINS = [
  // Localhost (desenvolvimento)
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:8080",

  // Seus IPs específicos - ADICIONE TODOS QUE PRECISA
  "http://192.168.56.1:5173",
  "http://192.168.1.135:5173",

  // Para desenvolvimento, permita mais flexibilidade
  ...(NODE_ENV === "development"
    ? [
        /^http:\/\/localhost(:\d+)?$/, // localhost com qualquer porta
        /^http:\/\/127\.0\.0\.1(:\d+)?$/, // 127.0.0.1 com qualquer porta
        /^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/, // QUALQUER IP 192.168.x.x
        /^http:\/\/10\.\d+\.\d+\.\d+(:\d+)?$/, // QUALQUER IP 10.x.x.x
      ]
    : []),
];

console.log("\n🌐 CORS Configurado para as seguintes origens:");
ALLOWED_ORIGINS.forEach((origin, i) => {
  console.log(`  ${i + 1}. ${origin}`);
});
console.log("");

// Configuração CORS completa
app.use(
  cors({
    origin: function (origin, callback) {
      // Log da origem recebida
      const originLog = origin || "Sem origem (curl/postman/app)";
      console.log(`🔍 CORS Check: ${originLog}`);

      // 1. Permitir requests sem origem (curl, postman, mobile apps, etc)
      if (!origin) {
        console.log("✅ Permitindo request sem origem");
        return callback(null, true);
      }

      // 2. Verificar se a origem está na lista de permitidas
      const isAllowed = ALLOWED_ORIGINS.some((allowedOrigin) => {
        if (typeof allowedOrigin === "string") {
          return allowedOrigin === origin;
        } else if (allowedOrigin instanceof RegExp) {
          const matches = allowedOrigin.test(origin);
          if (matches) {
            console.log(`✅ Match regex: ${allowedOrigin} → ${origin}`);
          }
          return matches;
        }
        return false;
      });

      if (isAllowed) {
        console.log(`✅ CORS PERMITIDO para: ${origin}`);
        return callback(null, true);
      }

      // 3. Origem não permitida
      console.log(`❌ CORS BLOQUEADO para: ${origin}`);
      console.log(`📋 Origens permitidas:`, ALLOWED_ORIGINS);

      const error = new Error(`Origem "${origin}" não permitida por CORS`);
      error.status = 403;
      return callback(error);
    },
    credentials: true, // IMPORTANTE: Permite cookies/headers de auth
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "X-CSRF-Token",
      "X-Auth-Token",
      "X-Refresh-Token",
    ],
    exposedHeaders: ["Authorization", "Set-Cookie", "X-Refresh-Token"],
    maxAge: 86400, // 24 horas para cache de preflight
  }),
);

// Headers CORS adicionais (para alguns navegadores)
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Se a origem está na lista de permitidas, use-a
  if (origin) {
    const isAllowed = ALLOWED_ORIGINS.some((allowedOrigin) => {
      if (typeof allowedOrigin === "string") return allowedOrigin === origin;
      if (allowedOrigin instanceof RegExp) return allowedOrigin.test(origin);
      return false;
    });

    if (isAllowed) {
      res.header("Access-Control-Allow-Origin", origin);
    }
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD",
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token, X-Refresh-Token",
  );
  res.header("Access-Control-Expose-Headers", "Authorization, X-Refresh-Token");

  // Handle preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    console.log("🔄 Preflight request recebida de:", req.headers.origin);
    console.log(
      "📋 Headers solicitados:",
      req.headers["access-control-request-headers"],
    );
    return res.status(200).end();
  }

  next();
});

// ================================
// SEGURANÇA
// ================================
app.use(
  helmet({
    contentSecurityPolicy: NODE_ENV === "production",
    crossOriginEmbedderPolicy: NODE_ENV === "production",
    crossOriginResourcePolicy: {
      policy: NODE_ENV === "production" ? "same-origin" : "cross-origin",
    },
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
    hsts:
      NODE_ENV === "production"
        ? {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
          }
        : false,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  }),
);

// ================================
// LOGGING & PARSING
// ================================
app.use(morgan(NODE_ENV === "development" ? "dev" : "combined"));

app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  }),
);

// Servir arquivos estáticos
app.use("/public", express.static(join(__dirname, "../public")));

// ================================
// REQUEST LOGGER - MELHORADO
// ================================
app.use((req, res, next) => {
  const start = Date.now();
  const requestId =
    Date.now().toString(36) + Math.random().toString(36).substr(2);

  // Log detalhado da requisição
  console.log(`\n══════════════════════════════════════════════════`);
  console.log(`📨 REQUEST [${requestId}] ${req.method} ${req.originalUrl}`);
  console.log(`🌐 Origin: ${req.headers.origin || "Nenhum"}`);
  console.log(`🏠 Host: ${req.headers.host}`);
  console.log(
    `📱 User-Agent: ${req.headers["user-agent"]?.substring(0, 80)}...`,
  );
  console.log(
    `🔐 Authorization: ${req.headers.authorization ? "Presente" : "Ausente"}`,
  );

  // Log do corpo (se não for muito grande)
  if (req.body && Object.keys(req.body).length > 0) {
    const bodyStr = JSON.stringify(req.body);
    if (bodyStr.length < 1000) {
      console.log("📦 Body:", bodyStr);
    } else {
      console.log("📦 Body (truncado):", bodyStr.substring(0, 500) + "...");
    }
  }

  // Interceptar resposta para logging
  const originalSend = res.send;
  res.send = function (body) {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;

    console.log(
      `\n📤 RESPONSE [${requestId}] ${req.method} ${req.originalUrl}`,
    );
    console.log(`⏱️  Duração: ${duration}ms`);
    console.log(`📊 Status: ${statusCode}`);

    if (statusCode >= 400) {
      console.log("❌ ERROR Response:");
      try {
        const errorData = typeof body === "string" ? JSON.parse(body) : body;
        console.log(JSON.stringify(errorData, null, 2));
      } catch {
        console.log(body?.substring?.(0, 500) || body);
      }
    } else if (statusCode >= 200 && statusCode < 300) {
      console.log("✅ SUCCESS Response");
      if (typeof body === "string" && body.includes("accessToken")) {
        console.log("🔑 Token JWT presente na resposta");
      }
    }

    console.log(`══════════════════════════════════════════════════\n`);

    originalSend.call(this, body);
  };

  next();
});

// ================================
// HEALTH CHECK - MELHORADO
// ================================
app.get("/health", async (req, res) => {
  try {
    console.log("🩺 Health check request received");
    console.log(`🌐 Origin: ${req.headers.origin || "Nenhum"}`);
    console.log(
      `👤 User-Agent: ${req.headers["user-agent"]?.substring(0, 50)}...`,
    );

    const [dbStatus, memoryUsage] = await Promise.all([
      checkDatabaseConnection(),
      Promise.resolve(process.memoryUsage()),
    ]);

    const healthStatus =
      dbStatus.status === "connected" ? "healthy" : "degraded";
    const statusCode = healthStatus === "healthy" ? 200 : 503;

    console.log(`🏥 Health status: ${healthStatus} (${statusCode})`);

    const response = {
      status: healthStatus,
      timestamp: new Date().toISOString(),
      environment: NODE_ENV,
      uptime: process.uptime(),
      server: {
        nodeVersion: process.version,
        platform: process.platform,
        pid: process.pid,
        memory: {
          rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
          heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
          heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
        },
      },
      cors: {
        allowedOrigins: ALLOWED_ORIGINS.map((o) => o.toString()),
        currentOrigin: req.headers.origin,
        credentialsAllowed: true,
      },
      dependencies: {
        database: dbStatus,
      },
      config: {
        port: PORT,
        nodeEnv: NODE_ENV,
        jwtConfigured: !!authConfig.jwt.secret,
        corsOriginsCount: ALLOWED_ORIGINS.length,
      },
    };

    res.status(statusCode).json(response);
  } catch (error) {
    console.error("💥 Health check failed:", error);
    res.status(503).json({
      status: "unhealthy",
      error: error.message,
      timestamp: new Date().toISOString(),
      corsInfo: {
        allowedOrigins: ALLOWED_ORIGINS.map((o) => o.toString()),
        yourOrigin: req.headers.origin,
      },
    });
  }
});

// ================================
// API ROUTES
// ================================
const apiRouter = express.Router();

// Root API endpoint
apiRouter.get("/", (req, res) => {
  res.json({
    message: "YouTube Analytics API v1",
    version: "1.0.0",
    environment: NODE_ENV,
    endpoints: {
      auth: "/api/v1/auth",
      youtube: "/api/v1/youtube",
      analytics: "/api/v1/analytics",
      billing: "/api/v1/billing",
    },
    cors: {
      note: "CORS configurado para múltiplas origens",
      credentials: true,
      yourOrigin: req.headers.origin,
    },
    timestamp: new Date().toISOString(),
  });
});

// ✅ IMPORTE E USE AS ROTAS DE AUTH
import authRoutes from "./domains/auth/infrastructure/auth.routes.js";
apiRouter.use("/auth", authRoutes);

// Demo endpoints
apiRouter.get("/youtube/channels", (req, res) => {
  res.json({
    message: "Channels endpoint - under construction",
    note: "This will list YouTube channels for authenticated users",
  });
});

apiRouter.get("/analytics/dashboard", (req, res) => {
  res.json({
    message: "Analytics dashboard - under construction",
    note: "This will show analytics data for authenticated users",
  });
});

apiRouter.get("/billing/plans", (req, res) => {
  res.json({
    plans: [
      {
        id: "free",
        name: "Free Plan",
        price: 0,
        features: ["3 channels", "Basic analytics", "7-day retention"],
      },
      {
        id: "pro",
        name: "Pro Plan",
        price: 29,
        features: [
          "10 channels",
          "Advanced analytics",
          "30-day retention",
          "Export reports",
        ],
      },
      {
        id: "business",
        name: "Business Plan",
        price: 99,
        features: [
          "Unlimited channels",
          "AI insights",
          "90-day retention",
          "Priority support",
        ],
      },
    ],
  });
});

// Register all API routes under /api/v1
app.use("/api/v1", apiRouter);

// ================================
// TEST ENDPOINT (para verificar CORS)
// ================================
app.get("/test-cors", (req, res) => {
  console.log("🧪 Test CORS endpoint chamado");
  console.log(`🌐 Origin: ${req.headers.origin}`);

  res.json({
    success: true,
    message: "CORS test endpoint",
    yourOrigin: req.headers.origin,
    corsConfigured: true,
    allowedOrigins: ALLOWED_ORIGINS.map((o) => o.toString()),
    timestamp: new Date().toISOString(),
  });
});

// ================================
// 404 HANDLER - MELHORADO
// ================================
app.use("*", (req, res) => {
  console.log(`🔍 404 Not Found: ${req.method} ${req.originalUrl}`);
  console.log(`🌐 Origin: ${req.headers.origin || "Nenhum"}`);

  res.status(404).json({
    error: "Endpoint not found",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
    availableEndpoints: [
      "GET /api/v1",
      "POST /api/v1/auth/register",
      "POST /api/v1/auth/login",
      "GET /health",
      "GET /test-cors",
    ],
    corsInfo: {
      allowedOrigins: ALLOWED_ORIGINS.map((o) => o.toString()),
      yourOrigin: req.headers.origin,
      note: "Se estiver recebendo erro CORS, verifique se sua origem está na lista acima",
    },
  });
});

// ================================
// ERROR HANDLER - MELHORADO
// ================================
app.use((err, req, res, next) => {
  console.error("\n🚨 UNHANDLED ERROR =======================================");
  console.error("Message:", err.message);
  console.error("Status:", err.status || err.statusCode || 500);
  console.error("Path:", req.originalUrl);
  console.error("Method:", req.method);
  console.error("Origin:", req.headers.origin);
  console.error("Stack:", err.stack);
  console.error("=========================================================\n");

  // Status code
  const statusCode = err.status || err.statusCode || 500;

  // Response base
  const errorResponse = {
    error: err.message || "Internal server error",
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method,
  };

  // CORS errors
  if (err.message.includes("CORS") || err.message.includes("Origin")) {
    errorResponse.corsError = true;
    errorResponse.allowedOrigins = ALLOWED_ORIGINS.map((o) => o.toString());
    errorResponse.yourOrigin = req.headers.origin;
    errorResponse.suggestion =
      "Adicione sua origem à lista ALLOWED_ORIGINS no server.js";
  }

  // Validation errors
  if (err.errors) {
    errorResponse.validationErrors = err.errors;
  }

  // Error code
  if (err.code) {
    errorResponse.code = err.code;
  }

  // Stack trace apenas em desenvolvimento
  if (NODE_ENV === "development") {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
});

// ================================
// GRACEFUL SHUTDOWN
// ================================
const gracefulShutdown = async (signal) => {
  console.log(`\n⚠️ ${signal} received. Starting graceful shutdown...`);

  try {
    // Close HTTP server
    server.close(() => {
      console.log("✅ HTTP server closed");
    });

    // Close database connections
    await disconnect();

    console.log("✅ Database connections closed");
    console.log("👋 Shutdown complete");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error during shutdown:", error);
    process.exit(1);
  }
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("\n💥 UNCAUGHT EXCEPTION ====================================");
  console.error("Error:", error.message);
  console.error("Stack:", error.stack);
  console.error("=========================================================\n");
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("\n💥 UNHANDLED REJECTION ===================================");
  console.error("Promise:", promise);
  console.error("Reason:", reason);
  console.error("=========================================================\n");
});

// ================================
// START SERVER
// ================================
const server = app.listen(PORT, "0.0.0.0", async () => {
  console.log(`
🎉 NINJATUBE BACKEND STARTED!
══════════════════════════════════════════════════
🌍 Environment: ${NODE_ENV}
🚀 Server URL: http://localhost:${PORT}
🔗 API Base: http://localhost:${PORT}/api/v1
🩺 Health Check: http://localhost:${PORT}/health
🧪 CORS Test: http://localhost:${PORT}/test-cors
🗄️  Database: ${process.env.DATABASE_URL ? "✅ Neon PostgreSQL" : "❌ Not configured"}
🔐 JWT: ${authConfig.jwt.secret ? "✅ Configured" : "❌ Missing"}
🌐 CORS: ✅ Configurado para ${ALLOWED_ORIGINS.length} origens
══════════════════════════════════════════════════
`);

  console.log("\n🌐 ORIGENS CORS PERMITIDAS:");
  ALLOWED_ORIGINS.forEach((origin, index) => {
    console.log(`  ${index + 1}. ${origin}`);
  });
  console.log("\n📱 IPS DA SUA REDE:");
  console.log("  • http://localhost:5173");
  console.log("  • http://192.168.56.1:5173");
  console.log("  • http://192.168.1.135:5173");
  console.log("\n🔧 DICA: Acesse http://SEU-IP:5173 para testar");
  console.log("══════════════════════════════════════════════════\n");

  // Test database connection on startup
  try {
    console.log("🔍 Testing database connection...");
    const dbStatus = await checkDatabaseConnection();

    if (dbStatus.status === "connected") {
      console.log(`✅ Database connected successfully!`);
      console.log(`   👤 Users in database: ${dbStatus.userCount}`);
      console.log(`   📊 Tables: ${dbStatus.tables}`);
      console.log(`   🗄️  PostgreSQL: ${dbStatus.version?.split("\n")[0]}`);
    } else {
      console.log(`❌ Database connection failed: ${dbStatus.error}`);
      console.log(`⚠️  Running without database connection`);
    }
  } catch (error) {
    console.error("❌ Failed to check database connection:", error.message);
  }
});

export default app;
