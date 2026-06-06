import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES, getCategory, productsByCategory, type CategorySlug } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const cat = getCategory(params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.cat.title} — tech.at.best` },
          { name: "description", content: loaderData.cat.blurb },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center">
      <p className="font-mono text-sm text-muted-foreground">[ 404 · category_not_found ]</p>
      <Link to="/" className="mt-4 inline-block text-accent underline">Return home</Link>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const all = productsByCategory(cat.slug as CategorySlug);
  const [brand, setBrand] = useState<string>("all");

  const filtered = brand === "all" ? all : all.filter((p) => p.brand === brand);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">home</Link>
        <ChevronRight className="h-3 w-3" />
        <span>{cat.group}</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{cat.slug}</span>
      </nav>

      <header className="mt-4 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{cat.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{cat.blurb}</p>
        </div>
        <p className="font-mono text-xs text-muted-foreground">{filtered.length} results</p>
      </header>

      <div className="mt-6 flex flex-wrap gap-2">
        <FilterChip active={brand === "all"} onClick={() => setBrand("all")}>All brands</FilterChip>
        {cat.brands.map((b: string) => (
          <FilterChip key={b} active={brand === b} onClick={() => setBrand(b)}>{b}</FilterChip>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
          No products match this filter yet.
        </div>
      )}

      <aside className="mt-16 rounded-2xl border border-border bg-card/40 p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">// explore_more</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c.slug !== cat.slug).map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-accent hover:text-foreground"
            >
              {c.title}
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs transition-colors",
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border text-muted-foreground hover:border-accent hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
