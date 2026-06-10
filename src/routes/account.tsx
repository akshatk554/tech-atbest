import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell, Heart, MapPin, Package, Settings, Star, User, Truck, CheckCircle2, Clock, RefreshCcw, LogOut, Plus,
} from "lucide-react";
import { PRODUCTS, formatPrice } from "@/lib/products";
import { useWishlist } from "@/lib/wishlist";
import { useRecentlyViewed } from "@/lib/recently-viewed";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your account — tech.at.best" },
      { name: "description", content: "Manage orders, addresses, reviews and account settings on tech.at.best." },
    ],
  }),
  component: AccountPage,
});

type Tab = "overview" | "orders" | "addresses" | "wishlist" | "recent" | "reviews" | "settings";

const TABS: { id: Tab; label: string; icon: typeof User }[] = [
  { id: "overview", label: "Overview", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "recent", label: "Recently viewed", icon: Clock },
  { id: "reviews", label: "My reviews", icon: Star },
  { id: "settings", label: "Settings", icon: Settings },
];

const MOCK_ORDERS = [
  { id: "TAB-83421", date: "12 Jun 2026", status: "delivered" as const, total: 134990, items: ["lap-1"], eta: "Delivered on 14 Jun" },
  { id: "TAB-83298", date: "01 Jun 2026", status: "in_transit" as const, total: 8499, items: ["ram-1"], eta: "Arriving 15 Jun · Out for delivery" },
  { id: "TAB-83111", date: "23 May 2026", status: "processing" as const, total: 32990, items: ["mon-1"], eta: "Shipping within 24 hrs" },
];

const MOCK_ADDRESSES = [
  { id: "a1", label: "Home", name: "Akshat K.", line1: "Flat 4B, Lake View Apartments", line2: "Bistupur, Jamshedpur 831001", phone: "+91 70046 46xxx", default: true },
  { id: "a2", label: "Office", name: "Akshat K.", line1: "Tata Steel Park, Tower C, Floor 9", line2: "Jubilee Park Rd, Jamshedpur 831009", phone: "+91 70046 46xxx", default: false },
];

function AccountPage() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Hero */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-card to-accent/5 p-6 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
            <User className="h-7 w-7" />
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-accent">// guest_account</p>
            <h1 className="mt-1 text-2xl font-bold md:text-3xl">Hey there, builder</h1>
            <p className="text-sm text-muted-foreground">Sign in to sync your cart, orders and wishlist across devices.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button>Sign in</Button>
          <Button variant="outline">Create account</Button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="md:sticky md:top-20 md:self-start">
          <nav className="overflow-hidden rounded-2xl border border-border bg-card">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left text-sm transition-colors last:border-b-0",
                  tab === t.id ? "bg-secondary font-semibold text-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                )}
              >
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
            <button className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-destructive hover:bg-destructive/5">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          {tab === "overview" && <Overview onJump={setTab} />}
          {tab === "orders" && <Orders />}
          {tab === "addresses" && <Addresses />}
          {tab === "wishlist" && <WishlistTab />}
          {tab === "recent" && <RecentTab />}
          {tab === "reviews" && <ReviewsTab />}
          {tab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label }: { icon: typeof User; value: string | number; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <p className="mt-3 text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Overview({ onJump }: { onJump: (t: Tab) => void }) {
  const wl = useWishlist();
  const rv = useRecentlyViewed();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={Package} value={MOCK_ORDERS.length} label="Orders" />
        <StatCard icon={Heart} value={wl.count} label="Wishlist" />
        <StatCard icon={Clock} value={rv.ids.length} label="Recently viewed" />
        <StatCard icon={MapPin} value={MOCK_ADDRESSES.length} label="Addresses" />
      </div>

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Active order</h2>
          <button onClick={() => onJump("orders")} className="text-xs text-accent hover:underline">View all</button>
        </div>
        <OrderRow order={MOCK_ORDERS[1]} />
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Quick links</h2>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Link to="/wishlist" className="rounded-xl border border-border p-4 hover:border-accent"><Heart className="mb-2 h-4 w-4 text-accent" /><p className="text-sm font-semibold">Wishlist</p></Link>
          <Link to="/compare" className="rounded-xl border border-border p-4 hover:border-accent"><Package className="mb-2 h-4 w-4 text-accent" /><p className="text-sm font-semibold">Compare</p></Link>
          <Link to="/support" className="rounded-xl border border-border p-4 hover:border-accent"><Bell className="mb-2 h-4 w-4 text-accent" /><p className="text-sm font-semibold">Help center</p></Link>
        </div>
      </section>
    </div>
  );
}

function OrderRow({ order }: { order: (typeof MOCK_ORDERS)[number] }) {
  const products = order.items.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) as typeof PRODUCTS;
  const Icon = order.status === "delivered" ? CheckCircle2 : order.status === "in_transit" ? Truck : Clock;
  const tone =
    order.status === "delivered" ? "text-success bg-success/10" :
    order.status === "in_transit" ? "text-accent bg-accent/10" : "text-warning bg-warning/10";
  return (
    <div className="mt-3 rounded-xl border border-border p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">// {order.id}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Placed {order.date}</p>
        </div>
        <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize", tone)}>
          <Icon className="h-3 w-3" /> {order.status.replace("_", " ")}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        {products.map((p) => (
          <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="flex items-center gap-3">
            <img src={p.image} alt={p.name} className="h-12 w-12 rounded-md border border-border object-cover" />
            <span className="line-clamp-1 text-sm">{p.name}</span>
          </Link>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
        <p className="text-xs text-muted-foreground">{order.eta}</p>
        <p className="text-sm font-semibold">{formatPrice(order.total)}</p>
      </div>
    </div>
  );
}

function Orders() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Your orders</h2>
      {MOCK_ORDERS.map((o) => <OrderRow key={o.id} order={o} />)}
    </div>
  );
}

function Addresses() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Saved addresses</h2>
        <Button size="sm"><Plus className="mr-1 h-3.5 w-3.5" /> Add new</Button>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {MOCK_ADDRESSES.map((a) => (
          <div key={a.id} className="relative rounded-2xl border border-border bg-card p-5">
            {a.default && <span className="absolute right-3 top-3 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">Default</span>}
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">// {a.label}</p>
            <p className="mt-2 font-semibold">{a.name}</p>
            <p className="text-sm text-muted-foreground">{a.line1}</p>
            <p className="text-sm text-muted-foreground">{a.line2}</p>
            <p className="mt-2 text-sm">{a.phone}</p>
            <div className="mt-3 flex gap-2 text-xs">
              <button className="text-accent hover:underline">Edit</button>
              <span className="text-muted-foreground">·</span>
              <button className="text-destructive hover:underline">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WishlistTab() {
  const wl = useWishlist();
  const items = PRODUCTS.filter((p) => wl.ids.includes(p.id));
  return (
    <div>
      <h2 className="text-xl font-bold">Wishlist <span className="text-sm font-normal text-muted-foreground">({items.length})</span></h2>
      {items.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">Nothing saved yet. <Link to="/" className="text-accent hover:underline">Browse products</Link>.</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((p) => (
            <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="rounded-xl border border-border bg-card p-3 hover:border-accent">
              <img src={p.image} alt={p.name} className="aspect-square w-full rounded-md object-cover" />
              <p className="mt-2 line-clamp-2 text-xs">{p.name}</p>
              <p className="text-sm font-semibold">{formatPrice(p.price)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function RecentTab() {
  const rv = useRecentlyViewed();
  const items = rv.ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) as typeof PRODUCTS;
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Recently viewed <span className="text-sm font-normal text-muted-foreground">({items.length})</span></h2>
        {items.length > 0 && <button onClick={rv.clear} className="text-xs text-destructive hover:underline">Clear history</button>}
      </div>
      {items.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">No products viewed yet.</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((p) => (
            <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="rounded-xl border border-border bg-card p-3 hover:border-accent">
              <img src={p.image} alt={p.name} className="aspect-square w-full rounded-md object-cover" />
              <p className="mt-2 line-clamp-2 text-xs">{p.name}</p>
              <p className="text-sm font-semibold">{formatPrice(p.price)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewsTab() {
  return (
    <div>
      <h2 className="text-xl font-bold">Your reviews</h2>
      <p className="mt-4 rounded-xl border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
        You haven't reviewed anything yet. Once an order is delivered you'll be able to share your experience.
      </p>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Settings</h2>
      <section className="rounded-2xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold">Profile</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="Full name" placeholder="Akshat K." />
          <Field label="Email" placeholder="akshatk554@gmail.com" />
          <Field label="Phone" placeholder="+91 70046 46xxx" />
          <Field label="GSTIN (optional)" placeholder="22AAAAA0000A1Z5" />
        </div>
        <Button className="mt-4" size="sm">Save changes</Button>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold">Notifications</h3>
        <ul className="mt-3 space-y-3 text-sm">
          <ToggleRow label="Order updates" desc="Email + SMS when status changes" defaultOn />
          <ToggleRow label="Price drop alerts" desc="Tell me when wishlist items go on sale" defaultOn />
          <ToggleRow label="Newsletter" desc="Curated picks every Friday" />
        </ul>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold">Returns & data</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2"><RefreshCcw className="h-3.5 w-3.5 text-accent" /> Active return window: 7 days from delivery</li>
          <li className="flex items-center gap-2"><Package className="h-3.5 w-3.5 text-accent" /> Download invoice from any past order</li>
        </ul>
      </section>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input placeholder={placeholder} className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
    </label>
  );
}

function ToggleRow({ label, desc, defaultOn }: { label: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <li className="flex items-center justify-between gap-4">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <button
        role="switch"
        aria-checked={on}
        onClick={() => setOn(!on)}
        className={cn("relative h-5 w-9 rounded-full transition-colors", on ? "bg-accent" : "bg-muted")}
      >
        <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-background transition-transform", on ? "translate-x-4" : "translate-x-0.5")} />
      </button>
    </li>
  );
}
