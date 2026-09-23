// TODO(Level 8): komponen TANPA props. Render dua input angka berlabel
// "Angka A" dan "Angka B" (type="number") dan teks "Hasil: {A + B}".
// Ingat: e.target.value SELALU string — ubah ke number sebelum dijumlahkan,
// dan input kosong dianggap 0.
// Lihat SOAL.md untuk kontrak lengkap.
import { useState } from "react";

export function KalkulatorMini() {
  const [angkaA, setAngkaA] = useState<number>(0);
  const [angkaB, setAngkaB] = useState<number>(0);

  return (
    <div>
      <label>
        Angka A:
        <input
          type="number"
          value={angkaA}
          onChange={(e) => setAngkaA(Number(e.target.value))}
        />
      </label>

      <label>
        Angka B:
        <input
          type="number"
          value={angkaB}
          onChange={(e) => setAngkaB(Number(e.target.value))}
        />
      </label>

      <p>Hasil: {angkaA + angkaB}</p>
    </div>
  );
}
