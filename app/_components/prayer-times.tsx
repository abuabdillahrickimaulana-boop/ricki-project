"use client";
import { useEffect, useState } from "react";

type Timings = {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
};

export default function PrayerTimes() {
  const [timings, setTimings] = useState<Timings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("Jakarta");
  const [country, setCountry] = useState("Indonesia");
  const [cityInput, setCityInput] = useState("Jakarta");
  const [countryInput, setCountryInput] = useState("Indonesia");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=3&school=0`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Gagal");
        const data = await response.json();
        setTimings(data.data.timings as Timings);
      } catch {
        setError(`Gagal memuat jadwal untuk ${city}, ${country}`);
      } finally {
        setLoading(false);
      }
    };
    fetchPrayerTimes();
  }, [city, country]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCity(cityInput);
    setCountry(countryInput);
  };

  const toMinutes = (timeStr: string) => {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
  };

  if (loading) return <p className="text-center p-10">Loading jadwal sholat...</p>;
  if (error) return <p className="text-center p-10 text-red-500">{error}</p>;
  if (!timings) return null;

  const prayerList = [
    { name: "Subuh", key: "Fajr", time: timings.Fajr },
    { name: "Dzuhur", key: "Dhuhr", time: timings.Dhuhr },
    { name: "Ashar", key: "Asr", time: timings.Asr },
    { name: "Maghrib", key: "Maghrib", time: timings.Maghrib },
    { name: "Isya", key: "Isha", time: timings.Isha },
  ];

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  let nextPrayer = prayerList.find((p) => toMinutes(p.time) > currentMinutes);
  if (!nextPrayer) nextPrayer = prayerList[0];

  const getCountdown = () => {
    const targetMinutes = toMinutes(nextPrayer!.time);
    let diffMinutes = targetMinutes - currentMinutes;
    if (diffMinutes <= 0) {
      diffMinutes += 24 * 60;
    }
    const totalSeconds = diffMinutes * 60 - now.getSeconds();
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
  };

  const countdown = getCountdown();

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold">Jadwal Sholat</h1>
          <p className="text-sm text-gray-500">
            {city}, {country}
          </p>
        </div>
        <p className="text-xl font-mono font-bold">{now.toLocaleTimeString("id-ID")}</p>
      </div>

      <div className="bg-black text-white rounded-xl p-4 mb-6 text-center">
        <p className="text-sm opacity-70">Menuju {nextPrayer!.name}</p>
        <p className="text-2xl font-bold mt-1">
          {countdown.hours > 0 && `${countdown.hours} jam `}
          {countdown.minutes} menit {countdown.seconds} detik lagi
        </p>
        <p className="text-sm mt-1 text-green-400">
          Waktu {nextPrayer!.name}: {nextPrayer!.time}
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          className="border p-2 rounded w-1/2 text-sm"
          placeholder="Kota"
        />
        <input
          value={countryInput}
          onChange={(e) => setCountryInput(e.target.value)}
          className="border p-2 rounded w-1/2 text-sm"
          placeholder="Negara"
        />
        <button type="submit" className="bg-black text-white px-4 rounded text-sm">
          Cari
        </button>
      </form>

      <div className="space-y-3">
        {prayerList.map((prayer) => {
          const isActuallyPast =
            nextPrayer!.key === prayerList[0].key
              ? toMinutes(prayer.time) < currentMinutes && prayer.key !== "Fajr"
              : toMinutes(prayer.time) < currentMinutes;
          const isNext = nextPrayer!.key === prayer.key;

          return (
            <div
              key={prayer.key}
              className={`flex justify-between items-center p-3 rounded-xl transition-all
              ${isNext ? "bg-green-100 border-2 border-green-500 scale-[1.02] shadow-md" : ""}
              ${!isNext && isActuallyPast ? "bg-gray-50 opacity-50" : ""}
              ${!isNext && !isActuallyPast ? "bg-gray-50" : ""}
            `}
            >
              <div className="flex items-center gap-2">
                <span className={isNext ? "font-bold text-green-800" : ""}>{prayer.name}</span>
                {isNext && (
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded-full animate-pulse text-xs">
                    Selanjutnya
                  </span>
                )}
              </div>
              <b className={isNext ? "text-green-700 text-lg" : ""}>{prayer.time}</b>
            </div>
          );
        })}
      </div>
    </div>
  );
}
