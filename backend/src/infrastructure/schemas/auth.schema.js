import Joi from "joi";

export const authSchemas = {
  // ✅ REGISTRO - Campo name é opcional
  register: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email inválido",
      "string.empty": "Email é obrigatório",
      "any.required": "Email é obrigatório",
    }),

    password: Joi.string().min(6).required().messages({
      "string.min": "Senha deve ter no mínimo 6 caracteres",
      "string.empty": "Senha é obrigatória",
      "any.required": "Senha é obrigatória",
    }),

    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "As senhas não coincidem",
        "string.empty": "Confirmação de senha é obrigatória",
        "any.required": "Confirmação de senha é obrigatória",
      }),

    // ✅ Nome é OPCIONAL - pode ser omitido ou string vazia
    name: Joi.string()
      .optional()
      .allow("", null)
      .default(null)
      .max(100)
      .messages({
        "string.max": "Nome muito longo (máximo 100 caracteres)",
      }),
  }).messages({
    "object.unknown": "Campo {{#label}} não é permitido",
  }),

  // ✅ LOGIN
  login: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email inválido",
      "string.empty": "Email é obrigatório",
      "any.required": "Email é obrigatório",
    }),

    password: Joi.string().required().messages({
      "string.empty": "Senha é obrigatória",
      "any.required": "Senha é obrigatória",
    }),
  }),

  // ✅ VERIFICAÇÃO DE EMAIL
  verifyEmail: Joi.object({
    token: Joi.string().required().messages({
      "string.empty": "Token é obrigatório",
      "any.required": "Token é obrigatório",
    }),
  }),

  // ✅ REENVIO DE VERIFICAÇÃO
  resendVerificationEmail: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email inválido",
      "string.empty": "Email é obrigatório",
      "any.required": "Email é obrigatório",
    }),
  }),

  // ✅ LOGOUT
  logout: Joi.object({
    refreshToken: Joi.string().required().messages({
      "string.empty": "Refresh token é obrigatório",
      "any.required": "Refresh token é obrigatório",
    }),
  }),

  // ✅ REFRESH TOKEN
  refreshToken: Joi.object({
    refreshToken: Joi.string().required().messages({
      "string.empty": "Refresh token é obrigatório",
      "any.required": "Refresh token é obrigatório",
    }),
  }),

  // ✅ ESQUECI SENHA
  forgotPassword: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email inválido",
      "string.empty": "Email é obrigatório",
      "any.required": "Email é obrigatório",
    }),
  }),

  // ✅ RESET DE SENHA
  resetPassword: Joi.object({
    token: Joi.string().required().messages({
      "string.empty": "Token é obrigatório",
      "any.required": "Token é obrigatório",
    }),

    newPassword: Joi.string().min(6).required().messages({
      "string.min": "Senha deve ter no mínimo 6 caracteres",
      "string.empty": "Nova senha é obrigatória",
      "any.required": "Nova senha é obrigatória",
    }),
  }),

  // ✅ ALTERAR SENHA
  changePassword: Joi.object({
    currentPassword: Joi.string().required().messages({
      "string.empty": "Senha atual é obrigatória",
      "any.required": "Senha atual é obrigatória",
    }),

    newPassword: Joi.string().min(6).required().messages({
      "string.min": "Nova senha deve ter no mínimo 6 caracteres",
      "string.empty": "Nova senha é obrigatória",
      "any.required": "Nova senha é obrigatória",
    }),
  }),

  // ✅ ATUALIZAR PERFIL
  updateProfile: Joi.object({
    name: Joi.string().optional().allow("", null).max(100).messages({
      "string.max": "Nome muito longo (máximo 100 caracteres)",
    }),

    avatarUrl: Joi.string().optional().allow("", null).uri().messages({
      "string.uri": "URL do avatar inválida",
    }),
  }),

  // ✅ REVOGAR SESSÃO
  revokeSession: Joi.object({
    sessionId: Joi.string().uuid().required().messages({
      "string.guid": "ID da sessão inválido",
      "string.empty": "ID da sessão é obrigatório",
      "any.required": "ID da sessão é obrigatório",
    }),
  }),
};
