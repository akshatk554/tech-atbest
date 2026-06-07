import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, Shield, Truck, Zap } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "tech.at.best — Computers & accessories" },
      { name: "description", content: "Curated laptops, desktops, monitors and components with one-click checkout to Amazon." },
    ],
  }),
  component: Home,
});

const featured = PRODUCTS.filter((p) => p.tag).slice(0, 8);

// Picks for the hero bento (one tall + small grid, à la image 2)
const heroPicks = [
  PRODUCTS.find((p) => p.id === "lap-3")!, // MacBook Air — tall feature
  PRODUCTS.find((p) => p.id === "lap-2")!, // ASUS ROG
  PRODUCTS.find((p) => p.id === "mon-2")!, // Samsung Odyssey G7
  PRODUCTS.find((p) => p.id === "ms-1")!,  // Logitech MX Master 3S
  PRODUCTS.find((p) => p.id === "kb-2")!,  // MX Keys S
];

function HeroBento() {
  const [feature, ...rest] = heroPicks;
  return (
    <div className="grid h-[440px] grid-cols-2 grid-rows-2 gap-3 md:h-[520px]">
      <BentoCard product={feature} className="row-span-2" />
      {rest.slice(0, 4).map((p) => (
        <BentoCard key={p.id} product={p} />
      ))}
    </div>
  );
}

function BentoCard({ product, className }: { product: typeof PRODUCTS[number]; className?: string }) {
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className={`group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-accent hover:shadow-glow ${className ?? ""}`}
    >
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="text-sm font-medium text-foreground line-clamp-1">{product.name}</p>
        <p className="mt-0.5 font-mono text-xs text-accent">₹{product.price.toLocaleString("en-IN")}</p>
      </div>
    </Link>
  );
}

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              online · {PRODUCTS.length} products in stock
            </div>
            <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Computers, components &{" "}
              <span className="bg-gradient-to-r from-accent to-foreground bg-clip-text text-transparent">
                everything in between.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              A curated catalogue of laptops, desktops, monitors, RAM, SSDs and the accessories that
              make them sing. Hand-picked. Honest specs. Zero clutter.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/category/$slug" params={{ slug: "laptops" }}>
                  Shop laptops <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/accessories">Browse accessories</Link>
              </Button>
            </div>

            <div className="mt-10 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { icon: Truck, label: "Fast shipping" },
                { icon: Shield, label: "Verified sellers" },
                { icon: Zap, label: "1-click checkout" },
                { icon: Cpu, label: "Spec-first picks" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <f.icon className="h-4 w-4 text-accent" /> {f.label}
                </div>
              ))}
            </div>
          </div>

          {/* Bento featured grid */}
          <HeroBento />
        </div>
      </section>

      {/* Clearance */}
      <section className="border-b border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">// clearance_store</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">Deals running now</h2>
              <p className="mt-1 text-sm text-muted-foreground">Discounted picks across categories. Limited stock.</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {PRODUCTS.filter((p) => p.mrp).slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse categories */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">// browse_by_category</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">Shop the stack</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:border-accent hover:shadow-glow"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {c.group === "computers" ? "/computers" : "/accessories"}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{c.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.blurb}</p>
              <div className="mt-4 flex items-center gap-1 text-xs text-accent">
                Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">// editor_featured</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">Hand-picked this week</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
