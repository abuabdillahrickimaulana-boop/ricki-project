"use client";

import { useState } from "react";
import InputCelcius from "./input-celcius";
import TampilFahrenheit from "./tampil-fahrenheit";

export default function KonversiSuhu() {
  const [celcius, setCelcius] = useState(0);

  return (
    <div>
      <InputCelcius nilai={celcius} saatBerubah={setCelcius} />
      <TampilFahrenheit celcius={celcius} />
    </div>
  );
}
