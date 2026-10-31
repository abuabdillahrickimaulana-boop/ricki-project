import DaftarTulisan from "./daftar-tulisan";

const TULISAN = ["belajar-nextjs", "hal-baru", "target-tahun-ini"];

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="mt-4">
        <DaftarTulisan daftar={TULISAN} />
      </div>
    </main>
  );
}
