import { motion } from "motion/react";
import { ChevronRight, CreditCard, Upload, Building2, Landmark } from "lucide-react";
import { Reveal, Ticker } from "./bits";

function SectionCopy({
  title,
  body,
  link,
  align = "left",
}: {
  title: string;
  body: string;
  link: string;
  align?: "left" | "right";
}) {
  return (
    <Reveal className={`max-w-md ${align === "right" ? "lg:ml-auto" : ""}`}>
      <div className="border-l-2 border-lime pl-6">
        <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.5rem)] font-bold leading-[1.05] tracking-tight text-ink">
          {title}
        </h2>
        <p className="mt-5 text-[17px] leading-relaxed text-ink/75">{body}</p>
        <a href="#" className="link-underline mt-8 text-[15px] font-semibold text-ink">
          {link}
          <ChevronRight className="size-4" />
        </a>
      </div>
    </Reveal>
  );
}

function AccountCard({
  type,
  name,
  amount,
  last4,
  highYield,
  delay = 0,
}: {
  type: string;
  name: string;
  amount: string;
  last4: string;
  highYield?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="card-soft p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] font-semibold text-ink">{type}</p>
          <p className="text-[13px] text-ink/55">{name}</p>
        </div>
        {highYield && (
          <span className="rounded-md bg-lime-soft px-2 py-1 text-[11px] font-medium text-forest">High yield</span>
        )}
      </div>
      <p className="mt-6 font-display text-[clamp(1.6rem,2.6vw,2.1rem)] font-semibold tracking-tight text-ink">
        <Ticker value={amount} />
      </p>
      <p className="mt-6 text-[12px] font-medium text-ink">Account number</p>
      <p className="text-[12px] text-ink/55">••••••{last4}</p>
    </motion.div>
  );
}

function DebitCard({ delay = 0, offset = 0 }: { delay?: number; offset?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -8 }}
      whileInView={{ opacity: 1, y: offset, rotate: -4 + offset / 40 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: 0, scale: 1.03 }}
      className="relative aspect-[1.586/1] w-full overflow-hidden rounded-2xl bg-forest-deep p-6 text-cream shadow-[0_20px_50px_-20px_oklch(0.28_0.05_162/0.6)]"
    >
      <div className="absolute -right-10 -top-10 size-44 rounded-full bg-lime/15" />
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="font-script text-2xl text-lime">Relay</span>
          <CreditCard className="size-6 text-lime/70" />
        </div>
        <div>
          <p className="font-display text-lg tracking-[0.14em]">0000 0000 0000 0000</p>
          <div className="mt-3 flex items-end justify-between">
            <p className="text-sm text-cream/80">John Smith</p>
            <p className="text-right text-[11px] uppercase leading-tight text-cream/60">
              Business
              <br />
              debit
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TransactionRow({ merchant, date, amount, delay }: { merchant: string; date: string; amount: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="card-soft flex items-center justify-between px-5 py-4"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-lime-soft text-forest">
          <Building2 className="size-4" />
        </span>
        <div>
          <p className="text-[14px] font-medium text-ink">{merchant}</p>
          <p className="text-[12px] text-ink/55">{date}</p>
        </div>
      </div>
      <p className="font-display text-[15px] font-semibold text-ink">{amount}</p>
    </motion.div>
  );
}

export function Products() {
  return (
    <div className="grid-paper">
      {/* Accounts */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:py-32">
        <SectionCopy
          title="Accounts that give you real visibility."
          body="Open up to 20 current accounts and auto-transfer every deposit so you always know what's tied up and what's safe to spend."
          link="Business current account"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AccountCard type="Current" name="Owner Pay" amount="৳66,500" last4="2915" delay={0} />
          <AccountCard type="Current" name="Income" amount="৳95,000" last4="9503" delay={0.08} />
          <AccountCard type="Current" name="Operating Expenses" amount="৳48,550" last4="7074" delay={0.16} />
          <AccountCard type="Savings" name="Tax" amount="৳128,000" last4="3851" highYield delay={0.24} />
          <AccountCard type="Savings" name="Profit" amount="৳264,050" last4="6628" highYield delay={0.32} />
          <AccountCard type="Current" name="Payroll" amount="৳57,000" last4="1437" delay={0.4} />
        </div>
      </section>

      {/* Savings */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:py-32">
        <div className="order-2 lg:order-1">
          <SectionCopy
            title="Savings that keep you a step ahead."
            body="Build a cash cushion with high-yield accounts and automated rules that help you stay ready for whatever's next."
            link="Business savings"
          />
        </div>
        <div className="order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="card-soft mx-auto max-w-lg p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-2xl font-semibold text-ink">Savings</p>
                <p className="text-lg text-ink/55">Profit</p>
              </div>
              <span className="rounded-md bg-lime-soft px-3 py-1.5 text-[15px] text-forest">High yield</span>
            </div>
            <p className="mt-10 font-display text-[clamp(2.4rem,5vw,3.6rem)] font-semibold tracking-tight text-ink">
              <Ticker value="৳361,150" />
            </p>
            <p className="mt-10 text-[17px] font-medium text-ink">Account number</p>
            <p className="text-[17px] text-ink/55">••••••6628</p>
          </motion.div>
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:py-32">
        <div className="relative mx-auto w-full max-w-md">
          <DebitCard delay={0} offset={0} />
          <div className="mt-6 space-y-3">
            <TransactionRow merchant="Hotel Intercontinental Dhaka" date="11 Dec, 2025" amount="৳122,840" delay={0.15} />
            <TransactionRow merchant="Biman Bangladesh Airlines" date="11 Dec, 2025" amount="৳52,680" delay={0.25} />
          </div>
        </div>
          <SectionCopy
            align="right"
            title="Cards that keep you in control."
            body="Issue Visa debit or credit cards, set spend limits, define roles, and track every transaction in real time."
            link="Business debit card"
          />
      </section>

      {/* Expenses */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:py-32">
        <SectionCopy
          title="Expenses that reconcile themselves."
          body="Capture receipts, categorize expenses in real time, and sync everything to your accounting software automatically."
          link="Expense management"
        />
        <div className="space-y-3">
          {[
            { m: "Rangs Properties", d: "Materials", a: "৳34,218" },
            { m: "Petromax", d: "Fuel", a: "৳8,802" },
            { m: "Magnum ERP", d: "Software", a: "৳5,999" },
            { m: "Office Stationery", d: "Office supplies", a: "৳2,435" },
          ].map((t, i) => (
            <motion.div
              key={t.m}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="card-soft flex items-center justify-between px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full bg-cream-deep text-forest">
                  <Landmark className="size-4" />
                </span>
                <div>
                  <p className="text-[14px] font-medium text-ink">{t.m}</p>
                  <p className="text-[12px] text-ink/55">{t.d}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-lime-soft px-2 py-1 text-[11px] text-forest">Receipt attached</span>
                <p className="font-display text-[15px] font-semibold text-ink">{t.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function Payments() {
  return (
    <div className="grid-paper">
      {/* Payables */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:py-32">
        <SectionCopy
          title="Payables that stay on track."
          body="Upload bills, delegate tasks, automate approvals, and pay vendors the way they want to be paid."
          link="Supplier payments"
        />
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="card-soft mx-auto w-full max-w-lg p-8"
        >
          <p className="font-display text-xl font-semibold text-ink">Upload your bill and we&apos;ll take care of the rest</p>
          <motion.div
            whileHover={{ scale: 1.01, borderColor: "var(--forest)" }}
            className="mt-6 grid place-items-center rounded-xl border-2 border-dashed border-border px-6 py-14 text-center"
          >
            <span className="grid size-12 place-items-center rounded-full bg-lime-soft text-forest">
              <Upload className="size-5" />
            </span>
            <p className="mt-4 text-[15px] font-medium text-ink">Click to browse or drag and drop here</p>
            <p className="mt-1 text-[12px] text-ink/55">We accept .jpg, .png, .heic, or .pdf (max file size: 25 MB)</p>
          </motion.div>
          <button className="mt-6 w-full rounded-full bg-forest py-3.5 text-[15px] text-cream transition-colors hover:bg-forest-deep">
            Upload from your computer
          </button>
        </motion.div>
      </section>

      {/* Receivables */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:py-32">
        <div className="order-2 space-y-4 lg:order-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { l: "Due within 30 days", v: "৳564,900", s: "5 invoices" },
              { l: "Paid in last 30 days", v: "৳606,500", s: "4 invoices" },
              { l: "Overdue invoices", v: "৳100,000", s: "2 invoices" },
            ].map((c, i) => (
              <motion.div
                key={c.l}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="card-soft p-5"
              >
                <p className="text-[12px] text-ink/55">{c.l}</p>
                <p className="mt-3 font-display text-2xl font-semibold text-ink">
                  <Ticker value={c.v} />
                </p>
                <p className="mt-2 text-[12px] text-ink/55">{c.s}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="card-soft p-6"
          >
            <p className="text-[14px] text-ink/60">Rahim Enterprise sent you an invoice</p>
            <p className="mt-1 font-display text-3xl font-semibold text-ink">৳100,000.00</p>
            <p className="mt-6 text-[13px] font-semibold text-ink">Select a payment method</p>
            <div className="mt-3 space-y-2">
              {[
                { t: "Credit or debit card", s: "Fastest way to pay" },
                { t: "Bank payment", s: "Secure and reliable" },
                { t: "bKash / Nagad", s: "Best for instant mobile payments" },
              ].map((m, i) => (
                <motion.label
                  key={m.t}
                  whileHover={{ x: 4 }}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3 transition-colors hover:border-forest"
                >
                  <span className="grid size-4 place-items-center rounded-full border border-forest">
                    {i === 0 && <span className="size-2 rounded-full bg-forest" />}
                  </span>
                  <span>
                    <span className="block text-[14px] font-medium text-ink">{m.t}</span>
                    <span className="block text-[12px] text-ink/55">{m.s}</span>
                  </span>
                </motion.label>
              ))}
            </div>
            <button className="mt-5 w-full rounded-full bg-lime py-3.5 text-[15px] font-medium text-forest-deep transition-transform duration-300 hover:-translate-y-0.5">
              Pay ৳100,000.00
            </button>
          </motion.div>
        </div>
        <div className="order-1 lg:order-2">
          <SectionCopy
            align="right"
            title="Receivables that keep cash flowing."
            body="Create invoices, request payments, offer flexible payment options, and let Relay handle the follow-up."
            link="Customer payments"
          />
        </div>
      </section>
    </div>
  );
}
