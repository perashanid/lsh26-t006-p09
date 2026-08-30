/**
 * API: Call List
 * Server function to generate call list
 */

import { getAllVehicles, getAllOwners, getReferenceDate, initializeDatabase } from "../data-access";
import { generateCallList, getCallListSummary } from "../call-list-builder";

export async function getCallListData() {
  try {
    // Initialize database if needed
    await initializeDatabase();

    // Fetch data
    const [vehicles, owners, referenceDate] = await Promise.all([
      getAllVehicles(),
      getAllOwners(),
      getReferenceDate(),
    ]);

    // Generate call list
    const callList = generateCallList(vehicles, owners, referenceDate);
    const summary = getCallListSummary(callList);

    return {
      callList,
      summary,
      referenceDate,
    };
  } catch (error) {
    console.error("Error generating call list:", error);
    throw new Error("Failed to generate call list");
  }
}
