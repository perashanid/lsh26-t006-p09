# MVP Contract

**Problem:** P09: Vehicle Service Due Predictor  
**Tier:** Medium

## MVP-1: Create at least 40 vehicles belonging to at least 25 owners

Give each vehicle a set of service items with a rule: some due on a fixed date such as insurance and fitness, some due after a period of time such as engine oil, and some due after a distance such as brake pads and tyres. Include current odometer readings and past service records.

**Done when:**
- A judge can view a list showing at least 40 vehicles
- Each vehicle displays its owner name, make/model, and license plate
- Each vehicle has 3-5 service items with visible rule types (fixed_date, period_months, distance_km)
- Each vehicle shows at least 2 odometer readings with dates
- Each vehicle has 2-4 past service records displayed with dates and costs
- At least 25 unique owner names appear across all vehicles

**Realistic input a judge will try:**
- Scroll through the full vehicle list to verify 40+ vehicles exist
- Check that owners are distinct (25+ unique names)
- Verify each vehicle has multiple service items with different rule types
- Confirm odometer readings show progression over time
- View past service history for any vehicle

**Bad input it must survive:**
- Vehicle with no odometer readings yet (new vehicle) - show "No readings recorded"
- Vehicle with no service history - show "No services completed"
- Service item with no last service date (never serviced) - calculate from vehicle registration or current date
- Multiple odometer readings on same date - show both, use latest
- Zero or negative odometer reading - validate and reject/show error

---

## MVP-2: Work out a next due date for every item using its own rule

For distance based items, estimate the date using how far that vehicle runs per day. Mark every item as overdue, due soon, or fine.

**Done when:**
- Every service item displays its calculated next due date
- Fixed date items show the exact date from their rule
- Period-based items show date calculated from last service date + period (e.g., oil change 3 months after last service)
- Distance-based items show estimated date based on vehicle's average km/day and remaining km until due
- Each item has a visible status badge: "Overdue" (red), "Due Soon" (yellow/orange), or "Fine" (green)
- Status logic: Overdue = past due date or past due distance, Due Soon = within 14 days or 500km, Fine = more than 14 days/500km away

**Realistic input a judge will try:**
- View vehicles with different service status combinations
- Verify overdue items are clearly marked in red
- Check that distance-based calculations make sense (next service date aligns with km/day rate)
- Confirm period-based items calculate correctly from last service
- See that fixed-date items simply show their due_date

**Bad input it must survive:**
- Service item with rule but no last service record - calculate from today or vehicle age
- Vehicle with only one odometer reading (can't calculate average) - use default estimate (e.g., 30 km/day) or mark as "insufficient data"
- Distance-based item where vehicle already exceeded due distance - show as overdue with days overdue
- Future-dated odometer reading (data error) - validate dates or exclude from calculation
- Service interval in past (e.g., insurance expired 6 months ago) - show overdue with specific "X days overdue"

---

## MVP-3: Give the workshop a daily call list

Which owner to call, which vehicle, which items are due and why. Sort it so the most overdue and the highest value work comes first.

**Done when:**
- A judge can view a "Call List" or "Today's Priority List" page
- List shows only vehicles with items that are overdue or due soon (excludes "fine" items)
- Each entry displays: owner name, owner phone number, vehicle make/model, plate number
- Each entry shows which service items are due/overdue with their costs
- List is sorted with most urgent first: primary sort by days overdue (most overdue first), secondary sort by total cost value (highest first)
- For each item, shows reason: "Insurance overdue by 5 days" or "Brake pads due in 8 days (estimated)"
- Empty state when no services are due/overdue: "No urgent services today"

**Realistic input a judge will try:**
- Open the call list and verify vehicles are sorted by urgency (most overdue at top)
- Check that vehicles with multiple overdue items show higher in list than those with one
- Verify high-cost services (like tyres: 32,000 BDT) rank above low-cost ones (like air filter: 1,200 BDT) when urgency is equal
- Click on an owner/vehicle to see full details
- Verify phone numbers are shown for easy calling

**Bad input it must survive:**
- All vehicles are "fine" - show empty state with encouraging message
- Two vehicles with identical urgency and cost - stable sort (maintain consistent order)
- Vehicle with missing phone number - show "No phone" or placeholder
- Service with no cost defined - treat as 0 BDT, sort to bottom
- Multiple services due same day at same cost - show all, any order is acceptable

---

## MVP-4: Give each owner a vehicle page

Showing every item, its next due date and its cost. Let the workshop record a completed service so that item resets and the service history grows.

**Done when:**
- A judge can navigate to an individual vehicle details page
- Page displays owner name, phone, vehicle make/model, plate number, current odometer reading
- All service items are listed showing: name, rule type, next due date, status badge, cost in BDT
- Each service item has a "Record Service" or "Complete" button
- Clicking "Record Service" opens a form/modal to enter: service date, odometer reading (for distance items), actual cost
- Submitting the form: updates service history (adds new record), recalculates next due date based on rule, updates status badge
- Service history section shows all past services in chronological order with dates, items serviced, and costs
- After recording a service, the page refreshes/updates to show new due date and updated history

**Realistic input a judge will try:**
- View vehicle page and see all service items with their statuses
- Click "Record Service" on an overdue item
- Enter today's date, current odometer, and actual cost
- Submit and verify: item moves from "overdue" to "fine", new due date calculated, history updated
- Record multiple services for same vehicle
- Navigate back to call list and verify vehicle moved down or off list

**Bad input it must survive:**
- Submit service completion with empty date - show validation error "Date required"
- Submit with invalid odometer (letters, negative) - show validation "Enter valid number"
- Submit odometer lower than previous reading - show warning but allow (clock rollover edge case)
- Submit service for item already completed today - allow (multiple services same day possible)
- Close form without submitting - no changes saved, page state unchanged
- Service cost entered differently than defined cost - allow override (actual vs estimated)
- Record service for distance-based item without odometer reading - show validation "Odometer required for distance-based services"

---

## Assumptions

1. **"Due soon" threshold:** 14 days for time-based items, 500 km for distance-based items
2. **"Overdue" definition:** Any item past its due date or distance is overdue, even by 1 day/km
3. **Daily distance calculation:** Average all gaps between consecutive odometer readings to estimate km/day
4. **Default km/day:** If only one odometer reading exists, use 30 km/day as default estimate
5. **"Today" reference:** Use 2026-08-30 from the P09 case data as "today" for all calculations
6. **Period-based items without history:** If never serviced, assume due immediately (or calculate from vehicle's first odometer date)
7. **Distance-based items without history:** If never serviced, calculate from odometer reading at 0 km baseline
8. **Priority sorting:** Primary = days overdue (descending), secondary = total cost of work (descending)
9. **Service completion resets:** Recording a service resets that item's baseline for next calculation (new date for period items, new km for distance items)
10. **Data persistence:** All vehicles, services, and updates persist in MongoDB across sessions

---

## Explicitly NOT building

- User authentication or login system
- Multiple workshop locations or user roles
- SMS/email notifications to owners
- Appointment scheduling system
- Payment processing or invoicing
- Parts inventory management
- Service technician assignment
- Mobile app or native mobile views
- Export/print functionality for call lists
- Advanced analytics or reporting dashboards
- Dark mode toggle
- Vehicle search or advanced filtering (beyond status-based call list)
- Bulk operations (e.g., "mark multiple as complete")
- Undo/edit completed service records
- Owner account self-service portal

---

## Data Validation Rules

**Service Item Rules:**
- `fixed_date`: Must have `due_date` field (YYYY-MM-DD format)
- `period_months`: Must have `every_months` field (positive integer)
- `distance_km`: Must have `every_km` field (positive integer)
- All items: Must have `name`, `cost_bdt`, `rule` fields

**Odometer Readings:**
- Date must be valid YYYY-MM-DD format
- km must be non-negative number
- Later dates should have higher km values (warn if not, but allow)

**Service History:**
- Date must be valid YYYY-MM-DD format
- Item name must match a service item defined for that vehicle
- Cost must be positive number
- km is optional for period-based items, required for distance-based items

**Vehicle:**
- Must have unique id
- Must reference an existing owner_id
- Must have model and plate

**Owner:**
- Must have unique id
- Must have name
- Phone is optional but recommended
