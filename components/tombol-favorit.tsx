"use client";

import { useFavorit } from "@/context/favorit-context";

export default function TombolFavorit({ slug }: { slug: string }) {
  const { daftar, ubahFavorit } = useFavorit();
  const sudahDisimpan = daftar.includes(slug);

  return (
    <button
      onClick={() => ubahFavorit(slug)}
      className="rounded-lg border px-4 py-2"
    >
      {sudahDisimpan ? "★ Tersimpan" : "☆ Simpan ke favorit"}
    </button>
  );
}
