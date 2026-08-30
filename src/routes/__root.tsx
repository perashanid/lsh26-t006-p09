import {
  Outlet,
  Link,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Car } from "lucide-react";

/* ── Sidebar nav ───────────────────────────────────────────────────── */
function SideNav() {
  const { location } = useRouterState();
  const p = location.pathname;

  const link = (to: string, label: string) => {
    const active = to === "/" ? p === "/" : p.startsWith(to);
    return (
      <Link
        to={to}
        className={`block text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-150 ${
          active ? "text-forest" : "text-muted-foreground hover:text-ink"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-[72px] flex-col border-r border-border bg-cream px-0 py-8 sm:w-[88px]">
      {/* Logo mark */}
      <div className="flex flex-col items-center gap-1 border-b border-border pb-6 mx-4">
        <div className="flex size-9 items-center justify-center rounded-lg bg-forest text-cream">
          <Car className="size-4" />
        </div>
      </div>

      {/* Nav links — rotated to read bottom-up like editorial sidebar */}
      <nav className="flex flex-1 flex-col items-center justify-center gap-8 py-6">
        {[
          { to: "/", label: "HOME" },
          { to: "/calls", label: "CALLS" },
        ].map(({ to, label }) => {
          const active = to === "/" ? p === "/" : p.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`[writing-mode:vertical-rl] rotate-180 text-[10px] font-bold uppercase tracking-[0.25em] transition-colors duration-150 ${
                active
                  ? "text-forest"
                  : "text-muted-foreground hover:text-ink"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: indicator dot for active page */}
      <div className="flex flex-col items-center gap-2 border-t border-border pt-6 mx-4">
        <div className="size-1.5 rounded-full bg-lime animate-pulse" />
        <span className="[writing-mode:vertical-rl] rotate-180 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          Live
        </span>
      </div>
    </aside>
  );
}

/* ── Error / 404 ───────────────────────────────────────────────────── */
function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-8">
      <div>
        <div className="font-display text-[8rem] font-bold leading-none text-cream-deep">
          404
        </div>
        <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">
          Page not found
        </p>
        <Link
          to="/"
          className="mt-6 inline-block border-b border-forest pb-px text-sm font-medium text-forest hover:border-transparent"
        >
          Go home →
        </Link>
      </div>
    </div>
  );
}

function ErrorView({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  useEffect(() => {
    reportLovableError(error, { boundary: "root" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-destructive">
          Error
        </p>
        <h1 className="mt-2 text-2xl font-bold text-ink">
          {error.message || "Something went wrong"}
        </h1>
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => reset()}
            className="border-b border-forest pb-px text-sm font-medium text-forest"
          >
            Try again →
          </button>
          <a
            href="/"
            className="border-b border-border pb-px text-sm text-muted-foreground hover:text-ink"
          >
            Go home →
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Root ──────────────────────────────────────────────────────────── */
export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => (
    <div className="flex min-h-screen bg-cream">
      <SideNav />
      <div className="flex-1 pl-[72px] sm:pl-[88px]">
        <NotFound />
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="flex min-h-screen bg-cream">
      <SideNav />
      <div className="flex-1 pl-[72px] sm:pl-[88px]">
        <ErrorView error={error} reset={reset} />
      </div>
    </div>
  ),
});

function RootComponent() {
  return (
    <div className="flex min-h-screen bg-cream">
      <SideNav />
      <div className="flex-1 pl-[72px] sm:pl-[88px]">
        <Outlet />
      </div>
    </div>
  );
}
