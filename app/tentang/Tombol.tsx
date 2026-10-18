"use client";
import { useRouter } from "next/navigation";

export default function TombolBeranda() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="px-4 py-2 bg-black text-white rounded-lg"
    >
      Kembali ke Beranda
    </button>
  );
}