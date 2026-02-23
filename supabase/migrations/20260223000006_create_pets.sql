-- Migration: create_pets
-- Description: Cria a tabela pets com informações dos cães cadastrados na plataforma.
--              Cada pet pertence a um tutor (profiles.id com role='tutor').
--              Um tutor pode ter múltiplos pets.
--              O campo is_active permite soft-disable sem excluir o histórico.
-- Author: supabase-petcare-db agent
-- Date: 2026-02-23
-- Dependencies: 20260223000003_create_profiles, 20260223000001_enums_extensions

BEGIN;

-- ---------------------------------------------------------------------------
-- Tabela: pets
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pets (
  id                  UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  -- tutor_id: dono do pet (profile com role='tutor')
  tutor_id            UUID          NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name                VARCHAR(255)  NOT NULL,
  breed               VARCHAR(100),
  birth_date          DATE,
  -- weight: em kg (ex: 12.50)
  weight              DECIMAL(5, 2),
  gender              pet_gender,
  -- temperament: descrição livre (ex: "brincalhão, sociável com outros cães")
  temperament         TEXT,
  -- food_restrictions: ex: "sem glúten, alérgico a frango"
  food_restrictions   TEXT,
  -- special_conditions: ex: "cardiopata, toma medicamento às 12h"
  special_conditions  TEXT,
  avatar_url          TEXT,
  is_active           BOOLEAN       NOT NULL DEFAULT TRUE,
  is_neutered         BOOLEAN       NOT NULL DEFAULT FALSE,
  created_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE pets IS
  'Cães cadastrados na plataforma. Cada pet pertence a um tutor.';

COMMENT ON COLUMN pets.temperament IS
  'Descrição livre do temperamento do pet para orientar os cuidadores.';

COMMENT ON COLUMN pets.food_restrictions IS
  'Restrições alimentares e alergias. Visível para cuidadores durante o atendimento.';

COMMENT ON COLUMN pets.special_conditions IS
  'Condições especiais de saúde, medicamentos e cuidados específicos necessários.';

-- ---------------------------------------------------------------------------
-- Trigger: atualizar updated_at automaticamente
-- ---------------------------------------------------------------------------
CREATE TRIGGER set_pets_updated_at
  BEFORE UPDATE ON pets
  FOR EACH ROW
  EXECUTE FUNCTION fn_set_updated_at();

-- ---------------------------------------------------------------------------
-- Índices
-- ---------------------------------------------------------------------------

-- Lookup principal: pets de um tutor
CREATE INDEX IF NOT EXISTS idx_pets_tutor_id ON pets(tutor_id);

-- Pets ativos (query mais frequente)
CREATE INDEX IF NOT EXISTS idx_pets_active ON pets(tutor_id) WHERE is_active = TRUE;

COMMIT;
