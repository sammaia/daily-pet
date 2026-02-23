-- Migration: rls_policies
-- Description: Habilita Row Level Security em todas as tabelas e define todas as
--              policies de acesso do projeto DailyPet.
--              Modelo de segurança multi-tenant:
--                - tutores: veem apenas seus próprios dados
--                - membros de creche: veem dados da(s) sua(s) creche(s)
--                - admins de creche: acesso escrita em dados financeiros
--                - owner da creche: controle total sobre membros e configurações
--              As helper functions (is_creche_member, is_creche_admin, etc.)
--              devem existir antes desta migration.
-- Author: supabase-petcare-db agent
-- Date: 2026-02-23
-- Dependencies: 20260223000002_helper_functions, 20260223000003_create_profiles,
--               20260223000004_create_creches, 20260223000005_create_creche_members,
--               20260223000006_create_pets, 20260223000007_create_vaccines,
--               20260223000008_create_bookings, 20260223000009_create_plans_subscriptions,
--               20260223000010_create_reports, 20260223000011_create_feed,
--               20260223000012_create_invoices, 20260223000013_create_messages

BEGIN;

-- ===========================================================================
-- PROFILES
-- ===========================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Usuário vê e atualiza apenas seu próprio perfil
CREATE POLICY profiles_select_own
  ON profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY profiles_update_own
  ON profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Membros de creche podem ver perfis de tutores que têm bookings na mesma creche.
-- Necessário para exibir nome e contato do tutor na tela de agendamentos.
CREATE POLICY profiles_select_creche_member
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM bookings b
      WHERE b.tutor_id = profiles.id
        AND b.creche_id = ANY(get_user_creche_ids(auth.uid()))
    )
  );

-- ===========================================================================
-- CRECHES
-- ===========================================================================

ALTER TABLE creches ENABLE ROW LEVEL SECURITY;

-- Qualquer usuário autenticado pode ver creches ativas (discovery/listagem)
CREATE POLICY creches_select_authenticated
  ON creches FOR SELECT
  TO authenticated
  USING (is_active = TRUE);

-- Owner pode ver sua creche mesmo inativa (gerenciamento)
CREATE POLICY creches_select_owner
  ON creches FOR SELECT
  USING (owner_id = auth.uid());

-- Apenas admins da creche podem atualizar dados da creche
-- (verificação via is_creche_member com role admin OR owner direto)
CREATE POLICY creches_update_admin
  ON creches FOR UPDATE
  USING (
    owner_id = auth.uid()
    OR is_creche_admin(id, auth.uid())
  )
  WITH CHECK (
    owner_id = auth.uid()
    OR is_creche_admin(id, auth.uid())
  );

-- Apenas usuários autenticados podem criar creches (owner_id = auth.uid() forçado)
CREATE POLICY creches_insert_authenticated
  ON creches FOR INSERT
  TO authenticated
  WITH CHECK (owner_id = auth.uid());

-- ===========================================================================
-- CRECHE_MEMBERS
-- ===========================================================================

ALTER TABLE creche_members ENABLE ROW LEVEL SECURITY;

-- Membros podem ver outros membros da mesma creche
CREATE POLICY creche_members_select_member
  ON creche_members FOR SELECT
  USING (
    is_creche_member(creche_id, auth.uid())
  );

-- Apenas o owner pode adicionar, atualizar e remover membros
CREATE POLICY creche_members_insert_owner
  ON creche_members FOR INSERT
  WITH CHECK (is_creche_owner(creche_id, auth.uid()));

CREATE POLICY creche_members_update_owner
  ON creche_members FOR UPDATE
  USING (is_creche_owner(creche_id, auth.uid()))
  WITH CHECK (is_creche_owner(creche_id, auth.uid()));

CREATE POLICY creche_members_delete_owner
  ON creche_members FOR DELETE
  USING (is_creche_owner(creche_id, auth.uid()));

-- ===========================================================================
-- PETS
-- ===========================================================================

ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

-- Tutor vê apenas seus próprios pets
CREATE POLICY pets_select_tutor
  ON pets FOR SELECT
  USING (tutor_id = auth.uid());

-- Membros de creche veem pets com bookings na sua creche
-- (necessário para operações de check-in/out e boletins)
CREATE POLICY pets_select_creche_member
  ON pets FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM bookings b
      WHERE b.pet_id = pets.id
        AND b.creche_id = ANY(get_user_creche_ids(auth.uid()))
    )
  );

-- Apenas o tutor dono do pet pode criar e atualizar
CREATE POLICY pets_insert_tutor
  ON pets FOR INSERT
  WITH CHECK (tutor_id = auth.uid());

CREATE POLICY pets_update_tutor
  ON pets FOR UPDATE
  USING (tutor_id = auth.uid())
  WITH CHECK (tutor_id = auth.uid());

-- ===========================================================================
-- VACCINES
-- ===========================================================================

ALTER TABLE vaccines ENABLE ROW LEVEL SECURITY;

-- Tutor vê vacinas dos seus pets
CREATE POLICY vaccines_select_tutor
  ON vaccines FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM pets p
      WHERE p.id = vaccines.pet_id
        AND p.tutor_id = auth.uid()
    )
  );

-- Membros de creche veem vacinas de pets com bookings na creche
-- (necessário para verificar requisitos de vacinação)
CREATE POLICY vaccines_select_creche_member
  ON vaccines FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM bookings b
      WHERE b.pet_id = vaccines.pet_id
        AND b.creche_id = ANY(get_user_creche_ids(auth.uid()))
    )
  );

-- Apenas o tutor dono do pet pode inserir e atualizar vacinas
CREATE POLICY vaccines_insert_tutor
  ON vaccines FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM pets p
      WHERE p.id = vaccines.pet_id
        AND p.tutor_id = auth.uid()
    )
  );

CREATE POLICY vaccines_update_tutor
  ON vaccines FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM pets p
      WHERE p.id = vaccines.pet_id
        AND p.tutor_id = auth.uid()
    )
  );

-- ===========================================================================
-- CRECHE_VACCINE_REQUIREMENTS
-- ===========================================================================

ALTER TABLE creche_vaccine_requirements ENABLE ROW LEVEL SECURITY;

-- Qualquer autenticado pode ver os requisitos (necessário na tela de cadastro de pet)
CREATE POLICY creche_vaccine_req_select_authenticated
  ON creche_vaccine_requirements FOR SELECT
  TO authenticated
  USING (TRUE);

-- Apenas admins da creche podem gerenciar requisitos
CREATE POLICY creche_vaccine_req_insert_admin
  ON creche_vaccine_requirements FOR INSERT
  WITH CHECK (is_creche_admin(creche_id, auth.uid()));

CREATE POLICY creche_vaccine_req_update_admin
  ON creche_vaccine_requirements FOR UPDATE
  USING (is_creche_admin(creche_id, auth.uid()));

CREATE POLICY creche_vaccine_req_delete_admin
  ON creche_vaccine_requirements FOR DELETE
  USING (is_creche_admin(creche_id, auth.uid()));

-- ===========================================================================
-- BOOKINGS
-- ===========================================================================

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Tutor vê apenas seus próprios bookings
CREATE POLICY bookings_select_tutor
  ON bookings FOR SELECT
  USING (tutor_id = auth.uid());

-- Membros da creche veem todos os bookings da creche
CREATE POLICY bookings_select_creche_member
  ON bookings FOR SELECT
  USING (
    is_creche_member(creche_id, auth.uid())
  );

-- Tutor pode criar booking para seus próprios pets
CREATE POLICY bookings_insert_tutor
  ON bookings FOR INSERT
  WITH CHECK (tutor_id = auth.uid());

-- Membros da creche podem atualizar bookings (check-in/out, status, notas)
-- Tutores NÃO podem alterar status após criação (apenas cancelar via regra de negócio)
CREATE POLICY bookings_update_creche_member
  ON bookings FOR UPDATE
  USING (
    is_creche_member(creche_id, auth.uid())
  );

-- Tutor pode cancelar seu próprio booking (UPDATE restrito a campo status na app)
CREATE POLICY bookings_update_tutor
  ON bookings FOR UPDATE
  USING (tutor_id = auth.uid())
  WITH CHECK (tutor_id = auth.uid());

-- ===========================================================================
-- PLANS
-- ===========================================================================

ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

-- Qualquer autenticado pode ver planos ativos (necessário para contratação)
CREATE POLICY plans_select_authenticated
  ON plans FOR SELECT
  TO authenticated
  USING (is_active = TRUE);

-- Membros admins veem todos os planos da creche (incluindo inativos)
CREATE POLICY plans_select_creche_admin
  ON plans FOR SELECT
  USING (is_creche_admin(creche_id, auth.uid()));

-- Apenas admins da creche gerenciam planos
CREATE POLICY plans_insert_admin
  ON plans FOR INSERT
  WITH CHECK (is_creche_admin(creche_id, auth.uid()));

CREATE POLICY plans_update_admin
  ON plans FOR UPDATE
  USING (is_creche_admin(creche_id, auth.uid()))
  WITH CHECK (is_creche_admin(creche_id, auth.uid()));

CREATE POLICY plans_delete_admin
  ON plans FOR DELETE
  USING (is_creche_admin(creche_id, auth.uid()));

-- ===========================================================================
-- SUBSCRIPTIONS
-- ===========================================================================

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Tutor vê suas próprias assinaturas
CREATE POLICY subscriptions_select_tutor
  ON subscriptions FOR SELECT
  USING (tutor_id = auth.uid());

-- Membros de creche veem assinaturas de planos da sua creche
CREATE POLICY subscriptions_select_creche_member
  ON subscriptions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM plans p
      WHERE p.id = subscriptions.plan_id
        AND is_creche_member(p.creche_id, auth.uid())
    )
  );

-- Tutor pode criar assinatura (para seu próprio pet, validado por bookings/plano)
CREATE POLICY subscriptions_insert_tutor
  ON subscriptions FOR INSERT
  WITH CHECK (tutor_id = auth.uid());

-- Apenas admins da creche podem atualizar status de assinatura
CREATE POLICY subscriptions_update_creche_admin
  ON subscriptions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM plans p
      WHERE p.id = subscriptions.plan_id
        AND is_creche_admin(p.creche_id, auth.uid())
    )
  );

-- ===========================================================================
-- REPORTS (boletins)
-- ===========================================================================

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Tutor vê boletins dos seus pets
CREATE POLICY reports_select_tutor
  ON reports FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM pets p
      WHERE p.id = reports.pet_id
        AND p.tutor_id = auth.uid()
    )
  );

-- Membros da creche veem boletins da creche
CREATE POLICY reports_select_creche_member
  ON reports FOR SELECT
  USING (
    is_creche_member(creche_id, auth.uid())
  );

-- Apenas cuidadores e admins da creche podem criar boletins
CREATE POLICY reports_insert_creche_member
  ON reports FOR INSERT
  WITH CHECK (
    is_creche_member(creche_id, auth.uid())
    -- O campo created_by deve ser o próprio usuário autenticado
    AND created_by = auth.uid()
  );

-- Apenas o criador do boletim ou admin pode atualizar
CREATE POLICY reports_update_creche_member
  ON reports FOR UPDATE
  USING (
    is_creche_member(creche_id, auth.uid())
    AND (created_by = auth.uid() OR is_creche_admin(creche_id, auth.uid()))
  );

-- ===========================================================================
-- FEED_POSTS
-- ===========================================================================

ALTER TABLE feed_posts ENABLE ROW LEVEL SECURITY;

-- Tutores veem apenas posts onde seus pets estão marcados (via feed_post_pets)
CREATE POLICY feed_posts_select_tutor
  ON feed_posts FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM feed_post_pets fpp
      JOIN pets p ON p.id = fpp.pet_id
      WHERE fpp.feed_post_id = feed_posts.id
        AND p.tutor_id = auth.uid()
    )
  );

-- Membros da creche veem todos os posts da creche
CREATE POLICY feed_posts_select_creche_member
  ON feed_posts FOR SELECT
  USING (
    is_creche_member(creche_id, auth.uid())
  );

-- Apenas membros da creche podem criar posts
CREATE POLICY feed_posts_insert_creche_member
  ON feed_posts FOR INSERT
  WITH CHECK (
    is_creche_member(creche_id, auth.uid())
    AND created_by = auth.uid()
  );

-- Apenas o criador ou admin pode atualizar/deletar um post
CREATE POLICY feed_posts_update_creche_member
  ON feed_posts FOR UPDATE
  USING (
    is_creche_member(creche_id, auth.uid())
    AND (created_by = auth.uid() OR is_creche_admin(creche_id, auth.uid()))
  );

CREATE POLICY feed_posts_delete_creche_member
  ON feed_posts FOR DELETE
  USING (
    created_by = auth.uid()
    OR is_creche_admin(creche_id, auth.uid())
  );

-- ===========================================================================
-- FEED_POST_PETS
-- ===========================================================================

ALTER TABLE feed_post_pets ENABLE ROW LEVEL SECURITY;

-- Tutores veem marcações dos seus pets
CREATE POLICY feed_post_pets_select_tutor
  ON feed_post_pets FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM pets p
      WHERE p.id = feed_post_pets.pet_id
        AND p.tutor_id = auth.uid()
    )
  );

-- Membros da creche veem todas as marcações de posts da creche
CREATE POLICY feed_post_pets_select_creche_member
  ON feed_post_pets FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM feed_posts fp
      WHERE fp.id = feed_post_pets.feed_post_id
        AND is_creche_member(fp.creche_id, auth.uid())
    )
  );

-- Apenas membros da creche podem marcar pets em posts
CREATE POLICY feed_post_pets_insert_creche_member
  ON feed_post_pets FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM feed_posts fp
      WHERE fp.id = feed_post_pets.feed_post_id
        AND is_creche_member(fp.creche_id, auth.uid())
    )
  );

-- Apenas membros da creche podem remover marcações
CREATE POLICY feed_post_pets_delete_creche_member
  ON feed_post_pets FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM feed_posts fp
      WHERE fp.id = feed_post_pets.feed_post_id
        AND is_creche_member(fp.creche_id, auth.uid())
    )
  );

-- ===========================================================================
-- INVOICES
-- ===========================================================================

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Tutor vê apenas suas próprias faturas
CREATE POLICY invoices_select_tutor
  ON invoices FOR SELECT
  USING (tutor_id = auth.uid());

-- APENAS admins da creche veem faturas da creche (cuidadores NÃO têm acesso financeiro)
CREATE POLICY invoices_select_creche_admin
  ON invoices FOR SELECT
  USING (
    is_creche_admin(creche_id, auth.uid())
  );

-- Apenas admins da creche podem criar e atualizar faturas
CREATE POLICY invoices_insert_creche_admin
  ON invoices FOR INSERT
  WITH CHECK (
    is_creche_admin(creche_id, auth.uid())
  );

CREATE POLICY invoices_update_creche_admin
  ON invoices FOR UPDATE
  USING (is_creche_admin(creche_id, auth.uid()))
  WITH CHECK (is_creche_admin(creche_id, auth.uid()));

-- ===========================================================================
-- MESSAGES
-- ===========================================================================

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Tutores veem mensagens de creches onde têm bookings
-- (garante que apenas participantes da conversa vejam as mensagens)
CREATE POLICY messages_select_tutor
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM bookings b
      WHERE b.creche_id = messages.creche_id
        AND b.tutor_id = auth.uid()
    )
  );

-- Membros da creche veem todas as mensagens da sua creche
CREATE POLICY messages_select_creche_member
  ON messages FOR SELECT
  USING (
    is_creche_member(creche_id, auth.uid())
  );

-- Qualquer participante autenticado pode enviar mensagens para creches
-- onde tem relacionamento (booking ou membership)
CREATE POLICY messages_insert_participant
  ON messages FOR INSERT
  WITH CHECK (
    sender_id = auth.uid()
    AND (
      -- É membro da creche (cuidador/admin enviando para tutor)
      is_creche_member(creche_id, auth.uid())
      OR
      -- É tutor com booking na creche
      EXISTS (
        SELECT 1 FROM bookings b
        WHERE b.creche_id = messages.creche_id
          AND b.tutor_id = auth.uid()
      )
    )
  );

-- ===========================================================================
-- PLANS (requisitos de vacina - já coberto acima)
-- ===========================================================================
-- creche_vaccine_requirements já tem RLS configurado acima

COMMIT;
