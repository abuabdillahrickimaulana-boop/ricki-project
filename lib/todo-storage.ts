import { TODO_STORAGE_KEY } from "@/data/todo";
import type { Todo } from "@/types/todo";

export function bacaTodo(): Todo[] | null {
  const tersimpan = localStorage.getItem(TODO_STORAGE_KEY);
  return tersimpan ? (JSON.parse(tersimpan) as Todo[]) : null;
}

export function simpanTodo(todos: Todo[]) {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}
