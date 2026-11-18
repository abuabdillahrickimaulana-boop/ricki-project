"use client";

import { useState, type FormEvent } from "react";
import styles from "@/styles/todo.module.css";

type TodoFormProps = {
  saatTambah: (
    teks: string,
    prioritas: "Tinggi" | "Sedang" | "Rendah",
    deadline: string,
    kategori: string,
  ) => void;
  daftarKategori: string[];
  kategori: string;
  saatPilihKategori: (kategori: string) => void;
  kategoriBaru: string;
  saatUbahKategoriBaru: (nilai: string) => void;
  saatTambahKategori: () => void;
};

export default function TodoForm({
  saatTambah,
  daftarKategori,
  kategori,
  saatPilihKategori,
  kategoriBaru,
  saatUbahKategoriBaru,
  saatTambahKategori,
}: TodoFormProps) {
  const [teks, setTeks] = useState("");
  const [prioritas, setPrioritas] = useState<"Tinggi" | "Sedang" | "Rendah">("Sedang");
  const [deadline, setDeadline] = useState("");

  function kirimForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const teksBersih = teks.trim();
    if (!teksBersih) return;

    saatTambah(teksBersih, prioritas, deadline, kategori);
    setTeks("");
    setPrioritas("Sedang");
    setDeadline("");
  }

  return (
    <form
      className={styles.form}
      onSubmit={kirimForm}
      style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
    >
      <div className={styles.inputWrapper} style={{ height: "44px" }}>
        <input
          className={[styles.input, styles.inputTeks].join(" ")}
          value={teks}
          onChange={(event) => setTeks(event.target.value)}
          placeholder="Tugas baru..."
          aria-label="Tugas baru"
        />
      </div>

      <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end" }}>
        <select
          className={[styles.input, styles.inputPrioritas].join(" ")}
          style={{ height: "44px", boxSizing: "border-box", flex: 1 }}
          value={kategori}
          onChange={(event) => saatPilihKategori(event.target.value)}
          aria-label="Kategori"
        >
          {daftarKategori.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", flex: 1 }}>
          <p className={styles.note} style={{ margin: 0 }}>
            Tambah kategori lain:
          </p>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <div className={styles.inputWrapper}>
              <input
                className={[styles.input, styles.inputTeks].join(" ")}
                value={kategoriBaru}
                onChange={(event) => saatUbahKategoriBaru(event.target.value)}
                placeholder="Organisasi"
                aria-label="Kategori baru"
              />
            </div>
            <button
              type="button"
              onClick={saatTambahKategori}
              className={styles.button}
              style={{ height: "44px", boxSizing: "border-box", width: "130px", flex: "none" }}
            >
              + Kategori
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <select
          className={[styles.input, styles.inputPrioritas].join(" ")}
          style={{ height: "44px", boxSizing: "border-box", flex: 1 }}
          value={prioritas}
          onChange={(event) => setPrioritas(event.target.value as "Tinggi" | "Sedang" | "Rendah")}
          aria-label="Prioritas"
        >
          <option value="Tinggi">Prioritas Tinggi</option>
          <option value="Sedang">Prioritas Sedang</option>
          <option value="Rendah">Prioritas Rendah</option>
        </select>

        <input
          className={[styles.input, styles.inputTanggal].join(" ")}
          type="date"
          style={{ height: "44px", boxSizing: "border-box", width: "160px", flex: "none" }}
          value={deadline}
          onChange={(event) => setDeadline(event.target.value)}
          aria-label="Tanggal batas"
        />
        <button
          className={styles.button}
          type="submit"
          style={{ height: "44px", boxSizing: "border-box", width: "130px", flex: "none" }}
        >
          + Tugas
        </button>
      </div>
    </form>
  );
}
