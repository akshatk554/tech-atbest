import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/lib/wishlist";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your wishlist — tech.at.best" },
      { name: "description", content: "Saved products waiting for you. Move to cart in one click." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { ids, clear } = useWishlist();
  const items = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent">// saved_for_later</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Your wishlist</h1>
          <p className="mt-2 text-sm text-muted-foreground">{items.length} {items.length === 1 ? "item" : "items"} saved</p>
        </div>
        {items.length > 0 && (
          <button onClick={clear} className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground hover:border-destructive hover:text-destructive">
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-16 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-secondary"><Heart className="h-6 w-6 text-muted-foreground" /></div>
          <h2 className="text-lg font-semibold">No saved items yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">Tap the heart on any product to save it for later.</p>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <ShoppingBag className="h-4 w-4" /> Browse products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
