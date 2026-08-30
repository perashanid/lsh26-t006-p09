import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import type { VehicleWithOwner, ServiceItemWithDue } from "@/lib/types";
import {
  formatCost,
  formatDaysUntilDue,
  formatKmUntilDue,
  getStatusLabel,
} from "@/lib/service-calculator";
import {
  getVehicleById,
  getOwnerById,
  recordCompletedService,
  addOdometerReading,
  getReferenceDate,
  initializeDatabase,
} from "@/lib/data-access";
import { buildVehicleWithOwner } from "@/lib/call-list-builder";
import type { RecordServiceRequest } from "@/lib/types";
import { ArrowLeft, Wrench } from "lucide-react";
import { RecordServiceDialog } from "@/components/record-service-dialog";

async function fetchVehicleData(vehicleId: string): Promise<VehicleWithOwner> {
  await initializeDatabase();
  const vehicle = await getVehicleById(vehicleId);
  if (!vehicle) throw new Error("Vehicle not found");
  const owner = await getOwnerById(vehicle.owner_id);
  if (!owner) throw new Error("Owner not found");
  const referenceDate = await getReferenceDate();
  return buildVehicleWithOwner(vehicle, owner, referenceDate);
}

async function submitService(request: RecordServiceRequest): Promise<void> {
  const vehicle = await getVehicleById(request.vehicle_id);
  if (!vehicle) throw new Error("Vehicle not found");
  const serviceItem = vehicle.service_items.find(
    (item) => item.name === request.service_item_name
  );
  if (!serviceItem) throw new Error("Service item not found");
  if (serviceItem.rule === "distance_km" && request.odometer_km === undefined)
    throw new Error("Odometer reading required for distance-based services");
  await recordCompletedService(request.vehicle_id, {
    item: request.service_item_name,
    date: request.service_date,
    km: request.odometer_km ?? null,
    cost_bdt: request.actual_cost_bdt,
  });
  if (request.odometer_km !== undefined) {
    await addOdometerReading(request.vehicle_id, {
      date: request.service_date,
      km: request.odometer_km,
    });
  }
}

export const Route = createFileRoute("/vehicles/$id")({
  component: VehicleDetailsPage,
});

const STATUS_META = {
  overdue: { label: "Overdue", textClass: "text-destructive", borderClass: "border-l-destructive" },
  due_soon: { label: "Due Soon", textClass: "text-clay", borderClass: "border-l-clay" },
  fine: { label: "Fine", textClass: "text-forest", borderClass: "border-l-forest/30" },
};

/* ── ServiceItemRow — own reveal ref ──────────────────────────── */
function ServiceItemRow({
  service,
  idx,
  onRecord,
}: {
  service: ServiceItemWithDue;
  idx: number;
  onRecord: () => void;
}) {
  const meta = STATUS_META[service.status];
  const ref = useReveal<HTMLDivElement>({ threshold: 0.03, rootMarginBottom: 16 });

  return (
    <div
      ref={ref}
      style={{ "--reveal-delay": `${Math.min(idx * 40, 280)}ms` } as React.CSSProperties}
      className={`reveal group flex items-start justify-between gap-4 border-l-2 px-8 py-5 transition-colors duration-150 hover:bg-cream-deep ${meta.borderClass}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-sm font-bold uppercase tracking-[0.1em] text-ink">
            {service.item.name}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${meta.textClass}`}>
            {meta.label}
          </span>
          <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            {service.item.rule.replace(/_/g, " ")}
          </span>
        </div>

        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          {service.next_due_date && (
            <span className={service.status === "overdue" ? "text-destructive font-medium" : ""}>
              {formatDaysUntilDue(service.days_until_due)} · {service.next_due_date}
            </span>
          )}
          {service.km_until_due !== null && (
            <span>
              {service.next_due_km?.toLocaleString()} km · {formatKmUntilDue(service.km_until_due)}
            </span>
          )}
          {service.last_service_date && (
            <span>
              Last: {service.last_service_date}
              {service.last_service_km !== null
                ? ` @ ${service.last_service_km.toLocaleString()} km`
                : ""}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <div className="text-right">
          <div className="text-sm font-bold text-ink">৳{formatCost(service.item.cost_bdt)}</div>
        </div>
        <button
          onClick={onRecord}
          className="flex items-center gap-1.5 border border-forest px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-forest opacity-0 transition-all duration-150 group-hover:opacity-100 hover:bg-forest hover:text-cream"
        >
          <Wrench className="size-3" />
          Record
        </button>
      </div>
    </div>
  );
}

function VehicleDetailsPage() {
  const { id } = Route.useParams();
  const queryClient = useQueryClient();
  const [selectedService, setSelectedService] = useState<ServiceItemWithDue | null>(null);

  const { data: v, isLoading, error } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => fetchVehicleData(id),
  });

  const mutation = useMutation({
    mutationFn: submitService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicle", id] });
      queryClient.invalidateQueries({ queryKey: ["callList"] });
      queryClient.invalidateQueries({ queryKey: ["home-stats"] });
      setSelectedService(null);
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-forest border-t-transparent" />
      </div>
    );
  }

  if (error || !v) {
    return (
      <div className="flex min-h-screen items-center justify-center p-10">
        <div>
          <h2 className="text-xl font-bold text-ink">Vehicle not found</h2>
          <Link to="/calls" className="mt-4 inline-block border-b border-forest pb-px text-sm text-forest">
            ← Back to call list
          </Link>
        </div>
      </div>
    );
  }

  // sort: overdue first, then due_soon, then fine; within group by cost desc
  const sorted = [...v.services_with_due].sort((a, b) => {
    const order = { overdue: 0, due_soon: 1, fine: 2 };
    if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
    return parseFloat(b.item.cost_bdt) - parseFloat(a.item.cost_bdt);
  });

  const overdueCount = v.services_with_due.filter(s => s.status === "overdue").length;
  const dueSoonCount = v.services_with_due.filter(s => s.status === "due_soon").length;

  return (
    <div className="min-h-screen">
      {/* ── Sticky header ───────────────────────────────── */}
      <div className="sticky top-0 z-40 flex items-center gap-4 border-b border-border bg-cream/95 px-8 py-4 backdrop-blur-sm">
        <Link
          to="/calls"
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-forest"
        >
          <ArrowLeft className="size-3" />
          Calls
        </Link>
        <span className="text-border">/</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
          {v.model}
        </span>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px]">
        {/* ── LEFT: vehicle + services ─────────────────── */}
        <div className="border-r border-border">
          {/* Vehicle identity block */}
          <div className="border-b border-border px-8 py-10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                  {v.plate}
                </div>
                <h1 className="mt-1 font-display text-4xl font-bold uppercase text-ink sm:text-5xl">
                  {v.model}
                </h1>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  <span className="font-medium text-ink">{v.owner.name}</span>
                  <a href={`tel:${v.owner.phone}`} className="hover:text-forest">
                    {v.owner.phone}
                  </a>
                  <span>{v.current_km.toLocaleString()} km</span>
                  <span>{v.avg_km_per_day.toFixed(0)} km/day avg</span>
                </div>
              </div>

              <div className="flex gap-6">
                {overdueCount > 0 && (
                  <div className="text-right">
                    <div className="font-mono text-3xl font-bold text-destructive">{overdueCount}</div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Overdue</div>
                  </div>
                )}
                {dueSoonCount > 0 && (
                  <div className="text-right">
                    <div className="font-mono text-3xl font-bold text-clay">{dueSoonCount}</div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Due Soon</div>
                  </div>
                )}
                {overdueCount === 0 && dueSoonCount === 0 && (
                  <div className="text-right">
                    <div className="font-mono text-3xl font-bold text-forest">✓</div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">All Fine</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Service items */}
          <div className="divide-y divide-border">
            {sorted.map((service, idx) => (
              <ServiceItemRow
                key={idx}
                service={service}
                idx={idx}
                onRecord={() => setSelectedService(service)}
              />
            ))}
          </div>
        </div>

        {/* ── RIGHT: service history ───────────────────── */}
        <div className="sticky top-[57px] self-start">
          <div className="border-b border-border px-6 py-4">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink">
                Service History
              </h2>
              <span className="font-mono text-[10px] text-muted-foreground">
                {v.service_history.length} records
              </span>
            </div>
          </div>

          {v.service_history.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                No records yet
              </p>
            </div>
          ) : (
            <div className="max-h-[calc(100vh-120px)] divide-y divide-border overflow-y-auto">
              {[...v.service_history]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((record, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-3 px-6 py-4 hover:bg-cream-deep transition-colors">
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink truncate">
                        {record.item}
                      </div>
                      <div className="mt-0.5 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                        {record.date}
                        {record.km !== null && <span className="ml-2 font-mono">{record.km.toLocaleString()} km</span>}
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-[11px] font-bold text-ink">৳{formatCost(record.cost_bdt)}</div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Record service dialog */}
      {selectedService && (
        <RecordServiceDialog
          open={true}
          onOpenChange={(open) => { if (!open) setSelectedService(null); }}
          vehicleId={v.id}
          service={selectedService}
          currentKm={v.current_km}
        />
      )}
    </div>
  );
}
