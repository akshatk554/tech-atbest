import { createFileRoute } from "@tanstack/react-router";
import { Truck, Clock, MapPin, Package, IndianRupee } from "lucide-react";

export const Route = createFileRoute("/policies/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & delivery — tech.at.best" },
      { name: "description", content: "Free shipping over ₹999. Metro delivery in 2–3 days, tier-2/3 in 4–6 days. Express options, tracking and pincode coverage." },
      { property: "og:title", content: "Shipping & delivery — tech.at.best" },
      { property: "og:description", content: "Timelines, charges, tracking and pincode coverage across India." },
    ],
  }),
  component: ShippingPage,
});

function ShippingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="font-mono text-[11px] uppercase tracking-widest text-accent">// policies / shipping</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Shipping & delivery</h1>
      <p className="mt-2 text-sm text-muted-foreground">Fast, insured shipping across India with full tracking. Free over ₹999.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        <Stat icon={Truck} value="2–3 days" label="Metro cities" />
        <Stat icon={Clock} value="4–6 days" label="Tier-2 / 3" />
        <Stat icon={IndianRupee} value="Free > ₹999" label="Shipping fee" />
        <Stat icon={MapPin} value="27,000+" label="Pincodes served" />
      </div>

      <Section title="Delivery timelines">
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary"><tr><th className="p-3 text-left">Zone</th><th className="p-3 text-left">Standard</th><th className="p-3 text-left">Express</th></tr></thead>
            <tbody className="divide-y divide-border">
              <Tr a="Metro (BLR, BOM, DEL, HYD, MAA, CCU, PNQ, AMD)" b="2–3 business days" c="Next-day (order by 2 PM)" />
              <Tr a="Tier-2 cities" b="3–5 business days" c="2 business days" />
              <Tr a="Tier-3 & remote" b="4–7 business days" c="3–5 business days" />
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">Timelines are business days from dispatch. Festive periods may add 1–2 days.</p>
      </Section>

      <Section title="Charges">
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2"><Package className="h-4 w-4 shrink-0 text-accent" /> <strong className="text-foreground">Free standard shipping</strong> on all orders above ₹999.</li>
          <li className="flex gap-2"><Package className="h-4 w-4 shrink-0 text-accent" /> Below ₹999: ₹49 standard / ₹149 express.</li>
          <li className="flex gap-2"><Package className="h-4 w-4 shrink-0 text-accent" /> Large items (desktops, monitors above 27\") may need a small surcharge — shown at checkout.</li>
        </ul>
      </Section>

      <Section title="Tracking">
        <p className="text-sm text-muted-foreground">As soon as a courier picks up your parcel, you'll get an email + SMS with an AWB number and a live tracking link. You can also track from <span className="text-foreground">Account → Orders</span>.</p>
      </Section>

      <Section title="Packaging">
        <p className="text-sm text-muted-foreground">We use double-wall corrugated boxes, anti-static wraps for electronics and brand-sealed retail packaging. Every parcel is insured against transit damage — if it arrives damaged, take a photo before unboxing fully and contact us within 48 hours.</p>
      </Section>

      <Section title="International shipping">
        <p className="text-sm text-muted-foreground">We currently ship within India only. International shipping is planned for 2026.</p>
      </Section>
    </div>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof Truck; value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-accent"><Icon className="h-4 w-4" /></div>
      <p className="mt-3 text-lg font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (<section className="mt-10"><h2 className="text-lg font-bold">{title}</h2><div className="mt-3">{children}</div></section>);
}
function Tr({ a, b, c }: { a: string; b: string; c: string }) {
  return <tr><td className="p-3 font-medium">{a}</td><td className="p-3 text-muted-foreground">{b}</td><td className="p-3 text-muted-foreground">{c}</td></tr>;
}
