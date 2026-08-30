const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "What is Relay",
    links: [
      "Business current account",
      "Business savings",
      "Profit First banking",
      "Supplier payments",
      "Expense management",
      "Invoices",
      "Payment Requests",
      "Pricing",
    ],
  },
  {
    title: "Integrations",
    links: [
      "bKash",
      "Nagad",
      "Rocket",
      "Tally & QuickBooks",
      "Chartered accountants",
      "Partner program",
      "Get certified",
    ],
  },
  {
    title: "Guides",
    links: [
      "Supplier payments",
      "Data security",
      "Growth playbook",
      "Becoming a cash flow advisor",
      "Cash Flow Compass",
      "Switch to Relay",
    ],
  },
  {
    title: "Resources",
    links: [
      "Everyday business blog",
      "Advisor directory",
      "Advisor hub",
      "FAQs",
      "Bi-weekly webinar",
      "Support center",
    ],
  },
  {
    title: "Solutions",
    links: [
      "Banking for garment factories",
      "Banking for e-commerce",
      "Banking for home services",
      "Banking for agencies",
      "Banking for auto workshops",
      "Banking for restaurants",
      "Banking for contractors",
    ],
  },
  {
    title: "Company",
    links: [
      "About us",
      "Customer stories",
      "Careers",
      "Contact us",
      "Why Relay",
      "Trust Center",
      "Safety & Security",
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-forest-deep pt-20 pb-10 text-cream">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <div className="flex flex-col gap-10 border-b border-cream/15 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <span className="font-script text-6xl leading-none text-lime">Relay</span>
          <div className="flex flex-wrap gap-3">
            <a
              href="#demo"
              className="rounded-full border border-cream/40 px-6 py-3 text-[15px] transition-colors hover:bg-cream/10"
            >
              Request a demo
            </a>
            <a
              href="#open"
              className="rounded-full bg-lime px-6 py-3 text-[15px] text-forest-deep transition-transform duration-300 hover:-translate-y-0.5"
            >
              Open an account
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-14 md:grid-cols-3 lg:grid-cols-6">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-[13px] font-bold uppercase tracking-wider text-lime">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[14px] text-cream/75 transition-colors hover:text-lime">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
