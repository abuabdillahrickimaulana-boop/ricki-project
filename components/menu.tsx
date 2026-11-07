"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTema } from "@/context/tema-context";
import { useFavorit } from "@/context/favorit-context";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/blog", label: "Blog" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];
export default function Menu() {
  const pathname = usePathname();
  const { gelap } = useTema();
  const { daftar } = useFavorit();
  const jumlahFavorit = daftar.length;
  
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

     <span className="ml-auto text-sm text-slate-600">
        Favorit: {jumlahFavorit}
      </span>

     <span className="ml-2 text-xs text-slate-500">
        Tema: {gelap ? "Gelap" : "Terang"}
      </span>
   </nav>
  );
}
