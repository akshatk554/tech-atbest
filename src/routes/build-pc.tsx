import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertTriangle, Check, Cpu, Gauge, ShoppingCart, Wrench, Zap } from "lucide-react";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import type { CategorySlug, Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/build-pc")({
  head: () => ({
    meta: [
      { title: "Build your PC — tech.at.best" },
      { name: "description", content: "Configure a custom PC: pick CPU, GPU, motherboard, RAM, SSD, PSU and case. We check compatibility, estimate wattage and total your build." },
      { property: "og:title", content: "Build your PC — tech.at.best" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BuildPCPage,
});

type Part = {
  id: string;
  name: string;
  brand: string;
  price: number;
  watts: number;
  socket?: string;
  ramType?: "DDR4" | "DDR5";
  image: string;
  specs?: Record<string, string>;
};

// Curated builder catalogue (separate from main product list — keeps things focused)
const IMG = (q: string, s: number) => `https://images.unsplash.com/${q}?auto=format&fit=crop&w=600&q=75&sig=${s}`;

const PARTS: Record<string, Part[]> = {
  cpu: [
    { id: "cpu-1", name: "Intel Core i5-14600K", brand: "Intel", price: 28990, watts: 125, socket: "LGA1700", image: IMG("photo-1555617778-02518510b9fa", 1) },
    { id: "cpu-2", name: "Intel Core i7-14700K", brand: "Intel", price: 39990, watts: 125, socket: "LGA1700", image: IMG("photo-1591799264318-7e6ef8ddb7ea", 2) },
    { id: "cpu-3", name: "AMD Ryzen 5 7600X", brand: "AMD", price: 24990, watts: 105, socket: "AM5", ramType: "DDR5", image: IMG("photo-1591488320443-bb1c5e85d4d0", 3) },
    { id: "cpu-4", name: "AMD Ryzen 7 7800X3D", brand: "AMD", price: 41990, watts: 120, socket: "AM5", ramType: "DDR5", image: IMG("photo-1518770660439-4636190af475", 4) },
  ],
  gpu: [
    { id: "gpu-1", name: "NVIDIA RTX 4060 8GB", brand: "NVIDIA", price: 32990, watts: 115, image: IMG("photo-1591488320443-bb1c5e85d4d0", 11) },
    { id: "gpu-2", name: "NVIDIA RTX 4070 12GB", brand: "NVIDIA", price: 54990, watts: 200, image: IMG("photo-1555680202-c86f0e12f086", 12) },
    { id: "gpu-3", name: "NVIDIA RTX 4080 Super", brand: "NVIDIA", price: 109990, watts: 320, image: IMG("photo-1562408590-e32931084e23", 13) },
    { id: "gpu-4", name: "AMD RX 7800 XT 16GB", brand: "AMD", price: 49990, watts: 263, image: IMG("photo-1587202372775-e229f172b9d7", 14) },
  ],
  mobo: [
    { id: "mb-1", name: "MSI MAG B760 Tomahawk", brand: "MSI", price: 18990, watts: 35, socket: "LGA1700", ramType: "DDR5", image: IMG("photo-1518770660439-4636190af475", 21) },
    { id: "mb-2", name: "ASUS ROG Strix Z790-A", brand: "ASUS", price: 32990, watts: 40, socket: "LGA1700", ramType: "DDR5", image: IMG("photo-1591488320443-bb1c5e85d4d0", 22) },
    { id: "mb-3", name: "Gigabyte B650 AORUS Elite", brand: "Gigabyte", price: 19990, watts: 35, socket: "AM5", ramType: "DDR5", image: IMG("photo-1555680202-c86f0e12f086", 23) },
  ],
  ram: [
    { id: "ram-1", name: "Corsair Vengeance 32GB DDR5-6000", brand: "Corsair", price: 9499, watts: 10, ramType: "DDR5", image: IMG("photo-1591488320443-bb1c5e85d4d0", 31) },
    { id: "ram-2", name: "G.Skill Trident Z5 RGB 32GB DDR5", brand: "G.Skill", price: 13990, watts: 12, ramType: "DDR5", image: IMG("photo-1555680202-c86f0e12f086", 32) },
    { id: "ram-3", name: "Kingston Fury Beast 32GB DDR4-3600", brand: "Kingston", price: 6999, watts: 10, ramType: "DDR4", image: IMG("photo-1562408590-e32931084e23", 33) },
  ],
  ssd: [
    { id: "ssd-1", name: "Samsung 980 Pro 1TB NVMe", brand: "Samsung", price: 8499, watts: 8, image: IMG("photo-1531492746076-161ca9bcad58", 41) },
    { id: "ssd-2", name: "WD Black SN850X 2TB NVMe", brand: "WD", price: 15999, watts: 9, image: IMG("photo-1597872200969-2b65d56bd16b", 42) },
    { id: "ssd-3", name: "Crucial T700 2TB PCIe 5.0", brand: "Crucial", price: 24990, watts: 11, image: IMG("photo-1601524909162-ae8725290836", 43) },
  ],
  psu: [
    { id: "psu-1", name: "Corsair RM650x 650W Gold", brand: "Corsair", price: 8999, watts: 0, image: IMG("photo-1587202372775-e229f172b9d7", 51), specs: { capacity: "650W" } },
    { id: "psu-2", name: "Corsair RM850x 850W Gold", brand: "Corsair", price: 12990, watts: 0, image: IMG("photo-1591488320449-011701bb6704", 52), specs: { capacity: "850W" } },
    { id: "psu-3", name: "Seasonic PRIME TX-1000 1000W Titanium", brand: "Seasonic", price: 24990, watts: 0, image: IMG("photo-1547082299-de196ea013d6", 53), specs: { capacity: "1000W" } },
  ],
  case: [
    { id: "case-1", name: "NZXT H5 Flow Mid-Tower", brand: "NZXT", price: 8499, watts: 0, image: IMG("photo-1587202372775-e229f172b9d7", 61) },
    { id: "case-2", name: "Lian Li O11 Dynamic EVO", brand: "Lian Li", price: 14990, watts: 0, image: IMG("photo-1591488320449-011701bb6704", 62) },
    { id: "case-3", name: "Fractal North", brand: "Fractal", price: 13990, watts: 0, image: IMG("photo-1547082299-de196ea013d6", 63) },
  ],
  cooler: [
    { id: "cool-1", name: "Noctua NH-D15 Air Cooler", brand: "Noctua", price: 9999, watts: 5, image: IMG("photo-1518770660439-4636190af475", 71) },
    { id: "cool-2", name: "Corsair iCUE H150i Elite 360mm AIO", brand: "Corsair", price: 17990, watts: 15, image: IMG("photo-1555680202-c86f0e12f086", 72) },
  ],
};

const SLOTS: { key: keyof typeof PARTS; label: string }[] = [
  { key: "cpu", label: "CPU" },
  { key: "gpu", label: "Graphics card" },
  { key: "mobo", label: "Motherboard" },
  { key: "ram", label: "RAM" },
  { key: "ssd", label: "Storage" },
  { key: "psu", label: "Power supply" },
  { key: "case", label: "Cabinet" },
  { key: "cooler", label: "Cooling" },
];

type Build = Record<string, Part | null>;

function BuildPCPage() {
  const [build, setBuild] = useState<Build>(Object.fromEntries(SLOTS.map((s) => [s.key, null])));
  const { add, setOpen } = useCart();

  const total = Object.values(build).reduce((a, b) => a + (b?.price ?? 0), 0);
  const wattage = Object.values(build).reduce((a, b) => a + (b?.watts ?? 0), 0);
  const recommendedPsu = Math.ceil((wattage * 1.3) / 50) * 50;

  const issues = useMemo(() => {
    const out: string[] = [];
    const cpu = build.cpu, mb = build.mobo, ram = build.ram, psu = build.psu, gpu = build.gpu;
    if (cpu && mb && cpu.socket !== mb.socket) out.push(`Socket mismatch: CPU is ${cpu.socket}, motherboard is ${mb.socket}.`);
    if (ram && mb && mb.ramType && ram.ramType && ram.ramType !== mb.ramType) out.push(`Memory mismatch: ${ram.ramType} RAM with ${mb.ramType} board.`);
    if (psu) {
      const cap = parseInt(psu.specs?.capacity ?? "0", 10);
      if (cap && wattage > 0 && cap < recommendedPsu) out.push(`PSU undersized: ${cap}W with ~${recommendedPsu}W recommended.`);
    }
    if (cpu && gpu) {
      const cpuTier = cpu.price; const gpuTier = gpu.price;
      if (gpuTier > cpuTier * 3) out.push("Possible CPU bottleneck — GPU is significantly higher tier than CPU.");
      if (cpuTier > gpuTier * 2.5) out.push("Possible GPU bottleneck — CPU is significantly higher tier than GPU.");
    }
    return out;
  }, [build, wattage, recommendedPsu]);

  const ready = SLOTS.filter((s) => s.key !== "cooler").every((s) => build[s.key]);

  const performance = useMemo(() => {
    const gpu = build.gpu?.price ?? 0;
    const cpu = build.cpu?.price ?? 0;
    const score = (gpu * 0.7 + cpu * 0.3) / 1000;
    return {
      gaming1440p: Math.min(240, Math.round(40 + score * 1.4)),
      gaming4k: Math.min(180, Math.round(20 + score * 0.85)),
      editing: Math.min(100, Math.round(30 + score * 0.5)),
      ai: Math.min(100, Math.round(15 + (build.gpu?.price ?? 0) / 1500)),
    };
  }, [build]);

  const addBuildToCart = () => {
    Object.values(build).forEach((p) => {
      if (!p) return;
      add({
        id: p.id, name: p.name, brand: p.brand, price: p.price,
        rating: 4.7, image: p.image, buyUrl: "#",
        category: "desktops" as CategorySlug,
      } as Product);
    });
    toast.success("Build added to cart", { description: formatPrice(total) });
    setOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent">// pc_builder</p>
          <h1 className="mt-2 flex items-center gap-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            <Wrench className="h-8 w-8 text-accent" /> Build your PC
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">Pick parts and we'll auto-check compatibility, estimate wattage and total your build.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Slots */}
        <div className="space-y-4">
          {SLOTS.map((slot) => (
            <Slot
              key={slot.key}
              label={slot.label}
              parts={PARTS[slot.key]}
              selected={build[slot.key]}
              onSelect={(p) => setBuild((b) => ({ ...b, [slot.key]: b[slot.key]?.id === p.id ? null : p }))}
            />
          ))}
        </div>

        {/* Summary */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-accent">// build_summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              {SLOTS.map((s) => (
                <div key={s.key} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="truncate text-right font-medium">{build[s.key]?.name ?? "—"}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold">Total</span>
                <span className="text-2xl font-bold text-accent">{formatPrice(total)}</span>
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Zap className="h-3 w-3" /> Est. draw {wattage}W · recommended PSU {recommendedPsu}W
              </p>
            </div>

            {issues.length > 0 && (
              <div className="mt-4 space-y-2 rounded-lg border border-warning/30 bg-warning/5 p-3">
                {issues.map((i) => (
                  <div key={i} className="flex gap-2 text-xs text-foreground">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" /> {i}
                  </div>
                ))}
              </div>
            )}
            {issues.length === 0 && ready && (
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 p-3 text-xs text-foreground">
                <Check className="h-4 w-4 text-success" /> Compatible build — ready to ship
              </div>
            )}

            <button
              onClick={addBuildToCart}
              disabled={!ready || issues.length > 0}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingCart className="h-4 w-4" /> Add build to cart
            </button>
          </div>

          {/* Performance estimate */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <h2 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
              <Gauge className="h-3.5 w-3.5" /> performance_estimate
            </h2>
            <div className="mt-4 space-y-3">
              <Bar label="Gaming @ 1440p" value={performance.gaming1440p} max={240} unit="FPS" />
              <Bar label="Gaming @ 4K" value={performance.gaming4k} max={180} unit="FPS" />
              <Bar label="Video editing" value={performance.editing} max={100} unit="/100" />
              <Bar label="AI / ML" value={performance.ai} max={100} unit="/100" />
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground">Synthetic estimate based on selected CPU + GPU tier.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Slot({ label, parts, selected, onSelect }: { label: string; parts: Part[]; selected: Part | null; onSelect: (p: Part) => void }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">// {label.toLowerCase()}</p>
          <h3 className="mt-0.5 flex items-center gap-2 text-base font-bold"><Cpu className="h-4 w-4 text-accent" /> {label}</h3>
        </div>
        {selected && (
          <span className="rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-semibold text-success">
            <Check className="mr-1 inline h-3 w-3" /> selected
          </span>
        )}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {parts.map((p) => {
          const sel = selected?.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-3 text-left transition-all",
                sel ? "border-accent bg-accent/5 shadow-soft" : "border-border bg-card hover:border-accent/50 hover:bg-secondary"
              )}
            >
              <img src={p.image} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{p.name}</p>
                <p className="text-[11px] text-muted-foreground">{p.brand}{p.watts ? ` · ${p.watts}W` : ""}{p.socket ? ` · ${p.socket}` : ""}</p>
              </div>
              <p className="shrink-0 text-sm font-bold">{formatPrice(p.price)}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Bar({ label, value, max, unit }: { label: string; value: number; max: number; unit: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value} {unit}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-gradient-to-r from-accent to-primary transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
