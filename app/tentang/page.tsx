import TombolBeranda from "./Tombol";
export default function Tentang() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold m-4">Tentang Saya</h1>
      <p className="text-slate-600 leading-relaxed">
        Saya adalah Ricki Maulana. Saya berasal dari Purbalingga. Hobi saya adalah ngoding.
      </p>
      <div className="mt-6">
        <TombolBeranda />
      </div>
    </div>
  );
}
