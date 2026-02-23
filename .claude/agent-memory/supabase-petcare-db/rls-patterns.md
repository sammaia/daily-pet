# RLS Patterns — DailyPet

## Access Control Matrix

| Table | tutor | cuidador | admin creche | owner creche |
|-------|-------|----------|-------------|-------------|
| profiles | SELECT/UPDATE own | SELECT members of same creche | SELECT members of same creche | SELECT members of same creche |
| creches | SELECT active | SELECT own creche | SELECT+UPDATE own creche | SELECT+UPDATE+INSERT own creche |
| creche_members | — | SELECT own creche | SELECT own creche | SELECT+INSERT+UPDATE+DELETE |
| pets | SELECT/INSERT/UPDATE own | SELECT pets with bookings in creche | SELECT pets with bookings in creche | SELECT pets with bookings |
| vaccines | SELECT/INSERT/UPDATE own pets | SELECT pets with bookings | SELECT pets with bookings | SELECT pets with bookings |
| bookings | SELECT/INSERT own; UPDATE own (cancel) | SELECT+UPDATE own creche | SELECT+UPDATE own creche | SELECT+UPDATE |
| plans | SELECT active | SELECT own creche | ALL on own creche | ALL on own creche |
| subscriptions | SELECT/INSERT own | SELECT own creche (via plan) | SELECT+UPDATE own creche | SELECT+UPDATE |
| reports | SELECT own pets | INSERT+SELECT own creche | ALL own creche | ALL own creche |
| feed_posts | SELECT if pet tagged | SELECT+INSERT+UPDATE own creche | ALL own creche | ALL own creche |
| invoices | SELECT own | NO ACCESS | ALL own creche | ALL own creche |
| messages | SELECT+INSERT if has booking | SELECT+INSERT own creche | SELECT+INSERT own creche | ALL |

## Key Security Rules
1. **Cuidadores NEVER access invoices** — financial data is admin-only
2. **Tutors see feed_posts only when their pet is tagged** — privacy via feed_post_pets join
3. **Messages require a booking** — tutors need at least one booking to message a creche
4. **Storage paths encode entity IDs** — policies extract with `storage.foldername(name)[n]`
5. **get_user_creche_ids()** is used with `= ANY(...)` for set-based creche lookups in policies
6. **All helper functions use SECURITY DEFINER** to bypass RLS on their own queries (prevents infinite recursion)

## Common Policy Pattern
```sql
-- Pattern for "member of related creche"
USING (
  is_creche_member(creche_id, auth.uid())
)

-- Pattern for "tutor owns related entity"
USING (
  EXISTS (
    SELECT 1 FROM pets p
    WHERE p.id = vaccines.pet_id
      AND p.tutor_id = auth.uid()
  )
)

-- Pattern for "creche member via join"
USING (
  EXISTS (
    SELECT 1 FROM bookings b
    WHERE b.pet_id = pets.id
      AND b.creche_id = ANY(get_user_creche_ids(auth.uid()))
  )
)
```
