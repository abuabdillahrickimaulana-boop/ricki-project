"use client";

import { useEffect, useState } from "react";

export default function LikeButton({ slug }: { slug: string }) {
  const [jumlahSuka, setJumlahSuka] = useState(0);

  useEffect(() => {
    const simpanan = localStorage.getItem(`suka-${slug}`);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setJumlahSuka(simpanan === null ? 0 : Number(simpanan));
  }, [slug]);

  function tambahSuka() {
    const jumlahBaru = jumlahSuka + 1;
    setJumlahSuka(jumlahBaru);
    localStorage.setItem(`suka-${slug}`, String(jumlahBaru));
  }

  return (
    <button onClick={tambahSuka} className="rounded-lg border px-4 py-2">
      👍 {jumlahSuka}
    </button>
  );
}
