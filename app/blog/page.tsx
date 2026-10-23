import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul className="mt-4 list-disc pl-5 underline">
        <li>
          <Link href="/blog/belajar-nextjs">Belajar Next.js</Link>
        </li>
        <li>
          <Link href="/blog/hal-baru">Hal baru yang saya pelajari</Link>
        </li>
        <li>
          <Link href="/blog/target-tahun-ini">Target tahun ini</Link>
        </li>
      </ul>
    </main>
  );
}
