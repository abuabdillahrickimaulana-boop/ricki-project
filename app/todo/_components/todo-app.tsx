"use client";

import { useMemo, useState } from "react";
import { useTodos } from "@/contexts/todo-context";
import type { FilterTodo } from "@/types/todo";
import styles from "@/styles/todo.module.css";
import TodoFilter from "./todo-filter";
import TodoForm from "./todo-form";
import TodoList from "./todo-list";

export default function TodoApp({ temaGelap }: { temaGelap: boolean }) {
  const {
    todos,
    sudahMemuat,
    tambahTodo,
    ubahSelesai,
    hapusTodo,
    editTodo,
    hapusSelesai,
    duplikatTodo,
    pindahTodo,
  } = useTodos();
  const [filter, setFilter] = useState<FilterTodo>("semua");
  const [cari, setCari] = useState("");
  const [daftarKategori, setDaftarKategori] = useState<string[]>(["Kuliah", "Kerja", "Pribadi"]);
  const [kategori, setKategori] = useState("Kuliah");
  const [kategoriBaru, setKategoriBaru] = useState("");
  const [filterKategori, setFilterKategori] = useState("Semua");
  const todosTampil = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "belum" && todo.selesai) return false;
      if (filter === "selesai" && !todo.selesai) return false;
      if (cari && !todo.teks.toLowerCase().includes(cari.toLowerCase())) return false;
      if (filterKategori !== "Semua" && todo.kategori !== filterKategori) return false;
      return true;
    });
  }, [todos, filter, cari, filterKategori]);

  const jumlahBelumSelesai = todos.filter((todo) => !todo.selesai).length;
  const jumlahSelesai = todos.filter((todo) => todo.selesai).length;
  const kategoriUntukFilter = Array.from(
    new Set([...daftarKategori, ...todos.map((todo) => todo.kategori).filter(Boolean)]),
  );
  const tambahKategori = () => {
    const nama = kategoriBaru.trim();
    if (!nama) return;
    if (daftarKategori.some((k) => k.toLowerCase() === nama.toLowerCase())) return;

    setDaftarKategori([...daftarKategori, nama]);
    setKategori(nama);
    setKategoriBaru("");
  };

  const hapusKategori = () => {
    if (filterKategori === "Semua") return;
    if (!confirm(`Hapus kategori "${filterKategori}"?`)) return;
    setDaftarKategori(daftarKategori.filter((k) => k !== filterKategori));
    setFilterKategori("Semua");
    if (kategori === filterKategori) setKategori("Kuliah");
  };

  if (!sudahMemuat) {
    return <p className={styles.note}>Memuat daftar tugas...</p>;
  }

  return (
    <div className={[styles.card, temaGelap ? styles.gelap : styles.terang].join(" ")}>
      <TodoForm
        saatTambah={tambahTodo}
        daftarKategori={kategoriUntukFilter}
        kategori={kategori}
        saatPilihKategori={setKategori}
        kategoriBaru={kategoriBaru}
        saatUbahKategoriBaru={setKategoriBaru}
        saatTambahKategori={tambahKategori}
      />
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <TodoFilter pilihan={filter} saatPilih={setFilter} />

        <select
          className={styles.filter}
          style={{
            height: "40px",
            padding: "0 14px",
            fontSize: "14px",
            borderRadius: "999px",
            boxSizing: "border-box",
          }}
          value={filterKategori}
          onChange={(event) => setFilterKategori(event.target.value)}
          aria-label="Filter kategori"
        >
          <option value="Semua">Semua Kategori</option>
          {kategoriUntukFilter.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={hapusKategori}
          style={{
            height: "40px",
            padding: "0 14px",
            fontSize: "14px",
            borderRadius: "999px",
            boxSizing: "border-box",
          }}
        >
          Hapus Kategori
        </button>
      </div>
      <input
        className={styles.search}
        placeholder="🔍 Cari tugas..."
        value={cari}
        onChange={(event) => setCari(event.target.value)}
      />
      <TodoList
        todos={todosTampil}
        saatDicentang={ubahSelesai}
        saatDihapus={hapusTodo}
        saatDiedit={editTodo}
        saatDiduplikat={duplikatTodo}
        saatDipindah={pindahTodo}
      />
      {jumlahSelesai > 0 && (
        <button
          type="button"
          onClick={() => {
            if (confirm(`Hapus ${jumlahSelesai} tugas yang sudah selesai?`)) hapusSelesai();
          }}
          style={{
            height: "40px",
            padding: "0 14px",
            fontSize: "14px",
            borderRadius: "999px",
            boxSizing: "border-box",
            marginTop: "1rem",
            cursor: "pointer",
          }}
        >
          Hapus Semua Selesai ({jumlahSelesai})
        </button>
      )}
      <p className={styles.note}>
        {jumlahBelumSelesai} dari {todos.length} tugas belum selesai
      </p>
      <p className={styles.note}>
        Aplikasi ini menggunakan <code>useMemo</code> untuk menghitung daftar yang ditampilkan
        (filter, pencarian, dan kategori) dan <code>useCallback</code> untuk mengirim fungsi{" "}
        <code>tambahTodo</code>, <code>ubahSelesai</code>, <code>hapusTodo</code>,{" "}
        <code>editTodo</code>, <code>duplikatTodo</code>, dan <code>pindahTodo</code> ke komponen
        anak agar tidak melakukan render ulang yang tidak perlu.
      </p>
    </div>
  );
}
