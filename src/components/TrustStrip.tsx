import { Award, Headset, RotateCcw, ShieldCheck, Truck, Zap } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Fast delivery", desc: "Free shipping over ₹999, dispatched in 24 h" },
  { icon: ShieldCheck, title: "100% genuine", desc: "Sealed boxes, brand-authorised stock" },
  { icon: Zap, title: "Secure payments", desc: "UPI, cards, EMI · PCI-DSS encrypted" },
  { icon: RotateCcw, title: "Easy returns", desc: "7-day no-questions, pickup at home" },
  { icon: Headset, title: "Expert support", desc: "Talk to a real PC builder, not a bot" },
  { icon: Award, title: "Warranty covered", desc: "Full manufacturer + extended options" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-center font-mono text-[11px] uppercase tracking-widest text-accent">// why_customers_choose_us</p>
        <h2 className="mt-2 text-center text-2xl font-bold tracking-tight md:text-3xl">Built on trust, shipped fast</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {ITEMS.map((it) => (
            <div key={it.title} className="group rounded-2xl border border-border bg-card p-4 text-center transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card">
              <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent/15 to-primary/10 text-accent transition-transform group-hover:scale-110">
                <it.icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">{it.title}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
