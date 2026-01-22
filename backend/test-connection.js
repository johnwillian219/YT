import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function testConnection() {
  console.log("🔍 Testando conexão com Neon...");

  try {
    // 1. Teste de conexão básica
    console.log("1. Testando conexão...");
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Conexão OK");

    // 2. Ver tabelas
    console.log("2. Listando tabelas...");
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log("📊 Tabelas:", tables);

    // 3. Tentar criar um usuário
    console.log("3. Tentando criar usuário...");
    const testUser = await prisma.user.create({
      data: {
        email: "test@test.com",
        password: "hashed_password_placeholder",
        name: "Test User",
        role: "USER",
        plan: "FREE",
        provider: "LOCAL",
        isEmailVerified: true,
      },
    });
    console.log("✅ Usuário criado:", testUser);

    // 4. Contar usuários
    const userCount = await prisma.user.count();
    console.log(`👤 Total de usuários: ${userCount}`);

    // 5. Listar usuários
    const users = await prisma.user.findMany();
    console.log("📋 Usuários:", users);
  } catch (error) {
    console.error("❌ ERRO:", error);
    console.error("Código do erro:", error.code);
    console.error("Mensagem:", error.message);

    if (error.meta) {
      console.error("Meta:", error.meta);
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
