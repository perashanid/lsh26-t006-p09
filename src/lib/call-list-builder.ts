/**
 * Call List Builder
 * Generates prioritized call list from vehicle and owner data
 */

import type {
  Vehicle,
  Owner,
  CallListEntry,
  VehicleWithOwner,
  ServiceItemWithDue,
} from "./types";
import {
  calculateVehicleServicesDue,
  getCurrentKm,
  calculateAvgKmPerDay,
  calculatePriorityScore,
  parseCost,
} from "./service-calculator";

/**
 * Build vehicle with owner and computed service status
 */
export function buildVehicleWithOwner(
  vehicle: Vehicle,
  owner: Owner,
  referenceDate: string
): VehicleWithOwner {
  const servicesWithDue = calculateVehicleServicesDue(vehicle, referenceDate);
  const currentKm = getCurrentKm(vehicle.odometer_readings);
  const avgKmPerDay = calculateAvgKmPerDay(vehicle.odometer_readings);

  const overdueCount = servicesWithDue.filter(
    (s) => s.status === "overdue"
  ).length;
  const dueSoonCount = servicesWithDue.filter(
    (s) => s.status === "due_soon"
  ).length;

  return {
    ...vehicle,
    owner,
    current_km: currentKm,
    avg_km_per_day: avgKmPerDay,
    services_with_due: servicesWithDue,
    total_overdue_count: overdueCount,
    total_due_soon_count: dueSoonCount,
  };
}

/**
 * Build call list entry from vehicle with owner
 */
function buildCallListEntry(
  vehicleWithOwner: VehicleWithOwner
): CallListEntry | null {
  const overdueItems = vehicleWithOwner.services_with_due.filter(
    (s) => s.status === "overdue"
  );
  const dueSoonItems = vehicleWithOwner.services_with_due.filter(
    (s) => s.status === "due_soon"
  );

  // Only include vehicles with overdue or due soon items
  if (overdueItems.length === 0 && dueSoonItems.length === 0) {
    return null;
  }

  // Calculate total cost of all urgent items
  const totalCost =
    [...overdueItems, ...dueSoonItems].reduce(
      (sum, s) => sum + parseCost(s.item.cost_bdt),
      0
    );

  // Find most overdue item for priority scoring
  const mostUrgentDays = Math.min(
    ...overdueItems.map((s) => s.days_until_due),
    0
  );

  const priorityScore = calculatePriorityScore(mostUrgentDays, totalCost);

  return {
    vehicle_id: vehicleWithOwner.id,
    owner_name: vehicleWithOwner.owner.name,
    owner_phone: vehicleWithOwner.owner.phone,
    vehicle_model: vehicleWithOwner.model,
    vehicle_plate: vehicleWithOwner.plate,
    current_km: vehicleWithOwner.current_km,
    overdue_items: overdueItems,
    due_soon_items: dueSoonItems,
    total_cost: totalCost,
    priority_score: priorityScore,
    most_urgent_days_overdue: Math.abs(mostUrgentDays),
  };
}

/**
 * Generate complete call list from vehicles and owners
 */
export function generateCallList(
  vehicles: Vehicle[],
  owners: Owner[],
  referenceDate: string
): CallListEntry[] {
  // Create owner lookup map
  const ownerMap = new Map(owners.map((o) => [o.id, o]));

  // Build call list entries
  const entries: CallListEntry[] = [];

  for (const vehicle of vehicles) {
    const owner = ownerMap.get(vehicle.owner_id);
    if (!owner) continue;

    const vehicleWithOwner = buildVehicleWithOwner(
      vehicle,
      owner,
      referenceDate
    );
    const entry = buildCallListEntry(vehicleWithOwner);

    if (entry) {
      entries.push(entry);
    }
  }

  // Sort by priority score (descending - higher = more urgent)
  entries.sort((a, b) => b.priority_score - a.priority_score);

  return entries;
}

/**
 * Get summary statistics for call list
 */
export function getCallListSummary(callList: CallListEntry[]): {
  total_vehicles: number;
  total_overdue_items: number;
  total_due_soon_items: number;
  total_estimated_revenue: number;
} {
  return {
    total_vehicles: callList.length,
    total_overdue_items: callList.reduce(
      (sum, e) => sum + e.overdue_items.length,
      0
    ),
    total_due_soon_items: callList.reduce(
      (sum, e) => sum + e.due_soon_items.length,
      0
    ),
    total_estimated_revenue: callList.reduce(
      (sum, e) => sum + e.total_cost,
      0
    ),
  };
}
