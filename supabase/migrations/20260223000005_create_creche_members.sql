-- Migration: create_creche_members
-- Description: Cria a tabela creche_members que define o vínculo entre profiles
--              e creches. Um profile pode ser membro de múltiplas creches.
--              O constraint UNIQUE(creche_id, profile_id) garante que cada
--              profile aparece no máximo uma vez por creche.
--              O owner da creche (creches.owner_id) também deve ter um registro
--              aqui com role='admin' para que as helper functions funcionem
--              corretamente nas RLS policies.
-- Author: supabase-petcare-db agent
-- Date: 2026-02-23
-- Dependencies: 20260223000004_create_creches

BEGIN;

-- ---------------------------------------------------------------------------
-- Tabela: creche_members
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS creche_members (
  id          UUID               PRIMARY KEY DEFAULT gen_random_uuid(),
  creche_id   UUID               NOT NULL REFERENCES creches(id) ON DELETE CASCADE,
  profile_id  UUID               NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  -- role: papel do membro dentro desta creche específica
  role        creche_member_role NOT NULL DEFAULT 'cuidador',
  is_active   BOOLEAN            NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ        NOT NULL DEFAULT NOW(),

  -- Garante que um profile não pode ter dois vínculos com a mesma creche
  UNIQUE(creche_id, profile_id)
);

COMMENT ON TABLE creche_members IS
  'Vínculos entre profiles (admins e cuidadores) e creches. Um profile pode ser membro de múltiplas creches.';

COMMENT ON COLUMN creche_members.role IS
  'Papel do membro nesta creche: admin (acesso total) ou cuidador (acesso operacional limitado).';

COMMENT ON COLUMN creche_members.is_active IS
  'Permite desativar um membro sem removê-lo (soft disable). Membros inativos perdem acesso imediatamente.';

-- ---------------------------------------------------------------------------
-- Índices
-- ---------------------------------------------------------------------------

-- Lookup principal: encontrar membros de uma creche
CREATE INDEX IF NOT EXISTS idx_creche_members_creche_id ON creche_members(creche_id);

-- Lookup inverso: encontrar creches de um profile
CREATE INDEX IF NOT EXISTS idx_creche_members_profile_id ON creche_members(profile_id);

-- Busca por membros ativos (query mais comum nas policies)
CREATE INDEX IF NOT EXISTS idx_creche_members_active
  ON creche_members(creche_id, profile_id)
  WHERE is_active = TRUE;

COMMIT;
