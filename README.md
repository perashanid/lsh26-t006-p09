# Vehicle Service Tracker - P09 Workshop Call List System

A complete vehicle service due predictor and workshop management system built for the P09 hackathon case.

## 🎯 Features

### Core Requirements (All Implemented)

1. **✅ 40+ Vehicles with 25+ Owners**
   - 42 vehicles across 27 owners
   - Realistic vehicle models and license plates (Dhaka Metro format)
   - Multiple vehicles per owner in some cases

2. **✅ Multiple Service Rule Types**
   - **Fixed Date**: Services due on specific dates (insurance, fitness certificate, road tax)
   - **Period-based**: Services due after time intervals (engine oil every 3 months, air filter every 6 months)
   - **Distance-based**: Services due after distance traveled (brake pads every 15,000 km, tires every 40,000 km)

3. **✅ Service Due Calculation Engine**
   - Automatic calculation of next due date for all items
   - Distance-based estimation using vehicle's average km/day
   - Status classification: **Overdue** | **Due Soon** | **Fine**
   - Real-time odometer tracking

4. **✅ Prioritized Workshop Call List**
   - Sorted by urgency: most overdue items first
   - Secondary sort by service value (high-cost repairs prioritized)
   - Shows which owner to call, which vehicle, and which items are due
   - Clear visual indicators for urgency levels

5. **✅ Owner Vehicle Detail Pages**
   - Complete service item list with due dates
   - Service history timeline
   - Odometer readings and average km/day
   - Cost breakdown for all items

6. **✅ Record Completed Service**
   - Dialog to record service completion
   - Automatic service history update
   - Odometer reading capture for distance-based services
   - Actual cost tracking
   - Service item reset with new due date calculation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at **http://localhost:8080**

### Development Commands

```bash
# Start dev server
npm run dev

# Build for production (note: currently has vinxi export issues)
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

## 📊 Data Overview

### Seed Data (src/lib/seed-data.ts)
- **42 vehicles** with realistic Bangladeshi models
- **27 owners** with complete contact information
- **190+ service items** across all vehicles
- **150+ historical service records**
- **Reference date**: August 30, 2026

### Service Types Distribution
- **Fixed date services**: Insurance, Fitness Certificate, Road Tax
- **Period services**: Engine Oil (3mo), Air Filter (6mo), Coolant (12mo), Battery (24mo)
- **Distance services**: Brake Pads (15k km), Tires (40k km), Transmission Oil (50k km)

## 🏗️ Architecture

### Tech Stack
- **Framework**: TanStack Start (React + TanStack Router)
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Data Storage**: In-memory (easily extendable to MongoDB)
- **Build Tool**: Vite v8
- **TypeScript**: Full type safety

### Project Structure

```
src/
├── lib/
│   ├── types.ts              # TypeScript type definitions
│   ├── seed-data.ts           # 42 vehicles + 27 owners data
│   ├── service-calculator.ts  # Due date calculation engine
│   ├── call-list-builder.ts   # Priority sorting algorithm
│   └── data-access.ts         # Data layer (in-memory)
├── routes/
│   ├── index.tsx              # Call list page (main dashboard)
│   ├── vehicles.$id.tsx       # Vehicle detail page
│   ├── api.health.ts          # Health check endpoint
│   └── __root.tsx             # Root layout
├── components/
│   ├── record-service-dialog.tsx  # Service recording UI
│   └── ui/                    # shadcn/ui components
└── assets/                    # Images for template
```

## 📱 Pages

### 1. Workshop Call List (`/`)
- **Purpose**: Daily prioritized list of vehicles needing service
- **Sorting**: Most overdue first, then by total service value
- **Features**:
  - Urgent badge for overdue items
  - Owner contact information
  - Vehicle details (model, plate, current km)
  - List of due/overdue service items
  - Total service cost estimate
  - Click to view full vehicle details

### 2. Vehicle Details (`/vehicles/:id`)
- **Purpose**: Complete service management for a single vehicle
- **Features**:
  - Owner information
  - Current odometer and daily average
  - All service items with status badges
  - Next due dates (date and/or km)
  - Service history timeline
  - "Record Service" button
  - Back to call list navigation

### 3. Record Service Dialog
- **Purpose**: Mark a service as completed
- **Features**:
  - Service item selection
  - Date picker for service date
  - Odometer reading input (for distance-based services)
  - Actual cost input
  - Automatic due date recalculation
  - Service history update

## 🧮 Business Logic

### Service Due Calculation

#### Fixed Date Services
```typescript
// Due on a specific calendar date
// Example: Insurance due 2026-12-31
next_due = service_item.due_date
status = (next_due < today) ? 'overdue' : 
         (days_until_due <= 14) ? 'due_soon' : 'fine'
```

#### Period-Based Services
```typescript
// Due X months after last service
// Example: Engine oil every 3 months
last_service_date = most_recent_service_for_item(history)
next_due = add_months(last_service_date, service_item.every_months)
status = determine_status(next_due, today)
```

#### Distance-Based Services
```typescript
// Due X km after last service
// Example: Brake pads every 15,000 km
last_service_km = most_recent_service_km_for_item(history)
next_due_km = last_service_km + service_item.every_km
km_until_due = next_due_km - current_km

// Estimate date using average km/day
avg_km_per_day = calculate_from_odometer_readings()
days_until_due_km = km_until_due / avg_km_per_day
estimated_date = today + days_until_due_km

status = (km_until_due < 0) ? 'overdue' :
         (km_until_due <= 500) ? 'due_soon' : 'fine'
```

### Priority Score Algorithm
```typescript
// Higher score = more urgent
priority = (days_overdue * 1000) + (cost / 1000)

// Examples:
// - 10 days overdue, $50,000 cost  → score = 10,050
// - 5 days overdue, $100,000 cost  → score = 5,100
// - 1 day overdue, $5,000 cost     → score = 1,005
// Days overdue dominates, cost breaks ties
```

## 🎨 Design System

Based on "perfect-pixel-replica" template:
- **Primary**: Forest green (#2D5F4C)
- **Background**: Cream (#F7F3ED)
- **Text**: Ink (#1A1A1A)
- **Accent**: Clay (#C97F4E)

### Status Colors
- **Overdue**: Red (destructive)
- **Due Soon**: Clay orange
- **Fine**: Forest green

## 🔧 Configuration

### Environment Variables
No environment variables required for the in-memory version.

To enable MongoDB (optional):
```env
MONGODB_URI=your_mongodb_connection_string
```

### Reference Date
Set in `src/lib/types.ts`:
```typescript
export const SERVICE_CONSTANTS = {
  REFERENCE_DATE: "2026-08-30", // P09 case reference date
  DUE_SOON_DAYS_THRESHOLD: 14,
  DUE_SOON_KM_THRESHOLD: 500,
};
```

## 📈 Data Flow

1. **App Start**
   - `initializeDatabase()` loads seed data into memory
   - 42 vehicles, 27 owners, all service items and history

2. **Call List Page**
   - Fetches all vehicles and owners
   - Calculates due dates for all service items
   - Sorts by priority score
   - Displays top priority vehicles

3. **Vehicle Detail Page**
   - Fetches specific vehicle data
   - Calculates all service due information
   - Displays complete service status

4. **Record Service**
   - User fills form with service details
   - New service record added to history
   - Due dates automatically recalculated
   - UI updates immediately

## 🐛 Known Issues

- Build command fails with vinxi export error (dev server works perfectly)
- No persistent storage in current version (refreshing resets data)

## 🚧 Future Enhancements

- [ ] MongoDB integration for persistence
- [ ] SMS notifications for due services
- [ ] Service appointment scheduling
- [ ] Multiple workshop support
- [ ] Service technician assignment
- [ ] Parts inventory tracking
- [ ] Revenue and cost analytics
- [ ] Export reports (PDF/Excel)
- [ ] Mobile app (React Native)

## 📝 License

MIT License - Built for P09 Hackathon Case Study

## 👥 Credits

- **Template**: perfect-pixel-replica (green SaaS design)
- **UI Components**: shadcn/ui
- **Case Data**: P09_vehicle_service_public.json
- **Reference Date**: August 30, 2026

---

**Status**: ✅ All P09 requirements implemented and working in development mode
