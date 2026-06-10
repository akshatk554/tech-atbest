import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & buying guides — tech.at.best" },
      { name: "description", content: "Buying guides, build advice and product deep-dives for laptops, monitors, components and accessories." },
      { property: "og:title", content: "Blog & buying guides — tech.at.best" },
      { property: "og:description", content: "Hands-on advice, comparisons and buying guides from the tech.at.best team." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BlogIndex,
});

type Post = { slug: string; title: string; excerpt: string; date: string; readMin: number; tag: string; image: string; body: string[] };

const POSTS: Post[] = [
  {
    slug: "best-laptops-under-1l-2026",
    title: "The best laptops under ₹1,00,000 in 2026",
    excerpt: "We tested 14 popular sub-₹1L laptops across daily-driver, content and light gaming workloads. Here's what won.",
    date: "08 Jun 2026", readMin: 7, tag: "Buying guide",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1600&q=80",
    body: [
      "If you're spending around a lakh, you have more options than ever. The sweet spot in 2026 is a 14\" OLED with at least 16 GB of LPDDR5 and a Meteor Lake / Hawk Point class CPU.",
      "Our top pick balances battery, display and build. Read on for the shortlist and which scenarios each laptop wins.",
    ],
  },
  {
    slug: "ddr4-vs-ddr5-2026",
    title: "DDR4 vs DDR5 in 2026: is it finally time to upgrade?",
    excerpt: "DDR5 prices have fallen sharply. We break down the real-world latency, bandwidth and FPS differences.",
    date: "02 Jun 2026", readMin: 5, tag: "Components",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1600&q=80",
    body: ["DDR5 is now within 8–12% of DDR4 pricing on mainstream kits. For gaming the gap is small; for creator workloads it's meaningful."],
  },
  {
    slug: "4k-monitor-buying-guide",
    title: "How to pick a 4K monitor that actually looks great",
    excerpt: "Panel type, HDR certification, refresh rate, scaling… here's the order in which they actually matter.",
    date: "27 May 2026", readMin: 6, tag: "Monitors",
    image: "https://images.unsplash.com/photo-1527443195645-1133f7f28990?auto=format&fit=crop&w=1600&q=80",
    body: ["Most 4K monitors look fine in a store. The differences show up on a desk, with real content."],
  },
  {
    slug: "first-pc-build-checklist",
    title: "Your first PC build: a no-panic checklist",
    excerpt: "From part picking to first POST — the steps and mistakes we wish we'd known on build #1.",
    date: "20 May 2026", readMin: 8, tag: "Builds",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1600&q=80",
    body: ["Start with the case — it determines GPU length, CPU cooler height, and PSU support."],
  },
  {
    slug: "nvme-vs-sata-ssd",
    title: "NVMe vs SATA SSDs: when the upgrade is worth it",
    excerpt: "Loading times, game install sizes and 4K read patterns. Spoiler: NVMe wins, but not where you'd expect.",
    date: "12 May 2026", readMin: 4, tag: "Storage",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1600&q=80",
    body: ["NVMe SSDs are 5–8× faster on sequential reads, but real-world game load times are often within 20%."],
  },
  {
    slug: "mech-keyboards-2026",
    title: "Mechanical keyboards in 2026: what's actually new",
    excerpt: "Hall-effect, magnetic switches, rapid trigger… here's what's hype and what's worth your money.",
    date: "05 May 2026", readMin: 5, tag: "Accessories",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1600&q=80",
    body: ["Rapid trigger and adjustable actuation are genuine improvements for competitive play."],
  },
];

function BlogIndex() {
  const [featured, ...rest] = POSTS;
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">// blog</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Buying guides & build advice</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Hands-on reviews, comparisons and explainers from the tech.at.best team. No fluff — just what we'd buy.</p>
      </div>

      {/* Featured */}
      <Link to="/blog" hash={featured.slug} className="mt-8 grid overflow-hidden rounded-3xl border border-border bg-card transition hover:border-accent md:grid-cols-[1.2fr_1fr]">
        <div className="aspect-[16/10] overflow-hidden bg-muted">
          <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-10">
          <span className="inline-flex w-fit rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">{featured.tag}</span>
          <h2 className="mt-3 text-2xl font-bold leading-tight md:text-3xl">{featured.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{featured.excerpt}</p>
          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {featured.date}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {featured.readMin} min read</span>
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">Read article <ArrowRight className="h-3.5 w-3.5" /></span>
        </div>
      </Link>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <article key={p.slug} id={p.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-accent hover:shadow-card">
            <div className="aspect-[16/10] overflow-hidden bg-muted">
              <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="inline-flex w-fit rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{p.tag}</span>
              <h3 className="mt-2 line-clamp-2 text-base font-bold leading-snug">{p.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <div className="mt-auto flex items-center gap-3 pt-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.date}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {p.readMin} min</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-card to-accent/5 p-6 text-center shadow-soft">
        <h2 className="text-lg font-semibold">Get our Friday picks</h2>
        <p className="mt-1 text-sm text-muted-foreground">One short email a week, curated deals and one fresh guide. No spam.</p>
        <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-4 flex max-w-md gap-2">
          <input type="email" placeholder="you@email.com" className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent" />
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Subscribe</button>
        </form>
      </div>
    </div>
  );
}
