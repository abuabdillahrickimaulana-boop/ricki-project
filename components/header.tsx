import Menu from "@/components/menu";
import TombolTema from "@/components/tombol-tema";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <span className="font-bold">Blog Saya</span>
     <div className="flex justify-center">
        <Menu />
      </div>

      <div className="flex justify-end">
         <TombolTema />
      </div>
    </header>
  );
}