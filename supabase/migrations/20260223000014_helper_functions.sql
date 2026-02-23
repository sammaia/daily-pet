-- Migration: helper_functions
-- Description: Funções auxiliares de segurança usadas pelas RLS policies.
--              Dependem de creche_members e creches (criadas nas migrations anteriores).

BEGIN;

-- ---------------------------------------------------------------------------
-- fn: is_creche_member
-- Verifica se um profile é membro ativo de uma creche (qualquer role)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION is_creche_member(creche_uuid UUID, profile_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM creche_members cm
    WHERE cm.creche_id  = creche_uuid
      AND cm.profile_id = profile_uuid
      AND cm.is_active  = TRUE
  );
$$;

-- ---------------------------------------------------------------------------
-- fn: is_creche_admin
-- Verifica se um profile é admin ativo de uma creche
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION is_creche_admin(creche_uuid UUID, profile_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM creche_members cm
    WHERE cm.creche_id  = creche_uuid
      AND cm.profile_id = profile_uuid
      AND cm.role       = 'admin'
      AND cm.is_active  = TRUE
  );
$$;

-- ---------------------------------------------------------------------------
-- fn: is_creche_owner
-- Verifica se um profile é o owner de uma creche
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION is_creche_owner(creche_uuid UUID, profile_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM creches c
    WHERE c.id       = creche_uuid
      AND c.owner_id = profile_uuid
  );
$$;

-- ---------------------------------------------------------------------------
-- fn: get_user_creche_ids
-- Retorna array com os IDs de todas as creches onde o profile é membro ativo
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_user_creche_ids(profile_uuid UUID)
RETURNS UUID[]
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT ARRAY_AGG(cm.creche_id)
  FROM creche_members cm
  WHERE cm.profile_id = profile_uuid
    AND cm.is_active  = TRUE;
$$;

COMMIT;
