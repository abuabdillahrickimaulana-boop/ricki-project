"use client";

import Link from "next/link";
import { memo, useState } from "react";
import type { Todo } from "@/types/todo";
import styles from "@/styles/todo.module.css";

function TodoItem({
  todo,
  saatDicentang,
  saatDihapus,
  saatDiedit,
  saatDiduplikat,
  saatDipindah,
}: {
  todo: Todo;
  saatDicentang: (id: number) => void;
  saatDihapus: (id: number) => void;
  saatDiedit: (
    id: number,
    teksBaru: string,
    prioritasBaru: "Tinggi" | "Sedang" | "Rendah",
    deadlineBaru: string,
    kategoriBaru: string,
  ) => void;
  saatDiduplikat: (id: number) => void;
  saatDipindah: (idDari: number, idTujuan: number) => void;
}) {
  const [sedangEdit, setSedangEdit] = useState(false);
  const [teksEdit, setTeksEdit] = useState(todo.teks);
  const [prioritasEdit, setPrioritasEdit] = useState<"Tinggi" | "Sedang" | "Rendah">(
    todo.prioritas,
  );
  const [deadlineEdit, setDeadlineEdit] = useState(todo.deadline);
  const [kategoriEdit, setKategoriEdit] = useState(todo.kategori);

  function mulaiEdit() {
    setTeksEdit(todo.teks);
    setPrioritasEdit(todo.prioritas);
    setDeadlineEdit(todo.deadline);
    setKategoriEdit(todo.kategori);
    setSedangEdit(true);
  }

  function simpanEdit() {
    if (!teksEdit.trim()) return;
    saatDiedit(todo.id, teksEdit.trim(), prioritasEdit, deadlineEdit, kategoriEdit);
    setSedangEdit(false);
  }
  if (sedangEdit) {
    return (
      <li
        className={styles.item}
        style={{ flexDirection: "column", alignItems: "stretch", gap: "0.5rem" }}
      >
        <input
          className={styles.input}
          value={teksEdit}
          onChange={(e) => setTeksEdit(e.target.value)}
          placeholder="Tugas baru..."
          autoFocus
        />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <select
            className={styles.input}
            value={prioritasEdit}
            onChange={(e) => setPrioritasEdit(e.target.value as "Tinggi" | "Sedang" | "Rendah")}
          >
            <option value="Tinggi">Prioritas Tinggi</option>
            <option value="Sedang">Prioritas Sedang</option>
            <option value="Rendah">Prioritas Rendah</option>
          </select>
          <input
            className={styles.input}
            type="date"
            value={deadlineEdit}
            onChange={(e) => setDeadlineEdit(e.target.value)}
          />
        </div>
        <input
          className={styles.input}
          value={kategoriEdit}
          onChange={(e) => setKategoriEdit(e.target.value)}
          placeholder="Kategori"
        />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className={styles.button} type="button" onClick={simpanEdit}>
            Simpan
          </button>
          <button type="button" onClick={() => setSedangEdit(false)}>
            Batal
          </button>
        </div>
      </li>
    );
  }
  return (
    <li
      className={styles.item}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", String(todo.id));
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        const idDari = Number(e.dataTransfer.getData("text/plain"));
        if (idDari) saatDipindah(idDari, todo.id);
      }}
      style={{ cursor: "grab" }}
    >
      <input
        type="checkbox"
        checked={todo.selesai}
        onChange={() => saatDicentang(todo.id)}
        aria-label={`Tandai ${todo.teks} selesai`}
      />
      <Link
        className={`${styles.itemText} ${todo.selesai ? styles.done : ""}`}
        href={`/todo/${todo.id}`}
        style={{
          textDecoration: todo.selesai ? "line-through" : "none",
          opacity: todo.selesai ? 0.6 : 1,
        }}
      >
        {todo.teks}
      </Link>
      <span
        className={[
          styles.badge,
          todo.prioritas === "Tinggi"
            ? styles.prioritasTinggi
            : todo.prioritas === "Sedang"
              ? styles.prioritasSedang
              : styles.prioritasRendah,
        ].join(" ")}
      >
        {todo.prioritas}
      </span>

      <span className={styles.badge}>{todo.kategori || "Lainnya"}</span>

      <span className={styles.deadline}>
        {todo.deadline ? `📅 ${todo.deadline}` : "Tanpa deadline"}
      </span>
      <button className={styles.remove} onClick={mulaiEdit} type="button">
        Edit
      </button>
      <button className={styles.remove} onClick={() => saatDiduplikat(todo.id)} type="button">
        Duplikat
      </button>
      <button className={styles.remove} onClick={() => saatDihapus(todo.id)} type="button">
        Hapus
      </button>
    </li>
  );
}

export default memo(TodoItem);
