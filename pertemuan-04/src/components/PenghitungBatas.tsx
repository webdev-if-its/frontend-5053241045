// TODO(Level 6): beri tipe props yang benar — { min: number; max: number }.
// Angka dimulai dari min, ditampilkan sebagai "Nilai: {angka}", dengan tombol
// "+" dan "-". Tombol "+" harus disabled saat angka sudah = max, tombol "-"
// harus disabled saat angka sudah = min.

import { useState } from "react";

// Lihat SOAL.md untuk kontrak lengkap.
export function PenghitungBatas(props: { min: number; max: number }) {
  const [angka, setAngka] = useState(props.min);

  return (
    <div>
      <p>Nilai: {angka}</p>
    
      <button
        onClick={() => setAngka(angka + 1)}
        disabled={angka === props.max}
      >
        +
      </button>

      <button
        onClick={() => setAngka(angka - 1)}
        disabled={angka === props.min}
      >
        -
      </button>
    </div>
  );
}
