/**
 * Service Due Calculator
 * Calculates next due dates and status for all service item types
 */

import {
  type Vehicle,
  type ServiceItem,
  type ServiceHistory,
  type OdometerReading,
  type ServiceItemWithDue,
  type ServiceStatus,
  isFixedDateService,
  isPeriodService,
  isDistanceService,
  SERVICE_CONSTANTS,
} from "./types";

/**
 * Calculate average km per day from odometer readings
 */
export function calculateAvgKmPerDay(readings: OdometerReading[]): number {
  if (readings.length < 2) {
    return SERVICE_CONSTANTS.DEFAULT_KM_PER_DAY;
  }

  // Sort readings by date
  const sorted = [...readings].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let totalKm = 0;
  let totalDays = 0;

  for (let i = 1; i < sorted.length; i++) {
    const kmDiff = sorted[i].km - sorted[i - 1].km;
    const daysDiff = daysBetween(sorted[i - 1].date, sorted[i].date);

    if (kmDiff > 0 && daysDiff > 0) {
      totalKm += kmDiff;
      totalDays += daysDiff;
    }
  }

  if (totalDays === 0) {
    return SERVICE_CONSTANTS.DEFAULT_KM_PER_DAY;
  }

  return totalKm / totalDays;
}

/**
 * Get current odometer reading (latest reading)
 */
export function getCurrentKm(readings: OdometerReading[]): number {
  if (readings.length === 0) return 0;

  const sorted = [...readings].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return sorted[0].km;
}

/**
 * Calculate days between two dates
 */
export function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = d2.getTime() - d1.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Add months to a date
 */
export function addMonths(dateStr: string, months: number): string {
  const date = new Date(dateStr);
  date.setMonth(date.getMonth() + months);
  return date.toISOString().split("T")[0];
}

/**
 * Get most recent service for a specific item
 */
export function getLastService(
  itemName: string,
  history: ServiceHistory[]
): ServiceHistory | null {
  const itemHistory = history.filter((h) => h.item === itemName);

  if (itemHistory.length === 0) return null;

  // Sort by date descending and return most recent
  const sorted = itemHistory.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return sorted[0];
}

/**
 * Calculate next due date for fixed date service items
 */
function calculateFixedDateDue(
  item: ServiceItem,
  _history: ServiceHistory[],
  referenceDate: string
): {
  next_due_date: string | null;
  next_due_km: null;
  last_service_date: null;
  last_service_km: null;
} {
  if (!isFixedDateService(item)) {
    throw new Error("Expected fixed_date service item");
  }

  return {
    next_due_date: item.due_date,
    next_due_km: null,
    last_service_date: null,
    last_service_km: null,
  };
}

/**
 * Calculate next due date for period-based service items
 */
function calculatePeriodDue(
  item: ServiceItem,
  history: ServiceHistory[],
  referenceDate: string
): {
  next_due_date: string | null;
  next_due_km: null;
  last_service_date: string | null;
  last_service_km: null;
} {
  if (!isPeriodService(item)) {
    throw new Error("Expected period_months service item");
  }

  const lastService = getLastService(item.name, history);

  if (!lastService) {
    // Never serviced - due immediately
    return {
      next_due_date: referenceDate,
      next_due_km: null,
      last_service_date: null,
      last_service_km: null,
    };
  }

  const nextDueDate = addMonths(lastService.date, item.every_months);

  return {
    next_due_date: nextDueDate,
    next_due_km: null,
    last_service_date: lastService.date,
    last_service_km: null,
  };
}

/**
 * Calculate next due date for distance-based service items
 */
function calculateDistanceDue(
  item: ServiceItem,
  history: ServiceHistory[],
  currentKm: number,
  avgKmPerDay: number,
  referenceDate: string
): {
  next_due_date: string | null;
  next_due_km: number;
  last_service_date: string | null;
  last_service_km: number | null;
} {
  if (!isDistanceService(item)) {
    throw new Error("Expected distance_km service item");
  }

  const lastService = getLastService(item.name, history);

  let baseKm = 0;
  let lastServiceDate: string | null = null;
  let lastServiceKm: number | null = null;

  if (lastService && lastService.km !== null) {
    baseKm = lastService.km;
    lastServiceDate = lastService.date;
    lastServiceKm = lastService.km;
  }

  const nextDueKm = baseKm + item.every_km;
  const kmRemaining = nextDueKm - currentKm;

  if (kmRemaining <= 0) {
    // Already overdue by distance
    return {
      next_due_date: referenceDate,
      next_due_km: nextDueKm,
      last_service_date: lastServiceDate,
      last_service_km: lastServiceKm,
    };
  }

  // Estimate date when km will be reached
  const daysUntilDue = Math.ceil(kmRemaining / avgKmPerDay);
  const estimatedDate = new Date(referenceDate);
  estimatedDate.setDate(estimatedDate.getDate() + daysUntilDue);

  return {
    next_due_date: estimatedDate.toISOString().split("T")[0],
    next_due_km: nextDueKm,
    last_service_date: lastServiceDate,
    last_service_km: lastServiceKm,
  };
}

/**
 * Determine service status based on due date/distance
 */
function determineStatus(
  dueInfo: {
    next_due_date: string | null;
    next_due_km: number | null;
  },
  currentKm: number,
  referenceDate: string
): {
  status: ServiceStatus;
  days_until_due: number;
  km_until_due: number | null;
} {
  if (!dueInfo.next_due_date) {
    return {
      status: "fine",
      days_until_due: 999,
      km_until_due: null,
    };
  }

  const daysUntilDue = daysBetween(referenceDate, dueInfo.next_due_date);
  const kmUntilDue =
    dueInfo.next_due_km !== null ? dueInfo.next_due_km - currentKm : null;

  // Check if overdue
  if (daysUntilDue < 0) {
    return {
      status: "overdue",
      days_until_due: daysUntilDue,
      km_until_due: kmUntilDue,
    };
  }

  if (kmUntilDue !== null && kmUntilDue < 0) {
    return {
      status: "overdue",
      days_until_due: daysUntilDue,
      km_until_due: kmUntilDue,
    };
  }

  // Check if due soon
  if (daysUntilDue <= SERVICE_CONSTANTS.DUE_SOON_DAYS_THRESHOLD) {
    return {
      status: "due_soon",
      days_until_due: daysUntilDue,
      km_until_due: kmUntilDue,
    };
  }

  if (
    kmUntilDue !== null &&
    kmUntilDue <= SERVICE_CONSTANTS.DUE_SOON_KM_THRESHOLD
  ) {
    return {
      status: "due_soon",
      days_until_due: daysUntilDue,
      km_until_due: kmUntilDue,
    };
  }

  // Otherwise fine
  return {
    status: "fine",
    days_until_due: daysUntilDue,
    km_until_due: kmUntilDue,
  };
}

/**
 * Calculate due information for a single service item
 */
export function calculateServiceItemDue(
  item: ServiceItem,
  history: ServiceHistory[],
  currentKm: number,
  avgKmPerDay: number,
  referenceDate: string = SERVICE_CONSTANTS.REFERENCE_DATE
): ServiceItemWithDue {
  let dueInfo: {
    next_due_date: string | null;
    next_due_km: number | null;
    last_service_date: string | null;
    last_service_km: number | null;
  };

  if (isFixedDateService(item)) {
    dueInfo = calculateFixedDateDue(item, history, referenceDate);
  } else if (isPeriodService(item)) {
    dueInfo = calculatePeriodDue(item, history, referenceDate);
  } else if (isDistanceService(item)) {
    dueInfo = calculateDistanceDue(
      item,
      history,
      currentKm,
      avgKmPerDay,
      referenceDate
    );
  } else {
    throw new Error(`Unknown service rule: ${(item as any).rule}`);
  }

  const statusInfo = determineStatus(dueInfo, currentKm, referenceDate);

  return {
    item,
    next_due_date: dueInfo.next_due_date,
    next_due_km: dueInfo.next_due_km,
    status: statusInfo.status,
    days_until_due: statusInfo.days_until_due,
    km_until_due: statusInfo.km_until_due,
    last_service_date: dueInfo.last_service_date,
    last_service_km: dueInfo.last_service_km,
  };
}

/**
 * Calculate due information for all service items of a vehicle
 */
export function calculateVehicleServicesDue(
  vehicle: Vehicle,
  referenceDate: string = SERVICE_CONSTANTS.REFERENCE_DATE
): ServiceItemWithDue[] {
  const currentKm = getCurrentKm(vehicle.odometer_readings);
  const avgKmPerDay = calculateAvgKmPerDay(vehicle.odometer_readings);

  return vehicle.service_items.map((item) =>
    calculateServiceItemDue(
      item,
      vehicle.service_history,
      currentKm,
      avgKmPerDay,
      referenceDate
    )
  );
}

/**
 * Format days until due as human-readable string
 */
export function formatDaysUntilDue(days: number): string {
  if (days < 0) {
    return `${Math.abs(days)} days overdue`;
  } else if (days === 0) {
    return "Due today";
  } else if (days === 1) {
    return "Due tomorrow";
  } else {
    return `Due in ${days} days`;
  }
}

/**
 * Format km until due as human-readable string
 */
export function formatKmUntilDue(km: number | null): string {
  if (km === null) return "";

  if (km < 0) {
    return `${Math.abs(km).toLocaleString()} km overdue`;
  } else if (km === 0) {
    return "Due now";
  } else {
    return `${km.toLocaleString()} km remaining`;
  }
}

/**
 * Get status badge color class based on status
 */
export function getStatusBadgeClass(status: ServiceStatus): string {
  switch (status) {
    case "overdue":
      return "bg-destructive text-destructive-foreground";
    case "due_soon":
      return "bg-clay text-paper";
    case "fine":
      return "bg-forest text-cream";
    default:
      return "bg-muted text-muted-foreground";
  }
}

/**
 * Get status label
 */
export function getStatusLabel(status: ServiceStatus): string {
  switch (status) {
    case "overdue":
      return "Overdue";
    case "due_soon":
      return "Due Soon";
    case "fine":
      return "Fine";
    default:
      return "Unknown";
  }
}

/**
 * Calculate priority score for sorting call list
 * Higher score = more urgent
 */
export function calculatePriorityScore(
  daysOverdue: number,
  totalCost: number
): number {
  // Priority calculation:
  // - Primary factor: days overdue (negative = overdue, weighted heavily)
  // - Secondary factor: cost (to break ties)
  
  // For overdue items, use absolute value of days as base score
  // Multiply by 1000 to ensure days take precedence over cost
  const daysScore = daysOverdue < 0 ? Math.abs(daysOverdue) * 1000 : 0;
  
  // Add cost as secondary factor (normalized to 0-100 range)
  const costScore = Math.min(totalCost / 1000, 100);
  
  return daysScore + costScore;
}

/**
 * Parse cost from string to number
 */
export function parseCost(cost_bdt: string): number {
  return parseFloat(cost_bdt);
}

/**
 * Format cost for display (BDT currency)
 */
export function formatCost(cost_bdt: string | number): string {
  const amount = typeof cost_bdt === "string" ? parseCost(cost_bdt) : cost_bdt;
  return amount.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
