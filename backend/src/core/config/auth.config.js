// backend/src/core/config/auth.config.js

// Configurações relacionadas à autenticação e segurança
export const authConfig = {
  nodeEnv: process.env.NODE_ENV || "development",

  cors: {
    // ❌ ERRADO: Apenas uma string (usa o primeiro valor verdadeiro)
    // origin: process.env.CORS_ORIGIN || "http://localhost:5173" || "http://192.168.1.135:5173" || "http://192.168.56.1:5173",

    // ✅ CORRETO: Array de origens permitidas
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",") // Se configurado no .env
      : [
          "http://localhost:5173",
          "http://localhost:3000",
          "http://192.168.1.135:5173",
          "http://192.168.56.1:5173",
          // Em desenvolvimento, permitir mais flexibilidade
          ...(process.env.NODE_ENV === "development"
            ? [
                /^http:\/\/localhost(:\d+)?$/, // localhost com qualquer porta
                /^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/, // IPs 192.168.x.x
                /^http:\/\/10\.\d+\.\d+\.\d+(:\d+)?$/, // IPs 10.x.x.x
              ]
            : []),
        ],
  },

  jwt: {
    secret:
      process.env.JWT_SECRET ||
      "your-jwt-secret-key-min-32-chars-change-in-production",
    refreshSecret:
      process.env.JWT_REFRESH_SECRET ||
      "your-refresh-secret-key-min-32-chars-change-in-production",
    accessExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },

  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12,
  },

  session: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // ✅ Mudado para lax para desenvolvimento
  },

  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:5173/api/auth/google/callback",
    },
  },

  emailVerification: {
    tokenExpiresIn: 24 * 60 * 60 * 1000,
  },

  passwordReset: {
    tokenExpiresIn: 1 * 60 * 60 * 1000,
  },
};
