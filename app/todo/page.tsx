"use client";
import TodoApp from "./_components/todo-app";
import styles from "@/styles/todo.module.css";
import { useState } from "react";
export default function TodoPage() {
  const [temaGelap, setTemaGelap] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("temaGelap") === "true";
  });

  function gantiTema() {
    const baru = !temaGelap;
    setTemaGelap(baru);
    localStorage.setItem("temaGelap", String(baru));
  }
  return (
    <main className={[styles.page, temaGelap ? styles.gelap : styles.terang].join(" ")}>
      <button onClick={gantiTema} className={styles.tombolTema}>
        {temaGelap ? "☀️" : "🌙"}
      </button>
      <h1 className="mb-2 text-3xl font-bold text-teal-900">Mini Project Todo</h1>
      <p className="mb-5 text-zinc-600">
        Kelola tugas Anda dengan mudah: tambah, sunting, duplikat, seret untuk mengurutkan, dan
        hapus tugas. Atur prioritas, tenggat, kategori, warna tema, dan mode terang / gelap. Semua
        tersimpan otomatis di browser.
      </p>
      <TodoApp temaGelap={temaGelap} />
    </main>
  );
}
