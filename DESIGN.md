# Design System - Perfect Pixel Replica (Relay Template)

## Overview

This template is a complete, production-quality SaaS landing page with green + off-white "Relay" branding. The design is fresh, approachable, and product-led - perfect for adapting into an operational dashboard for vehicle service tracking.

## Color Palette

### Brand Colors (Primary Usage)
- **cream** `oklch(0.978 0.011 95.2)` - Main background, light and airy
- **cream-deep** `oklch(0.961 0.014 93)` - Slightly deeper cream for subtle depth
- **paper** `oklch(0.994 0.008 91.5)` - Card backgrounds, cleanest white
- **forest** `oklch(0.352 0.091 152.6)` - Primary green, main brand color
- **forest-deep** `oklch(0.278 0.05 162.8)` - Darker green for depth/emphasis
- **lime** `oklch(0.869 0.153 119.1)` - Bright accent green
- **lime-soft** `oklch(0.927 0.072 114.5)` - Softer lime for backgrounds
- **clay** `oklch(0.56 0.136 43.1)` - Warm brown accent
- **ink** `oklch(0.218 0 89.9)` - Text color, near-black
- **sage** `oklch(0.599 0.031 130)` - Muted green for secondary elements

### Status Colors (For Service Tracking)
**We will map these to our service status needs:**
- **Overdue** → `--destructive` (red) `oklch(0.577 0.245 27.325)`
- **Due Soon** → `--clay` (warm brown/orange) `oklch(0.56 0.136 43.1)`  
- **Fine** → `--forest` (primary green) `oklch(0.352 0.091 152.6)`

### Semantic Tokens
- `--background` → cream
- `--foreground` → ink
- `--card` → paper
- `--primary` → forest
- `--secondary` → lime
- `--muted` → light grey-green
- `--accent` → lime-soft
- `--destructive` → red (for overdue items)
- `--border` → `oklch(0.895 0.018 95)`

## Typography

### Font Families
- **Display**: `Archivo` - Bold, uppercase, tight spacing. Used for large headlines
- **Sans**: `Hanken Grotesk` - Body text, UI elements, tables
- **Serif**: `Instrument Serif` - Italic, uppercase, used for emphasis
- **Script**: `Pacifico` - Logo/brand signature only

### Font Sizes & Hierarchy
- **display-xl**: Oversized editorial display type, uppercase, tight (line-height: 0.92)
- **display-serif**: Serif variant, italic, uppercase (line-height: 0.95)
- Body text: Default sans-serif at various sizes
- UI elements: Typically 15px (text-[15px])

## Spacing & Layout

### Container
- Max width: `1440px`
- Horizontal padding: `px-4 sm:px-6` (responsive)

### Border Radius
Defined as multiples of base `--radius: 0.75rem`:
- `radius-sm`: -4px from base
- `radius-md`: -2px from base  
- `radius-lg`: base (0.75rem / 12px)
- `radius-xl` through `radius-4xl`: increments of +4px

### Card Shadow
`--shadow-card: 0 1px 2px oklch(0.3 0.03 120 / 0.06), 0 8px 24px oklch(0.3 0.03 120 / 0.06)`

## Component Patterns

### Cards
Use `.card-soft` utility:
```tsx
<div className="card-soft">
  // Applies paper background, border, 12px radius, soft shadow
</div>
```

### Buttons (from Header component)
Three variants observed:
1. **Primary solid**: `bg-forest text-cream hover:bg-forest-deep` with full rounding
2. **Primary outline**: `border border-forest text-forest hover:bg-forest/5`
3. **Text/ghost**: `text-forest-deep hover:text-forest`

All use `rounded-full` and `px-5 py-2.5` sizing for consistency.

### Grid Paper Background
Use `.grid-paper` utility for faint engineering-grid effect:
```tsx
<div className="grid-paper">
  // 28px × 28px grid lines in muted forest color
</div>
```

### Links with Arrow Animation
Use `.link-underline` utility:
```tsx
<a className="link-underline">
  // Underline that extends gap on hover
</a>
```

## Animations & Motion

### Easing
Custom easing: `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`

### Animation Patterns
1. **Dropdowns**: Height + opacity fade (duration: 0.32s)
2. **List items**: Staggered fade-up (delay: 0.03s × index)
3. **Marquee**: Infinite horizontal scroll (48s linear)

### Motion Library
Uses `motion/react` (Framer Motion) for:
- AnimatePresence for mount/unmount
- Height animations for accordions/dropdowns
- Staggered list animations

## Layout Components

### Header
- Sticky top navigation (`sticky top-0 z-50`)
- Height: 72px
- Scrolled state adds shadow
- Desktop mega-menu dropdown
- Mobile full-screen drawer

### Status Indicators (To Build)
For vehicle service status, use badge pattern:
- Overdue: `bg-destructive text-destructive-foreground`
- Due Soon: `bg-clay text-paper`
- Fine: `bg-forest text-cream`

All with `rounded-full px-3 py-1 text-sm font-medium`

## Interactive States

### Hover States
- Buttons: Background color shift or opacity change
- Links: Color darkening
- Cards: Optional subtle lift or border color change

### Focus States
- Use `--ring` color (forest green)
- Standard focus-visible ring

## Dark Mode

Template includes complete dark mode definitions in `:root.dark` but the Relay brand primarily uses light mode. For this project, **we'll stay in light mode only** to match workshop operational environment.

## Responsive Breakpoints

Uses Tailwind defaults:
- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px (where mobile menu switches to desktop)
- `xl`: 1280px
- `2xl`: 1536px

## Key Design Principles

1. **Generous whitespace** - Cream background creates breathing room
2. **Soft shadows** - Never harsh, always subtle depth
3. **Rounded corners** - 12px base radius throughout
4. **Color restraint** - Primary uses forest/lime, secondary uses clay/sage
5. **Typography hierarchy** - Clear distinction between display and body text
6. **Status communication** - Use color + text, never color alone

## Adapting for Vehicle Service Tracker

### Keep 100% Intact
- All color variables and tokens
- Typography system and font families
- Spacing scale and border radius values
- Button styles and interactive patterns
- Card shadow and background patterns
- Grid paper background utility

### Components to Repurpose
- **Header** → Workshop dashboard header with navigation
- **Cards** → Vehicle cards, service item cards
- **Tables** → Will need to build using existing color/spacing tokens
- **Badges** → Service status indicators (overdue/due soon/fine)
- **Buttons** → Actions like "Record Service", "View Details"

### New Components Needed (Using Existing Pattern)
- Data tables for call lists and vehicle lists
- Service item rows with status badges
- Date displays and countdown indicators
- Modal for recording completed services
- Empty states for "no overdue services"
- Loading skeletons matching card patterns

All new components must use:
- Existing color tokens from styles.css
- Hanken Grotesk font for UI
- 12px border radius
- Soft shadow from --shadow-card
- Forest/lime for primary actions
- Destructive red for overdue states
