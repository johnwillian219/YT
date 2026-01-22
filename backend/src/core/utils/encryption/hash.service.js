// backend/src/core/utils/encryption/hash.service.js
import bcrypt from "bcrypt";
import crypto from "crypto";
import { authConfig } from "../../config/auth.config.js";

export class HashService {
  async hashPassword(password) {
    return bcrypt.hash(password, authConfig.bcrypt.saltRounds);
  }

  async comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  generateRandomToken(bytes = 32) {
    return crypto.randomBytes(bytes).toString("hex");
  }

  generateHash(data) {
    return crypto.createHash("sha256").update(data).digest("hex");
  }
}

export const hashService = new HashService();
