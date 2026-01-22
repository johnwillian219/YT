export const authConfig = {
  nodeEnv: process.env.NODE_ENV || "development",

  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // ✅ Vite usa 5173
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
