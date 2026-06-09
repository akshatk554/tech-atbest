import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

type Ctx = {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
};

const KEY = "tab_compare_v1";
const MAX = 4;
const C = createContext<Ctx | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hyd, setHyd] = useState(false);

  useEffect(() => {
    try { const r = localStorage.getItem(KEY); if (r) setIds(JSON.parse(r)); } catch {}
    setHyd(true);
  }, []);
  useEffect(() => { if (hyd) localStorage.setItem(KEY, JSON.stringify(ids)); }, [ids, hyd]);

  const value = useMemo<Ctx>(() => ({
    ids,
    has: (id) => ids.includes(id),
    toggle: (id) => setIds((p) => {
      if (p.includes(id)) return p.filter((x) => x !== id);
      if (p.length >= MAX) { toast.error(`Compare up to ${MAX} products`); return p; }
      return [...p, id];
    }),
    remove: (id) => setIds((p) => p.filter((x) => x !== id)),
    clear: () => setIds([]),
    count: ids.length,
  }), [ids]);

  return <C.Provider value={value}>{children}</C.Provider>;
}

export const useCompare = () => {
  const c = useContext(C);
  if (!c) throw new Error("useCompare outside provider");
  return c;
};
