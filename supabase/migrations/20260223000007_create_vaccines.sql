-- Migration: create_vaccines
-- Description: Cria as tabelas de vacinas e requisitos de vacinação por creche.
--              - vaccines: histórico de vacinas de cada pet com comprovante
--              - creche_vaccine_requirements: lista de vacinas exigidas por creche
--              O status da vacina (valid/expiring_soon/expired) pode ser calculado
--              dinamicamente ou atualizado via job agendado (Edge Function).
-- Author: supabase-petcare-db agent
-- Date: 2026-02-23
-- Dependencies: 20260223000006_create_pets, 20260223000004_create_creches

BEGIN;

-- ---------------------------------------------------------------------------
-- Tabela: vaccines
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS vaccines (
  id            UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id        UUID            NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  name          VARCHAR(100)    NOT NULL,
  -- applied_at: data de aplicação da vacina
  applied_at    DATE            NOT NULL,
  -- expires_at: data de vencimento (NULL para vacinas sem validade definida)
  expires_at    DATE,
  -- document_url: URL do comprovante no Supabase Storage (bucket: vacina-comprovantes)
  document_url  TEXT,
  status        vaccine_status  NOT NULL DEFAULT 'valid',
  created_at    TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE vaccines IS
  'Registro de vacinas aplicadas nos pets com comprovante e controle de validade.';

COMMENT ON COLUMN vaccines.document_url IS
  'URL do comprovante de vacinação no bucket vacina-comprovantes do Supabase Storage.';

COMMENT ON COLUMN vaccines.status IS
  'Status calculado com base em expires_at. Atualizado por job agendado ou trigger.';

-- ---------------------------------------------------------------------------
-- Tabela: creche_vaccine_requirements
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS creche_vaccine_requirements (
  id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  creche_id     UUID          NOT NULL REFERENCES creches(id) ON DELETE CASCADE,
  vaccine_name  VARCHAR(100)  NOT NULL,
  -- is_mandatory: se true, pet sem esta vacina válida não pode fazer booking
  is_mandatory  BOOLEAN       NOT NULL DEFAULT TRUE,

  -- Garante que cada creche não repita o mesmo requisito de vacina
  UNIQUE(creche_id, vaccine_name)
);

COMMENT ON TABLE creche_vaccine_requirements IS
  'Lista de vacinas exigidas por cada creche para aceitar pets. Usada na validação de bookings.';

COMMENT ON COLUMN creche_vaccine_requirements.is_mandatory IS
  'Se TRUE, o pet precisa ter esta vacina válida para ser aceito na creche.';

-- ---------------------------------------------------------------------------
-- Índices
-- ---------------------------------------------------------------------------

-- Lookup principal: vacinas de um pet
CREATE INDEX IF NOT EXISTS idx_vaccines_pet_id ON vaccines(pet_id);

-- Filtro por status (buscar vacinas vencendo/vencidas para alertas)
CREATE INDEX IF NOT EXISTS idx_vaccines_status ON vaccines(status);

-- Vacinas por validade (para jobs de atualização de status)
CREATE INDEX IF NOT EXISTS idx_vaccines_expires_at ON vaccines(expires_at)
  WHERE expires_at IS NOT NULL;

-- Requisitos por creche
CREATE INDEX IF NOT EXISTS idx_creche_vaccine_req_creche_id
  ON creche_vaccine_requirements(creche_id);

COMMIT;
