import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type Ctx = { ids: string[]; push: (id: string) => void; clear: () => void };
const RVCtx = createContext<Ctx | null>(null);
const KEY = "tab_recently_viewed_v1";
const MAX = 12;

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: string[]) => {
    setIds(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };

  const push = useCallback((id: string) => {
    setIds((cur) => {
      const next = [id, ...cur.filter((x) => x !== id)].slice(0, MAX);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const clear = () => persist([]);

  return <RVCtx.Provider value={{ ids, push, clear }}>{children}</RVCtx.Provider>;
}

export function useRecentlyViewed() {
  const ctx = useContext(RVCtx);
  if (!ctx) return { ids: [], push: () => {}, clear: () => {} };
  return ctx;
}
