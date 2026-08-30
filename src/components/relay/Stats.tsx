import { motion } from "motion/react";
import stat1 from "@/assets/stat-1.jpg";
import stat2 from "@/assets/stat-2.jpg";
import stat3 from "@/assets/stat-3.jpg";

const STATS = [
  { img: stat1, value: "25,000+", label: "businesses served.", alt: "Shop owner in a striped apron" },
  { img: stat2, value: "৳1,200 crore+", label: "in managed customer deposits.", alt: "Small business back office" },
  { img: stat3, value: "৳0", label: "hidden fees, ever.", alt: "Owner working at a home office desk" },
];

export function Stats() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3">
      {STATS.map((s, i) => (
        <motion.div
          key={s.value}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: i * 0.12 }}
          className="group relative h-[52vh] min-h-[360px] overflow-hidden"
        >
          <motion.img
            src={s.img}
            alt={s.alt}
            width={700}
            height={1000}
            loading="lazy"
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover saturate-[0.9]"
          />
          <div className="absolute inset-0 bg-forest-deep/25 mix-blend-multiply" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest-deep/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-[38%] px-6 text-center text-cream">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.2rem,4vw,3.25rem)] font-bold tracking-tight"
            >
              {s.value}
            </motion.p>
            <p className="mt-1 text-sm font-semibold">{s.label}</p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
