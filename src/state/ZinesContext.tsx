import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialZines } from "../data/mockZines";
import type { Zine } from "../types";

interface ZinesContextValue {
  zines: Zine[];
  favorites: Zine[];
  createZine: (title: string) => Zine;
  toggleFavorite: (id: string) => void;
  touchZine: (id: string) => void;
  getZine: (id: string) => Zine | undefined;
}

const ZinesContext = createContext<ZinesContextValue | undefined>(undefined);

export function ZinesProvider({ children }: { children: ReactNode }) {
  const [zines, setZines] = useState<Zine[]>(initialZines);

  const createZine = useCallback((title: string) => {
    const now = new Date().toISOString();
    const zine: Zine = {
      id: `z-${Date.now()}`,
      title,
      favorited: false,
      createdAt: now,
      lastAccessed: now,
    };
    setZines((prev) => [zine, ...prev]);
    return zine;
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setZines((prev) =>
      prev.map((z) => (z.id === id ? { ...z, favorited: !z.favorited } : z)),
    );
  }, []);

  const touchZine = useCallback((id: string) => {
    setZines((prev) =>
      prev.map((z) =>
        z.id === id ? { ...z, lastAccessed: new Date().toISOString() } : z,
      ),
    );
  }, []);

  const getZine = useCallback(
    (id: string) => zines.find((z) => z.id === id),
    [zines],
  );

  const favorites = useMemo(() => zines.filter((z) => z.favorited), [zines]);

  const value = useMemo(
    () => ({ zines, favorites, createZine, toggleFavorite, touchZine, getZine }),
    [zines, favorites, createZine, toggleFavorite, touchZine, getZine],
  );

  return <ZinesContext.Provider value={value}>{children}</ZinesContext.Provider>;
}

export function useZines() {
  const ctx = useContext(ZinesContext);
  if (!ctx) throw new Error("useZines must be used within a ZinesProvider");
  return ctx;
}
