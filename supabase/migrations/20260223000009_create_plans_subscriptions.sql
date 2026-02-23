-- Migration: create_plans_subscriptions
-- Description: Cria as tabelas de planos e assinaturas de mensalidade.
--              - plans: planos criados pelas creches (ex: "Plano 3x semana - R$400/mês")
--              - subscriptions: assinaturas de tutores em planos, com integração
--                ao gateway de pagamento Asaas (asaas_subscription_id)
--              Um pet pode ter apenas uma assinatura ativa por vez (validado na app).
-- Author: supabase-petcare-db agent
-- Date: 2026-02-23
-- Dependencies: 20260223000004_create_creches, 20260223000006_create_pets

BEGIN;

-- ---------------------------------------------------------------------------
-- Tabela: plans
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS plans (
  id             UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  creche_id      UUID           NOT NULL REFERENCES creches(id) ON DELETE CASCADE,
  name           VARCHAR(255)   NOT NULL,
  description    TEXT,
  -- price: valor em reais (ex: 400.00)
  price          DECIMAL(10, 2) NOT NULL,
  -- days_per_week: quantos dias por semana o pet frequenta (ex: 3)
  days_per_week  INTEGER        NOT NULL,
  billing_cycle  billing_cycle  NOT NULL DEFAULT 'monthly',
  is_active      BOOLEAN        NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE plans IS
  'Planos de frequência criados pelas creches para assinatura mensal/semanal.';

COMMENT ON COLUMN plans.days_per_week IS
  'Número de dias por semana incluídos no plano. Usado para geração automática de bookings.';

-- ---------------------------------------------------------------------------
-- Tabela: subscriptions
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS subscriptions (
  id                      UUID                  PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id                 UUID                  NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
  tutor_id                UUID                  NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  pet_id                  UUID                  NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  status                  subscription_status   NOT NULL DEFAULT 'active',
  -- asaas_subscription_id: ID da assinatura recorrente no gateway Asaas
  asaas_subscription_id   VARCHAR(255),
  started_at              DATE                  NOT NULL DEFAULT CURRENT_DATE,
  -- cancelled_at: data de cancelamento (NULL se ativa)
  cancelled_at            DATE,
  created_at              TIMESTAMPTZ           NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ           NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE subscriptions IS
  'Assinaturas de tutores em planos de frequência de creches. Integrado com Asaas para cobrança recorrente.';

COMMENT ON COLUMN subscriptions.asaas_subscription_id IS
  'ID da cobrança recorrente no Asaas. Usado para sincronização de status de pagamento via webhook.';

-- ---------------------------------------------------------------------------
-- Trigger: atualizar updated_at automaticamente
-- ---------------------------------------------------------------------------
CREATE TRIGGER set_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION fn_set_updated_at();

-- ---------------------------------------------------------------------------
-- Índices
-- ---------------------------------------------------------------------------

-- Planos ativos de uma creche (listagem pública)
CREATE INDEX IF NOT EXISTS idx_plans_creche_id ON plans(creche_id);
CREATE INDEX IF NOT EXISTS idx_plans_active ON plans(creche_id) WHERE is_active = TRUE;

-- Assinaturas de um tutor
CREATE INDEX IF NOT EXISTS idx_subscriptions_tutor_id ON subscriptions(tutor_id);

-- Assinaturas de um pet
CREATE INDEX IF NOT EXISTS idx_subscriptions_pet_id ON subscriptions(pet_id);

-- Lookup por plano (para relatório de alunos do plano)
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_id ON subscriptions(plan_id);

-- Lookup por asaas_subscription_id (sincronização via webhook)
CREATE INDEX IF NOT EXISTS idx_subscriptions_asaas_id
  ON subscriptions(asaas_subscription_id)
  WHERE asaas_subscription_id IS NOT NULL;

-- Assinaturas ativas (query mais frequente)
CREATE INDEX IF NOT EXISTS idx_subscriptions_active
  ON subscriptions(tutor_id, pet_id)
  WHERE status = 'active';

COMMIT;
