"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];
export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-3 p-2">
      {links.map((link) => {
        const isActive = pathname === link.href;
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
    </nav>
  );
}
