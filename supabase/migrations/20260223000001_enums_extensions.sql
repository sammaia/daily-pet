-- Migration: enums_extensions
-- Description: Habilita extensões necessárias e cria todos os tipos ENUM do projeto DailyPet.
--              Deve ser executada antes de qualquer migration de tabela, pois os ENUMs
--              são referenciados nas definições de coluna das demais tabelas.
-- Author: supabase-petcare-db agent
-- Date: 2026-02-23
-- Dependencies: nenhuma

BEGIN;

-- ---------------------------------------------------------------------------
-- Extensões
-- ---------------------------------------------------------------------------

-- uuid-ossp: fornece gen_random_uuid() como alternativa a gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- pgcrypto: hashing e funções criptográficas (útil para tokens futuros)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- ENUMs de autenticação e perfil
-- ---------------------------------------------------------------------------

-- Papel do usuário no sistema
CREATE TYPE user_role AS ENUM (
  'tutor',     -- dono do pet
  'admin',     -- administrador de creche
  'cuidador'   -- funcionário de creche
);

-- Papel dentro de uma creche específica
CREATE TYPE creche_member_role AS ENUM (
  'admin',     -- administrador/dono da creche
  'cuidador'   -- cuidador/funcionário
);

-- ---------------------------------------------------------------------------
-- ENUMs de pets
-- ---------------------------------------------------------------------------

CREATE TYPE pet_gender AS ENUM (
  'macho',
  'femea'
);

-- ---------------------------------------------------------------------------
-- ENUMs de vacinas
-- ---------------------------------------------------------------------------

CREATE TYPE vaccine_status AS ENUM (
  'valid',           -- dentro da validade
  'expiring_soon',   -- vencendo em breve (ex: próximos 30 dias)
  'expired'          -- vencida
);

-- ---------------------------------------------------------------------------
-- ENUMs de agendamentos
-- ---------------------------------------------------------------------------

-- Turno do agendamento
CREATE TYPE booking_shift AS ENUM (
  'integral',  -- dia completo
  'manha',     -- período da manhã
  'tarde'      -- período da tarde
);

-- Status do agendamento
CREATE TYPE booking_status AS ENUM (
  'confirmed',   -- confirmado
  'pending',     -- aguardando confirmação
  'cancelled',   -- cancelado
  'completed',   -- concluído (check-out realizado)
  'no_show'      -- tutor não compareceu
);

-- ---------------------------------------------------------------------------
-- ENUMs financeiros
-- ---------------------------------------------------------------------------

-- Ciclo de cobrança de planos
CREATE TYPE billing_cycle AS ENUM (
  'monthly',  -- mensal
  'weekly'    -- semanal
);

-- Status de assinatura de plano
CREATE TYPE subscription_status AS ENUM (
  'active',     -- ativa
  'paused',     -- pausada temporariamente
  'cancelled'   -- cancelada
);

-- Status de fatura/cobrança
CREATE TYPE invoice_status AS ENUM (
  'pending',    -- aguardando pagamento
  'confirmed',  -- pagamento confirmado
  'received',   -- valor recebido
  'overdue',    -- em atraso
  'refunded',   -- estornada
  'cancelled'   -- cancelada
);

-- Método de pagamento
CREATE TYPE payment_method AS ENUM (
  'pix',
  'boleto',
  'credit_card'
);

COMMIT;
