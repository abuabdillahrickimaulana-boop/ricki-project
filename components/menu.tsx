"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTema } from "@/contexts/tema-context";
import { useFavorit } from "@/contexts/favorit-context";
import { useTodos } from "@/contexts/todo-context";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/blog", label: "Blog" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
  { href: "/todo", label: "Todo" },
];
export default function Menu() {
  const pathname = usePathname();
  const { gelap } = useTema();
  const { daftar } = useFavorit();
  const jumlahFavorit = daftar.length;
  const { todos } = useTodos();
  const jumlahBelumSelesai = todos.filter((todo) => !todo.selesai).length;

  return (
    <nav className="flex gap-3 p-2 justify-center">
      {links.map((link) => {
        const isActive =
          pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all hover:shadow-md hover:scale-105 ${isActive ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-black hover:text-white"}`}
          >
            {link.label}
          </Link>
        );
      })}

      <span className="ml-auto text-sm text-slate-600">Favorit: {jumlahFavorit}</span>
      <span className="ml-2 text-sm text-slate-600">Todo belum selesai: {jumlahBelumSelesai}</span>

      <span className="ml-2 text-xs text-slate-500">Tema: {gelap ? "Gelap" : "Terang"}</span>
    </nav>
  );
}
