import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, productsByCategory, type CategorySlug } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Accessories & components — tech.at.best" },
      { name: "description", content: "Monitors, RAM, SSDs, keyboards, mice and headphones — all the parts that complete your rig, curated from top brands." },
      { property: "og:title", content: "Accessories & components — tech.at.best" },
      { property: "og:description", content: "Monitors, RAM, SSDs, keyboards, mice and headphones — all the parts that complete your rig." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://tech-atbest.lovable.app/accessories" },
    ],
  }),
  component: AccessoriesPage,
});

function AccessoriesPage() {
  const accessoryCats = CATEGORIES.filter((c) => c.group === "accessories");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <header className="border-b border-border pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">// /accessories</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Accessories & components</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Everything that plugs in, slots in, or sits next to your machine. Browse by category below.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {accessoryCats.map((c) => (
          <a
            key={c.slug}
            href={`#${c.slug}`}
            className="rounded-xl border border-border bg-card p-4 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            {c.title}
          </a>
        ))}
      </div>

      {accessoryCats.map((c) => {
        const items = productsByCategory(c.slug as CategorySlug);
        return (
          <section key={c.slug} id={c.slug} className="mt-16 scroll-mt-24">
            <div className="flex flex-wrap items-end justify-between gap-2 border-b border-border pb-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent">// {c.slug}</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">{c.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{c.blurb}</p>
              </div>
              <Link
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="flex items-center gap-1 text-xs text-accent hover:underline"
              >
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
