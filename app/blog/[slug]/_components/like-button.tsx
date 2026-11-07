"use client";

import { useEffect, useState } from "react";

export default function LikeButton({ slug }: { slug: string }) {
  const [jumlahSuka, setJumlahSuka] = useState(0);

  useEffect(() => {
    try {
      const nilai = Number(localStorage.getItem(`suka-${slug}`));
      // eslint-disable-next-line react-hooks/set-state-in-effect -- baca localStorage setelah mount
      setJumlahSuka(Number.isFinite(nilai) && nilai >= 0 ? nilai : 0);
    } catch {
      // storage diblokir browser, pakai nilai awal 0
    }
  }, [slug]);

  function tambahSuka() {
    const jumlahBaru = jumlahSuka + 1;
    setJumlahSuka(jumlahBaru);
    try {
      localStorage.setItem(`suka-${slug}`, String(jumlahBaru));
    } catch {
      // storage penuh atau diblokir browser
    }
  }

  return (
    <button onClick={tambahSuka} className="rounded-lg border px-4 py-2">
      👍 {jumlahSuka}
    </button>
  );
}
