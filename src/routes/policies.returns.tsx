import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, ExternalLink, ShoppingBag, Package, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/policies/returns")({
  head: () => ({
    meta: [
      { title: "Return & Refund Policy — tech.at.best" },
      {
        name: "description",
        content:
          "Return and refund policies summarised from Flipkart, Amazon and MD Computers for products listed on tech.at.best.",
      },
      { property: "og:title", content: "Return & Refund Policy — tech.at.best" },
      {
        property: "og:description",
        content:
          "Return windows, refund timelines and conditions across Flipkart, Amazon and MD Computers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://tech-atbest.lovable.app/policies/returns" },
    ],
  }),
  component: ReturnsPage,
});

type Section = {
  id: "flipkart" | "amazon" | "md";
  name: string;
  tagline: string;
  url: string;
  source: string;
  icon: typeof ShoppingBag;
  accent: string;
  window: string;
  refund: string;
  pickup: string;
  bullets: string[];
  notReturnable: string[];
  refundTimeline: { label: string; days: string }[];
};

const SECTIONS: Section[] = [
  {
    id: "flipkart",
    name: "Flipkart",
    tagline: "Marketplace · Returns vary by seller and category",
    url: "https://www.flipkart.com/pages/returnpolicy",
    source: "flipkart.com/pages/returnpolicy",
    icon: ShoppingBag,
    accent: "from-[#2874f0] to-[#1a59c4]",
    window: "7–10 days from delivery (category-dependent)",
    refund: "Refund or replacement, customer choice where eligible",
    pickup: "Free reverse pickup in serviceable pincodes",
    bullets: [
      "Laptops, desktops and monitors are typically eligible for 7-day replacement only — full refunds apply when replacement stock is unavailable.",
      "RAM, SSDs and most accessories follow a 7-day return window if the product is unused, in original packaging with all accessories, manuals and freebies.",
      "Open-box delivery (OBD) is mandatory for high-value electronics; report damage or mismatch to the delivery agent before accepting.",
      "Self-ship is only requested when reverse pickup is unavailable; courier charges up to ₹100 are credited back as Flipkart Wallet balance.",
      "Items sold by third-party sellers may have stricter conditions visible on the product page under \"Seller Returns Policy\".",
    ],
    notReturnable: [
      "Products with tampered serial numbers, missing IMEI/MEID stickers or removed warranty seals.",
      "Software licenses, digital downloads and consumables once activated.",
      "Damage caused by misuse, liquid ingress or unauthorised repair.",
    ],
    refundTimeline: [
      { label: "UPI / Net banking", days: "1–3 business days" },
      { label: "Credit / Debit card", days: "5–7 business days" },
      { label: "Cash on delivery → bank", days: "8–10 business days" },
      { label: "Flipkart Wallet / Gift card", days: "Instant after pickup" },
    ],
  },
  {
    id: "amazon",
    name: "Amazon",
    tagline: "Amazon Fulfilled & Sold-by-Amazon enjoy the longest windows",
    url: "https://www.amazon.in/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7",
    source: "amazon.in/gp/help — Returns, Refunds & Replacements",
    icon: Package,
    accent: "from-[#ff9900] to-[#e47911]",
    window: "10 days for laptops / desktops · 7 days for components & accessories",
    refund: "Refund, replacement or repair (depending on brand policy)",
    pickup: "Free pickup across 20,000+ pincodes for Amazon-fulfilled items",
    bullets: [
      "Laptops and desktops carry a 10-day window for replacement only — refunds are issued if the same model is out of stock or the defect is confirmed by the brand service centre.",
      "Components such as RAM, SSDs, motherboards and graphics cards must be returned sealed and unused; tampered anti-static bags void the return.",
      "Accessories (keyboards, mice, monitors below 32\", cables, hubs) are returnable within 7 days for any reason if unused.",
      "For \"Sold by Cloudtail / Appario / Amazon Retail\" products, return is initiated directly through Your Orders → Return or Replace Items.",
      "Brands like Apple, ASUS ROG and Lenovo Legion may require a Damage / Defective certificate from an authorised service centre before approving a return.",
    ],
    notReturnable: [
      "Software, e-books, Kindle content and Amazon digital services once delivered.",
      "Customised or pre-installed configurations (Build-to-Order PCs).",
      "Items returned without the original invoice, accessories or freebies.",
    ],
    refundTimeline: [
      { label: "Amazon Pay balance", days: "Within 2 hours of pickup" },
      { label: "UPI / Net banking", days: "2–4 business days" },
      { label: "Credit / Debit card", days: "5–7 business days" },
      { label: "Cash on delivery / Pay on delivery", days: "4–6 business days (NEFT)" },
    ],
  },
  {
    id: "md",
    name: "MD Computers",
    tagline: "Specialist retailer · Kolkata-based with pan-India shipping",
    url: "https://mdcomputers.in/index.php?route=information/information&information_id=5",
    source: "mdcomputers.in — Return Policy",
    icon: Cpu,
    accent: "from-accent to-[#16a34a]",
    window: "DOA (Dead-On-Arrival) reported within 48 hours of delivery",
    refund: "Repair or replacement via brand RMA · Refunds only for unshipped orders",
    pickup: "Customer-arranged return shipping to MD Computers, Kolkata",
    bullets: [
      "All components carry the original manufacturer warranty — MD Computers facilitates the RMA process with brands like ASUS, Gigabyte, MSI, Corsair, Samsung and WD.",
      "Dead-On-Arrival claims must be raised within 48 hours of receiving the product with an unboxing video showing the sealed packaging.",
      "Once installed or powered on, components are handled as warranty claims (not returns) and routed to the brand's authorised service centre.",
      "Pre-built and custom-assembled PCs are non-returnable — only individual faulty components are eligible under warranty.",
      "Refunds for cancelled orders (before dispatch) are processed to the original payment method; bank transfer charges may apply on prepaid wallets.",
    ],
    notReturnable: [
      "Custom-built PCs, opened CPUs, and used thermal paste / cooling kits.",
      "Software keys, OEM Windows licenses and any digitally delivered product.",
      "Items physically damaged after delivery or with broken warranty stickers.",
    ],
    refundTimeline: [
      { label: "UPI / Net banking", days: "3–5 business days" },
      { label: "Credit / Debit card", days: "5–10 business days" },
      { label: "Bank transfer (NEFT/IMPS)", days: "2–4 business days" },
    ],
  },
];

function ReturnsPage() {
  const [active, setActive] = useState<Section["id"]>("flipkart");
  const section = SECTIONS.find((s) => s.id === active)!;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">return &amp; refund policy</span>
      </nav>

      <header className="mt-6 max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
          // policies / returns
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          Return &amp; refund policy
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Every product on tech.at.best is fulfilled by a partner retailer. Returns and refunds
          are governed by the retailer that ships your order. The summaries below are compiled
          from each retailer's published policy — always cross-check the live policy via the
          source link before raising a claim.
        </p>
      </header>

      {/* Tabs */}
      <div className="mt-8 grid gap-2 sm:grid-cols-3">
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={cn(
                "group flex items-center gap-3 rounded-xl border bg-card/40 p-4 text-left transition-all",
                isActive
                  ? "border-accent shadow-glow"
                  : "border-border hover:border-accent/60",
              )}
            >
              <span
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br text-white",
                  s.accent,
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold">{s.name}</span>
                <span className="block text-[11px] text-muted-foreground line-clamp-1">
                  {s.tagline}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Active section */}
      <section className="mt-8 rounded-2xl border border-border bg-card/30 p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
              // {section.id}_returns
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">{section.name}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{section.tagline}</p>
          </div>
          <a
            href={section.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 px-3 py-1.5 text-xs text-accent hover:bg-accent hover:text-accent-foreground"
          >
            View live policy <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat label="Return window" value={section.window} />
          <Stat label="Resolution" value={section.refund} />
          <Stat label="Pickup" value={section.pickup} />
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
              // policy_highlights
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
              {section.bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                // not_returnable
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {section.notReturnable.map((n, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-destructive" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                // refund_timeline
              </h3>
              <div className="mt-3 overflow-hidden rounded-lg border border-border">
                {section.refundTimeline.map((r, i) => (
                  <div
                    key={r.label}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 text-sm",
                      i % 2 === 0 ? "bg-card/40" : "",
                    )}
                  >
                    <span className="text-muted-foreground">{r.label}</span>
                    <span className="font-mono text-xs text-foreground">{r.days}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-border pt-4 text-[11px] leading-relaxed text-muted-foreground">
          Source: <a href={section.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{section.source}</a>.
          Summarised for convenience — terms can change without notice. For any claim, the live
          policy on the retailer's website is the binding version.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-card/30 p-6">
        <h2 className="font-mono text-xs uppercase tracking-widest text-accent">
          // need_help
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Can't find your retailer or unsure where your order shipped from? Email{" "}
          <a href="mailto:akshatk554@gmail.com" className="text-accent hover:underline">
            akshatk554@gmail.com
          </a>{" "}
          with your order ID and we'll route the return to the correct partner within one
          business day.
        </p>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-3">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
