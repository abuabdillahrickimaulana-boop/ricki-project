"use client";

import { useState } from "react";
import Link from "next/link";
import KotakCari from "./kotak-cari";
import TombolFavorit from "@/components/tombol-favorit";

export default function DaftarTulisan({ daftar }: { daftar: string[] }) {
  const [cari, setCari] = useState("");

  const hasil = daftar.filter((slug) => slug.includes(cari));

  return (
    <div>
      <KotakCari nilai={cari} saatBerubah={setCari} />
      <ul className="mt-4 space-y-2">
        {hasil.map((slug) => (
          <li key={slug} className="flex items-center justify-between border p-2 rounded-lg">
            <Link href={`/blog/${slug}`}>{slug}</Link>
            <TombolFavorit slug={slug} />
          </li>
        ))}
      </ul>
    </div>
  );
}
