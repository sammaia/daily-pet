# PetCare Dashboard - Project Index

Quick reference guide for all project files and their purposes.

## Documentation Files

| File | Purpose |
|------|---------|
| [README.md](./README.md) | Setup instructions, project structure, available scripts |
| [ROUTES.md](./ROUTES.md) | Complete route mapping with descriptions |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Color palette, typography, components, accessibility |
| [SETUP_COMPLETE.md](./SETUP_COMPLETE.md) | Initialization summary and status |
| [INDEX.md](./INDEX.md) | This file - quick reference |

## Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts |
| `tsconfig.json` | TypeScript configuration (strict mode) |
| `next.config.js` | Next.js configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `postcss.config.js` | PostCSS configuration |
| `.eslintrc.json` | ESLint configuration |
| `.env.local.example` | Environment variables template |

## App Routes

### Landing & Auth
```
src/app/
├── page.tsx                    → /
├── layout.tsx                  → Root layout
├── middleware.ts               → Auth middleware
└── (auth)/
    ├── layout.tsx              → Auth layout
    └── login/
        └── page.tsx            → /login
```

### Protected Dashboard
```
src/app/(dashboard)/
├── layout.tsx                  → Dashboard layout (sidebar + header)
├── page.tsx                    → /dashboard (daily overview)
├── agendamentos/page.tsx       → /dashboard/agendamentos
├── pets/page.tsx               → /dashboard/pets
├── boletins/page.tsx           → /dashboard/boletins
├── turmas/page.tsx             → /dashboard/turmas
├── financeiro/page.tsx         → /dashboard/financeiro
├── chat/page.tsx               → /dashboard/chat
└── config/page.tsx             → /dashboard/config
```

## Components

### UI Components (`src/components/ui/`)

| Component | File | Purpose |
|-----------|------|---------|
| Button | `button.tsx` | 5 variants (primary, secondary, outline, ghost, danger) |
| Input | `input.tsx` | Text input with label, error, helper text |
| Card | `card.tsx` | Card with header, content, footer sections |
| Modal | `modal.tsx` | Dialog modal with escape handling |

### Layout Components (`src/components/layout/`)

| Component | File | Purpose |
|-----------|------|---------|
| Sidebar | `sidebar.tsx` | Responsive navigation (mobile toggle) |
| Header | `header.tsx` | Sticky page header with title |

## Library Files

### Supabase (`src/lib/supabase/`)

| File | Purpose |
|------|---------|
| `client.ts` | Browser client for Supabase |
| `server.ts` | Server client for Supabase |
| `middleware.ts` | Auth middleware for session refresh |

### Utilities (`src/lib/utils/`)

| File | Purpose |
|------|---------|
| `cn.ts` | Tailwind class merging utility (clsx + tailwind-merge) |

### Validations (`src/lib/validations/`)

| File | Purpose |
|------|---------|
| (empty) | Placeholder for Zod schemas |

## Types

| File | Purpose |
|------|---------|
| `src/types/database.ts` | Supabase type definitions |

## Hooks

| File | Purpose |
|------|---------|
| (empty) | Placeholder for custom React hooks |

## Quick Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Setup
npm install          # Install dependencies
```

## Key Patterns

### Using the Button Component

```tsx
import { Button } from '@/components/ui/button';

<Button variant="primary" size="md" isLoading={false}>
  Click me
</Button>
```

**Variants**: primary, secondary, outline, ghost, danger
**Sizes**: sm, md, lg
**States**: isLoading, disabled

### Using the Input Component

```tsx
import { Input } from '@/components/ui/input';

<Input
  label="Pet Name"
  placeholder="Enter name"
  error={errors.name?.message}
  helperText="Required field"
/>
```

### Using the Card Component

```tsx
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer actions</CardFooter>
</Card>
```

### Using the cn() Utility

```tsx
import { cn } from '@/lib/utils/cn';

<div className={cn(
  'p-4 rounded-lg',
  isActive && 'bg-blue-600 text-white',
  !isActive && 'bg-gray-100'
)}>
  Content
</div>
```

### Form Pattern (React Hook Form + Zod)

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Required'),
});

type FormData = z.infer<typeof schema>;

export function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // API call here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('name')} error={errors.name?.message} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## Directory Structure

```
/Users/samanthamaia/development/devlup/petcare/apps/web/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   ├── lib/              # Utility functions & setup
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript types
│   ├── styles/           # Global styles
│   └── middleware.ts     # Auth middleware
├── public/               # Static assets
├── node_modules/         # Dependencies
├── .next/                # Build output
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── postcss.config.js
├── .eslintrc.json
├── .env.local.example
├── README.md
├── ROUTES.md
├── DESIGN_SYSTEM.md
├── SETUP_COMPLETE.md
└── INDEX.md              # This file
```

## Environment Setup

1. Copy `.env.local.example` to `.env.local`
2. Add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

## Development Workflow

1. **Start dev server**: `npm run dev`
2. **Edit files** in `src/`
3. **Changes auto-reload** (Turbopack)
4. **Check lint**: `npm run lint`
5. **Test build**: `npm run build`

## Build Verification

```bash
# Full build test
npm run build

# Check TypeScript
npx tsc --noEmit

# Check ESLint
npm run lint
```

## Key Technologies

- **Next.js 16.1.6** - React framework
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **Supabase** - Backend & auth
- **React Hook Form** - Form management
- **Zod** - Validation
- **Lucide React** - Icons

## Design System Reference

### Colors

**Primary**: `blue-600` (#2563eb)
**Neutral**: `gray-900` (dark) to `gray-50` (light)
**Semantic**: `green-600` (success), `red-600` (danger), `yellow-500` (warning)

### Typography

**H1**: 30px, bold
**H2**: 24px, bold
**Body**: 16px, normal
**Small**: 14px, normal

### Spacing

**4px base unit**
- `p-6` for card padding
- `gap-6` for section spacing
- `space-y-4` for row spacing

### Border Radius

**8px** (`rounded-lg`) standard
**Full** (`rounded-full`) for avatars

## Common Tasks

### Create a New Page

1. Create directory: `src/app/(dashboard)/new-page/`
2. Create file: `page.tsx`
3. Add title and content

### Create a New Component

1. Create file: `src/components/ui/my-component.tsx`
2. Use forwardRef and explicit types
3. Export with named export
4. Use in pages/other components

### Add Form Validation

1. Create schema in `src/lib/validations/`
2. Use `useForm` with `zodResolver`
3. Render `Input` with error from `formState.errors`

### Style with Tailwind

1. Use utility classes
2. Use `cn()` for conditionals
3. Extract to `@apply` if pattern repeats 3+ times
4. Never add inline styles

## Next Steps

1. Implement authentication flow
2. Build daily report (boletim) form
3. Create pet registry with DataTable
4. Add booking calendar
5. Build financial dashboard with charts

## Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

## Support

For issues or questions:
1. Check README.md for setup
2. Check DESIGN_SYSTEM.md for component specs
3. Check ROUTES.md for route details
4. Review similar component as example
5. Check TypeScript error messages

---

**Last Updated**: February 23, 2026
**Status**: Production-ready scaffold
**Version**: Next.js 16.1.6
