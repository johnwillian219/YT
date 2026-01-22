# infra/docker/postgres/init.sql
-- Configurações iniciais do PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Função para atualizar timestamp automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Permissões extras
GRANT ALL ON SCHEMA public TO ninjatube;