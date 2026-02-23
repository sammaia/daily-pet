-- Migration: create_feed
-- Description: Cria as tabelas de feed de posts das creches.
--              - feed_posts: posts criados pelas creches com fotos/vídeos do dia
--              - feed_post_pets: tabela de junção que associa pets marcados em posts
--              Tutores só veem posts onde seus pets estão marcados (privacy-first).
--              media_urls é um array de TEXT para URLs no Supabase Storage
--              (bucket: boletim-midias).
-- Author: supabase-petcare-db agent
-- Date: 2026-02-23
-- Dependencies: 20260223000004_create_creches, 20260223000006_create_pets

BEGIN;

-- ---------------------------------------------------------------------------
-- Tabela: feed_posts
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS feed_posts (
  id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  creche_id   UUID         NOT NULL REFERENCES creches(id) ON DELETE CASCADE,
  -- created_by: cuidador ou admin que publicou o post
  created_by  UUID         NOT NULL REFERENCES profiles(id),
  content     TEXT,
  -- media_urls: array de URLs no bucket boletim-midias (fotos e vídeos)
  media_urls  TEXT[]       NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE feed_posts IS
  'Posts do feed da creche com fotos e vídeos do dia. Visível apenas para tutores com pets marcados.';

COMMENT ON COLUMN feed_posts.media_urls IS
  'Array de URLs de mídia no bucket boletim-midias do Supabase Storage.';

-- ---------------------------------------------------------------------------
-- Tabela: feed_post_pets
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS feed_post_pets (
  feed_post_id  UUID  NOT NULL REFERENCES feed_posts(id) ON DELETE CASCADE,
  pet_id        UUID  NOT NULL REFERENCES pets(id) ON DELETE CASCADE,

  PRIMARY KEY (feed_post_id, pet_id)
);

COMMENT ON TABLE feed_post_pets IS
  'Tabela de junção: pets marcados em posts do feed. Controla a visibilidade para tutores.';

-- ---------------------------------------------------------------------------
-- Índices
-- ---------------------------------------------------------------------------

-- Posts de uma creche (feed da creche ordenado por data)
CREATE INDEX IF NOT EXISTS idx_feed_posts_creche_id ON feed_posts(creche_id);

-- Posts por creche e data (query de timeline com paginação)
CREATE INDEX IF NOT EXISTS idx_feed_posts_creche_created
  ON feed_posts(creche_id, created_at DESC);

-- Lookup inverso: posts em que um pet foi marcado
CREATE INDEX IF NOT EXISTS idx_feed_post_pets_pet_id ON feed_post_pets(pet_id);

COMMIT;
