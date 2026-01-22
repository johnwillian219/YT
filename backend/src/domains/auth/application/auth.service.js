import prisma from "../../../infrastructure/database/client.js";
import { jwtService } from "../../../core/utils/encryption/jwt.service.js";
import { hashService } from "../../../core/utils/encryption/hash.service.js";
import { emailService } from "../../../core/utils/email/email.service.js";
import { authConfig } from "../../../core/config/auth.config.js";
import { AppError } from "../../../core/utils/errors/app.error.js";

export class AuthService {
  // ============ REGISTRO ============
  async register(userData) {
    console.log("🔍 Iniciando registro no Neon...", {
      email: userData.email,
      name: userData.name || "Não informado",
    });

    try {
      const { email, password, name } = userData;

      // ✅ CORREÇÃO: Garantir que temos um nome
      const userName = name && name.trim() !== "" ? name : email.split("@")[0];

      console.log("✅ Nome definido:", userName);

      // 1. Verificar se usuário já existe
      console.log("🔍 Verificando email existente...");
      const existingUser = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (existingUser) {
        console.log("❌ Email já registrado:", email);
        throw new AppError("Email já registrado", 400);
      }

      console.log("✅ Email disponível");

      // 2. Hash da senha
      console.log("🔐 Gerando hash da senha...");
      const hashedPassword = await hashService.hashPassword(password);
      console.log("✅ Hash gerado");

      // 3. Configurações (em dev, auto-verificar)
      const isEmailVerified =
        process.env.SKIP_EMAIL_VERIFICATION === "true" ||
        process.env.AUTO_VERIFY_EMAIL === "true" ||
        process.env.NODE_ENV !== "production";

      console.log("📧 Configuração de verificação:", { isEmailVerified });

      // 4. Criar usuário no Neon
      console.log("💾 Salvando no Neon...");
      let user;
      try {
        user = await prisma.user.create({
          data: {
            email: email.toLowerCase(),
            password: hashedPassword,
            name: userName,
            role: "USER",
            plan: "FREE",
            provider: "LOCAL",
            isEmailVerified,
            // Apenas gerar token se não estiver verificado
            emailVerificationToken: isEmailVerified
              ? null
              : hashService.generateRandomToken(),
            emailVerificationTokenExpires: isEmailVerified
              ? null
              : new Date(
                  Date.now() + authConfig.emailVerification.tokenExpiresIn,
                ),
          },
        });

        console.log("✅ Usuário salvo no Neon:", {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt.toISOString(),
        });
      } catch (dbError) {
        console.error("❌ ERRO AO SALVAR NO NEON:", {
          code: dbError.code,
          message: dbError.message,
          meta: dbError.meta,
        });

        // Tratamento de erros específicos do Neon
        if (dbError.code === "P2002") {
          throw new AppError("Email já está em uso", 400);
        } else if (dbError.code === "P2021") {
          throw new AppError(
            "Tabela não existe. Execute: npx prisma db push",
            500,
          );
        } else if (dbError.code === "P1001") {
          throw new AppError("Não foi possível conectar ao Neon", 500);
        } else if (dbError.code === "P2037") {
          throw new AppError("Limite de conexões excedido", 500);
        } else {
          throw new AppError(`Erro no banco de dados: ${dbError.message}`, 500);
        }
      }

      // 5. Se verificado, gerar tokens
      let tokens = null;
      if (isEmailVerified) {
        console.log("🔑 Gerando tokens JWT...");
        tokens = await this.generateTokens(user);

        console.log("💾 Criando sessão...");
        await this.createSession(user.id, tokens.refreshToken);

        console.log("✅ Autenticação completa");
      } else {
        console.log("📨 Email de verificação necessário");
        // Enviar email (opcional em dev)
        if (user.emailVerificationToken) {
          await emailService.sendVerificationEmail(
            user.email,
            user.emailVerificationToken,
            user.name || user.email.split("@")[0],
          );
        }
      }

      // 6. Preparar resposta - ✅ CORREÇÃO: Garantir que retorna objeto com 'user'
      const userResponse = {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        role: user.role,
        plan: user.plan,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      console.log("🎉 Registro finalizado com sucesso!");

      return {
        user: userResponse,
        ...(tokens
          ? {
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
              expiresIn: tokens.expiresIn,
            }
          : {}),
        requiresEmailVerification: !isEmailVerified,
      };
    } catch (error) {
      console.error("❌ ERRO COMPLETO NO REGISTRO:", {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  // ============ LOGIN ============
  async login(credentials) {
    console.log("🔑 Iniciando login no Neon...", {
      email: credentials.email,
    });

    try {
      const { email, password } = credentials;

      // 1. Encontrar usuário
      console.log("🔍 Buscando usuário no Neon...");
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });

      if (!user) {
        console.log("❌ Usuário não encontrado:", email);
        throw new AppError("Credenciais inválidas", 401);
      }

      console.log("✅ Usuário encontrado:", {
        id: user.id,
        email: user.email,
        provider: user.provider,
        isEmailVerified: user.isEmailVerified,
      });

      // 2. Verificar se é usuário local (não OAuth)
      if (user.provider !== "LOCAL") {
        console.log("⚠️ Usuário registrado via OAuth:", user.provider);
        throw new AppError(
          `Faça login com ${user.provider} ou redefina sua senha`,
          400,
        );
      }

      // 3. Verificar senha
      console.log("🔐 Verificando senha...");
      const isPasswordValid = await hashService.comparePassword(
        password,
        user.password,
      );

      if (!isPasswordValid) {
        console.log("❌ Senha incorreta");
        throw new AppError("Credenciais inválidas", 401);
      }

      console.log("✅ Senha válida");

      // 4. Verificar email (opcional em dev)
      if (!user.isEmailVerified) {
        console.log("⚠️ Email não verificado");

        // Em produção, exigir verificação
        if (process.env.NODE_ENV === "production") {
          throw new AppError("Verifique seu email antes de fazer login", 403);
        } else {
          console.log(
            "⚠️ Modo desenvolvimento: permitindo login não verificado",
          );
          // Auto-verificar em dev
          await prisma.user.update({
            where: { id: user.id },
            data: { isEmailVerified: true },
          });
          console.log("✅ Email auto-verificado em modo dev");
        }
      }

      // 5. Gerar tokens
      console.log("🔑 Gerando tokens JWT...");
      const tokens = await this.generateTokens(user);

      // 6. Atualizar última data de login
      console.log("🔄 Atualizando último login...");
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });

      // 7. Criar sessão
      console.log("💾 Criando sessão...");
      await this.createSession(user.id, tokens.refreshToken);

      // 8. Preparar resposta
      const userResponse = {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        role: user.role,
        plan: user.plan,
        isEmailVerified: true, // Já está verificado após login
        lastLoginAt: new Date(),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };

      console.log("✅ Login bem-sucedido!");

      return {
        user: userResponse,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: tokens.expiresIn,
      };
    } catch (error) {
      console.error("❌ ERRO COMPLETO NO LOGIN:", {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  // ============ GERAR TOKENS ============
  async generateTokens(user) {
    console.log("🔑 Gerando tokens para:", user.id);

    const accessToken = await jwtService.generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role || "USER",
      plan: user.plan || "FREE",
    });

    const refreshToken = await jwtService.generateRefreshToken({
      id: user.id,
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: authConfig.jwt.accessExpiresIn,
    };
  }

  // ============ CRIAR SESSÃO ============
  async createSession(userId, refreshToken) {
    console.log("💾 Criando sessão para:", userId);

    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await prisma.session.create({
      data: {
        userId,
        token: refreshToken,
        expiresAt,
        lastActivity: new Date(),
      },
    });

    console.log("✅ Sessão criada no Neon");
  }

  // ============ VERIFICAÇÃO DE EMAIL ============
  async verifyEmail(token) {
    console.log("✅ Verificando email com token:", token?.substring(0, 20));

    // 1. Encontrar usuário com token válido
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationTokenExpires: {
          gt: new Date(), // Token ainda não expirou
        },
      },
    });

    if (!user) {
      throw new AppError("Token inválido ou expirado", 400);
    }

    // 2. Atualizar usuário como verificado
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerificationToken: null,
        emailVerificationTokenExpires: null,
      },
    });

    // 3. Gerar tokens
    const tokens = await this.generateTokens(updatedUser);
    await this.createSession(updatedUser.id, tokens.refreshToken);

    return {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        avatarUrl: updatedUser.avatarUrl,
        role: updatedUser.role,
        plan: updatedUser.plan,
        isEmailVerified: true,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.expiresIn,
    };
  }

  // ============ REENVIAR VERIFICAÇÃO ============
  async resendVerificationEmail(email) {
    console.log("📨 Reenviando verificação para:", email);

    // 1. Encontrar usuário
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    if (user.isEmailVerified) {
      throw new AppError("Email já verificado", 400);
    }

    // 2. Gerar novo token
    const newToken = hashService.generateRandomToken();
    const expiresAt = new Date(
      Date.now() + authConfig.emailVerification.tokenExpiresIn,
    );

    // 3. Atualizar token no banco
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificationToken: newToken,
        emailVerificationTokenExpires: expiresAt,
      },
    });

    // 4. Enviar email
    await emailService.sendVerificationEmail(
      user.email,
      newToken,
      user.name || user.email.split("@")[0],
    );

    return { success: true, message: "Email de verificação reenviado" };
  }

  // ============ LOGOUT ============
  async logout(userId, refreshToken) {
    console.log("🚪 Logout para usuário:", userId);

    // Remover sessão específica
    await prisma.session.deleteMany({
      where: {
        userId,
        token: refreshToken,
      },
    });

    return { success: true, message: "Logout realizado com sucesso" };
  }

  // ============ USUÁRIO ATUAL ============
  async getCurrentUser(userId) {
    console.log("👤 Obtendo usuário atual:", userId);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        role: true,
        plan: true,
        provider: true,
        isEmailVerified: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return user; // ✅ CORREÇÃO: Retorna o usuário diretamente, não { user }
  }

  // ============ REFRESH TOKEN ============
  async refreshAccessToken(oldRefreshToken) {
    console.log("🔄 Refresh token solicitado");

    // 1. Verificar token
    const payload = await jwtService.verifyRefreshToken(oldRefreshToken);
    if (!payload) {
      throw new AppError("Token inválido", 401);
    }

    // 2. Verificar sessão no banco
    const session = await prisma.session.findFirst({
      where: {
        userId: payload.id,
        token: oldRefreshToken,
        expiresAt: { gt: new Date() },
      },
    });

    if (!session) {
      throw new AppError("Sessão expirada", 401);
    }

    // 3. Buscar usuário
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    // 4. Gerar novos tokens
    const tokens = await this.generateTokens(user);

    // 5. Atualizar sessão
    await prisma.session.update({
      where: { id: session.id },
      data: {
        token: tokens.refreshToken,
        lastActivity: new Date(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.expiresIn,
    };
  }

  // ============ ESQUECI SENHA ============
  async forgotPassword(email) {
    console.log("🔐 Esqueci senha para:", email);

    // 1. Encontrar usuário
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // Por segurança, não revelar se email existe
      return {
        success: true,
        message: "Se o email existir, enviaremos instruções",
      };
    }

    // 2. Gerar token de reset
    const resetToken = hashService.generateRandomToken();
    const expiresAt = new Date(
      Date.now() + authConfig.passwordReset.tokenExpiresIn,
    );

    // 3. Salvar token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordTokenExpires: expiresAt,
      },
    });

    // 4. Enviar email
    await emailService.sendPasswordResetEmail(
      user.email,
      resetToken,
      user.name || user.email.split("@")[0],
    );

    return { success: true, message: "Email de recuperação enviado" };
  }

  // ============ RESETAR SENHA ============
  async resetPassword(token, newPassword) {
    console.log("🔄 Resetando senha com token:", token?.substring(0, 20));

    // 1. Encontrar usuário com token válido
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordTokenExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new AppError("Token inválido ou expirado", 400);
    }

    // 2. Hash da nova senha
    const hashedPassword = await hashService.hashPassword(newPassword);

    // 3. Atualizar senha e limpar token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenExpires: null,
      },
    });

    return { success: true, message: "Senha alterada com sucesso" };
  }

  // ============ ALTERAR SENHA ============
  async changePassword(userId, currentPassword, newPassword) {
    console.log("🔐 Alterando senha para usuário:", userId);

    // 1. Buscar usuário
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    // 2. Verificar senha atual
    const isValid = await hashService.comparePassword(
      currentPassword,
      user.password,
    );

    if (!isValid) {
      throw new AppError("Senha atual incorreta", 400);
    }

    // 3. Hash da nova senha
    const hashedPassword = await hashService.hashPassword(newPassword);

    // 4. Atualizar senha
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { success: true, message: "Senha alterada com sucesso" };
  }

  // ============ SESSÕES ============
  async getUserSessions(userId) {
    console.log("📋 Obtendo sessões para usuário:", userId);

    const sessions = await prisma.session.findMany({
      where: { userId },
      orderBy: { lastActivity: "desc" },
      select: {
        id: true,
        token: true,
        deviceInfo: true,
        ipAddress: true,
        userAgent: true,
        lastActivity: true,
        expiresAt: true,
        createdAt: true,
      },
    });

    return sessions.map((session) => ({
      ...session,
      token: session.token.substring(0, 20) + "...", // Não enviar token completo
      isCurrent: false, // Será definido pelo controller
    }));
  }

  async revokeSession(sessionId, userId) {
    console.log("🗑️ Revogando sessão:", sessionId, "para usuário:", userId);

    await prisma.session.deleteMany({
      where: {
        id: sessionId,
        userId,
      },
    });

    return { success: true, message: "Sessão revogada" };
  }

  async revokeAllSessions(userId, currentSessionId) {
    console.log("🗑️ Revogando todas as sessões para usuário:", userId);

    await prisma.session.deleteMany({
      where: {
        userId,
        NOT: {
          id: currentSessionId,
        },
      },
    });

    return {
      success: true,
      message: "Todas as outras sessões foram revogadas",
    };
  }

  // ============ VALIDAÇÃO ============
  async validateUser(userId) {
    console.log("✅ Validando usuário:", userId);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        role: true,
        plan: true,
        provider: true,
        isEmailVerified: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return user; // ✅ CORREÇÃO: Retorna o usuário diretamente, não { user }
  }
}
