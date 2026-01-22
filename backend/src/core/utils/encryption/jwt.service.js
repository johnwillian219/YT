// backend/src/core/utils/encryption/jwt.service.js
import jwt from "jsonwebtoken";
import { authConfig } from "../../config/auth.config.js";
import { AppError } from "../errors/app.error.js";

export class JwtService {
  async generateAccessToken(payload) {
    return jwt.sign(payload, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.accessExpiresIn,
    });
  }

  async generateRefreshToken(payload) {
    return jwt.sign(payload, authConfig.jwt.refreshSecret, {
      expiresIn: authConfig.jwt.refreshExpiresIn,
    });
  }

  async verifyAccessToken(token) {
    try {
      return jwt.verify(token, authConfig.jwt.secret);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new AppError("Token expirado", 401);
      }
      throw new AppError("Token inválido", 401);
    }
  }

  async verifyRefreshToken(token) {
    try {
      return jwt.verify(token, authConfig.jwt.refreshSecret);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new AppError("Refresh token expirado", 401);
      }
      throw new AppError("Refresh token inválido", 401);
    }
  }

  decodeToken(token) {
    return jwt.decode(token);
  }
}

export const jwtService = new JwtService();
