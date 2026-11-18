"use client";

import { memo } from "react";
import type { Todo } from "@/types/todo";
import styles from "@/styles/todo.module.css";
import TodoItem from "./todo-item";

function TodoList({
  todos,
  saatDicentang,
  saatDihapus,
  saatDiedit,
  saatDiduplikat,
  saatDipindah,
}: {
  todos: Todo[];
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
  if (todos.length === 0) {
    return <p className={styles.note}>Belum ada tugas di pilihan ini. Tambahkan tugas baru.</p>;
  }

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          saatDicentang={saatDicentang}
          saatDihapus={saatDihapus}
          saatDiedit={saatDiedit}
          saatDiduplikat={saatDiduplikat}
          saatDipindah={saatDipindah}
        />
      ))}
    </ul>
  );
}

export default memo(TodoList);
