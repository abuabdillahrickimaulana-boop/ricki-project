export default function KotakCari({
  nilai,
  saatBerubah,
}: {
  nilai: string;
  saatBerubah: (teks: string) => void;
}) {
  return (
    <input
      value={nilai}
      onChange={(e) => saatBerubah(e.target.value)}
      placeholder="Cari tulisan..."
    />
  );
}
