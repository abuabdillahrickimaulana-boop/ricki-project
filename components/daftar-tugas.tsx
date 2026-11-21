"use client";

import { useEffect, useState } from "react";
import type { Todo } from "@/types/todo";

export default function DaftarTugas() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sedangMemuat, setSedangMemuat] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function muat() {
      try {
        const res = await fetch("https://nextjs-track-api.vercel.app/api/todos");
        if (!res.ok) {
          setError(`Server menjawab ${res.status}`);
          return;
        }
        const data = await res.json();
        setTodos(data.todos);
      } catch {
        setError("Tidak bisa terhubung ke server");
      } finally {
        setSedangMemuat(false);
      }
    }
    muat();
  }, []);

  if (sedangMemuat) return <p>Memuat daftar tugas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.teks}</li>
      ))}
    </ul>
  );
}
