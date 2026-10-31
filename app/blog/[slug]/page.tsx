import LikeButton from "./like-button";

export default async function TulisanPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold">Tulisan: {slug}</h1>
      <p className="mt-4">Ini halaman untuk alamat /blog/{slug}.</p>
      <div className="mt-6">
        <LikeButton slug={slug} />
      </div>
    </main>
  );
}
