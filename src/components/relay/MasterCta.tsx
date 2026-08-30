import { motion } from "motion/react";
import { RiseLine } from "./bits";

export function MasterCta() {
  const lines = ["You've", "mastered", "your craft."];
  const serifLines = ["Now master", "your money."];

  return (
    <section className="relative overflow-hidden bg-forest-deep py-28 text-center sm:py-36">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <h2 className="text-lime-soft">
          {lines.map((l, i) => (
            <RiseLine
              key={l}
              delay={i * 0.08}
              className="display-xl block text-[12vw] leading-[0.92] sm:text-[6.5vw]"
            >
              {l}
            </RiseLine>
          ))}
          {serifLines.map((l, i) => (
            <RiseLine
              key={l}
              delay={0.24 + i * 0.08}
              className="display-serif block text-[12.5vw] leading-[0.98] sm:text-[7vw]"
            >
              {l}
            </RiseLine>
          ))}
        </h2>


        <motion.a
          href="#demo"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 inline-block rounded-full bg-lime px-8 py-4 text-base font-medium text-forest-deep transition-transform duration-300 hover:-translate-y-0.5"
        >
          Request a demo
        </motion.a>
      </div>
    </section>
  );
}
