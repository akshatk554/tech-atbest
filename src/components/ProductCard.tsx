import { Link } from "@tanstack/react-router";
import { Heart, Scale, ShoppingCart, Star, Truck, Eye } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useCompare } from "@/lib/compare";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ProductCard({ product, eta = "2–4 days" }: { product: Product; eta?: string }) {
  const { add } = useCart();
  const wl = useWishlist();
  const cmp = useCompare();
  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  const reviews = 40 + (product.id.charCodeAt(0) * 7) % 380;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lift">
      <Link to="/product/$id" params={{ id: product.id }} className="relative block aspect-[4/3] overflow-hidden bg-secondary/50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {product.tag && (
              <span className="rounded-full bg-card/95 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary shadow-soft backdrop-blur">
                {product.tag}
              </span>
            )}
            {discount > 0 && (
              <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground shadow-soft">
                -{discount}%
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Floating action rail */}
      <div className="pointer-events-none absolute right-3 top-3 flex flex-col gap-1.5 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
        <ActionBtn
          active={wl.has(product.id)}
          onClick={() => {
            wl.toggle(product.id);
            toast.success(wl.has(product.id) ? "Removed from wishlist" : "Added to wishlist", { description: product.name });
          }}
          label="Wishlist"
        >
          <Heart className={cn("h-3.5 w-3.5", wl.has(product.id) && "fill-current")} />
        </ActionBtn>
        <ActionBtn
          active={cmp.has(product.id)}
          onClick={() => cmp.toggle(product.id)}
          label="Compare"
        >
          <Scale className="h-3.5 w-3.5" />
        </ActionBtn>
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          aria-label="Quick view"
          className="grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition-colors hover:bg-secondary"
        >
          <Eye className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2 text-[11px]">
          <span className="font-medium uppercase tracking-wider text-muted-foreground">{product.brand}</span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Star className="h-3 w-3 fill-warning text-warning" />
            <span className="text-foreground font-medium">{product.rating}</span>
            <span>({reviews})</span>
          </span>
        </div>

        <Link to="/product/$id" params={{ id: product.id }} className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-foreground hover:text-accent">
          {product.name}
        </Link>

        <div className="mt-1 flex items-end gap-2">
          <p className="text-lg font-bold text-foreground">{formatPrice(product.price)}</p>
          {product.mrp && <p className="pb-0.5 text-xs text-muted-foreground line-through">{formatPrice(product.mrp)}</p>}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Truck className="h-3 w-3 text-success" /> Delivery in {eta}
          <span className="ml-auto inline-flex items-center gap-1 text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> In stock
          </span>
        </div>

        <button
          onClick={() => {
            add(product);
            toast.success("Added to cart", { description: product.name });
          }}
          className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
        >
          <ShoppingCart className="h-3.5 w-3.5" /> Add to cart
        </button>
      </div>
    </div>
  );
}

function ActionBtn({ active, onClick, label, children }: { active?: boolean; onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "grid h-8 w-8 place-items-center rounded-full border shadow-soft transition-all",
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-card text-foreground hover:bg-secondary"
      )}
    >
      {children}
    </button>
  );
}
