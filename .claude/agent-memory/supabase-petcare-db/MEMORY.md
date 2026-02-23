# PetCare DB Agent Memory

## Project Structure
- Migrations: `/Users/samanthamaia/development/devlup/petcare/supabase/migrations/`
- Apps: `/Users/samanthamaia/development/devlup/petcare/apps/` (mobile, web)
- Docs: `/Users/samanthamaia/development/devlup/petcare/docs/`

## Schema Overview (16 migrations, created 2026-02-23)
See `schema.md` for full details. Key tables in dependency order:
1. ENUMs → profiles → creches → creche_members → pets → vaccines
2. bookings → plans → subscriptions → reports → feed → invoices → messages
3. RLS policies → storage buckets → RPC functions

## Critical Architectural Decisions
- `profiles.id` = `auth.users.id` (1:1, no separate UUID)
- `bookings.tutor_id` is DENORMALIZED from `pets.tutor_id` for query performance
- `reports.pet_id` and `reports.creche_id` are DENORMALIZED from bookings
- `creche_members` is the source of truth for access control (not `profiles.role`)
- Owner of a creche (`creches.owner_id`) must ALSO have a `creche_members` row with `role='admin'`

## Helper Functions (SECURITY DEFINER, in migration 002)
- `is_creche_member(creche_uuid, profile_uuid)` → boolean
- `is_creche_admin(creche_uuid, profile_uuid)` → boolean
- `is_creche_owner(creche_uuid, profile_uuid)` → boolean
- `get_user_creche_ids(profile_uuid)` → UUID[]
- `fn_set_updated_at()` → trigger function (generic, reused everywhere)
- `fn_handle_new_user()` → trigger on auth.users INSERT

## RPC Functions (migration 016)
- `fn_verificar_disponibilidade(creche_id, data, turno)` → table(vagas, total, capacidade)
- `fn_dashboard_creche(creche_id)` → jsonb
- `fn_historico_pet(pet_id, limit)` → jsonb
- `fn_relatorio_financeiro(creche_id, inicio, fim)` → jsonb

## Storage Buckets (migration 015)
- `pet-fotos`: public=true, 5MB, jpeg/png/webp. Path: `{pet_id}/{filename}`
- `vacina-comprovantes`: public=false, 10MB, jpeg/png/pdf. Path: `{pet_id}/{vaccine_id}/{filename}`
- `boletim-midias`: public=false, 20MB, images+video/mp4. Path: `{creche_id}/{feed_post_id}/{filename}`

## Realtime
- `messages` table added to `supabase_realtime` publication (migration 013)

## RLS Pattern Notes
See `rls-patterns.md` for details. Key rules:
- Cuidadores NEVER access invoices (admin-only financial data)
- Tutors see feed_posts only if their pet is tagged (feed_post_pets JOIN)
- Messages: tutors need a booking in the creche to read/send messages
- Storage policies use `(storage.foldername(name))[1]` to extract path segment
