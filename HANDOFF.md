# Handoff – Foundation → Coding Agent

Read `KIRO_HACKATHON_SKILL.md` in the parent directory (`d:\hackathon\`) for the full build rules – this file is state, not rules.

## Status

**Foundation phase complete.** Skeleton is ready but **no features have been wired**. All 4 MVP requirements in `MVP.md` are documented but untouched. The coding agent must build them all.

## Stack

- **Framework:** TanStack Start (React meta-framework with file-based routing, similar to Next.js)
- **Database:** MongoDB Atlas (free tier) - for persistence across sessions
- **Deployment:** Vercel (TanStack Start deploys via Nitro preset)
- **Styling:** Tailwind CSS v4 + shadcn/ui (preserving template's design system)
- **Forms:** React Hook Form + Zod (already in template)
- **Package Manager:** npm (bun not installed on system)

**Why TanStack Start (not Next.js):**
Template already provides full-stack capabilities via server functions. Migration would be pure overhead with no benefit. TanStack Start supports:
- Server-side API routes (can keep MongoDB connection secret)
- Vercel deployment (Nitro preset configured)
- Everything MVP requires

## Design System

See `DESIGN.md` for complete documentation.

**Key tokens:**
- **Colors:** 
  - Primary: `forest` (green #352 oklch), `cream` (background #978 oklch)
  - Status: `destructive` (overdue/red), `clay` (due soon/warm brown), `forest` (fine/green)
  - Cards: `paper` (cleanest white)
- **Typography:** Hanken Grotesk (body/UI), Archivo (display/headers)
- **Spacing:** 12px base radius, generous whitespace
- **Components:** Soft shadows, rounded corners, card-soft utility class

## Screens – What's Real vs Finished-Looking

**Fully built by template (Relay landing page):**
- Header with mega-menu navigation
- Hero, Stats, Outgrown, Products, Payments, Proof, MasterCta, Footer sections
- Complete shadcn/ui component library (45+ components in src/components/ui/)

**What needs building (for vehicle service tracker):**
- Call list page (MVP-1)
- Vehicle details page (MVP-2)
- Service recording modal/form (MVP-3)
- Data tables for vehicle/call lists
- Status badges (using existing color tokens)
- Empty/loading/error states

**Design pattern is established** - new components must match exactly:
- Use existing Tailwind theme tokens (never hardcode colors)
- Hanken Grotesk for all UI text
- 12px border radius
- Soft shadow from `--shadow-card`
- Forest/lime for primary actions
- Destructive red for overdue items

## Core Infrastructure Complete

All business logic and data structures are ready to use:

### `src/lib/types.ts`
Complete type system:
- Core domain: `Owner`, `Vehicle`, `ServiceItem` (with 3 variants), `ServiceHistory`, `OdometerReading`
- Computed: `ServiceItemWithDue`, `VehicleWithOwner`, `CallListEntry`
- API: `RecordServiceRequest`, `RecordServiceResponse`
- MongoDB: `OwnerDocument`, `VehicleDocument`, `SystemSettings`
- Type guards: `isFixedDateService`, `isPeriodService`, `isDistanceService`
- Constants: `SERVICE_CONSTANTS` (14 days, 500km thresholds, reference date)

### `src/lib/seed-data.ts`
Complete seed data ready to load into MongoDB:
- 42 vehicles (SEED_VEHICLES array)
- 27 owners (SEED_OWNERS array)
- Reference date: 2026-08-30
- Realistic scenarios: V02 tax overdue (2026-07-21), V07 insurance overdue (2026-08-11), many due soon, many fine
- Function: `getSeedData()` returns complete CaseData object

### `src/lib/service-calculator.ts`
Complete business logic engine:
- `calculateAvgKmPerDay(readings)` - avg daily distance from odometer history
- `getCurrentKm(readings)` - latest odometer reading
- `calculateServiceItemDue(item, history, currentKm, avgKmPerDay, referenceDate)` - calculates next due date and status for any service item
- `calculateVehicleServicesDue(vehicle, referenceDate)` - calculates all items for a vehicle
- `calculatePriorityScore(daysOverdue, totalCost)` - for call list sorting (days * 1000 + cost)
- `getStatusBadgeClass(status)`, `getStatusLabel(status)` - UI helpers
- `formatDaysUntilDue(days)`, `formatKmUntilDue(km)` - human-readable strings

**All 3 service rule types fully implemented:**
- `fixed_date`: Returns `due_date` directly
- `period_months`: Adds `every_months` to last service date (or uses reference date if never serviced)
- `distance_km`: Calculates km remaining, estimates date using avg km/day

**Status logic:**
- Overdue: past due date OR past due km
- Due soon: within 14 days OR within 500 km
- Fine: everything else

## Mock Data Seams

**No mock data** - everything will be real and persisted to MongoDB Atlas.

Seed data location: `src/lib/seed-data.ts` exports `SEED_VEHICLES` and `SEED_OWNERS` arrays.

On first run, coding agent must:
1. Create MongoDB collections: `owners`, `vehicles`, `system_settings`
2. Load seed data from `getSeedData()`
3. Store reference date ("today": "2026-08-30") in system_settings

## MVP Requirements

See `MVP.md` for complete details. All 4 requirements documented, **none started**.

**Brief summary:**

1. **MVP-1:** Create 40+ vehicles, 25+ owners with service items ✅ (data ready in seed-data.ts, needs DB loading)
2. **MVP-2:** Calculate next due dates, mark status (overdue/due soon/fine) ✅ (logic ready in service-calculator.ts, needs UI)
3. **MVP-3:** Workshop call list - sorted by urgency (most overdue + highest cost first) ❌ (needs page + sorting logic)
4. **MVP-4:** Owner vehicle page - show all items, record completed services ❌ (needs page + form + DB update)

## Environment Setup

**MongoDB Connection:**
1. Create free MongoDB Atlas cluster
2. Get connection string from Atlas dashboard
3. Create `.env` file (copy from `.env.example`):
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vehicle-service-tracker?retryWrites=true&w=majority
   ```

**Dependencies:**
Run `npm install` to install all dependencies including mongodb ^6.11.0

## Your Job (Coding Agent)

Build every MVP requirement in `MVP.md`, strictly in order, to completion (§2 rule 3, §4 in `KIRO_HACKATHON_SKILL.md`).

**Order of work:**
1. Set up MongoDB connection module (`src/lib/mongodb.ts`) - singleton client, reuse across requests
2. Create database seeding function - load SEED_OWNERS and SEED_VEHICLES into MongoDB
3. Build MVP-3 (call list page first) - most visible feature, validates entire system
4. Build MVP-4 (vehicle details page + service recording)
5. Add loading/empty/error states to all features (§5)
6. Test everything with realistic and bad inputs
7. Deploy to Vercel and confirm zero-setup works
8. Finish all docs to completion (README.md, LICENSES.md, evaluation-manifest.json)
9. Confirm Definition of Done before calling it complete

**Do not:**
- Touch already-finished UI beyond wiring it to real data
- Commit anything (§2 rule 2 - no git commits, leave working tree dirty)
- Add features not in MVP.md
- Skip edge case handling or loading states

**File structure for new code:**
```
src/
  lib/
    mongodb.ts          # NEW - MongoDB client connection (singleton)
    data-access.ts      # NEW - CRUD functions for owners/vehicles
  routes/
    call-list.tsx       # NEW - MVP-3 call list page
    vehicles.$id.tsx    # NEW - MVP-4 vehicle details page
  components/
    vehicle-table.tsx   # NEW - data table for call list
    status-badge.tsx    # NEW - status indicator (overdue/due soon/fine)
    record-service.tsx  # NEW - form modal for completing service
```

## Database Schema

**Collections:**

```typescript
// owners collection
{
  _id: ObjectId,
  id: "O01",
  name: "Salma Ahmed",
  phone: "01481704039",
  created_at: Date,
  updated_at: Date
}

// vehicles collection
{
  _id: ObjectId,
  id: "V01",
  owner_id: "O01",
  model: "Toyota Axio",
  plate: "Dhaka Metro Cha 76-9961",
  odometer_readings: [...],
  service_items: [...],
  service_history: [...],
  created_at: Date,
  updated_at: Date
}

// system_settings collection
{
  _id: ObjectId,
  reference_date: "2026-08-30",
  updated_at: Date
}
```

## Known Issues / Decisions

**From NOTES.md:**

**Assumptions:**
- "Due soon" = 14 days or 500 km
- "Overdue" = any item past due date/distance
- Daily distance = average of all odometer reading gaps
- Default 30 km/day if only one reading
- Reference date = 2026-08-30 (from P09 case data)

**Not building:**
- User authentication
- SMS/email notifications
- Appointment scheduling
- Multi-workshop support
- Mobile app
- Export/print functionality
- Advanced analytics
- Dark mode
- Search/filtering beyond call list
- Undo/edit service records

## Testing Strategy

Per protocol §2 rule 13: clean build + manual browser testing is sufficient.

**Verification checklist:**
1. `npm install && npm run build` - must pass with zero errors
2. Click through each MVP requirement in browser
3. Test realistic inputs (view vehicles, record services)
4. Test bad inputs (empty forms, invalid dates, negative km)
5. Verify loading states appear
6. Verify empty states when no overdue items
7. Verify error states on failure

Do not set up automated testing unless explicitly requested after everything else works.

## Docs Status

- `README.md` - needs completing per `KIRO_HACKATHON_SKILL.md` §6
- `LICENSES.md` - partially populated from template, extend as dependencies added
- `evaluation-manifest.json` - needs locating template and filling
- `NOTES.md` - complete, maintained throughout foundation phase
- `MVP.md` - complete
- `DESIGN.md` - complete
- `PROBLEM.md` - complete

## Next Session Start

When you (coding agent) start:
1. Read this file first
2. Read `KIRO_HACKATHON_SKILL.md` at `d:\hackathon\` for rules
3. Read `MVP.md` for requirements
4. Read `DESIGN.md` for visual patterns
5. Create MongoDB connection in `src/lib/mongodb.ts`
6. Start building MVP-3 (call list page)

## Contact / Questions

All assumptions and decisions are documented in:
- `NOTES.md` - stack, template, assumptions, limitations
- `MVP.md` - requirement interpretations, edge cases
- `DESIGN.md` - visual system, component patterns

If something is ambiguous, follow protocol §2 rule 7: pick the simpler reading, implement it, document the assumption in NOTES.md, keep going.

---

**Foundation phase delivered:**
- Complete, deployable skeleton with finished visual design
- All MVP requirements captured with clear "Done when" criteria
- Clean build from clone with zero manual setup
- Every file required by protocol (README stub, LICENSES, NOTES, MVP, DESIGN)
- Comprehensive documentation so coding agent starts immediately with full context

**Budget spent on:** Ground truth (design, docs, types, business logic, seed data) not partial features. Coding agent has solid foundation to build all 4 MVP requirements without untangling anything.
