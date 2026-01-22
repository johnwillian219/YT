// backend/src/domains/auth/infrastructure/schemas/auth.schema.js
import Joi from "joi";

export const authSchemas = {
  register: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email inválido",
      "any.required": "Email é obrigatório",
    }),
    password: Joi.string().min(6).max(100).required().messages({
      "string.min": "Senha deve ter no mínimo 6 caracteres",
      "any.required": "Senha é obrigatória",
    }),
    // ✅ CORREÇÃO: Nome é OPCIONAL, não obrigatório
    name: Joi.string()
      .min(2)
      .max(100)
      .optional()
      .allow("", null) // Permite string vazia ou null
      .default(null) // Valor padrão é null
      .messages({
        "string.min": "Nome deve ter no mínimo 2 caracteres",
        // Removido: "any.required": "Nome é obrigatório",
      }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "As senhas não coincidem",
        "any.required": "Confirmação de senha é obrigatória",
      }),
  }),
  login: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email inválido",
      "any.required": "Email é obrigatório",
    }),
    password: Joi.string().required().messages({
      "any.required": "Senha é obrigatória",
    }),
    rememberMe: Joi.boolean().default(false),
  }),

  logout: Joi.object({
    refreshToken: Joi.string().required().messages({
      "any.required": "Refresh token é obrigatório",
    }),
  }),

  refreshToken: Joi.object({
    refreshToken: Joi.string().required().messages({
      "any.required": "Refresh token é obrigatório",
    }),
  }),

  verifyEmail: Joi.object({
    token: Joi.string().required().messages({
      "any.required": "Token é obrigatório",
    }),
  }),

  resendVerificationEmail: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email inválido",
      "any.required": "Email é obrigatório",
    }),
  }),

  forgotPassword: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Email inválido",
      "any.required": "Email é obrigatório",
    }),
  }),

  resetPassword: Joi.object({
    token: Joi.string().required().messages({
      "any.required": "Token é obrigatório",
    }),
    newPassword: Joi.string().min(6).max(100).required().messages({
      "string.min": "Nova senha deve ter no mínimo 6 caracteres",
      "any.required": "Nova senha é obrigatória",
    }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("newPassword"))
      .required()
      .messages({
        "any.only": "As senhas não coincidem",
        "any.required": "Confirmação de senha é obrigatória",
      }),
  }),

  changePassword: Joi.object({
    currentPassword: Joi.string().required().messages({
      "any.required": "Senha atual é obrigatória",
    }),
    newPassword: Joi.string().min(6).max(100).required().messages({
      "string.min": "Nova senha deve ter no mínimo 6 caracteres",
      "any.required": "Nova senha é obrigatória",
    }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("newPassword"))
      .required()
      .messages({
        "any.only": "As senhas não coincidem",
        "any.required": "Confirmação de senha é obrigatória",
      }),
  }),

  updateProfile: Joi.object({
    name: Joi.string().min(2).max(100),
    avatar: Joi.string().uri(),
  }),

  revokeSession: Joi.object({
    sessionId: Joi.string().uuid().required().messages({
      "string.guid": "ID da sessão inválido",
      "any.required": "ID da sessão é obrigatório",
    }),
  }),
};
