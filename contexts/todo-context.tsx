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
import { TODO_AWAL } from "@/data/todo";
import { bacaTodo, simpanTodo } from "@/lib/todo-storage";
import type { Todo } from "@/types/todo";

type TodoContextValue = {
  todos: Todo[];
  sudahMemuat: boolean;
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
  const [sudahMemuat, setSudahMemuat] = useState(false);

  useEffect(() => {
    const daftarTersimpan = bacaTodo();
    // localStorage baru dapat dibaca setelah komponen berjalan di browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodos(daftarTersimpan ?? TODO_AWAL);
    setSudahMemuat(true);
  }, []);

  useEffect(() => {
    if (!sudahMemuat) return;
    simpanTodo(todos);
  }, [todos, sudahMemuat]);

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
      sudahMemuat,
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
      sudahMemuat,
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
