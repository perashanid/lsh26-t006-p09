import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ServiceItemWithDue, RecordServiceRequest } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import {
  getVehicleById,
  recordCompletedService,
  addOdometerReading,
} from "@/lib/data-access";

interface RecordServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleId: string;
  service: ServiceItemWithDue;
  currentKm: number;
}

async function recordServiceMutation(request: RecordServiceRequest): Promise<void> {
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
  } catch (error) {
    console.error("Error recording service:", error);
    throw error;
  }
}

export function RecordServiceDialog({
  open,
  onOpenChange,
  vehicleId,
  service,
  currentKm,
}: RecordServiceDialogProps) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: recordServiceMutation,
    onSuccess: () => {
      // Invalidate and refetch vehicle data
      queryClient.invalidateQueries({ queryKey: ['vehicle', vehicleId] });
      queryClient.invalidateQueries({ queryKey: ['callList'] });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const isDistanceBased = service.item.rule === "distance_km";
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    service_date: today,
    odometer_km: currentKm.toString(),
    actual_cost_bdt: service.item.cost_bdt,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Validate
      if (!formData.service_date) {
        throw new Error("Service date is required");
      }

      if (isDistanceBased && !formData.odometer_km) {
        throw new Error("Odometer reading is required for distance-based services");
      }

      const odometerKm = formData.odometer_km ? parseInt(formData.odometer_km, 10) : undefined;

      if (odometerKm !== undefined && odometerKm < 0) {
        throw new Error("Odometer reading cannot be negative");
      }

      if (odometerKm !== undefined && odometerKm < currentKm) {
        // Allow but warn
        if (!confirm(`Odometer reading (${odometerKm} km) is lower than current reading (${currentKm} km). This may indicate odometer rollover. Continue?`)) {
          return;
        }
      }

      const actualCost = parseFloat(formData.actual_cost_bdt);
      if (isNaN(actualCost) || actualCost < 0) {
        throw new Error("Valid cost is required");
      }

      const request: RecordServiceRequest = {
        vehicle_id: vehicleId,
        service_item_name: service.item.name,
        service_date: formData.service_date,
        odometer_km: odometerKm,
        actual_cost_bdt: actualCost.toFixed(2),
      };

      mutation.mutate(request);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to record service");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-paper sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-ink">
            Record Service: {service.item.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-destructive bg-destructive/10 p-3">
              <AlertCircle className="size-5 flex-shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="service_date" className="text-ink">
              Service Date <span className="text-destructive">*</span>
            </Label>
            <Input
              id="service_date"
              type="date"
              value={formData.service_date}
              onChange={(e) =>
                setFormData({ ...formData, service_date: e.target.value })
              }
              max={today}
              required
              className="bg-cream"
            />
            <p className="text-xs text-muted-foreground">
              Date when service was performed
            </p>
          </div>

          {isDistanceBased && (
            <div className="space-y-2">
              <Label htmlFor="odometer_km" className="text-ink">
                Odometer Reading (km) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="odometer_km"
                type="number"
                value={formData.odometer_km}
                onChange={(e) =>
                  setFormData({ ...formData, odometer_km: e.target.value })
                }
                min="0"
                required
                className="bg-cream"
              />
              <p className="text-xs text-muted-foreground">
                Current: {currentKm.toLocaleString()} km
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="actual_cost_bdt" className="text-ink">
              Actual Cost (৳) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="actual_cost_bdt"
              type="number"
              step="0.01"
              value={formData.actual_cost_bdt}
              onChange={(e) =>
                setFormData({ ...formData, actual_cost_bdt: e.target.value })
              }
              min="0"
              required
              className="bg-cream"
            />
            <p className="text-xs text-muted-foreground">
              Estimated: ৳{service.item.cost_bdt}
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={mutation.isPending}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1 bg-forest text-cream hover:bg-forest-deep"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Recording...
                </>
              ) : (
                "Record Service"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
