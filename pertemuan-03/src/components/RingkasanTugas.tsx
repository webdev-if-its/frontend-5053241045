// TODO(Level 9): beri tipe props yang benar — { tugas: Tugas[] } (impor
// tipe Tugas dari '../types'). Render:
// - SELALU teks yang memuat pola "<jumlah selesai> dari <total> selesai"
//   (mis. tugas 2 dari 5 selesai -> teks memuat "2" dan "5"),
// - Pakai LOGICAL OPERATOR (&&): TAMBAHAN teks yang memuat kata "Selesai"
//   (mis. "Semua tugas selesai!") HANYA kalau tugas.length lebih dari 0
//   DAN semuanya selesai. Hati-hati: array KOSONG bukan "semua selesai" —
//   jangan sampai pesan perayaan muncul saat tugas.length === 0 (jebakan
//   umum: Array.prototype.every() pada array kosong selalu true).

import type { Tugas } from "../types";

// Lihat SOAL.md untuk kontrak lengkap.
export function RingkasanTugas(props: { tugas: Tugas[] }) {
  const total = props.tugas.length;
  const selesai = props.tugas.filter((t) => t.selesai).length;
  const semuaSelesai = total > 0 && selesai === total;

  return (
    <p>
      {selesai} dari {total} selesai
      {semuaSelesai && " - Semua tugas selesai!"}
    </p>
  );
}
