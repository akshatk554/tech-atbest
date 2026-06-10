import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Wrench, AlertTriangle, Package, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/policies/warranty")({
  head: () => ({
    meta: [
      { title: "Warranty policy — tech.at.best" },
      { name: "description", content: "Standard manufacturer warranty + tech.at.best 7-day return window on every order. How to claim and what's covered." },
      { property: "og:title", content: "Warranty policy — tech.at.best" },
      { property: "og:description", content: "What's covered, how to raise a claim, brand service centres and timelines." },
    ],
  }),
  component: WarrantyPage,
});

function WarrantyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="font-mono text-[11px] uppercase tracking-widest text-accent">// policies / warranty</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Warranty policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Every product ships with the official manufacturer's India warranty plus our 7-day return window — so you're protected from day one.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card icon={ShieldCheck} title="100% genuine" body="Every unit is sourced directly from authorised distributors." />
        <Card icon={Wrench} title="Brand service centres" body="Warranty serviced through the brand's official India network." />
        <Card icon={Package} title="Coverage from delivery" body="Warranty starts the day the product is delivered to you." />
      </div>

      <Section title="What's covered">
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-success" /> Manufacturing defects in materials and workmanship.</li>
          <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-success" /> Component failure under normal use (e.g. SSD, RAM, panel issues).</li>
          <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-success" /> Battery defects within the brand's stated battery warranty window.</li>
          <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-success" /> Dead-on-arrival units — full replacement within 48 hours of report.</li>
        </ul>
      </Section>

      <Section title="What's not covered">
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2"><AlertTriangle className="h-4 w-4 shrink-0 text-warning" /> Physical damage, liquid damage, or damage from unauthorised repairs.</li>
          <li className="flex gap-2"><AlertTriangle className="h-4 w-4 shrink-0 text-warning" /> Cosmetic wear (scratches, scuffs) from normal use.</li>
          <li className="flex gap-2"><AlertTriangle className="h-4 w-4 shrink-0 text-warning" /> Software issues caused by user-installed apps, mods or BIOS flashes.</li>
          <li className="flex gap-2"><AlertTriangle className="h-4 w-4 shrink-0 text-warning" /> Consumables (thermal paste, removable cables, batteries past warranty).</li>
        </ul>
      </Section>

      <Section title="How to claim">
        <ol className="ml-4 list-decimal space-y-2 text-sm text-muted-foreground">
          <li>Open <span className="text-foreground">Account → Orders</span>, find the order and tap <span className="text-foreground">Raise warranty request</span>.</li>
          <li>Describe the issue and (where possible) attach a short photo or video.</li>
          <li>Our team validates and books the brand service appointment — typically same-day.</li>
          <li>You'll receive an RMA number and pickup/drop instructions within 24 hours.</li>
        </ol>
      </Section>

      <Section title="Standard warranty periods (indicative)">
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr><th className="p-3 text-left">Category</th><th className="p-3 text-left">Typical warranty</th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              <Tr a="Laptops & desktops" b="1 year onsite/carry-in" />
              <Tr a="Monitors" b="3 years" />
              <Tr a="SSDs (NVMe / SATA)" b="3–5 years (or TBW limit)" />
              <Tr a="RAM" b="Lifetime (limited)" />
              <Tr a="Mechanical keyboards & mice" b="1–2 years" />
              <Tr a="Headphones" b="1 year" />
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">Exact terms vary by brand and SKU. See the box documentation or your invoice for the authoritative duration.</p>
      </Section>
    </div>
  );
}

function Card({ icon: Icon, title, body }: { icon: typeof ShieldCheck; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-accent"><Icon className="h-4 w-4" /></div>
      <p className="mt-3 text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs text-muted-foreground">{body}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Tr({ a, b }: { a: string; b: string }) {
  return <tr><td className="p-3 font-medium">{a}</td><td className="p-3 text-muted-foreground">{b}</td></tr>;
}
