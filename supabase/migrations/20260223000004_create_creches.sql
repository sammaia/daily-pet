-- Migration: create_creches
-- Description: Cria a tabela creches (estabelecimentos de daycare para cães).
--              Armazena dados cadastrais, localização, capacidade e configurações
--              operacionais de cada creche. O campo operating_hours é um JSONB
--              flexível para representar os horários por dia da semana.
--              Exemplo de operating_hours:
--              {
--                "monday":    { "open": "07:00", "close": "19:00", "active": true },
--                "tuesday":   { "open": "07:00", "close": "19:00", "active": true },
--                "saturday":  { "open": "08:00", "close": "14:00", "active": true },
--                "sunday":    { "active": false }
--              }
-- Author: supabase-petcare-db agent
-- Date: 2026-02-23
-- Dependencies: 20260223000003_create_profiles

BEGIN;

-- ---------------------------------------------------------------------------
-- Tabela: creches
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS creches (
  id               UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id         UUID           NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name             VARCHAR(255)   NOT NULL,
  -- slug: identificador único amigável para URLs (ex: "patinhas-felizes-sp")
  slug             VARCHAR(255)   NOT NULL UNIQUE,
  description      TEXT,
  phone            VARCHAR(20),
  email            VARCHAR(255),
  address          TEXT,
  city             VARCHAR(100),
  state            VARCHAR(2),
  zip_code         VARCHAR(10),
  latitude         DECIMAL(10, 8),
  longitude        DECIMAL(11, 8),
  logo_url         TEXT,
  cover_url        TEXT,
  -- operating_hours: JSONB com horários por dia da semana (ver exemplos no header)
  operating_hours  JSONB          NOT NULL DEFAULT '{}',
  max_capacity     INTEGER        NOT NULL DEFAULT 20,
  is_active        BOOLEAN        NOT NULL DEFAULT TRUE,
  created_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE creches IS
  'Estabelecimentos de daycare para cães cadastrados na plataforma.';

COMMENT ON COLUMN creches.slug IS
  'Identificador único amigável para URLs. Gerado no cadastro, imutável após criação.';

COMMENT ON COLUMN creches.operating_hours IS
  'JSONB com horários de funcionamento por dia da semana. Chaves: monday, tuesday, wednesday, thursday, friday, saturday, sunday.';

COMMENT ON COLUMN creches.max_capacity IS
  'Capacidade máxima de pets por dia. Usada para controle de disponibilidade em bookings.';

-- ---------------------------------------------------------------------------
-- Trigger: atualizar updated_at automaticamente
-- ---------------------------------------------------------------------------
CREATE TRIGGER set_creches_updated_at
  BEFORE UPDATE ON creches
  FOR EACH ROW
  EXECUTE FUNCTION fn_set_updated_at();

-- ---------------------------------------------------------------------------
-- Índices
-- ---------------------------------------------------------------------------

-- Busca por owner (listar creches de um proprietário)
CREATE INDEX IF NOT EXISTS idx_creches_owner_id ON creches(owner_id);

-- Busca por cidade/estado (listagem/filtro geográfico)
CREATE INDEX IF NOT EXISTS idx_creches_city_state ON creches(city, state);

-- Filtro por creches ativas (query mais comum)
CREATE INDEX IF NOT EXISTS idx_creches_active ON creches(id) WHERE is_active = TRUE;

-- Busca pelo slug (lookup de URL)
-- Já coberto pelo UNIQUE constraint, mas explicitando para clareza
CREATE INDEX IF NOT EXISTS idx_creches_slug ON creches(slug);

COMMIT;
