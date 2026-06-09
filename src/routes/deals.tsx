import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flame, Timer } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Deals & flash sales — tech.at.best" },
      { name: "description", content: "Flash sales, weekend deals and biggest discounts on laptops, monitors, components and accessories." },
      { property: "og:title", content: "Deals & flash sales — tech.at.best" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: DealsPage,
});

function useCountdown(targetMs: number) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, targetMs - now);
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { h, m, s };
}

function DealsPage() {
  // Ends at next midnight
  const target = (() => {
    const d = new Date(); d.setHours(24, 0, 0, 0); return d.getTime();
  })();
  const { h, m, s } = useCountdown(target);

  const withMrp = PRODUCTS.filter((p) => p.mrp);
  const flash = withMrp.slice(0, 4);
  const weekend = withMrp.slice(4, 8);
  const trending = PRODUCTS.filter((p) => p.rating >= 4.7).slice(0, 8);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-destructive/15 via-accent/10 to-primary/15 p-8 shadow-lift">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-destructive">
              <Flame className="h-3 w-3" /> flash_sale
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">Deals running now</h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">Discounted picks across every category. Restocks daily — don't sleep on these.</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/90 p-4 backdrop-blur shadow-soft">
            <Timer className="h-5 w-5 text-accent" />
            <div className="flex gap-2 font-mono">
              <TimeBox label="hrs" value={h} />
              <span className="self-center text-xl font-bold">:</span>
              <TimeBox label="min" value={m} />
              <span className="self-center text-xl font-bold">:</span>
              <TimeBox label="sec" value={s} />
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold">⚡ Flash sale</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {flash.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold">🎁 Weekend deals</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {weekend.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="mt-12 pb-10">
        <h2 className="mb-4 text-xl font-bold">🔥 Trending now</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
        {String(value).padStart(2, "0")}
      </div>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}
