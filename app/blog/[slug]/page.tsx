export default async function TulisanPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">{slug}</h1>
      <p className="mt-4">Isi tulisan bebas — tulis satu paragraf apa saja.</p>
    </main>
  );
}