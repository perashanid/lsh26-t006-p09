import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Reveal } from "./bits";

/** Wrapper that pauses its marquee animation while off-screen. */
function MarqueeViewport({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "200px" });
  return (
    <section ref={ref} className={`marquee-viewport ${inView ? "is-visible" : ""} ${className ?? ""}`}>
      {children}
    </section>
  );
}


const PRESS = ["The Daily Star", "Prothom Alo", "Dhaka Tribune", "Bangladesh Business Review", "FS Tech", "Future Startup", "LightCastle"];

const PILLARS = [
  {
    title: "Purpose built",
    body: "Most banks were built for everyone. Relay was built for Bangladeshi owners who do everything and need their money structured to keep up.",
  },
  {
    title: "Profit centric",
    body: "Visibility breeds profitability. Relay gives you a real-time view of your cash and automated systems that make every taka work harder.",
  },
  {
    title: "Proven to work",
    body: "We took financial systems long used by large companies and rebuilt them for Bangladeshi SMEs that want control without complexity.",
  },
];

const REVIEWS = [
  {
    q: "Relay's approach to business banking is unlike anything I've used before. The platform is thoughtfully designed, intuitive to navigate, and makes managing income, expenses, and savings effortless.",
    n: "Tasnim",
  },
  { q: "It's purpose-built for small businesses, which makes it the easiest banking platform I've ever used.", n: "Rafiq" },
  {
    q: "The app is very easy to use and makes everyday banking smooth and stress-free. Overall, the best online banking experience we've had.",
    n: "Anika",
  },
  {
    q: "Relay has been a game-changer for our business. I love the flexibility to create as many accounts and cards as we need, which keeps everything organized and efficient.",
    n: "Imran",
  },
  {
    q: "Relay takes away the hassle of juggling transfers and tracking balances, which makes managing my business finances so much easier.",
    n: "Nusrat",
  },
  {
    q: "From multi-account setups to seamless integrations and user-friendly controls, it's clear that they deeply understand the needs of small business owners.",
    n: "Shahriar",
  },
  {
    q: "Relay makes it simple to understand what's going on with your finances. Multiple accounts, multiple cards, multiple businesses. And it's all right there with no fluff.",
    n: "Farhana",
  },
];

export function Proof() {
  return (
    <>
      {/* As seen in */}
      <MarqueeViewport className="overflow-hidden border-y border-border bg-cream py-10">
        <p className="mb-6 text-center text-[12px] font-bold uppercase tracking-[0.24em] text-ink/50">As seen in:</p>
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-16 pr-16">
              {PRESS.map((p) => (
                <span key={p} className="font-display text-2xl font-bold uppercase tracking-tight text-forest/45">
                  {p}
                </span>
              ))}
            </div>
          ))}
        </div>
      </MarqueeViewport>


      {/* Why Relay */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
          <Reveal>
            <h2 className="max-w-4xl">
              <span className="display-xl block text-[10vw] leading-[0.95] text-forest sm:text-[5vw]">
                Why over 25,000
              </span>
              <span className="display-serif block text-[10.5vw] leading-[1] text-forest sm:text-[5.2vw]">
                owners choose Relay
              </span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="border-t-2 border-forest pt-6">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-forest">{p.title}</h3>
                  <p className="mt-4 text-[16px] leading-relaxed text-ink/75">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials marquee */}
      <MarqueeViewport className="overflow-hidden bg-lime-soft py-20">
        <div className="marquee-track" style={{ animationDuration: "70s" }}>
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 gap-6 pr-6">
              {REVIEWS.map((r) => (
                <motion.figure
                  key={r.n + dup}
                  whileHover={{ y: -6 }}
                  className="w-[340px] shrink-0 rounded-2xl bg-paper p-7 shadow-[var(--shadow-card)]"
                >
                  <blockquote className="text-[15px] leading-relaxed text-ink/85">&ldquo;{r.q}&rdquo;</blockquote>
                  <figcaption className="mt-6 text-[13px] font-semibold text-forest">
                    {r.n}, <span className="font-normal text-ink/55">Trustpilot</span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          ))}
        </div>
      </MarqueeViewport>

    </>
  );
}
