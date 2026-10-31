"use client";

import { useState } from "react";

export default function Penghitung() {
  const [jumlah, setJumlah] = useState(0);

  return (
    <main>
      <h1>Penghitung</h1>
      <p>Jumlah: {jumlah}</p>
      <button onClick={() => setJumlah(jumlah + 1)}>Tambah</button>
      <button onClick={() => setJumlah(jumlah - 1)}>Kurang</button>
      <button onClick={() => setJumlah(0)}>Ulangi dari nol</button>
    </main>
  );
}
