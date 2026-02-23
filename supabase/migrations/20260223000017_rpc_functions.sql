-- Migration: rpc_functions
-- Description: Cria funções RPC chamáveis via Supabase client (supabase.rpc()).
--              Evitam N+1 queries no cliente e encapsulam lógica de negócio complexa.
--              Funções criadas:
--                - fn_verificar_disponibilidade: verifica vagas disponíveis em uma creche/data
--                - fn_dashboard_creche: dados agregados para o dashboard da creche
--                - fn_historico_pet: histórico completo de um pet (bookings + boletins + vacinas)
--                - fn_relatorio_financeiro: resumo financeiro por período
-- Author: supabase-petcare-db agent
-- Date: 2026-02-23
-- Dependencies: 20260223000014_rls_policies

BEGIN;

-- ---------------------------------------------------------------------------
-- fn_verificar_disponibilidade
-- Verifica quantas vagas restam em uma creche para uma data e turno específicos.
-- Retorna: vagas_disponiveis (INTEGER), total_agendamentos (INTEGER)
-- Uso: supabase.rpc('fn_verificar_disponibilidade', { creche_id, data, turno })
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_verificar_disponibilidade(
  p_creche_id  UUID,
  p_data       DATE,
  p_turno      booking_shift DEFAULT 'integral'
)
RETURNS TABLE (
  vagas_disponiveis   INTEGER,
  total_agendamentos  INTEGER,
  capacidade_maxima   INTEGER
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_capacidade INTEGER;
  v_agendamentos INTEGER;
BEGIN
  -- Busca capacidade máxima da creche
  SELECT max_capacity INTO v_capacidade
  FROM creches
  WHERE id = p_creche_id AND is_active = TRUE;

  IF v_capacidade IS NULL THEN
    RAISE EXCEPTION 'Creche não encontrada ou inativa: %', p_creche_id;
  END IF;

  -- Conta agendamentos ativos para a data e turno
  -- Turno 'integral' ocupa vaga para 'manha' e 'tarde' também
  SELECT COUNT(*) INTO v_agendamentos
  FROM bookings b
  WHERE b.creche_id = p_creche_id
    AND b.date      = p_data
    AND b.status NOT IN ('cancelled', 'no_show')
    AND (
      b.shift = p_turno
      OR b.shift = 'integral'
      OR p_turno = 'integral'
    );

  RETURN QUERY
  SELECT
    GREATEST(0, v_capacidade - v_agendamentos)::INTEGER AS vagas_disponiveis,
    v_agendamentos::INTEGER                             AS total_agendamentos,
    v_capacidade::INTEGER                               AS capacidade_maxima;
END;
$$;

COMMENT ON FUNCTION fn_verificar_disponibilidade IS
  'Verifica disponibilidade de vagas em uma creche para uma data e turno. Chamada antes de criar um booking.';

-- ---------------------------------------------------------------------------
-- fn_dashboard_creche
-- Retorna dados agregados para o dashboard operacional da creche.
-- Inclui: agendamentos de hoje, check-ins pendentes, receita do mês, pets ativos.
-- Uso: supabase.rpc('fn_dashboard_creche', { p_creche_id })
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_dashboard_creche(p_creche_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result JSONB;
  v_today  DATE := CURRENT_DATE;
  v_month_start DATE := DATE_TRUNC('month', CURRENT_DATE);
BEGIN
  -- Verificar se o caller é membro da creche
  IF NOT is_creche_member(p_creche_id, auth.uid()) THEN
    RAISE EXCEPTION 'Acesso negado: você não é membro desta creche';
  END IF;

  SELECT jsonb_build_object(
    -- Agendamentos de hoje
    'agendamentos_hoje', (
      SELECT COUNT(*)
      FROM bookings
      WHERE creche_id = p_creche_id
        AND date = v_today
        AND status NOT IN ('cancelled', 'no_show')
    ),
    -- Check-ins pendentes hoje (confirmados mas sem check-in)
    'checkins_pendentes', (
      SELECT COUNT(*)
      FROM bookings
      WHERE creche_id = p_creche_id
        AND date = v_today
        AND status = 'confirmed'
        AND check_in_at IS NULL
    ),
    -- Pets presentes agora (com check-in, sem check-out)
    'pets_presentes', (
      SELECT COUNT(*)
      FROM bookings
      WHERE creche_id = p_creche_id
        AND date = v_today
        AND check_in_at IS NOT NULL
        AND check_out_at IS NULL
        AND status != 'cancelled'
    ),
    -- Receita do mês (invoices pagas)
    'receita_mes', (
      SELECT COALESCE(SUM(amount), 0)
      FROM invoices
      WHERE creche_id = p_creche_id
        AND status IN ('confirmed', 'received')
        AND created_at >= v_month_start
    ),
    -- Faturas pendentes
    'faturas_pendentes', (
      SELECT COUNT(*)
      FROM invoices
      WHERE creche_id = p_creche_id
        AND status = 'pending'
    ),
    -- Assinaturas ativas
    'assinaturas_ativas', (
      SELECT COUNT(*)
      FROM subscriptions s
      JOIN plans p ON p.id = s.plan_id
      WHERE p.creche_id = p_creche_id
        AND s.status = 'active'
    ),
    -- Novos boletins pendentes hoje (agendamentos sem boletim)
    'boletins_pendentes', (
      SELECT COUNT(*)
      FROM bookings b
      WHERE b.creche_id = p_creche_id
        AND b.date = v_today
        AND b.status = 'completed'
        AND NOT EXISTS (
          SELECT 1 FROM reports r WHERE r.booking_id = b.id
        )
    )
  ) INTO v_result;

  RETURN v_result;
END;
$$;

COMMENT ON FUNCTION fn_dashboard_creche IS
  'Retorna métricas agregadas para o dashboard operacional da creche. Requer autenticação como membro da creche.';

-- ---------------------------------------------------------------------------
-- fn_historico_pet
-- Retorna histórico completo de um pet: últimos bookings, boletins e vacinas.
-- Uso: supabase.rpc('fn_historico_pet', { p_pet_id, p_limit })
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_historico_pet(
  p_pet_id  UUID,
  p_limit   INTEGER DEFAULT 10
)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result      JSONB;
  v_tutor_id    UUID;
BEGIN
  -- Busca o tutor do pet
  SELECT tutor_id INTO v_tutor_id FROM pets WHERE id = p_pet_id;

  -- Verifica acesso: tutor do pet ou membro de creche com booking do pet
  IF v_tutor_id != auth.uid()
    AND NOT EXISTS (
      SELECT 1
      FROM bookings b
      WHERE b.pet_id = p_pet_id
        AND is_creche_member(b.creche_id, auth.uid())
    )
  THEN
    RAISE EXCEPTION 'Acesso negado: sem permissão para ver histórico deste pet';
  END IF;

  SELECT jsonb_build_object(
    'pet', (
      SELECT row_to_json(p.*)
      FROM pets p
      WHERE p.id = p_pet_id
    ),
    'ultimos_agendamentos', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id',          b.id,
          'date',        b.date,
          'shift',       b.shift,
          'status',      b.status,
          'check_in_at', b.check_in_at,
          'check_out_at',b.check_out_at,
          'creche_nome', c.name
        ) ORDER BY b.date DESC
      )
      FROM bookings b
      JOIN creches c ON c.id = b.creche_id
      WHERE b.pet_id = p_pet_id
      LIMIT p_limit
    ),
    'ultimos_boletins', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id',                   r.id,
          'created_at',           r.created_at,
          'socialization_score',  r.socialization_score,
          'obedience_score',      r.obedience_score,
          'energy_score',         r.energy_score,
          'feeding_score',        r.feeding_score,
          'overall_notes',        r.overall_notes,
          'incidents',            r.incidents
        ) ORDER BY r.created_at DESC
      )
      FROM reports r
      WHERE r.pet_id = p_pet_id
      LIMIT p_limit
    ),
    'vacinas', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id',           v.id,
          'name',         v.name,
          'applied_at',   v.applied_at,
          'expires_at',   v.expires_at,
          'status',       v.status,
          'document_url', v.document_url
        ) ORDER BY v.applied_at DESC
      )
      FROM vaccines v
      WHERE v.pet_id = p_pet_id
    )
  ) INTO v_result;

  RETURN v_result;
END;
$$;

COMMENT ON FUNCTION fn_historico_pet IS
  'Retorna histórico completo de um pet (bookings, boletins e vacinas) em uma única chamada RPC.';

-- ---------------------------------------------------------------------------
-- fn_relatorio_financeiro
-- Retorna resumo financeiro de uma creche por período.
-- Uso: supabase.rpc('fn_relatorio_financeiro', { p_creche_id, p_inicio, p_fim })
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_relatorio_financeiro(
  p_creche_id  UUID,
  p_inicio     DATE,
  p_fim        DATE
)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result JSONB;
BEGIN
  -- Apenas admins da creche têm acesso a relatórios financeiros
  IF NOT is_creche_admin(p_creche_id, auth.uid()) THEN
    RAISE EXCEPTION 'Acesso negado: apenas administradores podem acessar relatórios financeiros';
  END IF;

  SELECT jsonb_build_object(
    'periodo', jsonb_build_object(
      'inicio', p_inicio,
      'fim',    p_fim
    ),
    'receita_total', (
      SELECT COALESCE(SUM(amount), 0)
      FROM invoices
      WHERE creche_id = p_creche_id
        AND status IN ('confirmed', 'received')
        AND created_at::DATE BETWEEN p_inicio AND p_fim
    ),
    'por_status', (
      SELECT jsonb_object_agg(status, total)
      FROM (
        SELECT status, SUM(amount) AS total
        FROM invoices
        WHERE creche_id = p_creche_id
          AND created_at::DATE BETWEEN p_inicio AND p_fim
        GROUP BY status
      ) t
    ),
    'por_metodo_pagamento', (
      SELECT jsonb_object_agg(
        COALESCE(payment_method::TEXT, 'nao_definido'),
        total
      )
      FROM (
        SELECT payment_method, SUM(amount) AS total
        FROM invoices
        WHERE creche_id = p_creche_id
          AND status IN ('confirmed', 'received')
          AND created_at::DATE BETWEEN p_inicio AND p_fim
        GROUP BY payment_method
      ) t
    ),
    'total_agendamentos', (
      SELECT COUNT(*)
      FROM bookings
      WHERE creche_id = p_creche_id
        AND date BETWEEN p_inicio AND p_fim
        AND status NOT IN ('cancelled', 'no_show')
    ),
    'cancelamentos', (
      SELECT COUNT(*)
      FROM bookings
      WHERE creche_id = p_creche_id
        AND date BETWEEN p_inicio AND p_fim
        AND status = 'cancelled'
    )
  ) INTO v_result;

  RETURN v_result;
END;
$$;

COMMENT ON FUNCTION fn_relatorio_financeiro IS
  'Retorna resumo financeiro de uma creche por período. Requer autenticação como admin da creche.';

COMMIT;
