import { create } from "zustand";

type FavoritState = {
  daftar: string[];
  ubahFavorit: (slug: string) => void;
};

export const useFavorit = create<FavoritState>((setState) => ({
  daftar: [],

  ubahFavorit: (slug) =>
    setState((stateLama) => {
      const sudahDisimpan = stateLama.daftar.includes(slug);

      if (sudahDisimpan) {
        return {
          daftar: stateLama.daftar.filter((item) => item !== slug),
        };
      }

      return {
        daftar: [...stateLama.daftar, slug],
      };
    }),
}));
