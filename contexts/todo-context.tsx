"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import * as api from "@/lib/todo-api";
import type { Todo } from "@/types/todo";

// Daftar "nami" yang sama seperti di pertemuan 07.
const OWNER = "nami";

type TodoContextValue = {
  todos: Todo[];
  sedangMemuat: boolean;
  error: string | null;
  tambahTodo: (
    teks: string,
    prioritas: "Tinggi" | "Sedang" | "Rendah",
    deadline: string,
    kategori: string,
  ) => Promise<void>;
  ubahSelesai: (id: number) => Promise<void>;
  hapusTodo: (id: number) => Promise<void>;
  editTodo: (
    id: number,
    teksBaru: string,
    prioritasBaru: "Tinggi" | "Sedang" | "Rendah",
    deadlineBaru: string,
    kategoriBaru: string,
  ) => Promise<void>;
  hapusSelesai: () => void;
  duplikatTodo: (id: number) => void;
  pindahTodo: (idDari: number, idTujuan: number) => void;
};

const TodoContext = createContext<TodoContextValue | null>(null);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sedangMemuat, setSedangMemuat] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function muat() {
      try {
        const daftar = await api.bacaTodos(OWNER);
        setTodos(daftar);
      } catch {
        setError("Gagal memuat daftar tugas dari server");
      } finally {
        setSedangMemuat(false);
      }
    }
    muat();
  }, []);

  const tambahTodo = useCallback(
    async (
      teks: string,
      prioritas: "Tinggi" | "Sedang" | "Rendah",
      deadline: string,
      kategori: string,
    ) => {
      const todoBaru = await api.tambahTodo(OWNER, teks);
      setTodos((daftarLama) => [...daftarLama, { ...todoBaru, prioritas, deadline, kategori }]);
    },
    [],
  );
  const ubahSelesai = useCallback(
    async (id: number) => {
      const target = todos.find((todo) => todo.id === id);
      if (!target) return;

      const hasil = await api.editStatusTodo(OWNER, id, !target.selesai);
      setTodos((daftarLama) =>
        daftarLama.map((todo) => (todo.id === id ? { ...todo, selesai: hasil.selesai } : todo)),
      );
    },
    [todos],
  );

  const hapusTodo = useCallback(async (id: number) => {
    await api.deleteTodo(OWNER, id);
    setTodos((daftarLama) => daftarLama.filter((todo) => todo.id !== id));
  }, []);

  const editTodo = useCallback(
    async (
      id: number,
      teksBaru: string,
      prioritasBaru: "Tinggi" | "Sedang" | "Rendah",
      deadlineBaru: string,
      kategoriBaru: string,
    ) => {
      const target = todos.find((todo) => todo.id === id);
      if (!target) return;

      const hasil = await api.editTodo(OWNER, id, {
        teks: teksBaru,
        selesai: target.selesai,
      });

      setTodos((daftarLama) =>
        daftarLama.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                teks: hasil.teks,
                selesai: hasil.selesai,
                prioritas: prioritasBaru,
                deadline: deadlineBaru,
                kategori: kategoriBaru,
              }
            : todo,
        ),
      );
    },
    [todos],
  );
  const hapusSelesai = useCallback(() => {
    setTodos((daftarLama) => daftarLama.filter((todo) => !todo.selesai));
  }, []);
  const duplikatTodo = useCallback((id: number) => {
    setTodos((daftarLama) => {
      const yangDiduplikat = daftarLama.find((todo) => todo.id === id);
      if (!yangDiduplikat) return daftarLama;
      return [...daftarLama, { ...yangDiduplikat, id: Date.now(), selesai: false }];
    });
  }, []);
  const pindahTodo = useCallback((idDari: number, idTujuan: number) => {
    if (idDari === idTujuan) return;
    setTodos((daftarLama) => {
      const dariIndex = daftarLama.findIndex((todo) => todo.id === idDari);
      const tujuanIndex = daftarLama.findIndex((todo) => todo.id === idTujuan);
      if (dariIndex === -1 || tujuanIndex === -1) return daftarLama;
      const baru = [...daftarLama];
      const [yangPindah] = baru.splice(dariIndex, 1);
      baru.splice(tujuanIndex, 0, yangPindah);
      return baru;
    });
  }, []);

  const value = useMemo(
    () => ({
      todos,
      sedangMemuat,
      error,
      tambahTodo,
      ubahSelesai,
      hapusTodo,
      editTodo,
      hapusSelesai,
      duplikatTodo,
      pindahTodo,
    }),
    [
      todos,
      sedangMemuat,
      error,
      tambahTodo,
      ubahSelesai,
      hapusTodo,
      editTodo,
      hapusSelesai,
      duplikatTodo,
      pindahTodo,
    ],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const context = useContext(TodoContext);

  if (context === null) {
    throw new Error("useTodos harus dipakai di dalam TodoProvider");
  }

  return context;
}
