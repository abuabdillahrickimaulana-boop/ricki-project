"use client";
import { useEffect, useState } from "react";
import { PrayerTimings } from "../types/prayer";

export default function PrayerTimes() {
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [city, setCity] = useState("Jakarta");
  const [country, setCountry] = useState("Indonesia");
  const [cityInput, setCityInput] = useState("Jakarta");
  const [countryInput, setCountryInput] = useState("Indonesia");

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        setError(null);
       const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=3&school=0`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }

        const data = await response.json();
        setTimings(data.data.timings);
      } catch (error) {
        console.error("Gagal mengambil waktu salat:", error);
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

  if (loading) return <p className="text-center p-10">Loading jadwal sholat...</p>;
  if (error) return <p className="text-center p-10 text-red-500">{error}</p>;
  if (!timings) return null;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-2">Jadwal Sholat Dunia</h1>
      <p className="text-sm text-gray-500 mb-4">{city}, {country}</p>
      
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input value={cityInput} onChange={(e) => setCityInput(e.target.value)} className="border p-2 rounded w-1/2" placeholder="Kota" />
        <input value={countryInput} onChange={(e) => setCountryInput(e.target.value)} className="border p-2 rounded w-1/2" placeholder="Negara" />
        <button type="submit" className="bg-black text-white px-4 rounded">Cari</button>
      </form>

      <div className="space-y-3">
  <div className="flex justify-between p-3 bg-gray-50 rounded">Fajr <b>{timings.Fajr}</b></div>
  <div className="flex justify-between p-3 bg-gray-50 rounded">Dhuhr <b>{timings.Dhuhr}</b></div>
  <div className="flex justify-between p-3 bg-gray-50 rounded">Asr <b>{timings.Asr}</b></div>
  <div className="flex justify-between p-3 bg-gray-50 rounded">Maghrib <b>{timings.Maghrib}</b></div>
  <div className="flex justify-between p-3 bg-gray-50 rounded">Isha <b>{timings.Isha}</b></div>
</div>
    </div>
  );
}