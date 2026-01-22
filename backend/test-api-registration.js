import "dotenv/config";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/auth";

async function testApiRegistration() {
  console.log("🧪 TESTE DE REGISTRO VIA API\n");

  const testEmail = `api-test-${Date.now()}@test.com`;
  const testData = {
    email: testEmail,
    password: "123456",
    name: `API Test User ${Date.now()}`,
    confirmPassword: "123456",
  };

  console.log("📤 Enviando para API:", testData);

  try {
    // 1. Testar registro
    console.log("\n1. 📝 Testando endpoint de registro...");
    const response = await axios.post(`${API_URL}/register`, testData, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    console.log("✅ Resposta da API:");
    console.log("   Status:", response.status);
    console.log("   Sucesso:", response.data.success);
    console.log("   Mensagem:", response.data.message);
    console.log("   ID do usuário:", response.data.user?.id);
    console.log("   Email:", response.data.user?.email);

    if (response.data.accessToken) {
      console.log("   🔑 Token recebido: Sim");
    } else if (response.data.requiresEmailVerification) {
      console.log("   📧 Requer verificação de email: Sim");
    }

    // 2. Se tiver token, testar login
    if (response.data.accessToken) {
      console.log("\n2. 🔑 Testando login com credenciais...");

      const loginData = {
        email: testEmail,
        password: "123456",
      };

      const loginResponse = await axios.post(`${API_URL}/login`, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Login bem-sucedido:");
      console.log("   Status:", loginResponse.status);
      console.log(
        "   Token:",
        loginResponse.data.accessToken ? "Recebido" : "Não recebido",
      );
    }
  } catch (error) {
    console.error("\n❌ ERRO NA API:");

    if (error.response) {
      // A requisição foi feita e o servidor respondeu com um status de erro
      console.error("   Status:", error.response.status);
      console.error("   Dados:", JSON.stringify(error.response.data, null, 2));
      console.error("   Headers:", error.response.headers);
    } else if (error.request) {
      // A requisição foi feita mas nenhuma resposta foi recebida
      console.error("   ❌ Sem resposta do servidor");
      console.error("   Verifique se o backend está rodando em localhost:5000");
      console.error("   Erro:", error.message);
    } else {
      // Algum erro ocorreu ao configurar a requisição
      console.error("   Erro:", error.message);
    }

    console.error("\n🔧 SUGESTÕES:");
    console.error(
      "1. Verifique se o backend está rodando: http://localhost:5000/health",
    );
    console.error("2. Verifique os logs do backend durante este teste");
    console.error("3. Teste com curl:");
    console.error(
      `   curl -X POST http://localhost:5000/api/v1/auth/register \\`,
    );
    console.error(`     -H "Content-Type: application/json" \\`);
    console.error(`     -d '${JSON.stringify(testData)}'`);
  }
}

testApiRegistration().catch(console.error);
