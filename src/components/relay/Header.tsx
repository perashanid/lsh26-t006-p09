import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const NAV: { label: string; items: string[] }[] = [
  {
    label: "Products",
    items: [
      "Business checking",
      "Business savings",
      "Expense management",
      "Accounts payable",
      "Accounts receivable",
      "Integrations",
    ],
  },
  {
    label: "Solutions",
    items: [
      "Real estate investors",
      "E-commerce",
      "Home services",
      "Agencies",
      "General contractors",
      "Profit First banking",
    ],
  },
  {
    label: "Resources",
    items: [
      "Everyday business blog",
      "Guides",
      "Bi-weekly webinar",
      "Support center",
      "Advisor directory",
      "FAQs",
    ],
  },
  { label: "Customers", items: ["Customer stories", "Advisor hub", "Partner program", "Get certified"] },
];

export function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 4);
      setOpen(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const hover = (label: string | null) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (label === null) {
      closeTimer.current = setTimeout(() => setOpen(null), 140);
    } else {
      setOpen(label);
    }
  };

  return (
    <>
      {/* Announcement bar — scrolls away above the nav, as on Relay */}
      <div className="bg-clay px-4 py-2.5 text-center text-[13px] text-cream">
        Meet Bangladeshi founders scaling smarter with Relay. New episode out now.{" "}
        <a href="#podcast" className="underline underline-offset-2 hover:opacity-80">
          Watch the founder stories.
        </a>
      </div>

      <header
        className={`sticky top-0 z-50 bg-cream transition-shadow duration-300 ${
          scrolled ? "shadow-[0_1px_0_var(--border),0_10px_30px_-24px_rgba(0,0,0,0.45)]" : ""
        }`}
        onMouseLeave={() => hover(null)}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-6 px-4 sm:px-6 lg:gap-8">
          <a href="/" className="font-script text-3xl leading-none text-forest">
            Relay
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((group) => (
              <button
                key={group.label}
                type="button"
                aria-expanded={open === group.label}
                onMouseEnter={() => hover(group.label)}
                onFocus={() => hover(group.label)}
                onClick={() => setOpen((v) => (v === group.label ? null : group.label))}
                className={`flex items-center gap-1 rounded-full px-4 py-2 text-[15px] transition-colors ${
                  open === group.label ? "bg-forest/5 text-forest" : "text-forest-deep hover:text-forest"
                }`}
              >
                {group.label}
                <ChevronDown
                  className={`size-3.5 transition-transform duration-300 ${
                    open === group.label ? "rotate-180" : ""
                  }`}
                />
              </button>
            ))}
            <a
              href="#pricing"
              className="rounded-full px-4 py-2 text-[15px] text-forest-deep transition-colors hover:text-forest"
              onMouseEnter={() => hover(null)}
            >
              Pricing
            </a>
          </nav>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <a href="#login" className="px-3 text-[15px] font-semibold text-forest-deep hover:text-forest">
              Log in
            </a>
            <a
              href="#demo"
              className="rounded-full border border-forest px-5 py-2.5 text-[15px] text-forest transition-colors hover:bg-forest/5"
            >
              Request a demo
            </a>
            <a
              href="#open"
              className="rounded-full bg-forest px-5 py-2.5 text-[15px] text-cream transition-colors hover:bg-forest-deep"
            >
              Open an account
            </a>
          </div>

          <button
            type="button"
            className="ml-auto text-forest lg:hidden"
            aria-label={mobile ? "Close menu" : "Open menu"}
            onClick={() => setMobile((v) => !v)}
          >
            {mobile ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mega menu */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="mega"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => hover(open)}
              className="hidden overflow-hidden border-t border-border bg-cream lg:block"
            >
              <div className="mx-auto grid max-w-[1440px] grid-cols-3 gap-x-10 gap-y-3 px-6 py-8">
                {NAV.find((n) => n.label === open)?.items.map((item, i) => (
                  <motion.a
                    key={item}
                    href="#products"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.03 * i, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-border/70 py-2.5 text-[15px] text-forest-deep transition-colors hover:text-clay"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-cream lg:hidden"
          >
            <div className="flex h-[72px] items-center justify-between px-4">
              <span className="font-script text-3xl text-forest">Relay</span>
              <button type="button" aria-label="Close menu" onClick={() => setMobile(false)}>
                <X className="size-6 text-forest" />
              </button>
            </div>
            <div className="flex flex-col gap-1 px-6 py-4">
              {[...NAV.map((n) => n.label), "Pricing", "Log in"].map((l) => (
                <a
                  key={l}
                  href="#"
                  onClick={() => setMobile(false)}
                  className="border-b border-border py-4 font-display text-2xl uppercase text-forest"
                >
                  {l}
                </a>
              ))}
              <a
                href="#open"
                onClick={() => setMobile(false)}
                className="mt-6 rounded-full bg-forest px-5 py-3.5 text-center text-cream"
              >
                Open an account
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

