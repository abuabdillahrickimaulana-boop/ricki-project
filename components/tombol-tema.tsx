"use client";

import { useTema } from "@/context/tema-context";

export default function TombolTema() {
  const { gelap, ubahTema } = useTema();

  return (
    <button
      onClick={ubahTema}
      className="rounded-lg border px-4 py-2"
    >
      {gelap ? "Ganti ke terang" : "Ganti ke gelap"}
    </button>
  );
}
