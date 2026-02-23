-- Migration: base_functions
-- Description: Funções base que não dependem de tabelas do app.
--              fn_set_updated_at e fn_handle_new_user são necessárias
--              antes da criação das tabelas (profiles usa ambas).

BEGIN;

-- ---------------------------------------------------------------------------
-- fn: fn_set_updated_at
-- Trigger function genérica para atualizar o campo updated_at automaticamente
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ---------------------------------------------------------------------------
-- fn: fn_handle_new_user
-- Trigger function que cria automaticamente um profile ao registrar
-- um novo usuário no Supabase Auth (auth.users).
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION fn_handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email, 'Usuário'),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'tutor')
  );
  RETURN NEW;
END;
$$;

COMMIT;
