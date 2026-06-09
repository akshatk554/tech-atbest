import { Link } from "@tanstack/react-router";
import { Heart, Home, Scale, Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useCompare } from "@/lib/compare";

export function MobileTabBar() {
  const { count, setOpen } = useCart();
  const wl = useWishlist();
  const cmp = useCompare();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-5">
        <Tab to="/" icon={<Home className="h-5 w-5" />} label="Home" />
        <Tab to="/deals" icon={<Search className="h-5 w-5" />} label="Deals" />
        <Tab to="/compare" icon={<Scale className="h-5 w-5" />} label="Compare" badge={cmp.count} />
        <Tab to="/wishlist" icon={<Heart className="h-5 w-5" />} label="Saved" badge={wl.count} />
        <button onClick={() => setOpen(true)} className="flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] text-muted-foreground" aria-label="Cart">
          <span className="relative">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-bold text-accent-foreground">{count}</span>}
          </span>
          Cart
        </button>
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}

function Tab({ to, icon, label, badge }: { to: string; icon: React.ReactNode; label: string; badge?: number }) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] text-muted-foreground"
      activeProps={{ className: "flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] text-accent" }}
    >
      <span className="relative">
        {icon}
        {badge != null && badge > 0 && <span className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-bold text-accent-foreground">{badge}</span>}
      </span>
      {label}
    </Link>
  );
}
