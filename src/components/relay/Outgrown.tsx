import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { RiseLine } from "./bits";

import c1 from "@/assets/collage-1.jpg";
import c2 from "@/assets/collage-2.jpg";
import c3 from "@/assets/collage-3.jpg";
import s1 from "@/assets/stat-1.jpg";
import s3 from "@/assets/stat-3.jpg";

const PHOTOS = [
  { src: c3, alt: "Owner on the phone in her office", x: "80%", y: "4%", w: "13%", r: 3, d: 0 },
  { src: c2, alt: "Two owners reviewing paperwork", x: "64%", y: "18%", w: "14%", r: -4, d: 0.08 },
  { src: c1, alt: "Baker beside bread racks", x: "76%", y: "40%", w: "15%", r: 2, d: 0.16 },
  { src: s1, alt: "Shop owner in a striped apron", x: "60%", y: "60%", w: "12%", r: -3, d: 0.24 },
  { src: s3, alt: "Owner at a home office desk", x: "78%", y: "72%", w: "13%", r: 4, d: 0.32 },

];

export function Outgrown() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-forest-deep py-28 sm:py-40">
      {/* Diagonal photo cascade */}
      <motion.div style={{ y: drift }} className="pointer-events-none absolute inset-0">
        {PHOTOS.map((p) => (
          <motion.img
            key={p.alt}
            src={p.src}
            alt={p.alt}
            loading="lazy"
            initial={{ opacity: 0, scale: 0.85, rotate: 0 }}
            whileInView={{ opacity: 0.85, scale: 1, rotate: p.r }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, delay: p.d, ease: [0.16, 1, 0.3, 1] }}
            className="absolute hidden aspect-[4/3] object-cover md:block"
            style={{ left: p.x, top: p.y, width: p.w }}
          />
        ))}
      </motion.div>

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6">
        <h2 className="text-lime-soft">
          {["You've", "outgrown"].map((line, i) => (
            <RiseLine
              key={line}
              delay={i * 0.1}
              className="display-xl block text-[15vw] leading-[0.9] sm:text-[8.5vw]"
            >
              {line}
            </RiseLine>
          ))}
          <RiseLine
            delay={0.2}
            className="display-serif block text-[15.5vw] leading-[0.95] sm:text-[9vw]"
          >
            &ldquo;Good enough.&rdquo;
          </RiseLine>

        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-3xl text-cream"
        >
          <p className="text-lg font-semibold">
            This is banking that gives you the clarity to spend smarter and stay in control.
          </p>
          <p className="mt-1 text-lg text-cream/85">
            Relay is built for Bangladeshi owners with salaries to run, customers to serve, and a reputation earned
            job by job.
          </p>
          <p className="mt-6 max-w-2xl text-base text-cream/70">
            It&apos;s time for banking that works like you do &ndash; intentional, disciplined, and built to scale. No
            branch queues. No patchwork tools. One financial setup that keeps your money organized and ready for your
            next move.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
