import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, ShoppingCart, Menu, X, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function Header() {
  const { count, setOpen } = useCart();
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setFocus(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s)).slice(0, 6);
  }, [q]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-accent-foreground">
            <Cpu className="h-4 w-4" />
          </span>
          <span className="hidden sm:inline">
            tech<span className="text-accent">.</span>at<span className="text-accent">.</span>best
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {CATEGORIES.filter((c) => c.group === "computers").map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-1.5 text-sm bg-muted text-foreground" }}
            >
              {c.title}
            </Link>
          ))}
          <Link
            to="/accessories"
            className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            activeProps={{ className: "rounded-md px-3 py-1.5 text-sm bg-muted text-foreground" }}
          >
            Accessories
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div ref={ref} className="relative hidden sm:block">
            <div className="flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-1.5 transition-colors focus-within:border-accent">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setFocus(true)}
                placeholder="Search products…"
                className="w-48 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            {focus && results.length > 0 && (
              <div className="absolute right-0 top-full mt-2 w-80 overflow-hidden rounded-lg border border-border bg-popover shadow-glow">
                {results.map((p) => (
                  <button
                    key={p.id}
                    className="flex w-full items-center gap-3 border-b border-border px-3 py-2 text-left hover:bg-muted"
                    onClick={() => {
                      setQ("");
                      setFocus(false);
                      navigate({ to: "/product/$id", params: { id: p.id } });
                    }}
                  >
                    <img src={p.image} alt="" className="h-10 w-10 rounded object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs">{p.name}</p>
                      <p className="text-[10px] text-muted-foreground">{p.brand}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button variant="ghost" size="icon" className="relative" onClick={() => setOpen(true)}>
            <ShoppingCart className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenu(!menu)}>
            {menu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {menu && (
        <div className="border-t border-border md:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 px-4 py-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {c.title}
              </Link>
            ))}
            <Link to="/accessories" className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
              All accessories
            </Link>
            <Link to="/sell" className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
              Sell on tech.at.best
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
