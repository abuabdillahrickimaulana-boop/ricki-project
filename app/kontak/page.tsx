export default function KontakPage() {
  return (
    <div className="mx-auto max-w-2xl pt-16">
      <h1 className="mb-8 text-center text-3xl font-bold">Hubungi Saya</h1>
      {/* Kotak Luar */}
      <div className="mx-auto w-fit rounded-2xl border p-6">
        <div className="flex justify-center gap-3">
          {/* Tombol Email */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=abuabdillahrickimaulana@gmail.com&su=Halo%20Ricki&body=Halo%20Ricki, %20saya%20lihat%20website%20kamu"
            target="_blank"
            className="rounded-full bg-[#EA4335] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#D93025] active-95"
          >
            Kirim Email
          </a>
          {/* Tombol WA - 6289655330702 */}
          <a
            href="https://wa.me/6289655330702?text=Halo%20Ricki&body=Halo%20Ricki, %20saya%20lihat%20website%20kamu"
            target="_blank"
            className="rounded-full border bg-green-500 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-green-600 active-95"
          >
            Chat WA
          </a>
        </div>
      </div>
    </div>
  );
}
