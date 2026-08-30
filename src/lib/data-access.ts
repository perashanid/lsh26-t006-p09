/**
 * Data Access Layer
 * CRUD operations for owners, vehicles, and system settings
 * Uses in-memory storage (can be extended with MongoDB or other backends)
 */

import type { Owner, Vehicle, ServiceHistory } from "./types";
import { getSeedData } from "./seed-data";

// In-memory storage
let inMemoryData: {
  owners: Owner[];
  vehicles: Vehicle[];
  settings: { reference_date: string };
  initialized: boolean;
} = {
  owners: [],
  vehicles: [],
  settings: { reference_date: "2026-08-30" },
  initialized: false,
};

/**
 * Initialize database with seed data
 */
export async function initializeDatabase(): Promise<void> {
  if (inMemoryData.initialized) {
    console.log("Database already initialized");
    return;
  }

  console.log("Initializing database with seed data...");
  const seedData = getSeedData();
  inMemoryData.owners = [...seedData.owners];
  inMemoryData.vehicles = [...seedData.vehicles];
  inMemoryData.settings.reference_date = seedData.today;
  inMemoryData.initialized = true;
  console.log(
    `Database initialized: ${inMemoryData.owners.length} owners, ${inMemoryData.vehicles.length} vehicles`
  );
}

/**
 * Get all owners
 */
export async function getAllOwners(): Promise<Owner[]> {
  return [...inMemoryData.owners];
}

/**
 * Get owner by ID
 */
export async function getOwnerById(id: string): Promise<Owner | null> {
  return inMemoryData.owners.find((owner) => owner.id === id) || null;
}

/**
 * Get all vehicles
 */
export async function getAllVehicles(): Promise<Vehicle[]> {
  return [...inMemoryData.vehicles];
}

/**
 * Get vehicle by ID
 */
export async function getVehicleById(id: string): Promise<Vehicle | null> {
  return inMemoryData.vehicles.find((vehicle) => vehicle.id === id) || null;
}

/**
 * Get vehicles by owner ID
 */
export async function getVehiclesByOwnerId(owner_id: string): Promise<Vehicle[]> {
  return inMemoryData.vehicles.filter((vehicle) => vehicle.owner_id === owner_id);
}

/**
 * Record a completed service for a vehicle
 */
export async function recordCompletedService(
  vehicle_id: string,
  serviceRecord: ServiceHistory
): Promise<Vehicle | null> {
  const vehicleIndex = inMemoryData.vehicles.findIndex((v) => v.id === vehicle_id);
  if (vehicleIndex === -1) return null;

  inMemoryData.vehicles[vehicleIndex].service_history.push(serviceRecord);
  return { ...inMemoryData.vehicles[vehicleIndex] };
}

/**
 * Add odometer reading to vehicle
 */
export async function addOdometerReading(
  vehicle_id: string,
  reading: { date: string; km: number }
): Promise<Vehicle | null> {
  const vehicleIndex = inMemoryData.vehicles.findIndex((v) => v.id === vehicle_id);
  if (vehicleIndex === -1) return null;

  // Check if reading already exists for this date
  const existingReadingIndex = inMemoryData.vehicles[
    vehicleIndex
  ].odometer_readings.findIndex((r) => r.date === reading.date);

  if (existingReadingIndex >= 0) {
    // Update existing reading
    inMemoryData.vehicles[vehicleIndex].odometer_readings[existingReadingIndex] = reading;
  } else {
    // Add new reading
    inMemoryData.vehicles[vehicleIndex].odometer_readings.push(reading);
  }

  return { ...inMemoryData.vehicles[vehicleIndex] };
}

/**
 * Get system reference date
 */
export async function getReferenceDate(): Promise<string> {
  return inMemoryData.settings.reference_date;
}

/**
 * Health check - verify database connection
 */
export async function healthCheck(): Promise<boolean> {
  return true;
}
