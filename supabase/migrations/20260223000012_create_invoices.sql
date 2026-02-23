-- Migration: create_invoices
-- Description: Cria a tabela invoices (faturas/cobranças).
--              Uma invoice pode estar vinculada a uma subscription (mensalidade)
--              ou a um booking avulso. Ambos os vínculos são opcionais (nullable).
--              asaas_payment_id: ID do pagamento no gateway Asaas para reconciliação.
--              Apenas admins da creche têm acesso a invoices (não cuidadores).
-- Author: supabase-petcare-db agent
-- Date: 2026-02-23
-- Dependencies: 20260223000004_create_creches, 20260223000009_create_plans_subscriptions,
--               20260223000008_create_bookings

BEGIN;

-- ---------------------------------------------------------------------------
-- Tabela: invoices
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS invoices (
  id                  UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
  creche_id           UUID            NOT NULL REFERENCES creches(id) ON DELETE CASCADE,
  tutor_id            UUID            NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  -- subscription_id: presente em cobranças recorrentes de planos mensais
  subscription_id     UUID            REFERENCES subscriptions(id),
  -- booking_id: presente em cobranças de agendamentos avulsos
  booking_id          UUID            REFERENCES bookings(id),
  -- amount: valor em reais
  amount              DECIMAL(10, 2)  NOT NULL,
  status              invoice_status  NOT NULL DEFAULT 'pending',
  payment_method      payment_method,
  -- asaas_payment_id: ID do charge/payment no Asaas para reconciliação via webhook
  asaas_payment_id    VARCHAR(255),
  due_date            DATE            NOT NULL,
  -- paid_at: timestamp do momento em que o pagamento foi confirmado
  paid_at             TIMESTAMPTZ,
  created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE invoices IS
  'Faturas e cobranças geradas para tutores. Pode ser referente a plano mensal ou agendamento avulso.';

COMMENT ON COLUMN invoices.asaas_payment_id IS
  'ID do pagamento no Asaas. Usado para atualização de status via webhook e reconciliação financeira.';

COMMENT ON COLUMN invoices.subscription_id IS
  'Preenchido para cobranças de planos mensais. Mutuamente exclusivo com booking_id na prática.';

COMMENT ON COLUMN invoices.booking_id IS
  'Preenchido para cobranças de agendamentos avulsos. Mutuamente exclusivo com subscription_id na prática.';

-- ---------------------------------------------------------------------------
-- Trigger: atualizar updated_at automaticamente
-- ---------------------------------------------------------------------------
CREATE TRIGGER set_invoices_updated_at
  BEFORE UPDATE ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION fn_set_updated_at();

-- ---------------------------------------------------------------------------
-- Índices
-- ---------------------------------------------------------------------------

-- Faturas de uma creche (relatório financeiro)
CREATE INDEX IF NOT EXISTS idx_invoices_creche_id ON invoices(creche_id);

-- Faturas de um tutor (histórico financeiro do app mobile)
CREATE INDEX IF NOT EXISTS idx_invoices_tutor_id ON invoices(tutor_id);

-- Lookup por subscription (cobranças de um plano)
CREATE INDEX IF NOT EXISTS idx_invoices_subscription_id
  ON invoices(subscription_id)
  WHERE subscription_id IS NOT NULL;

-- Lookup por booking (cobrança avulsa)
CREATE INDEX IF NOT EXISTS idx_invoices_booking_id
  ON invoices(booking_id)
  WHERE booking_id IS NOT NULL;

-- Lookup por asaas_payment_id (webhook de pagamento)
CREATE INDEX IF NOT EXISTS idx_invoices_asaas_payment_id
  ON invoices(asaas_payment_id)
  WHERE asaas_payment_id IS NOT NULL;

-- Faturas em aberto por vencimento (job de cobrança/notificação)
CREATE INDEX IF NOT EXISTS idx_invoices_due_date_pending
  ON invoices(due_date)
  WHERE status = 'pending';

-- Relatório financeiro por creche e período
CREATE INDEX IF NOT EXISTS idx_invoices_creche_created
  ON invoices(creche_id, created_at DESC);

COMMIT;
