import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone, Truck, RefreshCcw, ShieldCheck, CreditCard, Package, Wrench } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Help center & support — tech.at.best" },
      { name: "description", content: "Get help with orders, returns, warranty, payments and account on tech.at.best. Talk to a human Mon–Sat, 10:00–19:00 IST." },
      { property: "og:title", content: "Help center & support — tech.at.best" },
      { property: "og:description", content: "Browse help topics or reach our team directly." },
    ],
  }),
  component: SupportPage,
});

const TOPICS = [
  { icon: Package, title: "Track an order", desc: "Status, ETA, delivery partner", to: "/account" as const },
  { icon: RefreshCcw, title: "Returns & refunds", desc: "How to start a return, timelines", to: "/policies/returns" as const },
  { icon: Truck, title: "Shipping & delivery", desc: "Pincode availability, charges", to: "/policies/shipping" as const },
  { icon: ShieldCheck, title: "Warranty claims", desc: "Coverage, brand service centres", to: "/policies/warranty" as const },
  { icon: CreditCard, title: "Payments & invoices", desc: "GST, EMI, refunds to source", to: "/faq" as const },
  { icon: Wrench, title: "Build advice", desc: "Compatibility, recommendations", to: "/build-pc" as const },
];

function SupportPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">// help_center</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">How can we help?</h1>
        <p className="mt-2 text-sm text-muted-foreground">Pick a topic, browse the FAQ, or get in touch with a human.</p>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map((t) => (
          <Link key={t.title} to={t.to} className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-accent hover:shadow-card">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <t.icon className="h-4 w-4" />
            </div>
            <p className="mt-3 text-sm font-semibold">{t.title}</p>
            <p className="text-xs text-muted-foreground">{t.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Talk to us</h2>
          <p className="mt-1 text-sm text-muted-foreground">Mon–Sat · 10:00 – 19:00 IST. We typically reply within a few hours.</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-accent"><Mail className="h-4 w-4" /></span>
              <a href="mailto:akshatk554@gmail.com" className="hover:text-accent">akshatk554@gmail.com</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-accent"><Phone className="h-4 w-4" /></span>
              <a href="tel:+917004646000" className="hover:text-accent">+91 70046 46xxx</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-accent"><MessageCircle className="h-4 w-4" /></span>
              <a href="https://wa.me/917004646000" target="_blank" rel="noopener noreferrer" className="hover:text-accent">WhatsApp chat</a>
            </li>
          </ul>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}

function ContactForm() {
  const [busy, setBusy] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setBusy(true);
        setTimeout(() => { setBusy(false); toast.success("Message sent", { description: "We'll get back to you shortly." }); (e.target as HTMLFormElement).reset(); }, 600);
      }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <h2 className="text-lg font-semibold">Send a message</h2>
      <p className="mt-1 text-sm text-muted-foreground">Tell us what's up — we'll reply by email.</p>

      <div className="mt-4 grid gap-3">
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">Name</span>
          <input required className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent" />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">Email</span>
          <input required type="email" className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent" />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">Order ID (optional)</span>
          <input placeholder="TAB-…" className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent" />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">Message</span>
          <textarea required rows={4} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent" />
        </label>
        <button disabled={busy} className="mt-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
          {busy ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
