import type { ReactNode } from "react";
// import { TodoProvider } from "@/contexts/todo-context";

export default function TodoLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <TodoProvider>{children}</TodoProvider> */}
      {children}
    </>
  );
}
