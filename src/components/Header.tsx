import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search, ShoppingCart, Menu, X, Cpu, Heart, Scale, User, ChevronDown,
  Laptop, Monitor, MemoryStick, HardDrive, Keyboard, Mouse, Headphones, Tag, Wrench,
  Sun, Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES, PRODUCTS, formatPrice, productsByCategory } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useCompare } from "@/lib/compare";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const CAT_ICONS: Record<string, typeof Laptop> = {
  laptops: Laptop, desktops: Cpu, monitors: Monitor, ram: MemoryStick,
  ssd: HardDrive, keyboards: Keyboard, mice: Mouse, headphones: Headphones,
};

const POPULAR = ["RTX 4070", "MacBook Air M3", "Samsung 980 Pro", "Mechanical keyboard", "4K monitor"];
const HISTORY_KEY = "tab_search_history_v1";

export function Header() {
  const { count: cartCount, setOpen } = useCart();
  const { count: wlCount } = useWishlist();
  const { count: cmpCount } = useCompare();
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const [menu, setMenu] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const searchRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMenu(false); setCatOpen(false); setFocus(false); }, [pathname]);
  useEffect(() => {
    try { const r = localStorage.getItem(HISTORY_KEY); if (r) setHistory(JSON.parse(r)); } catch {}
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setFocus(false);
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(s) ||
      p.brand.toLowerCase().includes(s) ||
      p.category.toLowerCase().includes(s)
    ).slice(0, 7);
  }, [q]);

  const matchedCats = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return CATEGORIES.filter((c) => c.title.toLowerCase().includes(s) || c.slug.includes(s)).slice(0, 3);
  }, [q]);

  const commit = (term: string) => {
    if (!term.trim()) return;
    const next = [term, ...history.filter((h) => h !== term)].slice(0, 6);
    setHistory(next);
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(next)); } catch {}
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      {/* Promo strip */}
      <div className="hidden bg-primary text-primary-foreground sm:block">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-4 text-[11px]">
          <p className="opacity-90">Free shipping over ₹999 · 7-day no-questions returns · GST invoice on all orders</p>
          <div className="flex items-center gap-4 opacity-80">
            <Link to="/sell" className="hover:underline">Sell on tech.at.best</Link>
            <Link to="/policies/returns" className="hover:underline">Returns</Link>
            <a href="mailto:akshatk554@gmail.com" className="hover:underline">Help</a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
        <Link to="/" className="flex shrink-0 items-center gap-2 font-display text-base font-bold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
            <Cpu className="h-4 w-4" />
          </span>
          <span className="hidden text-foreground sm:inline">
            tech<span className="text-accent">.</span>at<span className="text-accent">.</span>best
          </span>
        </Link>

        {/* Categories mega menu trigger */}
        <div ref={catRef} className="relative hidden md:block">
          <button
            onClick={() => setCatOpen((v) => !v)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              catOpen ? "bg-secondary text-foreground" : "text-foreground hover:bg-secondary"
            )}
            aria-expanded={catOpen}
            aria-label="Browse categories"
          >
            <Menu className="h-4 w-4" /> Categories
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", catOpen && "rotate-180")} />
          </button>
          {catOpen && (
            <div className="absolute left-0 top-full mt-2 w-[640px] overflow-hidden rounded-2xl border border-border bg-popover p-3 shadow-card">
              <p className="px-2 pb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">All categories</p>
              <div className="grid grid-cols-2 gap-1">
                {CATEGORIES.map((c) => {
                  const Icon = CAT_ICONS[c.slug] ?? Laptop;
                  const items = productsByCategory(c.slug);
                  const min = Math.min(...items.map((p) => p.price));
                  return (
                    <Link
                      key={c.slug}
                      to="/category/$slug"
                      params={{ slug: c.slug }}
                      className="group flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-secondary"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{c.title}</p>
                        <p className="text-[11px] text-muted-foreground">{items.length} products · from {formatPrice(min)}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Top nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink to="/deals" icon={<Tag className="h-3.5 w-3.5" />}>Deals</NavLink>
          <NavLink to="/build-pc" icon={<Wrench className="h-3.5 w-3.5" />}>Build PC</NavLink>
          <NavLink to="/compare" icon={<Scale className="h-3.5 w-3.5" />}>Compare</NavLink>
        </nav>

        {/* Search */}
        <div ref={searchRef} className="relative ml-auto hidden flex-1 max-w-xl sm:block">
          <div className={cn(
            "flex items-center gap-2 rounded-xl border bg-secondary/60 px-3.5 py-2.5 transition-all",
            focus ? "border-accent bg-card shadow-soft" : "border-transparent hover:bg-secondary"
          )}>
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onFocus={() => setFocus(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results[0]) {
                  commit(q);
                  navigate({ to: "/product/$id", params: { id: results[0].id } });
                  setQ(""); setFocus(false);
                }
              }}
              placeholder="Search laptops, RTX 4070, monitors, brands…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              aria-label="Search products"
            />
            {q && <button onClick={() => setQ("")} className="text-muted-foreground hover:text-foreground" aria-label="Clear search"><X className="h-3.5 w-3.5" /></button>}
          </div>

          {focus && (
            <div className="absolute left-0 right-0 top-full mt-2 max-h-[520px] overflow-auto rounded-2xl border border-border bg-popover shadow-card">
              {!q && (
                <div className="p-3">
                  {history.length > 0 && (
                    <div className="mb-3">
                      <p className="px-1 pb-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Recent</p>
                      <div className="flex flex-wrap gap-1.5">
                        {history.map((h) => (
                          <button key={h} onClick={() => setQ(h)} className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs hover:border-accent">{h}</button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="px-1 pb-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Popular searches</p>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR.map((h) => (
                        <button key={h} onClick={() => setQ(h)} className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs hover:border-accent">{h}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {q && matchedCats.length > 0 && (
                <div className="border-b border-border p-2">
                  <p className="px-2 pb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Categories</p>
                  {matchedCats.map((c) => (
                    <button key={c.slug} onClick={() => { commit(q); navigate({ to: "/category/$slug", params: { slug: c.slug } }); setQ(""); setFocus(false); }}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-secondary">
                      <Search className="h-3 w-3 text-muted-foreground" /> {c.title}
                    </button>
                  ))}
                </div>
              )}
              {q && results.length > 0 && (
                <div className="p-2">
                  <p className="px-2 pb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Products</p>
                  {results.map((p) => (
                    <button key={p.id} onClick={() => { commit(q); navigate({ to: "/product/$id", params: { id: p.id } }); setQ(""); setFocus(false); }}
                      className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-secondary">
                      <img src={p.image} alt="" className="h-12 w-12 rounded-md object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{p.name}</p>
                        <p className="text-[11px] text-muted-foreground">{p.brand} · {p.category}</p>
                      </div>
                      <p className="text-sm font-semibold">{formatPrice(p.price)}</p>
                    </button>
                  ))}
                </div>
              )}
              {q && results.length === 0 && matchedCats.length === 0 && (
                <div className="p-6 text-center text-sm text-muted-foreground">No matches for "{q}"</div>
              )}
            </div>
          )}
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-0.5">
          <ThemeToggle />
          <IconBtn to="/compare" label={`Compare${cmpCount ? ` (${cmpCount})` : ""}`} badge={cmpCount}>
            <Scale className="h-4 w-4" />
          </IconBtn>
          <IconBtn to="/wishlist" label={`Wishlist${wlCount ? ` (${wlCount})` : ""}`} badge={wlCount}>
            <Heart className="h-4 w-4" />
          </IconBtn>
          <IconBtn to="/account" label="Account">
            <User className="h-4 w-4" />
          </IconBtn>
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-lg"
            onClick={() => setOpen(true)}
            aria-label={`Open cart${cartCount ? ` (${cartCount} items)` : ""}`}
          >
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg md:hidden"
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
          >
            {menu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="border-t border-border px-4 py-2 sm:hidden">
        <button
          onClick={() => navigate({ to: "/" })}
          className="flex w-full items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-left text-sm text-muted-foreground"
        >
          <Search className="h-4 w-4" /> Search products, brands, specs…
        </button>
      </div>

      {menu && (
        <div className="border-t border-border md:hidden">
          <div className="mx-auto grid max-w-7xl gap-0.5 px-2 py-2">
            <MobileItem to="/deals" icon={Tag}>Deals</MobileItem>
            <MobileItem to="/build-pc" icon={Wrench}>Build your PC</MobileItem>
            <MobileItem to="/compare" icon={Scale}>Compare ({cmpCount})</MobileItem>
            <MobileItem to="/wishlist" icon={Heart}>Wishlist ({wlCount})</MobileItem>
            <div className="my-1 border-t border-border" />
            {CATEGORIES.map((c) => {
              const Icon = CAT_ICONS[c.slug] ?? Laptop;
              return <MobileItem key={c.slug} to="/category/$slug" params={{ slug: c.slug }} icon={Icon}>{c.title}</MobileItem>;
            })}
            <MobileItem to="/sell" icon={Tag}>Sell on tech.at.best</MobileItem>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, children, icon }: { to: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
      activeProps={{ className: "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium bg-secondary text-foreground" }}
    >
      {icon} {children}
    </Link>
  );
}

function IconBtn({ to, label, badge, children }: { to: string; label: string; badge?: number; children: React.ReactNode }) {
  return (
    <Link to={to} aria-label={label} className="relative hidden h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary sm:inline-flex">
      {children}
      {badge != null && badge > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
          {badge}
        </span>
      )}
    </Link>
  );
}

function MobileItem({ to, icon: Icon, children, params }: { to: string; icon: typeof Laptop; children: React.ReactNode; params?: Record<string, string> }) {
  return (
    <Link to={to} params={params as never} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground hover:bg-secondary">
      <Icon className="h-4 w-4 text-muted-foreground" /> {children}
    </Link>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 rounded-lg"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
