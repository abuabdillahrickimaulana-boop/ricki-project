import type { FilterTodo, Todo } from "@/types/todo";

export const TODO_STORAGE_KEY = "todos";

export const TODO_AWAL: Todo[] = [];

export const PILIHAN_FILTER: { nilai: FilterTodo; label: string }[] = [
  { nilai: "semua", label: "Semua" },
  { nilai: "belum", label: "Belum selesai" },
  { nilai: "selesai", label: "Selesai" },
];
