# Setup script for Windows
Write-Host "🚀 Iniciando setup do YouTube Analytics Platform" -ForegroundColor Green

# Verificar Node.js
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js não encontrado. Instale Node.js 18+ primeiro." -ForegroundColor Red
    exit 1
}

$nodeVersion = (node -v).Substring(1, 2)
if ([int]$nodeVersion -lt 18) {
    Write-Host "❌ Node.js versão 18+ requerida. Versão atual: $(node -v)" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Node.js $(node -v) detectado" -ForegroundColor Green

# Verificar Docker
if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️ Docker não encontrado. O banco de dados será executado localmente." -ForegroundColor Yellow
} else {
    Write-Host "✅ Docker detectado" -ForegroundColor Green
}

# Instalar dependências do monorepo
Write-Host "`n📦 Instalando dependências do monorepo..." -ForegroundColor Cyan
npm install

# Instalar frontend
Write-Host "`n🎨 Instalando dependências do frontend..." -ForegroundColor Cyan
Set-Location frontend
npm install
Set-Location ..

# Instalar backend
Write-Host "`n🔧 Instalando dependências do backend..." -ForegroundColor Cyan
Set-Location backend
npm install
Set-Location ..

# Configurar variáveis de ambiente
Write-Host "`n🔐 Configurando variáveis de ambiente..." -ForegroundColor Cyan
if (!(Test-Path ".env")) {
    Copy-Item ".env.example" -Destination ".env"
    Write-Host "⚠️ Arquivo .env criado. Configure as variáveis antes de executar." -ForegroundColor Yellow
}

if (!(Test-Path "frontend/.env")) {
    Copy-Item "frontend/.env.example" -Destination "frontend/.env"
}

if (!(Test-Path "backend/.env")) {
    Copy-Item "backend/.env.example" -Destination "backend/.env"
}

# Iniciar containers Docker se disponível
if ((Get-Command docker -ErrorAction SilentlyContinue) -and (Get-Command docker-compose -ErrorAction SilentlyContinue)) {
    Write-Host "`n🐳 Iniciando containers Docker..." -ForegroundColor Cyan
    docker-compose up -d postgres redis
    
    Write-Host "`n⏳ Aguardando banco de dados estar pronto..." -ForegroundColor Cyan
    Start-Sleep -Seconds 10
    
    # Executar migrações
    Write-Host "`n🗃️ Executando migrações do banco de dados..." -ForegroundColor Cyan
    Set-Location backend
    npx prisma migrate dev --name init
    Set-Location ..
}

Write-Host "`n✅ Setup completado com sucesso!" -ForegroundColor Green
Write-Host "`n🎯 Comandos úteis:" -ForegroundColor Yellow
Write-Host "  npm run dev        - Iniciar todos os serviços" -ForegroundColor Cyan
Write-Host "  npm run docker:up   - Iniciar containers Docker" -ForegroundColor Cyan
Write-Host "  npm run docker:down - Parar containers Docker" -ForegroundColor Cyan
Write-Host "`n🌐 Acesse:" -ForegroundColor Yellow
Write-Host "  Frontend:    http://localhost:3000" -ForegroundColor Green
Write-Host "  Backend API: http://localhost:5000" -ForegroundColor Green
Write-Host "  Adminer:     http://localhost:8080 (usuário: admin, senha: admin123)" -ForegroundColor Green