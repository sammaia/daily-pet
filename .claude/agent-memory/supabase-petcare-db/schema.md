# Schema Reference — DailyPet

## ENUMs (migration 001)
| Type | Values |
|------|--------|
| `user_role` | tutor, admin, cuidador |
| `creche_member_role` | admin, cuidador |
| `pet_gender` | macho, femea |
| `vaccine_status` | valid, expiring_soon, expired |
| `booking_shift` | integral, manha, tarde |
| `booking_status` | confirmed, pending, cancelled, completed, no_show |
| `billing_cycle` | monthly, weekly |
| `subscription_status` | active, paused, cancelled |
| `invoice_status` | pending, confirmed, received, overdue, refunded, cancelled |
| `payment_method` | pix, boleto, credit_card |

## Table Summary
| Table | PK | Key FKs | has updated_at |
|-------|-----|---------|---------------|
| profiles | id (= auth.users.id) | — | yes |
| creches | uuid | owner_id→profiles | yes |
| creche_members | uuid | creche_id, profile_id | no |
| pets | uuid | tutor_id→profiles | yes |
| vaccines | uuid | pet_id→pets | no |
| creche_vaccine_requirements | uuid | creche_id→creches | no |
| bookings | uuid | creche_id, pet_id, tutor_id, checked_in_by, checked_out_by | yes |
| plans | uuid | creche_id→creches | no |
| subscriptions | uuid | plan_id, tutor_id, pet_id | yes |
| reports | uuid | booking_id, pet_id, creche_id, created_by | no |
| feed_posts | uuid | creche_id, created_by | no |
| feed_post_pets | (feed_post_id, pet_id) | feed_post_id, pet_id | no |
| invoices | uuid | creche_id, tutor_id, subscription_id?, booking_id? | yes |
| messages | uuid | creche_id, sender_id | no |

## Key Indexes
- `idx_bookings_creche_date` on (creche_id, date) — CRITICAL for availability checks
- `idx_messages_creche_created` on (creche_id, created_at DESC) — chat pagination
- `idx_creche_members_active` on (creche_id, profile_id) WHERE is_active — RLS perf
- `idx_subscriptions_asaas_id` — webhook reconciliation
- `idx_invoices_asaas_payment_id` — webhook reconciliation
- `idx_feed_posts_creche_created` on (creche_id, created_at DESC) — timeline pagination

## Migration Order
```
20260223000001_enums_extensions
20260223000002_helper_functions       ← BEFORE tables (triggers) and RLS (policies)
20260223000003_create_profiles
20260223000004_create_creches
20260223000005_create_creche_members  ← needed by helper functions at runtime
20260223000006_create_pets
20260223000007_create_vaccines
20260223000008_create_bookings
20260223000009_create_plans_subscriptions
20260223000010_create_reports
20260223000011_create_feed
20260223000012_create_invoices
20260223000013_create_messages        ← also enables Realtime
20260223000014_rls_policies           ← depends on ALL tables and helper functions
20260223000015_storage_buckets        ← depends on RLS helper functions
20260223000016_rpc_functions          ← depends on RLS (uses is_creche_* checks internally)
```
