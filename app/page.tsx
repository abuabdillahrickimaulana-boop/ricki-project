"use client";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [timings, setTimings] = useState<Record<string, string> | null>(null);
  const dates = useMemo(() => {
    const today = new Date();
    const hijriyah = new Intl.DateTimeFormat("id-ID-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(today);
    const masehi = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(today);
    return { hijriyah, masehi };
  }, []);
  useEffect(() => {
    fetch("https://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia&method=3")
      .then((res) => res.json())
      .then((data) => {
        if (data.data?.timings) setTimings(data.data.timings);
      });
  }, []);
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
          كَثِيرًا
        </p>
        <p className="mt-2 text-sm text-center italic">
          &quot;Allah menganugerahkan Al-Hikmah kepada siapa yang Dia kehendaki. Dan barangsiapa
          yang dianugerahi Al-hikmah itu, ia benar-benar telah dianugerahi karunia yang banyak&quot;
        </p>
      </div>
      <div className="mt-8 bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm text-center">
        <p className="font-semibold text-green-800">{dates.hijriyah}</p>
        <p className="text-gray-600">{dates.masehi}</p>
      </div>
      {timings && (
        <div className="max-w-2xl w-full mt-6 bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <p className="font-bold text-center mb-4">Waktu Sholat Jakarta Timur</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 text-center text-sm max-w-lg mx-auto">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500">Subuh</p>
              <p className="font-bold">{timings.Fajr}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500">Dzuhur</p>
              <p className="font-bold">{timings.Dhuhr}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500">Ashar</p>
              <p className="font-bold">{timings.Asr}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500">Maghrib</p>
              <p className="font-bold">{timings.Maghrib}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-500">Isya</p>
              <p className="font-bold">{timings.Isha}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
