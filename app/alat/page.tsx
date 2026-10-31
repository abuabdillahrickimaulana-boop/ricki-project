import KonversiSuhu from "./konversi-suhu";

export default function AlatPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Konversi Suhu</h1>
      <p className="mt-4">Ketik suhu Celcius, Fahrenheit-nya muncul.</p>
      <div className="mt-6">
        <KonversiSuhu />
      </div>
    </main>
  );
}
