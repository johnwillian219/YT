// backend/src/core/utils/validation/validator.js
export const validateRequest = async (req, schema) => {
  try {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: false, // Não permitir campos desconhecidos
    });

    if (error) {
      const errors = error.details.map((detail) => {
        // Extrair nome do campo do caminho
        const field = Array.isArray(detail.path)
          ? detail.path.join(".")
          : detail.path;

        // Melhorar mensagens de erro
        let message = detail.message;

        // Traduzir mensagens comuns
        if (message.includes('"name" is not allowed to be empty')) {
          message = "Nome não pode estar vazio";
        } else if (message.includes('"name" length must be at least')) {
          message = "Nome deve ter no mínimo 2 caracteres";
        }

        return {
          field: field,
          message: message.replace(/"/g, "'"), // Trocar aspas
        };
      });

      const validationError = new Error("Validation failed");
      validationError.statusCode = 400;
      validationError.errors = errors;
      throw validationError;
    }

    // Limpar valores vazios
    Object.keys(value).forEach((key) => {
      if (value[key] === "" || value[key] === null) {
        if (key !== "name") {
          // Mantém name mesmo se vazio/null
          delete value[key];
        }
      }
    });

    req.body = value;
    return value;
  } catch (error) {
    console.error("❌ Erro na validação:", error.message);
    throw error;
  }
};
