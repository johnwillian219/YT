# setup.sh (na raiz do projeto)
#!/bin/bash

echo "🚀 Configurando NinjaTube com Docker..."

# Criar diretórios necessários
mkdir -p infra/docker/postgres
mkdir -p infra/docker/redis
mkdir -p backend/prisma
mkdir -p frontend/public

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose."
    exit 1
fi

# Gerar secrets JWT
JWT_SECRET=$(openssl rand -hex 32)
JWT_REFRESH_SECRET=$(openssl rand -hex 32)

# Criar arquivo .env
cat > .env << EOF
# ============ JWT SECRETS ============
JWT_SECRET=${JWT_SECRET}
JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}

# ============ FRONTEND ============
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=NinjaTube
VITE_ENABLE_AI_FEATURES=true

# ============ BACKEND ============
DATABASE_URL=postgresql://ninjatube:ninjatube123@postgres:5432/ninjatube?schema=public
REDIS_URL=redis://redis:6379
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
BCRYPT_SALT_ROUNDS=12

# ============ OAUTH (Configurar depois) ============
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

YOUTUBE_CLIENT_ID=your-youtube-client-id
YOUTUBE_CLIENT_SECRET=your-youtube-client-secret
YOUTUBE_CALLBACK_URL=http://localhost:3000/api/auth/youtube/callback
YOUTUBE_API_KEY=your-youtube-api-key
EOF

echo "✅ Arquivo .env criado com secrets JWT"

# Criar schema do Prisma
cat > backend/prisma/schema.prisma << 'EOF'
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============ MODELS DE AUTENTICAÇÃO ============
model User {
  id                String    @id @default(uuid())
  email             String    @unique
  password          String?
  name              String?
  avatar            String?
  isEmailVerified   Boolean   @default(false)
  emailVerificationToken String?
  emailVerificationTokenExpires DateTime?
  resetPasswordToken String?
  resetPasswordTokenExpires DateTime?
  role              String    @default("USER")
  plan              String    @default("FREE")
  
  // OAuth
  oauthProviders    OAuthProvider[]
  sessions          Session[]
  
  // Timestamps
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  lastLoginAt       DateTime?
  
  @@index([email])
  @@index([plan])
}

model OAuthProvider {
  id              String   @id @default(uuid())
  provider        String
  providerUserId  String
  accessToken     String   @db.Text
  refreshToken    String?  @db.Text
  expiresAt       DateTime?
  scope           String?
  
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@unique([provider, providerUserId])
  @@unique([provider, userId])
  @@index([userId])
}

model Session {
  id           String   @id @default(uuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  token        String   @unique
  deviceInfo   Json?
  ipAddress    String?
  userAgent    String?
  expiresAt    DateTime
  lastActivity DateTime @default(now())
  
  createdAt    DateTime @default(now())
  
  @@index([userId])
  @@index([token])
}

// ============ MODELS DO YOUTUBE ============
model Channel {
  id              String   @id @default(uuid())
  youtubeId       String   @unique
  title           String
  description     String?  @db.Text
  customUrl       String?
  publishedAt     DateTime
  thumbnail       String?
  country         String?
  viewCount       BigInt   @default(0)
  subscriberCount BigInt   @default(0)
  videoCount      Int      @default(0)
  
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  lastSyncedAt    DateTime?
  
  @@index([userId])
  @@index([youtubeId])
}

model Video {
  id              String   @id @default(uuid())
  youtubeId       String   @unique
  title           String
  description     String?  @db.Text
  publishedAt     DateTime
  thumbnail       String?
  duration        String?
  viewCount       BigInt   @default(0)
  likeCount       BigInt   @default(0)
  commentCount    BigInt   @default(0)
  
  channelId       String
  channel         Channel  @relation(fields: [channelId], references: [id], onDelete: Cascade)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@index([channelId])
  @@index([youtubeId])
}
EOF

echo "✅ Schema do Prisma criado"

# Criar arquivo de seed
cat > backend/prisma/seed.ts << 'EOF'
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Hash da senha padrão
  const hashedPassword = await hash('admin123', 12);
  
  // Criar usuário admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ninjatube.com' },
    update: {},
    create: {
      email: 'admin@ninjatube.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'ADMIN',
      plan: 'ENTERPRISE',
      isEmailVerified: true,
    },
  });

  // Criar usuário teste
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Usuário Teste',
      role: 'USER',
      plan: 'PRO',
      isEmailVerified: true,
    },
  });

  console.log('✅ Seed concluído!');
  console.log(`👤 Admin: ${admin.email} / admin123`);
  console.log(`👤 Teste: ${testUser.email} / admin123`);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
EOF

echo "✅ Script de seed criado"

# Iniciar containers
echo "🐳 Iniciando containers Docker..."
docker-compose up -d --build

# Aguardar serviços estarem prontos
echo "⏳ Aguardando serviços..."
sleep 10

# Executar migrações do Prisma
echo "🗄️  Executando migrações..."
docker-compose exec backend npx prisma migrate dev --name init

# Executar seed
echo "🌱 Populando banco de dados..."
docker-compose exec backend npm run seed

echo ""
echo "🎉 CONFIGURAÇÃO CONCLUÍDA!"
echo "=========================="
echo ""
echo "🌐 URLs de acesso:"
echo "   Frontend:    http://localhost:5173"
echo "   Backend API: http://localhost:3000"
echo "   API Docs:    http://localhost:3000/api/docs"
echo "   PostgreSQL:  localhost:5432"
echo "   PgAdmin:     http://localhost:5050"
echo "   Redis:       localhost:6379"
echo "   Redis Insight: http://localhost:5540"
echo ""
echo "🔑 Credenciais:"
echo "   PostgreSQL:  ninjatube / ninjatube123"
echo "   PgAdmin:     admin@ninjatube.com / admin123"
echo "   Redis:       senha: ninjatube123"
echo "   Admin:       admin@ninjatube.com / admin123"
echo "   Teste:       test@example.com / admin123"
echo ""
echo "📋 Comandos úteis:"
echo "   docker-compose up -d          # Iniciar serviços"
echo "   docker-compose down           # Parar serviços"
echo "   docker-compose logs -f        # Ver logs"
echo "   docker-compose exec backend npm run dev  # Reiniciar backend"
echo ""
echo "🚨 PRÓXIMOS PASSOS:"
echo "   1. Configure as credenciais do Google/YouTube no arquivo .env"
echo "   2. Acesse http://localhost:5173 e teste o login"
echo "   3. Implemente as funcionalidades restantes"