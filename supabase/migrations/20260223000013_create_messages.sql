-- Migration: create_messages
-- Description: Cria a tabela messages para o chat entre tutores e creches.
--              O modelo é simples: cada mensagem pertence a uma creche e tem
--              um remetente (sender_id). A thread de conversa é identificada
--              pela combinação (creche_id + sender_id tutor).
--              Realtime está habilitado para esta tabela para entrega em tempo real.
--              Índice composto (creche_id, created_at) é crítico para paginação do chat.
-- Author: supabase-petcare-db agent
-- Date: 2026-02-23
-- Dependencies: 20260223000004_create_creches, 20260223000003_create_profiles

BEGIN;

-- ---------------------------------------------------------------------------
-- Tabela: messages
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS messages (
  id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  creche_id   UUID         NOT NULL REFERENCES creches(id) ON DELETE CASCADE,
  -- sender_id: pode ser o tutor ou um membro da creche
  sender_id   UUID         NOT NULL REFERENCES profiles(id),
  content     TEXT         NOT NULL,
  is_read     BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE messages IS
  'Mensagens do chat entre tutores e creches. Realtime habilitado para entrega instantânea.';

COMMENT ON COLUMN messages.sender_id IS
  'Remetente da mensagem. Pode ser tutor ou membro da creche (admin/cuidador).';

COMMENT ON COLUMN messages.is_read IS
  'Indica se a mensagem foi lida pelo destinatário. Atualizado via RPC ou update direto.';

-- ---------------------------------------------------------------------------
-- Índices
-- ---------------------------------------------------------------------------

-- CRÍTICO: carregar histórico de chat de uma creche ordenado por data
CREATE INDEX IF NOT EXISTS idx_messages_creche_created
  ON messages(creche_id, created_at DESC);

-- Mensagens por remetente (histórico de um tutor específico)
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);

-- Mensagens não lidas (badge de notificação)
CREATE INDEX IF NOT EXISTS idx_messages_unread
  ON messages(creche_id)
  WHERE is_read = FALSE;

-- ---------------------------------------------------------------------------
-- Realtime: habilitar para entrega em tempo real
-- ---------------------------------------------------------------------------
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

COMMIT;
