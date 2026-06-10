import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type Ctx = { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void };

const ThemeCtx = createContext<Ctx | null>(null);
const KEY = "tab_theme_v1";

// Inline script injected in <head> to prevent flash of wrong theme.
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${KEY}");if(!t){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}if(t==="dark"){document.documentElement.classList.add("dark");}document.documentElement.style.colorScheme=t;}catch(e){}})();`;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY) as Theme | null;
      const initial: Theme =
        stored ??
        (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      setThemeState(initial);
      document.documentElement.classList.toggle("dark", initial === "dark");
      document.documentElement.style.colorScheme = initial;
    } catch {}
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem(KEY, t);
      document.documentElement.classList.toggle("dark", t === "dark");
      document.documentElement.style.colorScheme = t;
    } catch {}
  };

  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return <ThemeCtx.Provider value={{ theme, toggle, setTheme }}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) return { theme: "light" as Theme, toggle: () => {}, setTheme: () => {} };
  return ctx;
}
