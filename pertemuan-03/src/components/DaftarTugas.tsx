// TODO(Level 2b): beri tipe props yang benar — { tugas: Tugas[] } (impor
// tipe Tugas dari '../types'). Render sebuah <ul>, satu <ItemTugas> per
// elemen array (manfaatkan kembali komponen ItemTugas dari Level 2a, jangan
// tulis ulang markup-nya). key ditaruh di <ItemTugas key={...} />, bukan di

import type { Tugas } from "../types";
import { ItemTugas } from "./ItemTugas";

// dalam ItemTugas itu sendiri. Lihat SOAL.md untuk kontrak lengkap.
export function DaftarTugas(props: { tugas: Tugas[] }) {
  return (
    <ul>
      {props.tugas.map((tugas) => (
        <ItemTugas key={tugas.id} tugas={tugas} />
      ))}
    </ul>
  )
}
