import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  getAllVehicles,
  getAllOwners,
  getReferenceDate,
  initializeDatabase,
} from "@/lib/data-access";
import { generateCallList } from "@/lib/call-list-builder";
import { ArrowUpRight } from "lucide-react";
import { useReveal, useRevealGroup } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  component: HomePage,
});

async function fetchStats() {
  await initializeDatabase();
  const [vehicles, owners, referenceDate] = await Promise.all([
    getAllVehicles(),
    getAllOwners(),
    getReferenceDate(),
  ]);
  const callList = generateCallList(vehicles, owners, referenceDate);
  return {
    vehicles: vehicles.length,
    owners: owners.length,
    callList: callList.length,
    overdue: callList.reduce((s, e) => s + e.overdue_items.length, 0),
    dueSoon: callList.reduce((s, e) => s + e.due_soon_items.length, 0),
    revenue: callList.reduce((s, e) => s + e.total_cost, 0),
    referenceDate,
  };
}

function pad(n: number | undefined) {
  return n !== undefined ? String(n).padStart(3, "0") : "···";
}

function HomePage() {
  const { data: s } = useQuery({ queryKey: ["home-stats"], queryFn: fetchStats });

  // Section reveal refs
  const heroTextRef   = useReveal<HTMLDivElement>({ rootMarginBottom: 0 });
  const statGridRef   = useRevealGroup<HTMLDivElement>(80);
  const rulesRef      = useRevealGroup<HTMLElement>(70);
  const stepsRef      = useRevealGroup<HTMLElement>(60);
  const ctaRef        = useReveal<HTMLElement>();

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── HERO — split screen ──────────────────────────── */}
      <section className="flex flex-col lg:flex-row flex-1 min-h-screen">

        {/* Left — dark, editorial */}
        <div className="relative flex flex-col justify-between bg-forest p-10 lg:w-[55%] lg:p-16 xl:p-20">
          {/* eyebrow */}
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-lime" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-lime/80">
              P09 · Kiro Hackathon 2026
            </span>
          </div>

          {/* Giant headline */}
          <div ref={heroTextRef} className="reveal my-auto py-16">
            <h1 className="font-display text-[clamp(4rem,9vw,8rem)] font-bold uppercase leading-[0.88] tracking-tight text-cream">
              Know<br />
              Before<br />
              <span className="text-lime">They<br />Ask.</span>
            </h1>

            <p className="mt-8 max-w-sm text-base leading-relaxed text-cream/60">
              Service prediction for vehicle workshops.
              Calculates every due date — fixed, periodic, distance-based —
              and surfaces who to call today.
            </p>

            <div className="mt-10">
              <Link
                to="/calls"
                className="group inline-flex items-center gap-3 border border-lime/40 bg-lime/10 px-6 py-4 text-sm font-bold uppercase tracking-[0.15em] text-lime transition-all duration-200 hover:bg-lime hover:text-forest"
              >
                Open Today's Call List
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Bottom — date stamp */}
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-cream/20" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/30">
              Ref. {s?.referenceDate ?? "2026-08-30"}
            </span>
          </div>
        </div>

        {/* Right — cream, stat grid */}
        <div className="flex flex-col lg:w-[45%]">
          {/* 2 × 2 stat grid */}
          <div ref={statGridRef} className="grid flex-1 grid-cols-2 divide-x divide-y divide-border">
            {[
              { value: pad(s?.vehicles), label: "Vehicles", sub: "tracked" },
              { value: pad(s?.owners), label: "Owners", sub: "registered" },
              { value: pad(s?.overdue), label: "Overdue", sub: "items today", urgent: true },
              { value: pad(s?.callList), label: "On Call List", sub: "vehicles" },
            ].map(({ value, label, sub, urgent }) => (
              <div
                key={label}
                className="reveal-scale flex flex-col justify-end p-8 transition-colors duration-150 hover:bg-cream-deep"
              >
                <div
                  className={`font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-none tabular-nums ${
                    urgent ? "text-destructive" : "text-ink"
                  }`}
                >
                  {value}
                </div>
                <div className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-ink">
                  {label}
                </div>
                <div className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {sub}
                </div>
              </div>
            ))}
          </div>

          {/* Revenue strip */}
          <div className="reveal border-t border-border p-8">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Revenue at Stake
            </div>
            <div className="mt-1 font-display text-4xl font-bold text-forest">
              ৳{s ? Math.round(s.revenue).toLocaleString("en-BD") : "···"}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              overdue + due soon
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE DIVIDER ─────────────────────────────── */}
      <div className="overflow-hidden border-y border-border bg-ink py-3">
        <div className="marquee-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-8 text-[10px] font-bold uppercase tracking-[0.3em] text-cream/40">
              Vehicle Service Predictor &nbsp;·&nbsp; Fixed Date &nbsp;·&nbsp; Time Period &nbsp;·&nbsp; Distance KM &nbsp;·&nbsp; Daily Call List &nbsp;·&nbsp; Service History &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── THREE RULES ─────────────────────────────────── */}
      <section ref={rulesRef} className="grid grid-cols-1 divide-y divide-border border-b border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {[
          {
            num: "01",
            rule: "Fixed Date",
            desc: "Due on an exact calendar date. Insurance, tax tokens, fitness certificates — renew by the deadline.",
            items: ["Insurance", "Tax Token", "Fitness Certificate", "Battery Warranty"],
          },
          {
            num: "02",
            rule: "Time Period",
            desc: "Due every N months from the last service date. Tracked from recorded history.",
            items: ["Engine Oil", "AC Service", "Air Filter", "Coolant Flush"],
          },
          {
            num: "03",
            rule: "Distance",
            desc: "Due every N km. Estimated date using each vehicle's real daily km average.",
            items: ["Tyres", "Brake Pads", "Spark Plugs", "Timing Belt"],
          },
        ].map(({ num, rule, desc, items }) => (
          <div key={num} className="reveal group flex flex-col justify-between p-10 transition-colors duration-200 hover:bg-cream-deep">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Rule {num}
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase text-ink">
                {rule}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
            <ul className="mt-8 space-y-1">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-ink"
                >
                  <span className="size-1 rounded-full bg-forest" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────── */}
      <section ref={stepsRef} className="grid grid-cols-1 divide-y divide-border border-b border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {[
          {
            step: "→ 01",
            title: "Check",
            body: "Open the call list. Every vehicle with an overdue or due-soon item is listed, ranked by urgency then revenue.",
          },
          {
            step: "→ 02",
            title: "Call",
            body: "Each entry shows the owner's phone, the vehicle, every item due, and the cost. One click shows the full vehicle record.",
          },
          {
            step: "→ 03",
            title: "Record",
            body: "After the job — hit Record Service. The timer resets, next due date recalculates, history grows. Done.",
          },
        ].map(({ step, title, body }) => (
          <div key={step} className="reveal-left flex flex-col gap-4 p-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {step}
            </div>
            <h3 className="font-display text-4xl font-bold uppercase text-ink">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
          </div>
        ))}
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────── */}
      <section ref={ctaRef} className="reveal flex items-center justify-between border-b border-border bg-forest p-10 sm:p-14">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-lime/70">
            Ready
          </div>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase leading-none text-cream sm:text-5xl">
            The Workshop<br />Is Open.
          </h2>
        </div>
        <Link
          to="/calls"
          className="group flex shrink-0 flex-col items-end gap-1 text-right"
        >
          <ArrowUpRight className="size-10 text-lime transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cream/50">
            Call List
          </span>
        </Link>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="flex items-center justify-between px-10 py-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          ServiceTracker · P09 · 2026
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {s?.vehicles ?? "·"} vehicles · {s?.owners ?? "·"} owners
        </span>
      </footer>
    </div>
  );
}