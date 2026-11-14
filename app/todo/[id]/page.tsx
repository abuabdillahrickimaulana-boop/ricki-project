import TodoDetail from "../_components/todo-detail";
import styles from "@/styles/todo.module.css";

export default async function TodoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className={styles.page}>
      <TodoDetail id={id} />
    </main>
  );
}
