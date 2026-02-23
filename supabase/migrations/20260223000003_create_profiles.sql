-- Migration: create_profiles
-- Description: Cria a tabela profiles que espelha auth.users do Supabase Auth.
--              Armazena dados públicos do usuário (nome, telefone, avatar).
--              Vinculada 1:1 com auth.users via FK com CASCADE DELETE.
--              O trigger fn_handle_new_user popula esta tabela automaticamente
--              no momento do signup.
-- Author: supabase-petcare-db agent
-- Date: 2026-02-23
-- Dependencies: 20260223000001_enums_extensions, 20260223000002_helper_functions

BEGIN;

-- ---------------------------------------------------------------------------
-- Tabela: profiles
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID         PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role        user_role    NOT NULL DEFAULT 'tutor',
  full_name   VARCHAR(255) NOT NULL,
  phone       VARCHAR(20),
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE profiles IS
  'Perfis públicos dos usuários, vinculados 1:1 com auth.users.';

COMMENT ON COLUMN profiles.role IS
  'Papel global do usuário: tutor (dono de pet), admin (dono de creche) ou cuidador (funcionário).';

-- ---------------------------------------------------------------------------
-- Trigger: auto-criar profile no signup
-- ---------------------------------------------------------------------------
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION fn_handle_new_user();

-- ---------------------------------------------------------------------------
-- Trigger: atualizar updated_at automaticamente
-- ---------------------------------------------------------------------------
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION fn_set_updated_at();

-- ---------------------------------------------------------------------------
-- Índices
-- ---------------------------------------------------------------------------

-- Busca por role (ex: listar todos os tutores ou cuidadores)
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

COMMIT;
