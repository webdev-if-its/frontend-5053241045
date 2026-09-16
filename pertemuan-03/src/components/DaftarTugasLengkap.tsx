// TODO(Level 8): beri tipe props yang benar — { tugas: Tugas[]; onHapus:
// (id: string) => void } (impor tipe Tugas dari '../types'). Gabungkan
// beberapa konsep pertemuan ini:
// - kalau tugas.length === 0, render teks yang memuat "Tidak ada tugas",
// - kalau tidak, render daftar tugas (boleh pakai <ul>/<li> atau <div>),
//   dan di tiap item sertakan sebuah <Button variant="danger"> berteks
//   "Hapus" yang saat diklik memanggil onHapus(id) dengan id tugas
//   tersebut — MANFAATKAN KEMBALI komponen Button dari Level 7, jangan
//   tulis <button> baru dari nol.

import type { Tugas } from "../types";
import { Button } from "./Button";
import { KartuTugas } from "./KartuTugas";

// Lihat SOAL.md untuk kontrak lengkap.
export function DaftarTugasLengkap(props: { tugas: Tugas[]; onHapus: (id: string) => void }) {
  return (
    <div>
      {props.tugas.length === 0 ? (
        <p>Tidak ada tugas</p>
      ) : (
        <ul>
          {props.tugas.map((tugas) => (
            <li key={tugas.id}>
              <KartuTugas teks={tugas.teks} selesai={tugas.selesai} />
              <Button variant="danger" onClick={() => props.onHapus(tugas.id)}>
                Hapus
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
