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
import { bacaTodos } from "@/lib/todo-api";
import type { Todo } from "@/types/todo";

type TodoContextValue = {
  todos: Todo[];
  sedangMemuat: boolean;
  error: string | null;
  tambahTodo: (
    teks: string,
    prioritas: "Tinggi" | "Sedang" | "Rendah",
    deadline: string,
    kategori: string,
  ) => void;
  ubahSelesai: (id: number) => void;
  hapusTodo: (id: number) => void;
  editTodo: (
    id: number,
    teksBaru: string,
    prioritasBaru: "Tinggi" | "Sedang" | "Rendah",
    deadlineBaru: string,
    kategoriBaru: string,
  ) => void;
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
        const daftar = await bacaTodos("nami");
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
    (
      teks: string,
      prioritas: "Tinggi" | "Sedang" | "Rendah",
      deadline: string,
      kategori: string,
    ) => {
      setTodos((daftarLama) => [
        ...daftarLama,
        { id: Date.now(), teks, selesai: false, prioritas, deadline, kategori },
      ]);
    },
    [],
  );

  const ubahSelesai = useCallback((id: number) => {
    setTodos((daftarLama) =>
      daftarLama.map((todo) => (todo.id === id ? { ...todo, selesai: !todo.selesai } : todo)),
    );
  }, []);

  const hapusTodo = useCallback((id: number) => {
    setTodos((daftarLama) => daftarLama.filter((todo) => todo.id !== id));
  }, []);

  const editTodo = useCallback(
    (
      id: number,
      teksBaru: string,
      prioritasBaru: "Tinggi" | "Sedang" | "Rendah",
      deadlineBaru: string,
      kategoriBaru: string,
    ) => {
      setTodos((daftarLama) =>
        daftarLama.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                teks: teksBaru,
                prioritas: prioritasBaru,
                deadline: deadlineBaru,
                kategori: kategoriBaru,
              }
            : todo,
        ),
      );
    },
    [],
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
