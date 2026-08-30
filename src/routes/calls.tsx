import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useReveal } from "@/hooks/use-reveal";
import type { CallListEntry } from "@/lib/types";
import { formatCost, formatDaysUntilDue, getStatusLabel } from "@/lib/service-calculator";
import { AlertCircle, ArrowUpRight, ArrowUp, ArrowDown } from "lucide-react";
import {
  getAllVehicles,
  getAllOwners,
  getReferenceDate,
  initializeDatabase,
} from "@/lib/data-access";
import { generateCallList } from "@/lib/call-list-builder";

async function fetchCallList(): Promise<{
  callList: CallListEntry[];
  referenceDate: string;
}> {
  await initializeDatabase();
  const [vehicles, owners, referenceDate] = await Promise.all([
    getAllVehicles(),
    getAllOwners(),
    getReferenceDate(),
  ]);
  return { callList: generateCallList(vehicles, owners, referenceDate), referenceDate };
}

export const Route = createFileRoute("/calls")({
  component: CallListPage,
});

type SortKey = "urgency" | "revenue" | "owner" | "items";
type SortDir = "asc" | "desc";

const SORT_OPTIONS: { key: SortKey; label: string; defaultDir: SortDir }[] = [
  { key: "urgency", label: "Urgency", defaultDir: "desc" },
  { key: "revenue", label: "Revenue", defaultDir: "desc" },
  { key: "owner",   label: "Owner",   defaultDir: "asc"  },
  { key: "items",   label: "Items",   defaultDir: "desc" },
];

function sortList(list: CallListEntry[], key: SortKey, dir: SortDir): CallListEntry[] {
  const sorted = [...list].sort((a, b) => {
    switch (key) {
      case "urgency": return b.priority_score - a.priority_score;
      case "revenue": return b.total_cost - a.total_cost;
      case "owner":   return a.owner_name.localeCompare(b.owner_name);
      case "items":   return (b.overdue_items.length + b.due_soon_items.length) - (a.overdue_items.length + a.due_soon_items.length);
    }
  });
  return dir === "asc" ? sorted : (key === "owner" ? sorted.reverse() : sorted);
}

function CallListPage() {
  const [sortKey, setSortKey] = useState<SortKey>("urgency");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["callList"],
    queryFn: fetchCallList,
  });

  const sortedList = useMemo(() => {
    if (!data) return [];
    return sortList(data.callList, sortKey, sortDir);
  }, [data, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      // toggle direction
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      // switch to new key with its default direction
      const opt = SORT_OPTIONS.find((o) => o.key === key)!;
      setSortKey(key);
      setSortDir(opt.defaultDir);
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto size-8 animate-spin rounded-full border-2 border-forest border-t-transparent" />
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Building call list…
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-10">
        <div>
          <AlertCircle className="size-8 text-destructive" />
          <h2 className="mt-4 text-xl font-bold text-ink">Failed to load</h2>
          <p className="mt-1 text-sm text-muted-foreground">{(error as Error).message}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 border-b border-forest pb-px text-sm font-medium text-forest"
          >
            Retry →
          </button>
        </div>
      </div>
    );
  }

  const { callList, referenceDate } = data!;
  const overdueCount = callList.reduce((s, e) => s + e.overdue_items.length, 0);
  const dueSoonCount = callList.reduce((s, e) => s + e.due_soon_items.length, 0);
  const revenue = callList.reduce((s, e) => s + e.total_cost, 0);

  return (
    <div className="min-h-screen">
      {/* ── Sticky header ───────────────────────────────── */}
      <div className="sticky top-0 z-40 border-b border-border bg-cream/95 backdrop-blur-sm">
        {/* Top row: title + live stats */}
        <div className="flex items-center justify-between px-8 py-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
              Daily Call List · {referenceDate}
            </div>
            <h1 className="mt-0.5 font-display text-2xl font-bold uppercase text-ink">
              {callList.length} Vehicles to Call
            </h1>
          </div>
          <div className="hidden items-center gap-8 sm:flex">
            <div className="text-right">
              <div className="font-mono text-xl font-bold text-destructive">{overdueCount}</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Overdue</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-xl font-bold text-clay">{dueSoonCount}</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Due Soon</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-xl font-bold text-forest">৳{Math.round(revenue / 1000)}k</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Revenue</div>
            </div>
          </div>
        </div>

        {/* Sort bar */}
        <div className="flex items-center gap-0 border-t border-border">
          <span className="border-r border-border px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Sort
          </span>
          {SORT_OPTIONS.map(({ key, label }) => {
            const active = sortKey === key;
            return (
              <button
                key={key}
                onClick={() => handleSort(key)}
                className={`group flex items-center gap-1.5 border-r border-border px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-100 ${
                  active
                    ? "bg-ink text-cream"
                    : "text-muted-foreground hover:bg-cream-deep hover:text-ink"
                }`}
              >
                {label}
                {active ? (
                  sortDir === "desc" ? (
                    <ArrowDown className="size-3" />
                  ) : (
                    <ArrowUp className="size-3" />
                  )
                ) : (
                  <span className="size-3 opacity-0 group-hover:opacity-30">
                    <ArrowDown className="size-3" />
                  </span>
                )}
              </button>
            );
          })}
          <div className="ml-auto px-4 py-2.5 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            {sortedList.length} results
          </div>
        </div>
      </div>

      {/* ── Empty state ─────────────────────────────────── */}
      {callList.length === 0 && (
        <div className="flex min-h-[60vh] items-center justify-center p-10">
          <div className="reveal text-center">
            <div className="font-display text-[6rem] font-bold leading-none text-cream-deep">✓</div>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase text-ink">All Clear</h2>
            <p className="mt-2 text-sm text-muted-foreground">No vehicles need attention today.</p>
          </div>
        </div>
      )}

      {/* ── List ────────────────────────────────────────── */}
      <div className="divide-y divide-border">
        {sortedList.map((entry, idx) => (
          <CallRow key={entry.vehicle_id} entry={entry} rank={idx + 1} staggerIdx={idx} />
        ))}
      </div>
    </div>
  );
}

function CallRow({ entry, rank, staggerIdx }: { entry: CallListEntry; rank: number; staggerIdx: number }) {
  const isUrgent = entry.overdue_items.length > 0;
  const allItems = [...entry.overdue_items, ...entry.due_soon_items];
  const rowRef = useReveal<HTMLElement>({ threshold: 0.04, rootMarginBottom: 20 });

  return (
    <article
      ref={rowRef}
      style={{ "--reveal-delay": `${Math.min(staggerIdx * 45, 320)}ms` } as React.CSSProperties}
      className={`reveal group transition-colors duration-150 hover:bg-cream-deep ${
        isUrgent
          ? "border-l-2 border-l-destructive"
          : "border-l-2 border-l-transparent hover:border-l-clay"
      }`}
    >
      <div className="px-8 py-7">
        {/* Row header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-baseline gap-5">
            <span className="w-8 shrink-0 font-mono text-[11px] font-bold text-muted-foreground">
              {String(rank).padStart(2, "0")}
            </span>
            <div>
              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="font-display text-2xl font-bold uppercase text-ink">
                  {entry.owner_name}
                </h2>
                {isUrgent && (
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-destructive">
                    {entry.most_urgent_days_overdue}d overdue
                  </span>
                )}
              </div>
              <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                <a href={`tel:${entry.owner_phone}`} className="hover:text-forest">
                  {entry.owner_phone}
                </a>
                <span>{entry.vehicle_model}</span>
                <span className="font-mono">{entry.vehicle_plate}</span>
                <span>{entry.current_km.toLocaleString()} km</span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-6">
            <div className="text-right">
              <div className="font-display text-2xl font-bold text-forest">
                ৳{formatCost(entry.total_cost)}
              </div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                {allItems.length} item{allItems.length !== 1 ? "s" : ""}
              </div>
            </div>
            <Link
              to={`/vehicles/${entry.vehicle_id}`}
              className="flex items-center gap-1.5 border border-forest px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-forest transition-all duration-150 hover:bg-forest hover:text-cream"
            >
              Record
              <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </div>

        {/* Service items */}
        <div className="mt-4 grid gap-2 pl-[52px] sm:grid-cols-2 lg:grid-cols-3">
          {allItems.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between border px-4 py-2.5 ${
                item.status === "overdue"
                  ? "border-destructive/30 bg-destructive/5"
                  : "border-border"
              }`}
            >
              <div className="min-w-0 pr-3">
                <div className="truncate text-[11px] font-bold uppercase tracking-[0.1em] text-ink">
                  {item.item.name}
                </div>
                <div
                  className={`mt-0.5 text-[10px] uppercase tracking-[0.1em] ${
                    item.status === "overdue" ? "text-destructive" : "text-muted-foreground"
                  }`}
                >
                  {formatDaysUntilDue(item.days_until_due)}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[11px] font-bold text-ink">
                  ৳{formatCost(item.item.cost_bdt)}
                </div>
                <div
                  className={`text-[9px] font-bold uppercase tracking-[0.15em] ${
                    item.status === "overdue" ? "text-destructive" : "text-clay"
                  }`}
                >
                  {getStatusLabel(item.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
