-- Migration: create_reports
-- Description: Cria a tabela reports (boletins diários dos pets).
--              Cada booking pode ter no máximo um report associado.
--              Os scores (1-5) avaliam: socialização, obediência, energia e alimentação.
--              O campo incidents registra intercorrências do dia (ex: briga, machucado).
--              Apenas cuidadores e admins da creche podem criar reports.
-- Author: supabase-petcare-db agent
-- Date: 2026-02-23
-- Dependencies: 20260223000008_create_bookings, 20260223000004_create_creches

BEGIN;

-- ---------------------------------------------------------------------------
-- Tabela: reports
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reports (
  id                   UUID     PRIMARY KEY DEFAULT gen_random_uuid(),
  -- booking_id: cada report está vinculado a um agendamento específico
  booking_id           UUID     NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  -- pet_id / creche_id: desnormalizados para performance em queries de histórico
  pet_id               UUID     NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  creche_id            UUID     NOT NULL REFERENCES creches(id) ON DELETE CASCADE,
  -- created_by: cuidador ou admin que preencheu o boletim
  created_by           UUID     NOT NULL REFERENCES profiles(id),

  -- Scores de 1 (muito ruim) a 5 (excelente)
  socialization_score  INTEGER  CHECK (socialization_score BETWEEN 1 AND 5),
  obedience_score      INTEGER  CHECK (obedience_score BETWEEN 1 AND 5),
  energy_score         INTEGER  CHECK (energy_score BETWEEN 1 AND 5),
  feeding_score        INTEGER  CHECK (feeding_score BETWEEN 1 AND 5),

  -- overall_notes: observações gerais do dia
  overall_notes        TEXT,
  -- incidents: intercorrências (ex: "pequeno corte na pata direita, notificamos o tutor")
  incidents            TEXT,

  created_at           TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE reports IS
  'Boletins diários de comportamento dos pets, preenchidos pelos cuidadores após cada dia de creche.';

COMMENT ON COLUMN reports.booking_id IS
  'Cada agendamento pode ter no máximo um boletim. Garantido por UNIQUE constraint na aplicação.';

COMMENT ON COLUMN reports.incidents IS
  'Campo para registro de intercorrências. Se preenchido, dispara notificação automática ao tutor.';

-- ---------------------------------------------------------------------------
-- Índices
-- ---------------------------------------------------------------------------

-- Histórico de boletins de um pet
CREATE INDEX IF NOT EXISTS idx_reports_pet_id ON reports(pet_id);

-- Boletins de uma creche (dashboard operacional)
CREATE INDEX IF NOT EXISTS idx_reports_creche_id ON reports(creche_id);

-- Boletim por agendamento (lookup direto)
CREATE INDEX IF NOT EXISTS idx_reports_booking_id ON reports(booking_id);

-- Histórico temporal por pet (ordenação por data)
CREATE INDEX IF NOT EXISTS idx_reports_pet_created ON reports(pet_id, created_at DESC);

COMMIT;
