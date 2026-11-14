"use client";

import { useRouter } from "next/navigation";
import { useTodos } from "@/contexts/todo-context";
import styles from "@/styles/todo.module.css";

export default function TodoDetail({ id }: { id: string }) {
  const router = useRouter();
  const { todos, sudahMemuat } = useTodos();
  const todo = todos.find((item) => String(item.id) === id) ?? null;
  const sisaHari = todo?.deadline
    ? Math.ceil(
        (new Date(todo.deadline).getTime() - new Date().setHours(0, 0, 0, 0)) /
          (1000 * 60 * 60 * 24),
      )
    : null;
  return (
    <section>
      <h1 className="mb-5 text-3xl font-bold text-red">Detail tugas</h1>
      <section className={styles.card}>
        {!sudahMemuat ? (
          <p>Memuat tugas...</p>
        ) : todo ? (
          <>
            <h2 className="text-xl font-bold" style={{ color: "#111827" }}>
              {todo.teks}
            </h2>

            <p style={{ color: "#111827" }}>
              <span
                className={[
                  styles.badge,
                  todo.prioritas === "Tinggi"
                    ? styles.prioritasTinggi
                    : todo.prioritas === "Sedang"
                      ? styles.prioritasSedang
                      : styles.prioritasRendah,
                ].join(" ")}
              >
                {todo.prioritas}
              </span>
              {"  "}📅 {todo.deadline || "Tanpa deadline"}
            </p>
            {sisaHari !== null && (
              <p className={styles.note}>
                {sisaHari < 0
                  ? `⚠️ Udah lewat ${Math.abs(sisaHari)} hari!`
                  : sisaHari === 0
                    ? "Deadline hari ini!"
                    : `Sisa ${sisaHari} hari lagi`}
              </p>
            )}
            <p className={styles.note}>Status: {todo.selesai ? "Selesai" : "Belum selesai"}</p>
          </>
        ) : (
          <p>Tugas tidak ditemukan.</p>
        )}
        <button className="mt-5 font-semibold text-teal-800" onClick={() => router.back()}>
          ← Kembali ke daftar
        </button>
      </section>
    </section>
  );
}
