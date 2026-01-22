// test-backend.js
import fetch from "node-fetch";

const API_URL = "http://localhost:5000";

async function testBackend() {
  console.log("🧪 TESTE COMPLETO DO BACKEND\n");
  console.log("=".repeat(50));

  try {
    // 1. Testar conexão básica
    console.log("\n1. 📡 Testando conexão com o backend...");
    const healthRes = await fetch(`${API_URL}/health`);
    const healthData = await healthRes.json();

    if (healthRes.status === 200) {
      console.log(`   ✅ Backend está rodando`);
      console.log(`   ✅ Status: ${healthData.status}`);
      console.log(
        `   ✅ Usuários no banco: ${healthData.dependencies?.database?.userCount || 0}`,
      );
    } else {
      console.log(
        `   ❌ Backend não respondeu corretamente: ${healthRes.status}`,
      );
      return;
    }

    // 2. Testar registro
    console.log("\n2. 📝 Testando registro de usuário...");
    const testEmail = `test${Date.now()}@test.com`;

    const registerRes = await fetch(`${API_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: testEmail,
        password: "123456",
        confirmPassword: "123456",
      }),
    });

    console.log(`   ✅ Status HTTP: ${registerRes.status}`);

    const registerData = await registerRes.json();
    console.log(`   ✅ Sucesso: ${registerData.success}`);
    console.log(`   ✅ Mensagem: ${registerData.message}`);
    console.log(
      `   ✅ Token gerado: ${registerData.accessToken ? "SIM" : "NÃO"}`,
    );

    if (registerData.success) {
      console.log(`   ✅ Usuário criado: ${registerData.user?.email}`);
      console.log(`   ✅ ID do usuário: ${registerData.user?.id}`);

      if (registerData.accessToken) {
        console.log(
          `   ✅ Token (primeiros 20 chars): ${registerData.accessToken.substring(0, 20)}...`,
        );
      }
    } else {
      console.log(`   ❌ Erro: ${registerData.message}`);
      console.log(`   ❌ Detalhes: ${JSON.stringify(registerData, null, 2)}`);
    }

    // 3. Testar login (se registro foi bem-sucedido)
    if (registerData.success) {
      console.log("\n3. 🔑 Testando login...");

      const loginRes = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: testEmail,
          password: "123456",
        }),
      });

      console.log(`   ✅ Status HTTP: ${loginRes.status}`);

      const loginData = await loginRes.json();
      console.log(`   ✅ Sucesso: ${loginData.success}`);
      console.log(`   ✅ Mensagem: ${loginData.message}`);
      console.log(
        `   ✅ Token gerado: ${loginData.accessToken ? "SIM" : "NÃO"}`,
      );

      if (loginData.success) {
        console.log(`   ✅ Usuário logado: ${loginData.user?.email}`);
        console.log(
          `   ✅ Token (primeiros 20 chars): ${loginData.accessToken?.substring(0, 20)}...`,
        );

        // 4. Testar endpoint protegido
        console.log("\n4. 🛡️ Testando endpoint protegido (/me)...");

        const meRes = await fetch(`${API_URL}/api/v1/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${loginData.accessToken}`,
          },
        });

        console.log(`   ✅ Status HTTP: ${meRes.status}`);

        if (meRes.status === 200) {
          const meData = await meRes.json();
          console.log(`   ✅ Sucesso: ${meData.success}`);
          console.log(`   ✅ Email do usuário: ${meData.user?.email}`);
          console.log(`   ✅ Nome do usuário: ${meData.user?.name}`);
        } else {
          console.log(`   ❌ Erro no endpoint protegido: ${meRes.status}`);
          const errorData = await meRes.json();
          console.log(`   ❌ Detalhes: ${JSON.stringify(errorData, null, 2)}`);
        }
      } else {
        console.log(`   ❌ Erro no login: ${loginData.message}`);
      }
    }

    // 5. Testar login com credenciais inválidas
    console.log("\n5. 🚫 Testando login com credenciais inválidas...");

    const invalidLoginRes = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: "naoexiste@test.com",
        password: "senhaerrada",
      }),
    });

    console.log(`   ✅ Status HTTP esperado (401): ${invalidLoginRes.status}`);

    if (invalidLoginRes.status === 401) {
      console.log(`   ✅ CORRETO: Login inválido rejeitado`);
    } else {
      const invalidData = await invalidLoginRes.json();
      console.log(
        `   ❌ Resposta inesperada: ${JSON.stringify(invalidData, null, 2)}`,
      );
    }
  } catch (error) {
    console.error("\n❌ ERRO CRÍTICO:", error.message);
    console.error("Stack:", error.stack);

    if (error.code === "ECONNREFUSED") {
      console.error("\n⚠️ O backend não está rodando ou a porta está errada.");
      console.error("Execute: npm run dev no backend");
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("🧪 Teste finalizado");
}

testBackend();
