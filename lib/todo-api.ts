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
async function kirimRequest(alamat: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(`${API_URL}${alamat}`, init);

  if (!res.ok) {
    let pesan = `Request gagal (${res.status})`;
    const data = await res.json().catch(() => null);
    if (data && data.error) {
      pesan = data.error;
    }
    throw new Error(pesan);
  }

  return res;
}
export async function tambahTodo(owner: string, teks: string): Promise<Todo> {
  const res = await kirimRequest(`/api/todos?owner=${owner}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teks }),
  });

  return res.json();
}
export async function editStatusTodo(owner: string, id: number, selesai: boolean): Promise<Todo> {
  const res = await kirimRequest(`/api/todos/${id}?owner=${owner}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ selesai }),
  });
  return res.json();
}

export async function editTodo(
  owner: string,
  id: number,
  todo: { teks: string; selesai: boolean },
): Promise<Todo> {
  const res = await kirimRequest(`/api/todos/${id}?owner=${owner}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teks: todo.teks, selesai: todo.selesai }),
  });
  return res.json();
}

export async function deleteTodo(owner: string, id: number): Promise<void> {
  await kirimRequest(`/api/todos/${id}?owner=${owner}`, {
    method: "DELETE",
  });
}

export async function bacaTodos(owner: string): Promise<Todo[]> {
  const res = await kirimRequest(`/api/todos?owner=${owner}`);
  const data: DaftarTodos = await res.json();
  return data.todos;
}
