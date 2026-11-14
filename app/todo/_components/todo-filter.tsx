"use client";

import { PILIHAN_FILTER } from "@/data/todo";
import type { FilterTodo } from "@/types/todo";
import styles from "@/styles/todo.module.css";
export default function TodoFilter({
  pilihan,
  saatPilih,
}: {
  pilihan: FilterTodo;
  saatPilih: (pilihan: FilterTodo) => void;
}) {
  return (
    <div
      className={styles.filters}
      aria-label="Filter tugas"
      style={{ display: "flex", gap: "0.5rem", alignItems: "center", margin: 0, padding: 0 }}
    >
      {PILIHAN_FILTER.map((filter) => (
        <button
          key={filter.nilai}
          className={`${styles.filter} ${pilihan === filter.nilai ? styles.filterActive : ""}`}
          style={{
            height: "40px",
            display: "inline-flex",
            alignItems: "center",
            boxSizing: "border-box",
          }}
          onClick={() => saatPilih(filter.nilai)}
          type="button"
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
