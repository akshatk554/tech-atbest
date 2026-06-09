import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, ShieldCheck, Sparkles, Truck, Wrench, Zap } from "lucide-react";
import { CATEGORIES, PRODUCTS, formatPrice, productsByCategory } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { TrustStrip } from "@/components/TrustStrip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "tech.at.best — Build. Upgrade. Game. Create." },
      { name: "description", content: "Premium laptops, desktops, components and accessories. Hand-picked specs, transparent pricing, fast delivery across India." },
      { property: "og:title", content: "tech.at.best — Build. Upgrade. Game. Create." },
      { property: "og:description", content: "Premium laptops, desktops, components and accessories. Hand-picked specs, transparent pricing, fast delivery." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://tech-atbest.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Organization",
          name: "tech.at.best", url: "https://tech-atbest.lovable.app",
          email: "akshatk554@gmail.com",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org", "@type": "WebSite",
          name: "tech.at.best", url: "https://tech-atbest.lovable.app",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://tech-atbest.lovable.app/?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  component: Home,
});

const featured = PRODUCTS.filter((p) => p.tag).slice(0, 8);
const dealItems = PRODUCTS.filter((p) => p.mrp).slice(0, 8);
const trending = PRODUCTS.filter((p) => p.rating >= 4.6).slice(0, 8);

function Hero() {
  const showcase = [
    PRODUCTS.find((p) => p.id === "lap-3")!,
    PRODUCTS.find((p) => p.id === "lap-2")!,
    PRODUCTS.find((p) => p.id === "mon-2")!,
    PRODUCTS.find((p) => p.id === "kb-2")!,
  ];
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 hero-glow" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent backdrop-blur shadow-soft">
            <Sparkles className="h-3 w-3" /> Curated by builders, for builders
          </div>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
            Build. Upgrade.<br />
            <span className="gradient-text">Game. Create.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Discover laptops, PCs, components and accessories chosen for performance and reliability — with transparent specs, real reviews, and one‑click checkout.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/category/$slug" params={{ slug: "laptops" }} className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lift transition-all hover:scale-[1.02] hover:bg-primary/90">
              Shop now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/build-pc" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-all hover:border-accent hover:bg-card">
              <Wrench className="h-4 w-4" /> Build your PC
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
            <Badge icon={Truck}>Free shipping ₹999+</Badge>
            <Badge icon={ShieldCheck}>Verified sellers</Badge>
            <Badge icon={Zap}>Secure checkout</Badge>
            <Badge icon={Cpu}>Easy returns</Badge>
          </div>
        </div>

        {/* Visual showcase */}
        <div className="relative grid grid-cols-6 grid-rows-6 gap-3 md:h-[520px]">
          <Link to="/product/$id" params={{ id: showcase[0].id }} className="group col-span-4 row-span-4 overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
            <div className="relative h-full w-full">
              <img src={showcase[0].image} alt={showcase[0].name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent">Editor's pick</p>
                <p className="mt-1 text-lg font-bold text-foreground">{showcase[0].name}</p>
                <p className="text-sm font-semibold text-accent">{formatPrice(showcase[0].price)}</p>
              </div>
            </div>
          </Link>
          <Link to="/product/$id" params={{ id: showcase[1].id }} className="group col-span-2 row-span-2 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <img src={showcase[1].image} alt={showcase[1].name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </Link>
          <Link to="/product/$id" params={{ id: showcase[2].id }} className="group col-span-2 row-span-2 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <img src={showcase[2].image} alt={showcase[2].name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </Link>
          <div className="col-span-6 row-span-2 grid grid-cols-3 gap-3">
            {[
              { label: "Products", value: PRODUCTS.length },
              { label: "Categories", value: CATEGORIES.length },
              { label: "Avg rating", value: "4.6★" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card/90 p-3 text-center backdrop-blur shadow-soft">
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ icon: Icon, children }: { icon: typeof Truck; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-card text-accent shadow-soft border border-border"><Icon className="h-3.5 w-3.5" /></span>
      <span className="font-medium text-foreground">{children}</span>
    </span>
  );
}

function Home() {
  return (
    <div>
      <Hero />
      <TrustStrip />
      <CategoryShowcase />

      {/* Deals */}
      <section className="border-y border-border bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-accent">// flash_deals</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Deals running now</h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">Limited-time discounts across laptops, components and accessories.</p>
            </div>
            <Link to="/deals" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">All deals <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {dealItems.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-accent">// trending_now</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Top-rated this week</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Build PC banner */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <Link to="/build-pc" className="group relative block overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary to-primary/80 p-8 md:p-12 shadow-lift">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-accent-foreground/80">// pc_builder</p>
              <h2 className="mt-2 text-3xl font-extrabold text-primary-foreground md:text-4xl">Build the PC of your dreams</h2>
              <p className="mt-3 max-w-xl text-sm text-primary-foreground/80">Pick CPU, GPU, RAM, storage and cooling — we'll check compatibility, estimate wattage and total your build in real time.</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-lift transition-transform group-hover:scale-105">
              <Wrench className="h-4 w-4" /> Launch builder <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="mb-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent">// hand_picked</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Featured this week</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
