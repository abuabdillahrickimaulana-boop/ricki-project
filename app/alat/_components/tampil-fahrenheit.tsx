export default function TampilFahrenheit({ celcius }: { celcius: number }) {
  const fahrenheit = (celcius * 9) / 5 + 32;

  return (
    <p className="mt-2">
      {celcius}°C = {fahrenheit}°F
    </p>
  );
}
