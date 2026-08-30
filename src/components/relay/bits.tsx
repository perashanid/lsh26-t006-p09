import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

/* Scroll-triggered reveal: mirrors Relay's soft rise-and-fade on enter. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-12% 0px -12% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* A single masked line that rises into place. */
export function RiseLine({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <span ref={ref} className="block overflow-hidden">
      <motion.span
        className={className}
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* Word-by-word display headline reveal. */
export function RevealWords({
  text,
  className,
  wordClassName,
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.9, delay: delay + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}


/* Slot-machine currency ticker used on Relay's account balances. */
function Digit({ value, delay }: { value: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  if (!/\d/.test(value)) {
    return (
      <span className="inline-block align-bottom" style={{ height: "1em", lineHeight: "1em" }}>
        {value}
      </span>
    );
  }

  const target = Number(value);
  return (
    <span ref={ref} className="relative inline-block overflow-hidden align-bottom" style={{ height: "1em" }}>
      <motion.span
        className="flex flex-col"
        initial={{ y: "0em" }}
        animate={inView ? { y: `${-target}em` } : { y: "0em" }}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <span key={d} style={{ height: "1em", lineHeight: "1em" }}>
            {d}
          </span>
        ))}
      </motion.span>
      <span className="invisible">0</span>
    </span>
  );
}

export function Ticker({ value, className }: { value: string; className?: string }) {
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "flex-end" }}>
      {value.split("").map((c, i) => (
        <Digit key={`${c}-${i}`} value={c} delay={0.05 * i} />
      ))}
    </span>
  );
}

/* Torn-paper edge between the dark section and the grid-paper canvas. */
export function TornDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`relative -mb-px w-full leading-none ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="block h-[42px] w-full sm:h-[60px]"
        aria-hidden="true"
      >
        <path
          fill="var(--cream)"
          d="M0 34c38-9 62 4 96 2s54-14 92-11 58 15 96 12 60-16 98-13 56 14 94 12 62-15 100-13 58 16 96 14 60-15 98-13 58 13 96 11 60-13 98-11 60 12 98 10 62-12 100-10 56 11 78 6v43H0z"
        />
        <path
          fill="var(--cream)"
          opacity="0.55"
          d="M0 44c44-6 66 6 104 5s56-11 94-9 58 12 96 10 60-12 98-10 56 11 94 9 62-12 100-10 58 13 96 11 60-12 98-10 58 10 96 9 60-10 98-9 60 9 98 8 62-9 100-8 40 6 68 4v20H0z"
        />
      </svg>
    </div>
  );
}
