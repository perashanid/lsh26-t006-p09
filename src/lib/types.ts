/**
 * Type definitions for P09 Vehicle Service Due Predictor
 * Based on P09_vehicle_service_public.json schema
 */

// ============================================================================
// Core Domain Types
// ============================================================================

/**
 * Vehicle owner with contact information
 */
export interface Owner {
  id: string;
  name: string;
  phone: string;
}

/**
 * Odometer reading at a specific date
 */
export interface OdometerReading {
  date: string; // YYYY-MM-DD format
  km: number;
}

/**
 * Service rule types
 */
export type ServiceRule = "fixed_date" | "period_months" | "distance_km";

/**
 * Base service item structure
 */
interface BaseServiceItem {
  name: string;
  cost_bdt: string; // Stored as string to preserve decimal precision
  rule: ServiceRule;
}

/**
 * Service item with fixed due date (e.g., insurance, fitness certificate)
 */
export interface FixedDateServiceItem extends BaseServiceItem {
  rule: "fixed_date";
  due_date: string; // YYYY-MM-DD format
}

/**
 * Service item due after a time period (e.g., engine oil every 3 months)
 */
export interface PeriodServiceItem extends BaseServiceItem {
  rule: "period_months";
  every_months: number;
}

/**
 * Service item due after distance traveled (e.g., brake pads every 10,000 km)
 */
export interface DistanceServiceItem extends BaseServiceItem {
  rule: "distance_km";
  every_km: number;
}

/**
 * Union type for all service item types
 */
export type ServiceItem =
  | FixedDateServiceItem
  | PeriodServiceItem
  | DistanceServiceItem;

/**
 * Historical service record
 */
export interface ServiceHistory {
  item: string; // Name of the service item
  date: string; // YYYY-MM-DD format when service was performed
  km: number | null; // Odometer reading at service time (null for time-based services)
  cost_bdt: string; // Actual cost paid
}

/**
 * Vehicle with all related data
 */
export interface Vehicle {
  id: string;
  owner_id: string;
  model: string; // e.g., "Toyota Axio"
  plate: string; // License plate e.g., "Dhaka Metro Ga 12-3456"
  odometer_readings: OdometerReading[];
  service_items: ServiceItem[];
  service_history: ServiceHistory[];
}

// ============================================================================
// Computed/Derived Types (for display and business logic)
// ============================================================================

/**
 * Service status classification
 */
export type ServiceStatus = "overdue" | "due_soon" | "fine";

/**
 * Service item with computed next due information
 */
export interface ServiceItemWithDue {
  item: ServiceItem;
  next_due_date: string | null; // Calculated due date (YYYY-MM-DD), null if insufficient data
  next_due_km: number | null; // For distance-based items, the km at which service is due
  status: ServiceStatus;
  days_until_due: number; // Negative if overdue
  km_until_due: number | null; // For distance-based items, negative if overdue
  last_service_date: string | null; // Most recent service date for this item
  last_service_km: number | null; // Most recent service km for this item
}

/**
 * Vehicle with owner info and computed service status
 */
export interface VehicleWithOwner extends Vehicle {
  owner: Owner;
  current_km: number; // Latest odometer reading
  avg_km_per_day: number; // Calculated average daily distance
  services_with_due: ServiceItemWithDue[];
  total_overdue_count: number;
  total_due_soon_count: number;
}

/**
 * Call list entry - prioritized vehicle needing service
 */
export interface CallListEntry {
  vehicle_id: string;
  owner_name: string;
  owner_phone: string;
  vehicle_model: string;
  vehicle_plate: string;
  current_km: number;
  overdue_items: ServiceItemWithDue[];
  due_soon_items: ServiceItemWithDue[];
  total_cost: number; // Sum of costs for overdue and due soon items
  priority_score: number; // For sorting: higher = more urgent
  most_urgent_days_overdue: number; // Most overdue item's days count
}

// ============================================================================
// API Request/Response Types
// ============================================================================

/**
 * Request to record a completed service
 */
export interface RecordServiceRequest {
  vehicle_id: string;
  service_item_name: string;
  service_date: string; // YYYY-MM-DD
  odometer_km?: number; // Required for distance-based services
  actual_cost_bdt: string;
}

/**
 * Response after recording a service
 */
export interface RecordServiceResponse {
  success: boolean;
  message: string;
  updated_vehicle?: VehicleWithOwner;
}

/**
 * Case data structure (matches P09 JSON format)
 */
export interface CaseData {
  case_id: string;
  today: string; // Reference date for calculations (YYYY-MM-DD)
  owners: Owner[];
  vehicles: Vehicle[];
}

// ============================================================================
// Database Models (MongoDB collections)
// ============================================================================

/**
 * MongoDB document for owners collection
 */
export interface OwnerDocument extends Owner {
  _id?: string; // MongoDB ObjectId
  created_at?: Date;
  updated_at?: Date;
}

/**
 * MongoDB document for vehicles collection
 */
export interface VehicleDocument extends Vehicle {
  _id?: string; // MongoDB ObjectId
  created_at?: Date;
  updated_at?: Date;
}

/**
 * MongoDB document for system settings (stores reference date, etc.)
 */
export interface SystemSettings {
  _id?: string;
  reference_date: string; // The "today" value from case data (YYYY-MM-DD)
  updated_at?: Date;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Type guard for fixed date service items
 */
export function isFixedDateService(
  item: ServiceItem
): item is FixedDateServiceItem {
  return item.rule === "fixed_date";
}

/**
 * Type guard for period-based service items
 */
export function isPeriodService(item: ServiceItem): item is PeriodServiceItem {
  return item.rule === "period_months";
}

/**
 * Type guard for distance-based service items
 */
export function isDistanceService(
  item: ServiceItem
): item is DistanceServiceItem {
  return item.rule === "distance_km";
}

/**
 * Constants for business logic
 */
export const SERVICE_CONSTANTS = {
  DUE_SOON_DAYS_THRESHOLD: 14, // Items due within 14 days are "due soon"
  DUE_SOON_KM_THRESHOLD: 500, // Items due within 500 km are "due soon"
  DEFAULT_KM_PER_DAY: 30, // Default assumption if only one odometer reading exists
  REFERENCE_DATE: "2026-08-30", // Default reference date from P09 case data
} as const;

/**
 * Parse cost from string to number
 */
export function parseCost(cost_bdt: string): number {
  return parseFloat(cost_bdt);
}

/**
 * Format cost for display
 */
export function formatCost(cost_bdt: string | number): string {
  const amount = typeof cost_bdt === "string" ? parseCost(cost_bdt) : cost_bdt;
  return amount.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
