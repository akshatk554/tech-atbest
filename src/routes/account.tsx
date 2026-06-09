import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Heart, MapPin, Package, Settings, Star, User } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your account — tech.at.best" },
      { name: "description", content: "Manage orders, wishlist, addresses and account settings." },
    ],
  }),
  component: AccountPage,
});

const TILES = [
  { icon: Package, title: "Orders", desc: "Track or return orders", to: "/account" },
  { icon: Heart, title: "Wishlist", desc: "Saved for later", to: "/wishlist" },
  { icon: MapPin, title: "Addresses", desc: "Shipping addresses", to: "/account" },
  { icon: Star, title: "Reviews", desc: "Your reviews & ratings", to: "/account" },
  { icon: Bell, title: "Notifications", desc: "Stock alerts, deals", to: "/account" },
  { icon: Settings, title: "Settings", desc: "Profile & preferences", to: "/account" },
];

function AccountPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
          <User className="h-7 w-7" />
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent">// guest_account</p>
          <h1 className="mt-1 text-2xl font-bold md:text-3xl">Hey there, builder</h1>
          <p className="text-sm text-muted-foreground">Sign in to track orders, save addresses and sync your wishlist across devices.</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Sign in</button>
        <button className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-secondary">Create account</button>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {TILES.map((t) => (
          <Link key={t.title} to={t.to} className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card">
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <t.icon className="h-4.5 w-4.5" />
            </div>
            <p className="text-sm font-bold">{t.title}</p>
            <p className="text-[11px] text-muted-foreground">{t.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-border bg-card/50 p-6 text-center text-sm text-muted-foreground">
        Full dashboard with order tracking, returns and saved addresses is coming next.
      </div>
    </div>
  );
}
