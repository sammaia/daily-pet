# PetCare Dashboard - Design System

## Overview

Clean, modern design system built with Tailwind CSS. Focused on usability for busy daycare staff and managers, with tablet-friendly touch targets.

## Color Palette

### Primary
- **Blue-600**: `#2563eb` - Main actions, active states, primary buttons
- **Blue-700**: `#1d4ed8` - Hover state for blue-600

### Neutral
- **Gray-900**: `#111827` - Sidebar background, dark text
- **Gray-800**: `#1f2937` - Secondary dark elements
- **Gray-300**: `#d1d5db` - Borders, dividers
- **Gray-200**: `#e5e7eb` - Light backgrounds, secondary button background
- **Gray-100**: `#f3f4f6` - Very light backgrounds
- **Gray-50**: `#f9fafb` - Main page background

### Semantic
- **Green**: `#10b981` - Success, approved states
- **Red**: `#ef4444` - Danger, errors, critical alerts
- **Yellow**: `#f59e0b` - Warning, pending states
- **Orange**: `#f97316` - Secondary warning

### Text
- **Primary text**: Gray-900
- **Secondary text**: Gray-600
- **Disabled text**: Gray-400
- **Light text**: White (on dark backgrounds)

## Typography

### Font
- **Family**: System fonts (sans-serif)
- **Stack**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`

### Sizes & Weights

| Level | Size | Weight | Use Case |
|-------|------|--------|----------|
| H1 | 30px (text-3xl) | 700 (bold) | Page titles |
| H2 | 24px (text-2xl) | 700 (bold) | Section headers |
| H3 | 20px (text-xl) | 600 (semibold) | Subsection headers |
| Body | 16px (text-base) | 400 (normal) | Default text, paragraphs |
| Small | 14px (text-sm) | 400 (normal) | Labels, secondary info |
| XSmall | 12px (text-xs) | 400 (normal) | Captions, metadata |

### Line Height
- `leading-relaxed` (1.625) for long text
- `leading-normal` (1.5) for regular content
- `leading-tight` (1.25) for headings

## Spacing

Uses Tailwind's default scale (4px base unit):

- `p-1` to `p-12` - Padding
- `m-1` to `m-12` - Margin
- `gap-1` to `gap-12` - Grid/flex gap
- `space-y-1` to `space-y-12` - Vertical space between children

### Common Patterns
- **Card padding**: `p-6` (24px)
- **Page padding**: `p-6` (24px)
- **Between sections**: `gap-6` or `space-y-6`
- **Between rows**: `space-y-4`
- **Between columns**: `gap-4`

## Border Radius

- **Sharp**: `rounded-none` - Rarely used
- **Subtle**: `rounded-lg` - Buttons, inputs, cards
- **Circular**: `rounded-full` - Avatars, badges

Standard: `rounded-lg` (8px) for most elements

## Shadows

- **None**: No shadow (default)
- **Subtle**: `shadow` - Cards, modals
- **Elevated**: `shadow-lg` - Modals, popovers
- **Heavy**: Not used in this design system

Usage:
```css
.card { @apply shadow border border-gray-200; }
.modal { @apply shadow-lg; }
```

## Components

### Button

#### Variants

**Primary Button**
```tsx
<Button variant="primary">Action</Button>
// bg-blue-600 text-white hover:bg-blue-700
```

**Secondary Button**
```tsx
<Button variant="secondary">Alternative</Button>
// bg-gray-200 text-gray-900 hover:bg-gray-300
```

**Outline Button**
```tsx
<Button variant="outline">Cancel</Button>
// border border-gray-300 text-gray-900 hover:bg-gray-50
```

**Ghost Button**
```tsx
<Button variant="ghost">Link-like</Button>
// text-gray-600 hover:bg-gray-100
```

**Danger Button**
```tsx
<Button variant="danger">Delete</Button>
// bg-red-600 text-white hover:bg-red-700
```

#### Sizes

- **Small**: `size="sm"` - 12px text, 6px 12px padding
- **Medium**: `size="md"` (default) - 16px text, 8px 16px padding
- **Large**: `size="lg"` - 18px text, 12px 24px padding

#### States

- **Loading**: `isLoading={true}` - Shows spinner
- **Disabled**: `disabled={true}` - Grayed out, not clickable
- **Mobile**: Touch targets min 44x44px (Tailwind default)

### Input

```tsx
<Input
  label="Pet Name"
  placeholder="Enter pet name"
  error={errors.name?.message}
  helperText="Optional: leave blank if unknown"
/>
```

**States**:
- Default: Gray border
- Error: Red border with red error text below
- Focus: Blue ring (focus:ring-2 focus:ring-blue-500)

### Card

```tsx
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer with actions</CardFooter>
</Card>
```

**Styling**:
- White background with gray-200 border
- Light shadow
- Rounded corners

### Modal

```tsx
<Modal open={open} onClose={() => setOpen(false)} title="Confirm">
  <p>Are you sure?</p>
  <div className="flex gap-2 mt-6">
    <Button variant="secondary">Cancel</Button>
    <Button variant="danger">Delete</Button>
  </div>
</Modal>
```

**Features**:
- Backdrop overlay (black with 50% opacity)
- Escape key to close
- Centered on screen
- Modal appears above all other content (z-50)

### Sidebar

**Navigation Links**:
- Default: Gray-300 text, hover:bg-gray-800
- Active: Blue-600 background, white text
- Icon + label layout

**Features**:
- Fixed width (256px / w-64)
- Dark background (gray-900)
- Mobile: Collapses off-screen, toggle button at top
- User section at bottom with avatar

### Header

**Layout**:
- Sticky at top
- White background with gray-200 bottom border
- Flex between page title (left) and action buttons (right)
- Height: 64px (p-4)

**Right Actions**:
- Notifications icon
- User profile icon
- Same icon styling (gray-600, hover:bg-gray-100)

## Responsive Design

### Breakpoints
Uses Tailwind defaults:
- `sm`: 640px
- `md`: 768px (tablet - **primary target**)
- `lg`: 1024px (desktop)
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* Single column on mobile, 2 on tablet, 4 on desktop */}
</div>
```

### Touch Targets
All interactive elements must be at least **44x44px**:
```tsx
<button className="p-2">
  {/* 16px padding = 44x44px minimum for icon */}
</button>
```

### Sidebar Responsiveness
```tsx
// Desktop: Fixed sidebar visible
// Mobile: Off-screen, toggle button to open
<aside className="hidden md:block"> {/* or use transform/translate */}
  ...
</aside>
```

## Accessibility

### Color Contrast
- Text on background: Min 4.5:1 (WCAG AA)
- Large text (18pt+): Min 3:1 (WCAG AA)

### Semantic HTML
- Use `<button>` for buttons, not `<div>`
- Use `<nav>` for navigation
- Use `<main>` for main content
- Use `<section>`, `<article>`, `<aside>` appropriately

### ARIA Labels
```tsx
<button aria-label="Open menu">
  <Menu size={20} />
</button>
```

### Focus Indicators
All interactive elements show visible focus ring:
```css
@apply focus:outline-none focus:ring-2 focus:ring-blue-500
```

### Keyboard Navigation
- Tab through interactive elements
- Enter/Space to activate buttons
- Escape to close modals
- Arrow keys for dropdowns (future implementation)

## Usage Utilities

### `cn()` Helper
Combine conditional Tailwind classes safely:

```tsx
import { cn } from '@/lib/utils/cn';

<div className={cn(
  'p-4 rounded-lg',
  isActive && 'bg-blue-600 text-white',
  !isActive && 'bg-gray-100 text-gray-900'
)}>
  Content
</div>
```

**Why**: Tailwind's JIT compiler needs to see full class names. Using `cn()` with clsx + tailwind-merge prevents purging of dynamic classes.

## Status Badges

(Future component patterns)

```tsx
// Status colors
'checked-in': green-600
'pending': yellow-500
'absent': gray-500
'overdue': red-600
'approved': green-600
'rejected': red-600
```

## Icons

From **lucide-react**:

```tsx
import { Heart, Home, Menu, X, Calendar } from 'lucide-react';

<Heart size={20} className="text-red-600" />
```

- Default size: 24px, override with `size` prop
- Color with Tailwind: `className="text-blue-600"`
- Stroke width can be adjusted: `strokeWidth={1.5}`

## Examples

### Stat Card
```tsx
<Card>
  <CardContent className="pt-6">
    <h3 className="text-sm font-medium text-gray-600 mb-2">Pets Present</h3>
    <p className="text-3xl font-bold text-gray-900">24</p>
  </CardContent>
</Card>
```

### Form Group
```tsx
<div className="space-y-2">
  <label className="text-sm font-medium text-gray-700">Pet Name</label>
  <Input placeholder="Enter name" />
</div>
```

### Alert Box
```tsx
<div className="p-4 rounded-lg bg-red-50 border border-red-200">
  <p className="text-sm text-red-800">Error message here</p>
</div>
```

### Loading State
```tsx
<div className="flex items-center gap-2">
  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
  <p>Loading...</p>
</div>
```

## Implementation Guidelines

1. **Always use Tailwind first** - Avoid custom CSS
2. **Use design tokens** - Extend tailwind.config.ts for consistent values
3. **Build components small** - Extract when used more than once
4. **Keep variants simple** - 2-4 variants per component max
5. **Use cn() for conditionals** - Never string concatenation
6. **Test at 768px** - Tablet size (primary target for caregivers)
7. **Accessibility first** - Semantic HTML, proper ARIA, keyboard nav
8. **Dark mode** - Not yet implemented, but Tailwind config supports it

---

**Last Updated**: February 23, 2026
**Figma/Design**: Not yet created (design system defined in code)
