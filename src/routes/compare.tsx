import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Scale, ShoppingCart, Star, X } from "lucide-react";
import { PRODUCTS, formatPrice } from "@/lib/products";
import { useCompare } from "@/lib/compare";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare products — tech.at.best" },
      { name: "description", content: "Side-by-side specs, prices and ratings to help you pick the right product." },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  const { ids, remove, clear } = useCompare();
  const { add } = useCart();
  const items = PRODUCTS.filter((p) => ids.includes(p.id));
  const allKeys = Array.from(new Set(items.flatMap((p) => Object.keys(p.specs ?? {}))));
  const lowest = items.length > 0 ? Math.min(...items.map((p) => p.price)) : 0;
  const topRating = items.length > 0 ? Math.max(...items.map((p) => p.rating)) : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent">// side_by_side</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Compare products</h1>
          <p className="mt-2 text-sm text-muted-foreground">Up to 4 products at once · best price and rating highlighted</p>
        </div>
        {items.length > 0 && (
          <button onClick={clear} className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground hover:border-destructive hover:text-destructive">
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-16 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-secondary"><Scale className="h-6 w-6 text-muted-foreground" /></div>
          <h2 className="text-lg font-semibold">Nothing to compare yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">Tap the compare icon on any product card to add it here.</p>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 w-44 border-b border-r border-border bg-card p-4 text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Product</th>
                {items.map((p) => (
                  <th key={p.id} className="min-w-[240px] border-b border-border p-4 text-left align-top">
                    <div className="relative">
                      <button onClick={() => remove(p.id)} className="absolute right-0 top-0 grid h-7 w-7 place-items-center rounded-full border border-border bg-card text-muted-foreground hover:border-destructive hover:text-destructive" aria-label="Remove">
                        <X className="h-3.5 w-3.5" />
                      </button>
                      <img src={p.image} alt={p.name} className="h-32 w-full rounded-lg object-cover" />
                      <p className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground">{p.brand}</p>
                      <Link to="/product/$id" params={{ id: p.id }} className="mt-1 line-clamp-2 block text-sm font-semibold hover:text-accent">{p.name}</Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <Row label="Price" sticky>
                {items.map((p) => (
                  <td key={p.id} className={cn("border-t border-border p-4 align-top", p.price === lowest && "bg-success/5")}>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold">{formatPrice(p.price)}</span>
                      {p.price === lowest && <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">Lowest</span>}
                    </div>
                    {p.mrp && <p className="text-xs text-muted-foreground line-through">{formatPrice(p.mrp)}</p>}
                  </td>
                ))}
              </Row>
              <Row label="Rating" sticky>
                {items.map((p) => (
                  <td key={p.id} className={cn("border-t border-border p-4 align-top", p.rating === topRating && "bg-warning/5")}>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                      <span className="font-semibold">{p.rating}</span>
                      {p.rating === topRating && <span className="ml-1 rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-semibold text-warning">Top</span>}
                    </div>
                  </td>
                ))}
              </Row>
              <Row label="Category" sticky>
                {items.map((p) => <td key={p.id} className="border-t border-border p-4 align-top capitalize">{p.category}</td>)}
              </Row>
              {allKeys.map((k) => (
                <Row key={k} label={k} sticky>
                  {items.map((p) => {
                    const v = p.specs?.[k];
                    return (
                      <td key={p.id} className="border-t border-border p-4 align-top text-foreground">
                        {v ? v : <span className="text-muted-foreground"><X className="inline h-3 w-3" /></span>}
                      </td>
                    );
                  })}
                </Row>
              ))}
              <Row label="" sticky>
                {items.map((p) => (
                  <td key={p.id} className="border-t border-border p-4 align-top">
                    <button onClick={() => { add(p); toast.success("Added to cart", { description: p.name }); }} className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
                      <ShoppingCart className="h-3.5 w-3.5" /> Add to cart
                    </button>
                  </td>
                ))}
              </Row>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Row({ label, sticky, children }: { label: string; sticky?: boolean; children: React.ReactNode }) {
  return (
    <tr>
      <td className={cn("border-t border-r border-border p-4 align-top text-xs font-semibold uppercase tracking-wider text-muted-foreground", sticky && "sticky left-0 bg-card")}>{label}</td>
      {children}
    </tr>
  );
}

// dead-code guard to keep import warning quiet
const _check = Check;
void _check;
