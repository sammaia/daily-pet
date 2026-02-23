-- Migration: create_bookings
-- Description: Cria a tabela bookings (agendamentos de pets nas creches).
--              Controla o fluxo completo: criação → confirmação → check-in → check-out.
--              O índice composto em (creche_id, date) é crítico para a query de
--              disponibilidade diária (verificar vagas disponíveis).
--              checked_in_by e checked_out_by registram qual cuidador/admin
--              realizou a operação para rastreabilidade.
-- Author: supabase-petcare-db agent
-- Date: 2026-02-23
-- Dependencies: 20260223000004_create_creches, 20260223000006_create_pets

BEGIN;

-- ---------------------------------------------------------------------------
-- Tabela: bookings
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bookings (
  id               UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
  creche_id        UUID            NOT NULL REFERENCES creches(id) ON DELETE CASCADE,
  pet_id           UUID            NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  -- tutor_id: desnormalizado para evitar JOIN com pets em queries de filtro
  tutor_id         UUID            NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date             DATE            NOT NULL,
  shift            booking_shift   NOT NULL DEFAULT 'integral',
  status           booking_status  NOT NULL DEFAULT 'pending',
  -- check_in_at / check_out_at: timestamps exatos de entrada e saída
  check_in_at      TIMESTAMPTZ,
  check_out_at     TIMESTAMPTZ,
  -- checked_in_by / checked_out_by: quem realizou o check-in/out (rastreabilidade)
  checked_in_by    UUID            REFERENCES profiles(id),
  checked_out_by   UUID            REFERENCES profiles(id),
  notes            TEXT,
  created_at       TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE bookings IS
  'Agendamentos de pets nas creches. Cobre o ciclo completo: pending → confirmed → check-in → completed.';

COMMENT ON COLUMN bookings.tutor_id IS
  'Desnormalizado de pets.tutor_id para performance em queries de filtro por tutor.';

COMMENT ON COLUMN bookings.date IS
  'Data do agendamento (sem hora). O turno (shift) determina o período.';

COMMENT ON COLUMN bookings.checked_in_by IS
  'Profile que registrou o check-in. Usado para auditoria e relatórios operacionais.';

-- ---------------------------------------------------------------------------
-- Trigger: atualizar updated_at automaticamente
-- ---------------------------------------------------------------------------
CREATE TRIGGER set_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION fn_set_updated_at();

-- ---------------------------------------------------------------------------
-- Índices
-- ---------------------------------------------------------------------------

-- CRÍTICO: query de disponibilidade diária (verificar vagas por creche/data)
CREATE INDEX IF NOT EXISTS idx_bookings_creche_date ON bookings(creche_id, date);

-- Bookings de um tutor (histórico do app mobile)
CREATE INDEX IF NOT EXISTS idx_bookings_tutor_id ON bookings(tutor_id);

-- Bookings de um pet específico
CREATE INDEX IF NOT EXISTS idx_bookings_pet_id ON bookings(pet_id);

-- Filtro por status (ex: listar confirmados do dia)
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Bookings ativos por creche e data (query mais comum do dashboard)
CREATE INDEX IF NOT EXISTS idx_bookings_creche_date_active
  ON bookings(creche_id, date)
  WHERE status NOT IN ('cancelled', 'no_show');

COMMIT;
