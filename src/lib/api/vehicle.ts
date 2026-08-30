/**
 * API: Vehicle Operations
 * Server functions for vehicle details and service recording
 */

import {
  getVehicleById,
  getOwnerById,
  recordCompletedService,
  addOdometerReading,
  getReferenceDate,
  initializeDatabase,
} from "../data-access";
import { buildVehicleWithOwner } from "../call-list-builder";
import type { VehicleWithOwner, RecordServiceRequest } from "../types";

export async function getVehicleWithOwnerData(
  vehicleId: string
): Promise<VehicleWithOwner | null> {
  try {
    // Initialize database if needed
    await initializeDatabase();

    const vehicle = await getVehicleById(vehicleId);
    if (!vehicle) return null;

    const owner = await getOwnerById(vehicle.owner_id);
    if (!owner) return null;

    const referenceDate = await getReferenceDate();

    const vehicleWithOwner = buildVehicleWithOwner(vehicle, owner, referenceDate);

    return vehicleWithOwner;
  } catch (error) {
    console.error("Error fetching vehicle details:", error);
    throw new Error("Failed to load vehicle details");
  }
}

export async function recordService(request: RecordServiceRequest): Promise<VehicleWithOwner> {
  try {
    // Validate request
    if (!request.vehicle_id || !request.service_item_name || !request.service_date) {
      throw new Error("Missing required fields");
    }

    // Get vehicle to find the service item
    const vehicle = await getVehicleById(request.vehicle_id);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    // Find the service item to check if it's distance-based
    const serviceItem = vehicle.service_items.find(
      (item) => item.name === request.service_item_name
    );

    if (!serviceItem) {
      throw new Error("Service item not found");
    }

    // For distance-based services, odometer is required
    if (serviceItem.rule === "distance_km" && request.odometer_km === undefined) {
      throw new Error("Odometer reading required for distance-based services");
    }

    // Record the service
    const serviceRecord = {
      item: request.service_item_name,
      date: request.service_date,
      km: request.odometer_km ?? null,
      cost_bdt: request.actual_cost_bdt,
    };

    await recordCompletedService(request.vehicle_id, serviceRecord);

    // If odometer reading provided, add it to readings
    if (request.odometer_km !== undefined) {
      await addOdometerReading(request.vehicle_id, {
        date: request.service_date,
        km: request.odometer_km,
      });
    }

    // Fetch updated vehicle data
    const updatedVehicleWithOwner = await getVehicleWithOwnerData(request.vehicle_id);
    if (!updatedVehicleWithOwner) {
      throw new Error("Failed to fetch updated vehicle data");
    }

    return updatedVehicleWithOwner;
  } catch (error) {
    console.error("Error recording service:", error);
    throw error;
  }
}
