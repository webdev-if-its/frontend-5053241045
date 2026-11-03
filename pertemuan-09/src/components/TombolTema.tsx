// TODO(Level 9): komponen TANPA props. Ambil tema lewat useTema() dan render
// sebuah <button> bertuliskan "Tema: {tema}" (mis. "Tema: terang") yang saat
// diklik memanggil gantiTema().
// Lihat SOAL.md untuk kontrak lengkap.

import { useTema } from "../context/TemaContext";

export function TombolTema() {
  const { tema, gantiTema } = useTema();

  return (
    <button onClick={gantiTema}>
      Tema: {tema}
    </button>
  );
}


