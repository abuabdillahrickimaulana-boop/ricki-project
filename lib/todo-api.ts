import type { Todo } from "@/types/todo";

// Alamat API untuk latihan ini.
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Jawaban API berisi daftar Todo dan informasi halaman.
export type DaftarTodos = {
  todos: Todo[];
  total: number;
  page: number;
  limit: number;
  totalHalaman: number;
};

export async function bacaTodos(owner: string): Promise<Todo[]> {
  const res = await fetch(`${API_URL}/api/todos?owner=${owner}`);

  if (!res.ok) {
    throw new Error(`Server menjawab ${res.status}`);
  }

  const data: DaftarTodos = await res.json();
  return data.todos;
}
