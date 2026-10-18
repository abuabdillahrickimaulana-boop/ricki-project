import PrayerTimes from "./components/PrayerTimes";

export default function Home() {
  const today = new Date();
  const hijriyah = new Intl.DateTimeFormat("id-ID-u-ca-islamic-umalqura", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(today);

  let masehi = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(today);

  // GANTI MINGGU JADI AHAD
  masehi = masehi.replace("Minggu", "Ahad");

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 px-4">
      <h1 className="text-5xl font-bold text-center">Hikmah</h1>
      <p className="text-center text-gray-600 mt-1">
        Mengamalkan ilmu secara bijaksana dan tepat pada tempatnya
      </p>

      <div className="max-w-2xl mt-8 bg-green-50 p-6 rounded-lg border border-green-200">
        <p className="font-semibold text-center text-green-800">QS. Al-Baqarah : 269</p>
        <p className="mt-3 text-center text-xl leading-loose">
          يُؤْتِي الْحِكْمَةَ مَنْ يَشَاءُ ۚ وَمَنْ يُؤْتَ الْحِكْمَةَ فَقَدْ أُوتِيَ خَيْرًا
          كَثِيرً
        </p>
        <p className="mt-4 text-sm text-center text-gray-700 leading-relaxed">
          Allah menganugerahkan Al-Hikmah kepada siapa yang Dia kehendaki. Dan barangsiapa yang
          dianugerahi Al-hikmah itu, ia benar-benar telah dianugerahi karunia yang banyak
        </p>
      </div>

      <div className="mt-8 bg-white px-6 py-3 rounded-full border shadow-sm text-center">
        <p className="font-semibold text-green-800">{hijriyah}</p>
        <p className="text-gray-600">{masehi}</p>
      </div>

      <PrayerTimes />
    </div>
  );
}
