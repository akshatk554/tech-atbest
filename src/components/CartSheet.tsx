import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { Minus, Plus, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export function CartSheet() {
  const { items, open, setOpen, setQty, remove, subtotal, clear } = useCart();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-mono text-sm uppercase tracking-widest">
            // Your cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center text-muted-foreground">
            <p className="font-mono text-xs">[ empty_cart ]</p>
            <p className="text-sm">Add some tech to get started.</p>
          </div>
        ) : (
          <div className="flex-1 space-y-3 overflow-y-auto py-4">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="flex gap-3 rounded-lg border border-border p-3">
                <img src={product.image} alt={product.name} className="h-16 w-16 rounded object-cover" />
                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-xs text-muted-foreground">{product.brand}</p>
                  <p className="line-clamp-2 text-sm">{product.name}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded border border-border">
                      <button className="p-1 hover:bg-muted" onClick={() => setQty(product.id, qty - 1)}>
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-6 text-center text-xs">{qty}</span>
                      <button className="p-1 hover:bg-muted" onClick={() => setQty(product.id, qty + 1)}>
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold">{formatPrice(product.price * qty)}</p>
                  </div>
                </div>
                <button onClick={() => remove(product.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="border-t border-border pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">Taxes & shipping calculated at checkout.</p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1" onClick={clear}>Clear</Button>
              <Button
                className="flex-1"
                onClick={() => {
                  items.forEach((it) => window.open(it.product.buyUrl, "_blank", "noopener,noreferrer"));
                  toast.success("Opening retailer pages", { description: "Complete purchase on Amazon." });
                }}
              >
                Checkout <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
