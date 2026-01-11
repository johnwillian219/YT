import { PrismaClient } from "@prisma/client";
import { config } from "../../../core/config/index.js";

// Extend Prisma Client for logging
const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      config.nodeEnv === "development" ?
        ["query", "info", "warn", "error"]
      : ["error"],

    // Connection pool configuration
    datasources: {
      db: {
        url: config.database.url,
      },
    },
  });
};

// Global instance to prevent multiple connections in development
const globalForPrisma = global;

export const prisma = globalForPrisma.prisma || prismaClientSingleton();

if (config.nodeEnv !== "production") {
  globalForPrisma.prisma = prisma;
}

// Health check
export const checkDatabaseConnection = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      status: "connected",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Database connection error:", error);
    return {
      status: "disconnected",
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
};

// Disconnect gracefully
export const disconnect = async () => {
  try {
    await prisma.$disconnect();
  } catch (error) {
    console.error("Error disconnecting from database:", error);
    throw error;
  }
};

// Execute with retry logic
export const executeWithRetry = async (
  operation,
  maxRetries = 3,
  delay = 1000
) => {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      // Check if error is retryable
      const isRetryable =
        error.code === "P1001" || // Cannot reach database server
        error.code === "P1002" || // Connection timeout
        error.code === "P1003" || // Database does not exist
        error.code === "P1017"; // Server closed the connection

      if (!isRetryable || attempt === maxRetries) {
        throw error;
      }

      console.warn(
        `Database operation failed, retrying (${attempt}/${maxRetries})...`,
        error
      );

      // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError;
};

export default prisma;
