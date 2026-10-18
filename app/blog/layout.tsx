import Link from "next/link";

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <p className="bg-slate-100 px-6 py-2 text-sm text-slate-600">
        Bagian: Blog —{" "}
        <Link href="/blog" className="underline">
          semua tulisan
        </Link>
      </p>
      {children}
    </section>
  );
}