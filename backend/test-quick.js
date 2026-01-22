// test-quick.js
import fetch from "node-fetch";

const API_URL = "http://localhost:5000";

async function testQuick() {
  console.log("🧪 TESTE RÁPIDO DO BACKEND\n");
  console.log("=".repeat(50));

  try {
    // 1. Testar health check
    console.log("1. 📡 Testando conexão...");
    const healthRes = await fetch(`${API_URL}/health`);
    const healthData = await healthRes.json();

    if (healthRes.status === 200) {
      console.log(`   ✅ Backend OK: ${healthData.status}`);
      console.log(
        `   ✅ Usuários no banco: ${healthData.dependencies?.database?.userCount || 0}`,
      );
    } else {
      console.log(`   ❌ Erro: ${healthRes.status}`);
      return;
    }

    // 2. Testar registro SEM name (deve funcionar com schema corrigido)
    console.log("\n2. 📝 Testando registro SEM campo name...");
    const testEmail1 = `test${Date.now()}@test.com`;

    const registerRes1 = await fetch(`${API_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: testEmail1,
        password: "123456",
        confirmPassword: "123456",
        // ❌ SEM name - deve funcionar se schema estiver corrigido
      }),
    });

    console.log(`   ✅ Status HTTP: ${registerRes1.status}`);

    const registerData1 = await registerRes1.json();

    if (registerRes1.status === 201 || registerRes1.status === 200) {
      console.log(`   ✅ REGISTRO BEM-SUCEDIDO!`);
      console.log(`   ✅ Sucesso: ${registerData1.success}`);
      console.log(`   ✅ Mensagem: ${registerData1.message}`);
      console.log(`   ✅ Usuário: ${registerData1.user?.email}`);
      console.log(`   ✅ Nome gerado: ${registerData1.user?.name}`);
      console.log(`   ✅ Token: ${registerData1.accessToken ? "SIM" : "NÃO"}`);

      if (registerData1.accessToken) {
        console.log(
          `   ✅ Token (início): ${registerData1.accessToken.substring(0, 30)}...`,
        );
      }
    } else {
      console.log(`   ❌ REGISTRO FALHOU!`);
      console.log(`   ❌ Erro: ${registerData1.error || "Desconhecido"}`);
      console.log(`   ❌ Detalhes: ${JSON.stringify(registerData1, null, 2)}`);
    }

    // 3. Testar registro COM name
    console.log("\n3. 📝 Testando registro COM campo name...");
    const testEmail2 = `test${Date.now() + 1}@test.com`;

    const registerRes2 = await fetch(`${API_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: testEmail2,
        password: "123456",
        confirmPassword: "123456",
        name: "Usuário Teste", // ✅ COM name
      }),
    });

    console.log(`   ✅ Status HTTP: ${registerRes2.status}`);

    const registerData2 = await registerRes2.json();

    if (registerRes2.status === 201 || registerRes2.status === 200) {
      console.log(`   ✅ REGISTRO BEM-SUCEDIDO!`);
      console.log(`   ✅ Sucesso: ${registerData2.success}`);
      console.log(`   ✅ Mensagem: ${registerData2.message}`);
      console.log(`   ✅ Usuário: ${registerData2.user?.email}`);
      console.log(`   ✅ Nome: ${registerData2.user?.name}`);
    } else {
      console.log(`   ❌ REGISTRO FALHOU!`);
      console.log(`   ❌ Erro: ${registerData2.error || "Desconhecido"}`);
      console.log(`   ❌ Detalhes: ${JSON.stringify(registerData2, null, 2)}`);
    }

    // 4. Testar login com usuário criado
    if (registerData1.success) {
      console.log("\n4. 🔑 Testando login...");

      const loginRes = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: testEmail1,
          password: "123456",
        }),
      });

      console.log(`   ✅ Status HTTP: ${loginRes.status}`);

      const loginData = await loginRes.json();

      if (loginRes.status === 200) {
        console.log(`   ✅ LOGIN BEM-SUCEDIDO!`);
        console.log(`   ✅ Sucesso: ${loginData.success}`);
        console.log(`   ✅ Mensagem: ${loginData.message}`);
        console.log(`   ✅ Usuário: ${loginData.user?.email}`);
        console.log(`   ✅ Token: ${loginData.accessToken ? "SIM" : "NÃO"}`);

        if (loginData.accessToken) {
          // 5. Testar endpoint protegido
          console.log("\n5. 🛡️ Testando endpoint protegido (/me)...");

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
            console.log(`   ✅ ENDPOINT PROTEGIDO ACESSADO!`);
            console.log(`   ✅ Sucesso: ${meData.success}`);
            console.log(`   ✅ Email: ${meData.user?.email}`);
            console.log(`   ✅ Nome: ${meData.user?.name}`);
            console.log(`   ✅ Verificado: ${meData.user?.isEmailVerified}`);
          } else {
            const errorData = await meRes.json();
            console.log(
              `   ❌ Erro no endpoint protegido: ${JSON.stringify(errorData, null, 2)}`,
            );
          }
        }
      } else {
        console.log(`   ❌ LOGIN FALHOU!`);
        console.log(`   ❌ Erro: ${loginData.message || "Desconhecido"}`);
      }
    }

    // 6. Testar login com credenciais inválidas
    console.log("\n6. 🚫 Testando login inválido...");

    const invalidRes = await fetch(`${API_URL}/api/v1/auth/login`, {
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

    console.log(`   ✅ Status HTTP: ${invalidRes.status}`);

    if (invalidRes.status === 401) {
      console.log(`   ✅ CORRETO: Login inválido rejeitado (401)`);
    } else {
      const invalidData = await invalidRes.json();
      console.log(
        `   ❌ Status inesperado: ${JSON.stringify(invalidData, null, 2)}`,
      );
    }
  } catch (error) {
    console.error("\n❌ ERRO NO TESTE:", error.message);

    if (error.code === "ECONNREFUSED") {
      console.error("\n⚠️ Backend não está rodando!");
      console.error("Execute: npm run dev no terminal do backend");
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("🧪 Teste finalizado");
}

// Executar o teste
testQuick();
