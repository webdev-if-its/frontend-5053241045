// TODO(Level 5): beri tipe props yang benar — { awal?: number }. Simpan
// angka di useState<number> (nilai awal = props.awal, default 0) dan render
// teks "Jumlah: {angka}" plus tiga tombol: "+" (tambah 1), "-" (kurangi 1),
// "Reset" (kembali ke nilai awal).

import { useState } from "react";

// Lihat SOAL.md untuk kontrak lengkap.
export function Penghitung(props: { awal?: number }) {
  const [angka, setAngka] = useState(props.awal ?? 0);

  return (
    <div>
      <p>Jumlah: {angka}</p>

      <button onClick={() => setAngka(angka + 1)}>+</button>
      <button onClick={() => setAngka(angka - 1)}>-</button>
      <button onClick={() => setAngka(props.awal ?? 0)}>Reset</button>
    </div>
  );
}