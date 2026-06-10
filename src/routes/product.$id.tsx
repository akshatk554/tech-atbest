import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  formatPrice,
  getGallery,
  getOffers,
  getProduct,
  getSimilar,
  PRODUCTS,
  type Product,
} from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useCompare } from "@/lib/compare";
import { useRecentlyViewed } from "@/lib/recently-viewed";
import { toast } from "sonner";
import {
  ChevronRight,
  ExternalLink,
  Heart,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  RefreshCcw,
  Plus,
  Flame,
  MessageSquare,
  ThumbsUp,
  ZoomIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — tech.at.best` },
          { name: "description", content: loaderData.product.about ?? loaderData.product.name },
          { property: "og:title", content: `${loaderData.product.name} — tech.at.best` },
          { property: "og:description", content: loaderData.product.about ?? loaderData.product.name },
          { property: "og:type", content: "product" },
          { property: "og:url", content: `https://tech-atbest.lovable.app/product/${params.id}` },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: loaderData.product.name,
              image: loaderData.product.image,
              description: loaderData.product.about ?? loaderData.product.name,
              brand: { "@type": "Brand", name: loaderData.product.brand },
              sku: loaderData.product.id.toUpperCase(),
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: loaderData.product.rating,
                reviewCount: 24,
              },
              offers: {
                "@type": "Offer",
                priceCurrency: "INR",
                price: loaderData.product.price,
                availability: "https://schema.org/InStock",
                url: `https://tech-atbest.lovable.app/product/${params.id}`,
              },
            }),
          },
        ]
      : [],
  }),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center">
      <p className="font-mono text-sm text-destructive">[ error ]</p>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center">
      <p className="font-mono text-sm text-muted-foreground">[ 404 · product_not_found ]</p>
      <Link to="/" className="mt-4 inline-block text-accent underline">Return home</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { push } = useRecentlyViewed();
  // Scroll to top + track recently viewed whenever product changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    push(product.id);
  }, [product.id, push]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Breadcrumb product={product} />
      <ProductHero product={product} />
      <FrequentlyBoughtTogether product={product} />
      <ReviewsSection product={product} />
      <QASection product={product} />
      <SimilarSection product={product} />
      <RecentlyViewedRail currentId={product.id} />
    </div>
  );
}

function Breadcrumb({ product }: { product: Product }) {
  return (
    <nav className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
      <Link to="/" className="hover:text-foreground">home</Link>
      <ChevronRight className="h-3 w-3" />
      <Link to="/category/$slug" params={{ slug: product.category }} className="hover:text-foreground">
        {product.category}
      </Link>
      <ChevronRight className="h-3 w-3" />
      <span className="text-foreground truncate">{product.name}</span>
    </nav>
  );
}

function ProductHero({ product }: { product: Product }) {
  const gallery = getGallery(product);
  const offers = getOffers(product);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 });
  const { add, setOpen } = useCart();
  const wl = useWishlist();
  const cmp = useCompare();
  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  // Deterministic-but-varied stock & viewer counts based on id
  const seed = useMemo(() => product.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0), [product.id]);
  const stockLeft = 3 + (seed % 9);
  const viewers = 12 + (seed % 40);

  useEffect(() => setActive(0), [product.id]);

  return (
    <section className="mt-4 grid gap-8 border-b border-border pb-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
      {/* Gallery — sticky on desktop */}
      <div className="md:sticky md:top-20 md:self-start">
        <div
          className="group relative overflow-hidden rounded-xl border border-border bg-card"
          onMouseEnter={() => setZoom((z) => ({ ...z, on: true }))}
          onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
          onMouseMove={(e) => {
            const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
            setZoom({ on: true, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
          }}
        >
          <img
            src={gallery[active]}
            alt={product.name}
            className="aspect-square w-full object-cover transition-transform duration-200"
            style={zoom.on ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
          />
          <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomIn className="h-3 w-3" /> Hover to zoom
          </span>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {gallery.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`Show product image ${i + 1} of ${gallery.length}`}
              aria-pressed={active === i}
              className={cn(
                "overflow-hidden rounded-md border bg-muted transition",
                active === i ? "border-accent ring-1 ring-accent" : "border-border opacity-70 hover:opacity-100",
              )}
            >
              <img src={src} alt="" className="aspect-square w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-6">
        <header>
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
            // {product.brand}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">{product.name}</h1>
          <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="text-foreground">{product.rating}</span>
            </span>
            <span>·</span>
            <span>In stock</span>
            {product.tag && (
              <>
                <span>·</span>
                <span className="text-accent">{product.tag}</span>
              </>
            )}
          </div>
        </header>

        <div className="rounded-xl border border-border bg-card/40 p-4">
          <div className="flex items-end gap-3">
            <p className="text-3xl font-semibold text-foreground">{formatPrice(product.price)}</p>
            {product.mrp && (
              <p className="text-sm text-muted-foreground line-through">{formatPrice(product.mrp)}</p>
            )}
            {discount > 0 && (
              <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                -{discount}%
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

          <div className="mt-4 flex gap-2">
            <Button
              className="flex-1"
              onClick={() => {
                add(product);
                toast.success("Added to cart", { description: product.name });
              }}
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to cart
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                add(product);
                setOpen(true);
              }}
            >
              Buy now
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label={wl.has(product.id) ? "Remove from wishlist" : "Save to wishlist"}
              onClick={() => { wl.toggle(product.id); toast.success(wl.has(product.id) ? "Removed from wishlist" : "Saved to wishlist"); }}
              className={cn(wl.has(product.id) && "border-accent text-accent")}
            >
              <Heart className={cn("h-4 w-4", wl.has(product.id) && "fill-current")} />
            </Button>
          </div>

          {/* Stock urgency + live viewers */}
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-warning/30 bg-warning/5 px-3 py-2 text-[11px]">
            <span className="inline-flex items-center gap-1 font-semibold text-warning"><Flame className="h-3 w-3" /> Only {stockLeft} left in stock</span>
            <span className="text-muted-foreground">· {viewers} people viewing now</span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Truck className="h-3 w-3 text-accent" /> Free shipping</span>
            <span className="inline-flex items-center gap-1"><RefreshCcw className="h-3 w-3 text-accent" /> 7-day returns</span>
            <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-accent" /> Verified seller</span>
          </div>

          <button
            onClick={() => { cmp.toggle(product.id); toast.success(cmp.has(product.id) ? "Removed from compare" : "Added to compare"); }}
            className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-accent hover:underline"
          >
            <Plus className="h-3 w-3" /> {cmp.has(product.id) ? "In compare list" : "Add to compare"}
          </button>
        </div>

        <OffersTable offers={offers} />

        {product.about && (
          <Block title="About this item">
            <p className="text-sm leading-relaxed text-muted-foreground">{product.about}</p>
          </Block>
        )}

        {product.specs && (
          <Block title="Specifications">
            <dl className="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-lg border border-border sm:grid-cols-2 sm:divide-y-0">
              {Object.entries(product.specs).map(([k, v], i) => (
                <div
                  key={k}
                  className={cn(
                    "flex items-baseline gap-3 px-3 py-2 text-sm",
                    i % 2 === 0 ? "bg-card/40" : "",
                  )}
                >
                  <dt className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </Block>
        )}

        <Block title="Product details">
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li><span className="text-foreground">Brand:</span> {product.brand}</li>
            <li><span className="text-foreground">Category:</span> {product.category}</li>
            <li><span className="text-foreground">SKU:</span> {product.id.toUpperCase()}</li>
            <li><span className="text-foreground">Warranty:</span> Standard manufacturer warranty</li>
          </ul>
        </Block>
      </div>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-mono text-xs uppercase tracking-widest text-accent">// {title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function OffersTable({ offers }: { offers: ReturnType<typeof getOffers> }) {
  const lowest = offers[0]?.price;
  return (
    <section>
      <div className="flex items-end justify-between">
        <h2 className="font-mono text-xs uppercase tracking-widest text-accent">// compare_prices</h2>
        <p className="text-[10px] text-muted-foreground">Indicative · tap to view live price</p>
      </div>
      <div className="mt-3 overflow-hidden rounded-xl border border-border">
        {offers.map((o) => {
          const isLow = o.price === lowest;
          return (
            <a
              key={o.name}
              href={o.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border-b border-border bg-card/30 px-4 py-3 transition-colors last:border-b-0 hover:bg-muted/40"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{o.name}</p>
                  {o.badge && (
                    <span className="rounded-full border border-accent/40 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-accent">
                      {o.badge}
                    </span>
                  )}
                  {isLow && (
                    <span className="rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-semibold text-accent-foreground">
                      Lowest
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{o.shipping}</p>
              </div>
              <div className="text-right">
                <p className={cn("text-base font-semibold", isLow ? "text-accent" : "text-foreground")}>
                  {formatPrice(o.price)}
                </p>
                <p className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                  visit <ExternalLink className="h-2.5 w-2.5" />
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function SimilarSection({ product }: { product: Product }) {
  const similar = getSimilar(product, 8);
  const navigate = useNavigate();
  return (
    <section className="py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">// similar_products</p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">You might also like</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {similar.map((p) => (
          <button
            key={p.id}
            onClick={() => navigate({ to: "/product/$id", params: { id: p.id } })}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:border-accent hover:shadow-glow"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.brand}</p>
              <h3 className="line-clamp-2 text-sm font-medium">{p.name}</h3>
              <div className="mt-auto flex items-center justify-between pt-2">
                <p className="text-sm font-semibold text-foreground">{formatPrice(p.price)}</p>
                <span className="inline-flex items-center gap-1 text-[10px] text-accent">
                  <Star className="h-3 w-3 fill-accent" /> {p.rating}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

// ---------- Frequently Bought Together ----------
function FrequentlyBoughtTogether({ product }: { product: Product }) {
  const bundle = useMemo(() => {
    // Pair the product with two complementary picks from other categories.
    const seed = product.id.length;
    const others = PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category);
    return [product, others[(seed * 3) % others.length], others[(seed * 7 + 1) % others.length]].filter(Boolean);
  }, [product]);
  const total = bundle.reduce((s, p) => s + p.price, 0);
  const mrpTotal = bundle.reduce((s, p) => s + (p.mrp ?? p.price), 0);
  const save = mrpTotal - total;
  const { add, setOpen } = useCart();

  return (
    <section className="mt-12">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">// frequently_bought_together</p>
      <h2 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">Complete the build</h2>
      <div className="mt-5 grid gap-6 rounded-2xl border border-border bg-card p-5 md:grid-cols-[1fr_280px]">
        <div className="flex flex-wrap items-center gap-3">
          {bundle.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3">
              <Link to="/product/$id" params={{ id: p.id }} className="block">
                <img src={p.image} alt={p.name} className="h-24 w-24 rounded-lg border border-border object-cover" />
              </Link>
              {i < bundle.length - 1 && <Plus className="h-4 w-4 text-muted-foreground" />}
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between gap-3">
          <ul className="space-y-1.5 text-xs">
            {bundle.map((p) => (
              <li key={p.id} className="flex items-baseline justify-between gap-2">
                <span className="line-clamp-1 text-muted-foreground">{p.name}</span>
                <span className="font-semibold tabular-nums">{formatPrice(p.price)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-border pt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-muted-foreground">Bundle total</span>
              <span className="text-lg font-bold">{formatPrice(total)}</span>
            </div>
            {save > 0 && <p className="text-[11px] text-success">You save {formatPrice(save)} vs MRP</p>}
            <Button
              className="mt-3 w-full"
              onClick={() => { bundle.forEach((p) => add(p)); setOpen(true); }}
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Add all to cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Reviews with breakdown ----------
function ReviewsSection({ product }: { product: Product }) {
  const total = 24 + (product.id.length * 7);
  // Build a deterministic distribution skewed by rating
  const dist = [5, 4, 3, 2, 1].map((stars) => {
    const weight = Math.max(0, 100 - Math.abs(stars - product.rating) * 35);
    return { stars, pct: weight };
  });
  const sum = dist.reduce((s, d) => s + d.pct, 0) || 1;
  const norm = dist.map((d) => ({ ...d, pct: Math.round((d.pct / sum) * 100) }));

  const REVIEWS = [
    { name: "Aarav S.", rating: 5, title: "Worth every rupee", body: "Build quality and performance are top-tier. Setup was painless and shipping was quick.", helpful: 42, verified: true },
    { name: "Priya M.", rating: 4, title: "Great, with minor caveats", body: "Performance is excellent for the price. Battery could be better under load.", helpful: 18, verified: true },
    { name: "Rohit K.", rating: 5, title: "Perfect for my workflow", body: "Handles heavy multitasking like a champ. Highly recommended.", helpful: 11, verified: false },
  ];

  return (
    <section className="mt-12">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">// customer_reviews</p>
      <h2 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">What customers are saying</h2>
      <div className="mt-5 grid gap-6 md:grid-cols-[260px_1fr]">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">{product.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">/ 5</span>
          </div>
          <div className="mt-1 flex items-center gap-0.5">
            {[1,2,3,4,5].map((i) => (
              <Star key={i} className={cn("h-4 w-4", i <= Math.round(product.rating) ? "fill-warning text-warning" : "text-muted-foreground/40")} />
            ))}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Based on {total} verified reviews</p>

          <div className="mt-4 space-y-2">
            {norm.map((d) => (
              <div key={d.stars} className="flex items-center gap-2 text-[11px]">
                <span className="w-6 tabular-nums text-muted-foreground">{d.stars}★</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-warning" style={{ width: `${d.pct}%` }} />
                </div>
                <span className="w-8 text-right tabular-nums text-muted-foreground">{d.pct}%</span>
              </div>
            ))}
          </div>

          <Button variant="outline" className="mt-4 w-full" size="sm">Write a review</Button>
        </div>

        <div className="space-y-3">
          {REVIEWS.map((r) => (
            <article key={r.name} className="rounded-2xl border border-border bg-card p-5">
              <header className="flex flex-wrap items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{r.name[0]}</span>
                <span className="text-sm font-semibold">{r.name}</span>
                {r.verified && <span className="rounded-full bg-success/15 px-1.5 py-0.5 text-[10px] font-medium text-success">Verified buyer</span>}
                <span className="ml-auto flex items-center gap-0.5">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className={cn("h-3.5 w-3.5", i <= r.rating ? "fill-warning text-warning" : "text-muted-foreground/40")} />
                  ))}
                </span>
              </header>
              <h3 className="mt-2 text-sm font-semibold">{r.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              <button className="mt-3 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground">
                <ThumbsUp className="h-3 w-3" /> Helpful ({r.helpful})
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Q & A ----------
function QASection({ product }: { product: Product }) {
  const QAS = [
    { q: `Is the ${product.brand} warranty valid in India?`, a: "Yes — all units ship with the manufacturer's India warranty plus our 7-day no-questions return window." },
    { q: "Does this come with a GST invoice?", a: "Yes. A GST invoice is issued for every order; you can claim input tax credit if applicable." },
    { q: "How fast is delivery?", a: "Metro cities: 2–3 business days. Other locations: 4–6 business days. Express options at checkout." },
  ];
  return (
    <section className="mt-12">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">// questions_and_answers</p>
      <h2 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">Questions & answers</h2>
      <div className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {QAS.map((qa) => (
          <details key={qa.q} className="group p-5">
            <summary className="flex cursor-pointer items-center gap-3 text-sm font-semibold">
              <MessageSquare className="h-4 w-4 text-accent" />
              <span className="flex-1">{qa.q}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
            </summary>
            <p className="mt-3 pl-7 text-sm leading-relaxed text-muted-foreground">{qa.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

// ---------- Recently viewed ----------
function RecentlyViewedRail({ currentId }: { currentId: string }) {
  const { ids } = useRecentlyViewed();
  const items = ids.filter((id) => id !== currentId).map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) as Product[];
  if (items.length === 0) return null;
  return (
    <section className="mt-4 pb-12">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">// recently_viewed</p>
      <h2 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">Recently viewed</h2>
      <div className="no-scrollbar mt-5 flex gap-3 overflow-x-auto pb-2">
        {items.map((p) => (
          <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="group w-40 shrink-0 overflow-hidden rounded-xl border border-border bg-card transition hover:border-accent">
            <div className="aspect-square overflow-hidden bg-muted">
              <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
            </div>
            <div className="p-2">
              <p className="line-clamp-1 text-xs font-medium">{p.name}</p>
              <p className="mt-0.5 text-xs font-semibold text-accent">{formatPrice(p.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

