"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Tema = {
  gelap: boolean;
  ubahTema: () => void;
};

const TemaContext = createContext<Tema | null>(null);

export function TemaProvider({ children }: { children: ReactNode }) {
  const [gelap, setGelap] = useState(false);
  const ubahTema = () => setGelap((nilaiLama) => !nilaiLama);

  useEffect(() => {
    document.documentElement.classList.toggle("gelap", gelap);
    document.documentElement.classList.toggle("terang", !gelap);
    document.body.style.backgroundColor = gelap ? "#09090b" : "#ffffff";
    document.body.style.color = gelap ? "#ededed" : "#171717";
  }, [gelap]);

  return <TemaContext.Provider value={{ gelap, ubahTema }}>{children}</TemaContext.Provider>;
}

export function useTema() {
  const tema = useContext(TemaContext);
  if (tema === null) {
    throw new Error("useTema harus dipakai di dalam TemaProvider");
  }
  return tema;
}
