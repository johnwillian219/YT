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
// MIDDLEWARES - DEBUG VERSION
// ================================
app.use(
  cors({
    origin: authConfig.cors.origin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

app.use(
  helmet({
    contentSecurityPolicy: NODE_ENV === "production",
    crossOriginEmbedderPolicy: NODE_ENV === "production",
    hsts: NODE_ENV === "production",
  }),
);

app.use(morgan(NODE_ENV === "development" ? "dev" : "combined"));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/public", express.static(join(__dirname, "../public")));

// ================================
// REQUEST LOGGER - ENHANCED FOR DEBUG
// ================================
app.use((req, res, next) => {
  const start = Date.now();

  // Log da requisição com body
  console.log(`\n📨 ${req.method} ${req.originalUrl}`);

  if (req.body && Object.keys(req.body).length > 0) {
    console.log("📦 Body:", JSON.stringify(req.body, null, 2));
  }

  if (req.headers.authorization) {
    console.log("🔑 Auth header present");
  }

  const originalSend = res.send;
  res.send = function (body) {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;

    console.log(
      `📤 ${req.method} ${req.originalUrl} - ${statusCode} (${duration}ms)`,
    );

    if (statusCode >= 400) {
      console.log(
        "❌ Error Response:",
        typeof body === "string" ? body : JSON.stringify(body, null, 2),
      );
    } else if (statusCode >= 200 && statusCode < 300) {
      console.log(
        "✅ Success Response (first 500 chars):",
        typeof body === "string"
          ? body.substring(0, 500)
          : JSON.stringify(body).substring(0, 500),
      );
    }

    originalSend.call(this, body);
  };

  next();
});

// ================================
// HEALTH CHECK WITH DETAILS
// ================================
app.get("/health", async (req, res) => {
  try {
    console.log("🩺 Health check request received");

    const [dbStatus, memoryUsage] = await Promise.all([
      checkDatabaseConnection(),
      Promise.resolve(process.memoryUsage()),
    ]);

    const healthStatus =
      dbStatus.status === "connected" ? "healthy" : "degraded";
    const statusCode = healthStatus === "healthy" ? 200 : 503;

    console.log(`🏥 Health status: ${healthStatus} (${statusCode})`);

    res.status(statusCode).json({
      status: healthStatus,
      timestamp: new Date().toISOString(),
      environment: NODE_ENV,
      uptime: process.uptime(),
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        memory: {
          rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
          heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
          heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
        },
      },
      dependencies: {
        database: dbStatus,
      },
      config: {
        port: PORT,
        corsOrigin: authConfig.cors.origin,
        jwtConfigured: !!authConfig.jwt.secret,
      },
    });
  } catch (error) {
    console.error("💥 Health check failed:", error);
    res.status(503).json({
      status: "unhealthy",
      error: error.message,
      timestamp: new Date().toISOString(),
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
    endpoints: {
      auth: "/api/v1/auth",
      youtube: "/api/v1/youtube",
      analytics: "/api/v1/analytics",
      billing: "/api/v1/billing",
    },
    documentation: "https://docs.ninjatube.com",
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
// 404 HANDLER
// ================================
app.use("*", (req, res) => {
  console.log(`🔍 404 Not Found: ${req.method} ${req.originalUrl}`);
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
    ],
  });
});

// ================================
// ERROR HANDLER - ENHANCED
// ================================
app.use((err, req, res, next) => {
  console.error("🚨 Unhandled Error:", {
    message: err.message,
    stack: err.stack,
    code: err.code,
    statusCode: err.statusCode || 500,
    path: req.originalUrl,
    method: req.method,
  });

  // Determine status code
  const statusCode = err.statusCode || 500;

  // Prepare error response
  const errorResponse = {
    error: err.message || "Internal server error",
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  };

  // Add validation errors if present
  if (err.errors) {
    errorResponse.validationErrors = err.errors;
  }

  // Add error code if present
  if (err.code) {
    errorResponse.code = err.code;
  }

  // Don't expose stack trace in production
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
  console.error("💥 Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("💥 Unhandled Rejection at:", promise, "reason:", reason);
});

// ================================
// START SERVER
// ================================
const server = app.listen(PORT, async () => {
  console.log(`
🎉 NinjaTube Backend Started!
=========================
🌍 Environment: ${NODE_ENV}
🚀 Server: http://localhost:${PORT}
🔗 API: http://localhost:${PORT}/api/v1
🩺 Health: http://localhost:${PORT}/health
🗄️  Database: ${process.env.DATABASE_URL ? "Neon PostgreSQL" : "❌ Not configured"}
🔐 JWT: ${authConfig.jwt.secret ? "✅ Configured" : "❌ Missing"}
=========================
`);

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
