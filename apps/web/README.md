# PetCare Dashboard - Web App

A Next.js 15 admin dashboard for dog daycare management, built with TypeScript, Tailwind CSS, and Supabase.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Then update the variables in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # Auth routes (login, signup, etc)
│   │   └── layout.tsx
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   ├── page.tsx              # Daily overview
│   │   ├── agendamentos/         # Bookings
│   │   ├── pets/                 # Pet registry
│   │   ├── boletins/             # Daily reports
│   │   ├── turmas/               # Classes
│   │   ├── financeiro/           # Financial
│   │   ├── chat/                 # Messaging
│   │   └── config/               # Settings
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/
│   ├── ui/                       # Base design system components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── modal.tsx
│   │   └── ...
│   ├── layout/                   # Layout components
│   │   ├── sidebar.tsx           # Navigation sidebar
│   │   ├── header.tsx            # Page header
│   │   └── ...
│   └── features/                 # Feature-specific components
├── lib/
│   ├── supabase/                 # Supabase client setup
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── middleware.ts         # Auth middleware
│   ├── utils/
│   │   └── cn.ts                 # Tailwind CSS class merging utility
│   └── validations/              # Zod schemas
├── hooks/                        # Custom React hooks
├── types/
│   └── database.ts               # Supabase types
└── styles/
    └── globals.css               # Global styles

middleware.ts                      # Next.js middleware for auth
```

## Key Features

### Components
- **Button** - Primary, secondary, outline, ghost, danger variants with size options
- **Input** - Text input with label, error state, and helper text
- **Card** - Card component with header, content, and footer
- **Modal** - Dialog modal with escape key handling
- **Sidebar** - Responsive navigation sidebar with mobile toggle
- **Header** - Page header with breadcrumbs and user menu

### Styling
- Tailwind CSS for utility-first styling
- `cn()` helper for conditional class names
- Consistent design tokens and spacing scale
- Responsive design (mobile-first, optimized for tablets)

### Authentication
- Supabase SSR integration for secure session management
- Auth middleware for automatic session refresh
- Protected routes under `/dashboard`

## Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## TypeScript Configuration

Strict mode enabled. All types must be explicit - no `any` types allowed.

Path aliases configured:
- `@/*` - Points to `src/` directory

## Design System

### Colors
- Primary: Blue (blue-600)
- Secondary: Gray (gray-200)
- Success: Green
- Warning: Yellow
- Danger: Red
- Neutral: Gray scale

### Typography
- Font: Sans-serif (system fonts)
- Sizes: Consistent hierarchy (h1, h2, h3, body, sm, xs)

### Spacing
Uses Tailwind's standard scale (p-1 to p-12, gap-1 to gap-12, etc)

### Components
All UI components are stored in `src/components/ui/` and should be:
- Small and focused
- TypeScript-first with explicit prop types
- Accessible (semantic HTML, ARIA labels)
- Responsive
- Customizable via className prop

## Rules

- **Server Components by default** - Only use `'use client'` when necessary
- **Forms use React Hook Form + Zod** - All form validation must use this combination
- **No business logic in UI** - Keep components purely presentational
- **TypeScript strict mode** - No `any` types
- **Brazilian Portuguese comments** for business logic, English for technical
- **Responsive design** - Test at 768px (tablet) minimum

## Next Steps

1. Set up Supabase project and update `.env.local`
2. Generate Supabase types: `npx supabase gen types typescript --local > src/types/database.ts`
3. Build auth flow (login, signup, password reset)
4. Implement feature pages (boletim, agendamentos, etc)
5. Add more reusable components as needed

## Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
