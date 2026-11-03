// TODO(Level 7-8): buat Context untuk tema aplikasi (tipe Tema ada di
// '../types'):
// - TemaProvider({ children }): menyimpan tema di useState<Tema> (awal:
//   'terang') dan menyediakan { tema, gantiTema } lewat Context Provider.
//   gantiTema() membalik 'terang' <-> 'gelap'.
// - useTema(): custom hook pembungkus useContext yang mengembalikan
//   { tema, gantiTema }, dan MELEMPAR Error yang pesannya menyebut
//   "TemaProvider" kalau dipakai di luar TemaProvider.
// Beri tipe yang tepat — lihat SOAL.md untuk tanda tangan lengkapnya.

import { createContext, useContext, useState, type ReactNode } from "react";

type Tema = "terang" | "gelap";

type TemaContextType = {
  tema: Tema;
  gantiTema: () => void;
};

const TemaContext = createContext<TemaContextType | undefined>(undefined);

export function TemaProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>("terang");

  const gantiTema = () => {
    setTema((prev) => (prev === "terang" ? "gelap" : "terang"));
  };

  return (
    <TemaContext.Provider value={{ tema, gantiTema }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema(): TemaContextType {
  const context = useContext(TemaContext);

  if (context === undefined) {
    throw new Error("useTema harus digunakan di dalam TemaProvider");
  }

  return context;
}
