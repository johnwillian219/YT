// backend/src/infrastructure/database/client.js
import { PrismaClient } from "@prisma/client";

// Singleton do Prisma Client para evitar múltiplas conexões
const prismaClientSingleton = () => {
  const client = new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? [
            { level: "query", emit: "event" },
            { level: "error", emit: "stdout" },
            { level: "info", emit: "stdout" },
            { level: "warn", emit: "stdout" },
          ]
        : ["error"],

    // Configurações para Neon/Serverless
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },

    // Timeout aumentado para Neon
    __internal: {
      engine: {
        enableConnectionTimeout: false,
      },
    },
  });

  // Middleware para log de queries (útil para debug)
  if (process.env.NODE_ENV === "development") {
    // Log de queries
    client.$on("query", (e) => {
      console.log("\n📊 PRISMA QUERY:");
      console.log("🔹 Query:", e.query);
      console.log("⏱️  Duration:", e.duration, "ms");
      console.log("📝 Params:", e.params);
      console.log("📈 Timestamp:", e.timestamp);
    });

    // Log de erros
    client.$on("error", (e) => {
      console.error("\n❌ PRISMA ERROR:");
      console.error("🔹 Message:", e.message);
      console.error("🔹 Target:", e.target);
    });

    // Middleware para medir tempo de execução
    client.$use(async (params, next) => {
      const before = Date.now();

      try {
        const result = await next(params);
        const after = Date.now();

        console.log(
          `📦 Query ${params.model}.${params.action} took ${after - before}ms`,
        );

        return result;
      } catch (error) {
        console.error(
          `💥 Query ${params.model}.${params.action} failed after ${Date.now() - before}ms`,
        );
        throw error;
      }
    });
  }

  return client;
};

// Singleton global
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Verificação de conexão com o Neon
export const checkDatabaseConnection = async () => {
  try {
    console.log("\n🔍 INICIANDO TESTE DE CONEXÃO COM NEON...");

    // Log da URL (sem senha)
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl) {
      const maskedUrl = dbUrl.replace(/:[^:]*@/, ":****@");
      console.log("🔗 Database URL:", maskedUrl);
    } else {
      console.log("❌ DATABASE_URL não configurado no .env");
      return {
        status: "disconnected",
        error: "DATABASE_URL not configured",
        timestamp: new Date().toISOString(),
      };
    }

    // 1. Teste de conexão básica
    console.log("1. 🧪 Testando conexão básica...");
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Conexão básica OK");

    // 2. Verificar se as tabelas existem
    console.log("2. 📊 Verificando tabelas...");
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    console.log(`✅ Tabelas encontradas: ${tables.length}`);
    tables.forEach((table, index) => {
      console.log(`   ${index + 1}. ${table.table_name}`);
    });

    // 3. Contar usuários
    console.log("3. 👤 Contando usuários...");
    const userCount = await prisma.user.count();
    console.log(`✅ Total de usuários: ${userCount}`);

    // 4. Verificar versão do PostgreSQL
    console.log("4. 🗄️  Verificando versão do PostgreSQL...");
    const version = await prisma.$queryRaw`SELECT version()`;
    console.log(`✅ PostgreSQL: ${version[0].version.split("\n")[0]}`);

    // 5. Verificar tamanho do banco (opcional)
    console.log("5. 📈 Verificando informações do banco...");
    const dbInfo = await prisma.$queryRaw`
      SELECT 
        pg_database_size(current_database()) as db_size,
        pg_size_pretty(pg_database_size(current_database())) as db_size_pretty
    `;
    console.log(`✅ Tamanho do banco: ${dbInfo[0].db_size_pretty}`);

    return {
      status: "connected",
      timestamp: new Date().toISOString(),
      userCount,
      tables: tables.length,
      tableNames: tables.map((t) => t.table_name),
      version: version[0].version,
      databaseSize: dbInfo[0].db_size_pretty,
      connectionInfo: {
        urlConfigured: !!dbUrl,
        sslEnabled: dbUrl?.includes("sslmode=require"),
        isNeon: dbUrl?.includes("neon.tech") || dbUrl?.includes("neon.tech"),
      },
    };
  } catch (error) {
    console.error("\n❌ ERRO NA CONEXÃO COM NEON:");
    console.error("🔹 Mensagem:", error.message);
    console.error("🔹 Código:", error.code || "N/A");

    if (error.meta) {
      console.error("🔹 Meta:", JSON.stringify(error.meta, null, 2));
    }

    // Diagnóstico detalhado
    console.error("\n🔧 DIAGNÓSTICO DO ERRO:");
    console.error(
      "1. DATABASE_URL configurado?:",
      process.env.DATABASE_URL ? "✅ Sim" : "❌ Não",
    );

    if (process.env.DATABASE_URL) {
      const dbUrl = process.env.DATABASE_URL;
      const maskedUrl = dbUrl.replace(/:[^:]*@/, ":****@");
      console.error("2. URL do banco:", maskedUrl);
      console.error(
        "3. SSL habilitado?:",
        dbUrl.includes("sslmode=require") ? "✅ Sim" : "❌ Não",
      );
      console.error(
        "4. É URL do Neon?:",
        dbUrl.includes("neon.tech") || dbUrl.includes("neon.tech")
          ? "✅ Sim"
          : "❌ Não",
      );
    }

    console.error(
      "5. PostgreSQL rodando?:",
      "Verifique se o serviço está ativo",
    );
    console.error("6. Credenciais corretas?:", "Verifique usuário e senha");
    console.error(
      "7. Banco existe?:",
      "Verifique se o banco 'neondb' existe no Neon",
    );

    return {
      status: "disconnected",
      error: error.message,
      code: error.code,
      timestamp: new Date().toISOString(),
      diagnostics: {
        databaseUrlConfigured: !!process.env.DATABASE_URL,
        errorCode: error.code,
        sslRequired: process.env.DATABASE_URL?.includes("sslmode=require"),
      },
    };
  }
};

// Fechar conexão
export const disconnect = async () => {
  try {
    console.log("\n🔌 Fechando conexão com o banco...");
    await prisma.$disconnect();
    console.log("✅ Conexão com o banco fechada com sucesso");
  } catch (error) {
    console.error("❌ Erro ao fechar conexão:", error);
  }
};

// Executar com retry (importante para Neon serverless)
export const executeWithRetry = async (
  operation,
  maxRetries = 3,
  delay = 1000,
) => {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Tentativa ${attempt}/${maxRetries}...`);
      return await operation();
    } catch (error) {
      lastError = error;

      // Erros específicos do Neon
      if (error.code === "P1001") {
        console.warn(
          `⚠️ Cannot reach database server (Neon). Tentando novamente em ${delay * attempt}ms...`,
        );
      } else if (error.code === "P2037") {
        console.warn(
          `⚠️ Too many connections (Neon pool). Tentando novamente em ${delay * attempt}ms...`,
        );
      } else if (error.code === "P2028") {
        console.warn(
          `⚠️ Connection timeout (Neon). Tentando novamente em ${delay * attempt}ms...`,
        );
      } else {
        console.warn(`⚠️ Tentativa ${attempt} falhou:`, error.message);
      }

      if (attempt === maxRetries) {
        console.error(`💥 Todas as ${maxRetries} tentativas falharam`);
        throw error;
      }

      // Backoff exponencial
      await new Promise((resolve) =>
        setTimeout(resolve, delay * Math.pow(2, attempt - 1)),
      );
    }
  }

  throw lastError;
};

// Teste rápido de conexão
export const quickConnectionTest = async () => {
  try {
    const result = await prisma.$queryRaw`SELECT NOW() as current_time`;
    return {
      success: true,
      currentTime: result[0].current_time,
      message: "Database connection successful",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: "Database connection failed",
    };
  }
};

export default prisma;
