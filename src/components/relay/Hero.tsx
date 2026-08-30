import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import heroLeft from "@/assets/hero-left.jpg";
import heroRight from "@/assets/hero-right.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream">
      <div className="relative mx-auto flex min-h-[calc(100vh-6.5rem)] max-w-[1440px] items-center px-4 py-24 sm:px-6">
        {/* Collage columns, tilted like Relay's desk flat-lay */}
        <motion.div
          style={{ y: leftY }}
          initial={{ opacity: 0, x: -60, rotate: -6 }}
          animate={{ opacity: 1, x: 0, rotate: -3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute -left-[14%] top-[-6%] hidden h-[112%] w-[42%] md:block"
        >
          <img
            src={heroLeft}
            alt="Relay Visa business debit card resting on a manila folder with receipts and keys"
            width={960}
            height={1600}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          style={{ y: rightY }}
          initial={{ opacity: 0, x: 60, rotate: 6 }}
          animate={{ opacity: 1, x: 0, rotate: 3 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute -right-[14%] top-[-6%] hidden h-[112%] w-[42%] md:block"
        >
          <img
            src={heroRight}
            alt="Green ledger book, calculator and columnar pad on a desk"
            width={960}
            height={1600}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div style={{ opacity: fade }} className="relative mx-auto w-full max-w-2xl text-center">
          <h1 className="text-forest">
            {["EVERY DOLLAR.", "EVERY ACCOUNT."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="display-xl block text-[13vw] sm:text-[64px]"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden">
              <motion.span
                className="display-serif block text-[13.5vw] sm:text-[68px]"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                Under control.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mt-6 max-w-md text-lg text-forest-deep"
          >
            Business banking that keeps your money clear, organized, and ready for what&apos;s next.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72 }}
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Email Address*"
              aria-label="Email address"
              className="h-14 flex-1 rounded-full border border-forest/25 bg-paper px-6 text-base text-forest-deep outline-none transition-colors placeholder:text-forest/50 focus:border-forest"
            />
            <button
              type="submit"
              className="h-14 rounded-full bg-lime px-8 text-base font-medium text-forest-deep transition-transform duration-300 hover:-translate-y-0.5 hover:bg-lime-soft"
            >
              Open an account
            </button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mx-auto mt-4 max-w-sm text-xs leading-relaxed text-forest-deep/70"
          >
            By submitting your email, you agree to opt in to marketing emails. You can unsubscribe at any time.
          </motion.p>
        </motion.div>
      </div>

    </section>
  );
}
