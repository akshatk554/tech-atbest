import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  CATEGORIES, productsByCategory, formatPrice,
  type CategorySlug,
} from "@/lib/products";

const CAT_IMG: Record<CategorySlug, string> = {
  laptops: "photo-1496181133206-80ce9b88a853",
  desktops: "photo-1587202372775-e229f172b9d7",
  monitors: "photo-1527443195645-1133f7f28990",
  ram: "photo-1591488320443-bb1c5e85d4d0",
  ssd: "photo-1531492746076-161ca9bcad58",
  keyboards: "photo-1601445638532-3c6f6c3aa1d6",
  mice: "photo-1527814050087-3793815479db",
  headphones: "photo-1505740420928-5e560c06d30e",
};

export function CategoryShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent">// shop_by_category</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Find your next setup</h2>
        </div>
        <Link to="/accessories" className="hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex">
          All accessories <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((c) => {
          const items = productsByCategory(c.slug);
          const min = Math.min(...items.map((p) => p.price));
          return (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lift"
            >
              <div className="relative aspect-[5/4] overflow-hidden bg-gradient-to-br from-secondary to-card">
                <img
                  src={`https://images.unsplash.com/${CAT_IMG[c.slug]}?auto=format&fit=crop&w=800&q=80`}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/10 to-transparent" />
                <span className="absolute right-3 top-3 rounded-full bg-card/95 px-2.5 py-1 text-[11px] font-semibold text-primary shadow-soft backdrop-blur">
                  {items.length} items
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-1 p-4">
                <h3 className="text-base font-bold text-foreground">{c.title}</h3>
                <p className="text-xs text-muted-foreground">From <span className="font-semibold text-accent">{formatPrice(min)}</span></p>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-xs font-medium text-accent">
                  Shop now <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
