// backend/src/core/middleware/auth.middleware.js
import { jwtService } from "../utils/encryption/jwt.service.js";
import { AppError } from "../utils/errors/app.error.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // Extrair token do header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Token não fornecido", 401);
    }

    const token = authHeader.split(" ")[1];

    // Verificar token
    const decoded = await jwtService.verifyAccessToken(token);

    // Adicionar usuário ao request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      plan: decoded.plan,
    };

    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError("Não autorizado", 401));
    }
  }
};

// Middleware para verificar roles
export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("Não autorizado", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("Acesso negado", 403));
    }

    next();
  };
};

// Middleware para verificar plano
export const requirePlan = (...plans) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("Não autorizado", 401));
    }

    if (!plans.includes(req.user.plan)) {
      return next(new AppError("Recurso não disponível no seu plano", 403));
    }

    next();
  };
};
