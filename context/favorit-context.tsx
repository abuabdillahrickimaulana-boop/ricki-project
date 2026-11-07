"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type FavoritState = {
  daftar: string[];
  ubahFavorit: (slug: string) => void;
};

const FavoritContext = createContext<FavoritState | null>(null);

export function FavoritProvider({ children }: { children: ReactNode }) {
  const [daftar, setDaftar] = useState<string[]>([]);

  function ubahFavorit(slug: string) {
    setDaftar((daftarLama) => {
      const sudahDisimpan = daftarLama.includes(slug);
      if (sudahDisimpan) {
        return daftarLama.filter((item) => item !== slug);
      }
      return [...daftarLama, slug];
    });
  }

  return (
    <FavoritContext.Provider value={{ daftar, ubahFavorit }}>
      {children}
    </FavoritContext.Provider>
  );
}

export function useFavorit() {
  const data = useContext(FavoritContext);
  if (data === null) {
    throw new Error("useFavorit harus dipakai di dalam FavoritProvider");
  }
  return data;
}