// TODO(Level 10, bonus): beri tipe props yang benar — { tugas: Tugas[];
// onHapus: (id: string) => void } (impor tipe Tugas dari '../types').
// Gabungkan SEMUA yang sudah kalian buat pertemuan ini jadi satu komponen:
// render <RingkasanTugas tugas={tugas} /> DAN <DaftarTugasLengkap
// tugas={tugas} onHapus={onHapus} /> bersama-sama (manfaatkan kembali
// keduanya, jangan tulis ulang logikanya).
//
// Lalu isi `## Refleksi Pertemuan 3` di README (minimal ±40 karakter):
// bagian mana dari conditional rendering atau Tailwind pertemuan ini yang
// paling mengubah cara berpikirmu dibanding menulis HTML/CSS biasa?
//

import type { Tugas } from "../types";
import { RingkasanTugas } from "./RingkasanTugas";
import { DaftarTugasLengkap } from "./DaftarTugasLengkap";

// Lihat SOAL.md untuk kontrak lengkap.
export function AplikasiTodo(props: { tugas: Tugas[]; onHapus: (id: string) => void }) {
  return (
    <div>
      <RingkasanTugas tugas={props.tugas} />
      <DaftarTugasLengkap tugas={props.tugas} onHapus={props.onHapus} />
    </div>
  );
}
