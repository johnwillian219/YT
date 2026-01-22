import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function testRegistration() {
  console.log("🧪 TESTE DE REGISTRO DIRETO NO BANCO\n");

  const testEmail = `test-${Date.now()}@test.com`;
  const testPassword = "123456";
  const testName = `Test User ${Date.now()}`;

  console.log("📝 Dados do teste:");
  console.log("  Email:", testEmail);
  console.log("  Nome:", testName);

  try {
    // 1. Verificar se email já existe
    console.log("\n1. 🔍 Verificando se email já existe...");
    const existingUser = await prisma.user.findUnique({
      where: { email: testEmail.toLowerCase() },
    });

    if (existingUser) {
      console.log("❌ Email já existe:", testEmail);
      return;
    }
    console.log("✅ Email disponível");

    // 2. Hash da senha
    console.log("\n2. 🔐 Gerando hash da senha...");
    const hashedPassword = await bcrypt.hash(testPassword, 12);
    console.log("✅ Hash gerado");

    // 3. Criar usuário
    console.log("\n3. 💾 Criando usuário no banco...");
    const user = await prisma.user.create({
      data: {
        email: testEmail.toLowerCase(),
        password: hashedPassword,
        name: testName,
        role: "USER",
        plan: "FREE",
        provider: "LOCAL",
        isEmailVerified: true, // Para teste, já verificar
      },
    });

    console.log("✅ USUÁRIO CRIADO COM SUCESSO!");
    console.log("   ID:", user.id);
    console.log("   Email:", user.email);
    console.log("   Nome:", user.name);
    console.log("   Criado em:", user.createdAt);
    console.log("   Verificado:", user.isEmailVerified);

    // 4. Verificar se realmente foi salvo
    console.log("\n4. 🔎 Verificando se usuário está no banco...");
    const savedUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (savedUser) {
      console.log("✅ Usuário encontrado no banco!");
      console.log("   Email salvo:", savedUser.email);
      console.log(
        "   Hash salvo:",
        savedUser.password?.substring(0, 20) + "...",
      );
    } else {
      console.log("❌ Usuário NÃO encontrado no banco!");
    }

    // 5. Contar usuários
    const userCount = await prisma.user.count();
    console.log(`\n📊 Total de usuários no banco: ${userCount}`);

    // 6. Listar todos os usuários
    console.log("\n6. 📋 Listando todos os usuários:");
    const allUsers = await prisma.user.findMany({
      select: { id: true, email: true, name: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });

    allUsers.forEach((user, index) => {
      console.log(
        `   ${index + 1}. ${user.email} (${user.name}) - ${user.createdAt}`,
      );
    });
  } catch (error) {
    console.error("\n❌ ERRO AO CRIAR USUÁRIO:");
    console.error("   Código:", error.code);
    console.error("   Mensagem:", error.message);

    if (error.meta) {
      console.error("   Meta:", JSON.stringify(error.meta, null, 2));
    }

    // Diagnóstico de erros comuns
    console.error("\n🔧 DIAGNÓSTICO:");

    if (error.code === "P2002") {
      console.error("   ⚠️ Violação de constraint única");
      console.error("   Verifique se já existe um usuário com este email");
    } else if (error.code === "P2025") {
      console.error("   ⚠️ Registro não encontrado");
    } else if (error.code === "P2003") {
      console.error("   ⚠️ Violação de chave estrangeira");
    } else if (error.code === "P2016") {
      console.error("   ⚠️ Erro de interpretação de query");
    } else if (error.code === "P1012") {
      console.error("   ⚠️ Erro de schema do Prisma");
      console.error("   Execute: npx prisma generate");
    }
  } finally {
    await prisma.$disconnect();
    console.log("\n🔌 Conexão com banco fechada");
  }
}

testRegistration().catch(console.error);
