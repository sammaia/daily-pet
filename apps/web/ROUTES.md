# PetCare Dashboard - Route Map

## Public Routes

### `/` - Landing Page
**File**: `src/app/page.tsx`
**Purpose**: Public landing page with login link
**Features**: Gradient background, login button

### `/(auth)/login` - Login Page
**File**: `src/app/(auth)/login/page.tsx`
**Purpose**: User authentication placeholder
**Status**: Placeholder (to be implemented)

## Protected Dashboard Routes

All routes under `/(dashboard)/*` are protected by Supabase auth middleware.

### `/(dashboard)` - Daily Overview (Visão do Dia)
**File**: `src/app/(dashboard)/page.tsx`
**Purpose**: Main dashboard landing page
**Features**:
- Pets present count
- Available spots
- Pending tasks
- Check-ins status

### `/(dashboard)/agendamentos` - Bookings
**File**: `src/app/(dashboard)/agendamentos/page.tsx`
**Purpose**: Calendar view and management of pet bookings
**Features** (to be implemented):
- Visual calendar (day/week/month)
- Drag-and-drop reorganization
- Real-time availability

### `/(dashboard)/pets` - Pet Registry
**File**: `src/app/(dashboard)/pets/page.tsx`
**Purpose**: Manage all pets in the daycare
**Features** (to be implemented):
- Pet listing/DataTable
- Search by name, breed, tutor
- Filters
- Pet profile modal

### `/(dashboard)/boletins` - Daily Report
**File**: `src/app/(dashboard)/boletins/page.tsx`
**Purpose**: Quick-fill daily report form per pet
**Critical UX**: Must be completable in < 2 minutes per pet
**Features** (to be implemented):
- Tabbed/accordion layout by category
- Quick-select options (emoji buttons)
- Pre-filled defaults
- Batch photo upload
- Auto-save drafts
- Progress indicator

### `/(dashboard)/turmas` - Classes
**File**: `src/app/(dashboard)/turmas/page.tsx`
**Purpose**: Create and manage pet classes/groups
**Features** (to be implemented):
- Class creation form
- Pet assignment
- Caregiver assignment
- Schedule management

### `/(dashboard)/financeiro` - Financial Dashboard
**File**: `src/app/(dashboard)/financeiro/page.tsx`
**Purpose**: Revenue, charges, and delinquency tracking
**Features** (to be implemented):
- Charts (Recharts)
- Revenue overview
- Pending charges list
- Delinquency alerts
- Financial reports

### `/(dashboard)/chat` - Messaging
**File**: `src/app/(dashboard)/chat/page.tsx`
**Purpose**: Communication with pet parents
**Features** (to be implemented):
- Message threads
- Real-time updates (Supabase subscriptions)
- Attachment support
- Read/unread status

### `/(dashboard)/config` - Settings
**File**: `src/app/(dashboard)/config/page.tsx`
**Purpose**: Daycare configuration and policies
**Features** (to be implemented):
- Operating hours
- Pricing
- Required vaccines list
- Policies
- User/admin management

## Layout Structure

```
(dashboard)
├── layout.tsx
│   ├── Sidebar (responsive, mobile toggle)
│   ├── Header (sticky, page title)
│   └── Main content area
└── All routes inherit this layout
```

## Middleware & Auth

### `middleware.ts` - Root Level
**Purpose**: Session refresh and route protection
**Features**:
- Automatic session refresh on all requests
- Protects `/dashboard/*` routes
- Sets auth cookies

## API Routes

**Status**: Not yet implemented
**Future locations**:
- `src/app/api/auth/*` - Authentication endpoints
- `src/app/api/pets/*` - Pet management
- `src/app/api/bookings/*` - Booking management
- `src/app/api/reports/*` - Daily reports
- etc.

## Route Groups

### `(landing)`
Removed (conflicts with root dashboard)

### `(auth)`
Authentication related routes
- Layout: Centered card design
- Inherits root layout

### `(dashboard)`
Protected admin routes
- Layout: Sidebar + header
- Inherits root layout
- Protected by middleware

## URL Structure

```
https://petcare.app/
├── / (public landing)
├── /login (public auth)
├── /dashboard (protected)
│   ├── / (daily overview)
│   ├── /agendamentos (bookings)
│   ├── /pets (pet registry)
│   ├── /boletins (daily reports)
│   ├── /turmas (classes)
│   ├── /financeiro (financial)
│   ├── /chat (messaging)
│   └── /config (settings)
└── /api (future API endpoints)
```

## Next.js Features Used

- **App Router** with route groups `(landing)`, `(auth)`, `(dashboard)`
- **Middleware** for auth and session management
- **Server Components** by default (client only where needed)
- **Turbopack** for fast builds
- **Static rendering** for pages (can be changed to dynamic as needed)

## Notes

- All dashboard routes use the same layout (sidebar + header)
- Route group naming with parentheses hides them from URL structure
- Landing page at root `/` to avoid conflicts
- Placeholders show "will be implemented here" messages
