-- Migration: storage_buckets
-- Description: Configura os buckets do Supabase Storage e suas policies de acesso.
--              Buckets criados:
--                - pet-fotos: fotos de perfil e galeria de pets
--                - vacina-comprovantes: comprovantes de vacinação (privado)
--                - boletim-midias: fotos e vídeos do feed e boletins (privado)
--              As storage policies seguem o mesmo modelo de segurança das RLS policies
--              de banco de dados: tutores acessam seus próprios dados, membros de creche
--              acessam dados das suas creches.
-- Author: supabase-petcare-db agent
-- Date: 2026-02-23
-- Dependencies: 20260223000014_rls_policies

BEGIN;

-- ---------------------------------------------------------------------------
-- Bucket: pet-fotos
-- Fotos de perfil dos pets (avatar) e galeria
-- Perfil: público para leitura (avatar), privado para galeria
-- ---------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'pet-fotos',
  'pet-fotos',
  TRUE,  -- público: avatars de pets são visíveis sem autenticação
  5242880,  -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Bucket: vacina-comprovantes
-- Comprovantes de vacinação — bucket privado
-- ---------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'vacina-comprovantes',
  'vacina-comprovantes',
  FALSE,  -- privado: acesso controlado por policies
  10485760,  -- 10MB
  ARRAY['image/jpeg', 'image/png', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Bucket: boletim-midias
-- Fotos e vídeos do feed diário e boletins — bucket privado
-- ---------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'boletim-midias',
  'boletim-midias',
  FALSE,  -- privado: acesso controlado por policies
  20971520,  -- 20MB (para suportar vídeos curtos)
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4']
)
ON CONFLICT (id) DO NOTHING;

-- ===========================================================================
-- STORAGE POLICIES: pet-fotos
-- ===========================================================================

-- Leitura pública (bucket público, mas policies adicionais para proteção)
CREATE POLICY "pet_fotos_select_public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'pet-fotos');

-- Upload: tutor pode fazer upload para pasta do seu pet
-- Convenção de path: pet-fotos/{pet_id}/{filename}
CREATE POLICY "pet_fotos_insert_tutor"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'pet-fotos'
    AND EXISTS (
      SELECT 1 FROM pets p
      WHERE p.id::TEXT = (storage.foldername(name))[1]
        AND p.tutor_id = auth.uid()
    )
  );

-- Membros de creche podem fazer upload de fotos para pets agendados
CREATE POLICY "pet_fotos_insert_creche_member"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'pet-fotos'
    AND EXISTS (
      SELECT 1
      FROM pets p
      JOIN bookings b ON b.pet_id = p.id
      WHERE p.id::TEXT = (storage.foldername(name))[1]
        AND is_creche_member(b.creche_id, auth.uid())
    )
  );

-- Deleção: apenas o tutor dono do pet pode deletar
CREATE POLICY "pet_fotos_delete_tutor"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'pet-fotos'
    AND EXISTS (
      SELECT 1 FROM pets p
      WHERE p.id::TEXT = (storage.foldername(name))[1]
        AND p.tutor_id = auth.uid()
    )
  );

-- ===========================================================================
-- STORAGE POLICIES: vacina-comprovantes
-- ===========================================================================

-- Leitura: tutor vê comprovantes dos seus pets
-- Convenção de path: vacina-comprovantes/{pet_id}/{vaccine_id}/{filename}
CREATE POLICY "vacina_comprovantes_select_tutor"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'vacina-comprovantes'
    AND EXISTS (
      SELECT 1 FROM pets p
      WHERE p.id::TEXT = (storage.foldername(name))[1]
        AND p.tutor_id = auth.uid()
    )
  );

-- Leitura: membros da creche veem comprovantes de pets com bookings na creche
CREATE POLICY "vacina_comprovantes_select_creche_member"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'vacina-comprovantes'
    AND EXISTS (
      SELECT 1
      FROM pets p
      JOIN bookings b ON b.pet_id = p.id
      WHERE p.id::TEXT = (storage.foldername(name))[1]
        AND is_creche_member(b.creche_id, auth.uid())
    )
  );

-- Upload: apenas o tutor pode enviar comprovantes
CREATE POLICY "vacina_comprovantes_insert_tutor"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'vacina-comprovantes'
    AND EXISTS (
      SELECT 1 FROM pets p
      WHERE p.id::TEXT = (storage.foldername(name))[1]
        AND p.tutor_id = auth.uid()
    )
  );

-- Deleção: apenas o tutor pode deletar comprovantes
CREATE POLICY "vacina_comprovantes_delete_tutor"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'vacina-comprovantes'
    AND EXISTS (
      SELECT 1 FROM pets p
      WHERE p.id::TEXT = (storage.foldername(name))[1]
        AND p.tutor_id = auth.uid()
    )
  );

-- ===========================================================================
-- STORAGE POLICIES: boletim-midias
-- ===========================================================================

-- Leitura: tutor vê mídias de posts onde seus pets estão marcados
-- Convenção de path: boletim-midias/{creche_id}/{feed_post_id}/{filename}
CREATE POLICY "boletim_midias_select_tutor"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'boletim-midias'
    AND EXISTS (
      SELECT 1
      FROM feed_post_pets fpp
      JOIN pets p ON p.id = fpp.pet_id
      JOIN feed_posts fp ON fp.id = fpp.feed_post_id
      WHERE fp.id::TEXT = (storage.foldername(name))[2]
        AND p.tutor_id = auth.uid()
    )
  );

-- Leitura: membros da creche veem mídias da sua creche
CREATE POLICY "boletim_midias_select_creche_member"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'boletim-midias'
    AND is_creche_member(
      (storage.foldername(name))[1]::UUID,
      auth.uid()
    )
  );

-- Upload: apenas membros da creche podem fazer upload de mídias
CREATE POLICY "boletim_midias_insert_creche_member"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'boletim-midias'
    AND is_creche_member(
      (storage.foldername(name))[1]::UUID,
      auth.uid()
    )
  );

-- Deleção: apenas admins da creche podem remover mídias
CREATE POLICY "boletim_midias_delete_creche_admin"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'boletim-midias'
    AND is_creche_admin(
      (storage.foldername(name))[1]::UUID,
      auth.uid()
    )
  );

COMMIT;
