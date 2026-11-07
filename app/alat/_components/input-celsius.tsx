export default function InputCelcius({
  nilai,
  saatBerubah,
}: {
  nilai: number;
  saatBerubah: (n: number) => void;
}) {
  return (
    <label>
      Celcius:{" "}
      <input
        type="number"
        value={nilai}
        onChange={(e) => saatBerubah(Number(e.target.value))}
        className="rounded-lg border px-4 py-2"
      />
    </label>
  );
}
