import { ExternalLink, ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add, setOpen } = useCart();
  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-accent hover:shadow-glow">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full border border-accent/40 bg-background/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent backdrop-blur">
            {product.tag}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
            -{discount}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{product.brand}</p>
          <h3 className="mt-1 line-clamp-2 text-sm font-medium text-foreground">{product.name}</h3>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-accent text-accent" />
          <span className="text-foreground">{product.rating}</span>
          <span>· in stock</span>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-lg font-semibold text-foreground">{formatPrice(product.price)}</p>
            {product.mrp && (
              <p className="text-xs text-muted-foreground line-through">{formatPrice(product.mrp)}</p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => {
              add(product);
              toast.success("Added to cart", { description: product.name });
            }}
          >
            <ShoppingCart className="mr-1 h-4 w-4" /> Add
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={() => window.open(product.buyUrl, "_blank", "noopener,noreferrer")}
          >
            Buy <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
        <button
          className="text-[11px] text-muted-foreground underline-offset-2 hover:text-accent hover:underline"
          onClick={() => {
            add(product);
            setOpen(true);
          }}
        >
          Add & view cart
        </button>
      </div>
    </div>
  );
}
