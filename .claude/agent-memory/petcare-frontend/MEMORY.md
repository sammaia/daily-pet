# PetCare Frontend - Project Memory

## Project Setup (Feb 2026)

### Technology Stack
- **Next.js 15** with App Router
- **TypeScript** (strict mode, no `any`)
- **Tailwind CSS** with utility-first approach
- **Supabase** for auth & real-time (SSR setup)
- **React Hook Form + Zod** for forms
- **lucide-react** for icons
- **date-fns** for date handling

### Project Location
`/Users/samanthamaia/development/devlup/petcare/apps/web/`

### Key Files & Directories
- **Root Layout**: `/src/app/layout.tsx`
- **Auth Routes**: `/src/app/(auth)/login/page.tsx` (placeholder)
- **Dashboard Routes**: `/src/app/(dashboard)/` with sidebar + header layout
  - Pages: agendamentos, pets, boletins, turmas, financeiro, chat, config
- **UI Components**: `/src/components/ui/` - button, input, card, modal (all use Tailwind + cn() helper)
- **Layout Components**: `/src/components/layout/` - sidebar (responsive toggle), header
- **Supabase Setup**: `/src/lib/supabase/` - client.ts, server.ts, middleware.ts
- **Utils**: `cn()` helper in `/src/lib/utils/cn.ts` (clsx + tailwind-merge)
- **Middleware**: `/src/middleware.ts` for auth session refresh

### Build Status
✅ Project compiles successfully (tested with `npm run build`)
✅ All routes working
✅ TypeScript strict mode passing

### Design System
- **Primary color**: Blue (blue-600)
- **Sidebar**: Gray-900 (dark) with active state in blue-600
- **Cards/Containers**: White bg with gray-200 border
- **Responsive**: Mobile-first, optimized for 768px+ (tablets)
- **Touch targets**: Min 44x44px

### Navigation Structure
```
/ (landing/root page)
/login
/dashboard/ (protected)
├── agendamentos
├── pets
├── boletins
├── turmas
├── financeiro
├── chat
└── config
```

### Component Guidelines
- Use `'use client'` only for interactive components (forms, modals, client hooks)
- Server Components by default
- All components use `cn()` for conditional classes
- Props typed with TypeScript interfaces
- Exported with named exports (no defaults except Next.js pages)

### Environment Variables
Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Example in `.env.local.example`

## Next Implementation Priorities
1. Auth flow (login, signup, session management)
2. Daily report (boletim) form - critical UX (< 2 min per pet)
3. Pet registry with search/filters
4. Booking calendar with drag-drop
5. Financial dashboard with charts (Recharts)

## Important Patterns
- Forms: React Hook Form + Zod validation, inline error messages
- Async operations: Loading states (spinners, disabled buttons)
- Routing: Protected /dashboard routes via middleware
- Sidebar: Client component with mobile toggle, active route highlighting
- API calls: Use Server Actions when possible, SWR/React Query for client-side fetching
