import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — tech.at.best" },
      { name: "description", content: "Frequently asked questions about orders, shipping, returns, warranty, and payments on tech.at.best." },
      { property: "og:title", content: "FAQ — tech.at.best" },
      { property: "og:description", content: "Quick answers about orders, shipping, returns, warranty, and payments." },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: ALL_FAQS.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FAQPage,
});

const ALL_FAQS: { cat: string; q: string; a: string }[] = [
  { cat: "Orders", q: "How do I place an order?", a: "Pick a product, add it to cart and check out. You can also Buy Now to skip the cart. We support UPI, cards, net banking and EMI." },
  { cat: "Orders", q: "Can I cancel my order?", a: "Yes, you can cancel any order from your Account → Orders before it is shipped. After shipping, please request a return on delivery." },
  { cat: "Orders", q: "Do you provide a GST invoice?", a: "Yes — every order ships with a GST invoice. Add your GSTIN in Account → Settings before checkout to claim input tax credit." },
  { cat: "Shipping", q: "How long does delivery take?", a: "Metro cities: 2–3 business days. Tier-2/3 cities: 4–6 business days. Express delivery is available at checkout for select pincodes." },
  { cat: "Shipping", q: "Do you ship outside India?", a: "Currently we ship across India only. International shipping is on our roadmap for 2026." },
  { cat: "Shipping", q: "Is shipping free?", a: "Free shipping on all orders above ₹999. Below that, ₹49 standard / ₹149 express." },
  { cat: "Returns", q: "What is your return policy?", a: "7-day no-questions returns from the date of delivery for unused items in original packaging. See /policies/returns for full details." },
  { cat: "Returns", q: "How long do refunds take?", a: "Once the item is picked up and verified, refunds are issued within 3–5 business days to the original payment method." },
  { cat: "Warranty", q: "Is the manufacturer warranty valid?", a: "Yes — all products are 100% genuine and carry the official manufacturer's India warranty plus our 7-day return window on top." },
  { cat: "Warranty", q: "How do I claim a warranty?", a: "Open Account → Orders, click the order, then 'Raise warranty request'. We coordinate directly with the brand on your behalf." },
  { cat: "Payments", q: "What payment methods are accepted?", a: "UPI, all major credit/debit cards, net banking, EMI on cards, and pay-later via Simpl / LazyPay." },
  { cat: "Payments", q: "Is COD available?", a: "Cash on delivery is available for orders under ₹15,000 across most pincodes." },
];

const CATS = ["All", "Orders", "Shipping", "Returns", "Warranty", "Payments"];

function FAQPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    return ALL_FAQS.filter((f) => (cat === "All" || f.cat === cat) && (!s || f.q.toLowerCase().includes(s) || f.a.toLowerCase().includes(s)));
  }, [q, cat]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">// help / faq</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Frequently asked questions</h1>
        <p className="mt-2 text-sm text-muted-foreground">Quick answers about orders, shipping, returns, warranty and payments.</p>
      </div>

      <div className="mt-8 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search FAQs…" className="w-full bg-transparent text-sm outline-none" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-3 py-1 text-xs font-medium transition ${cat === c ? "border-accent bg-accent text-accent-foreground" : "border-border bg-card hover:border-accent"}`}>{c}</button>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-card/50 p-10 text-center text-sm text-muted-foreground">No matches. Try a different keyword.</p>
        ) : filtered.map((f) => (
          <details key={f.q} className="group rounded-xl border border-border bg-card p-4">
            <summary className="flex cursor-pointer items-center gap-3 text-sm font-semibold">
              <HelpCircle className="h-4 w-4 text-accent" />
              <span className="flex-1">{f.q}</span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{f.cat}</span>
            </summary>
            <p className="mt-3 pl-7 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-card to-accent/5 p-6 text-center shadow-soft">
        <h2 className="text-lg font-semibold">Still need a hand?</h2>
        <p className="mt-1 text-sm text-muted-foreground">Our team replies within a few hours, Mon–Sat.</p>
        <Link to="/support" className="mt-4 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Contact support</Link>
      </div>
    </div>
  );
}
