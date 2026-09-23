// TODO(Level 10): beri tipe props yang benar — { onKirim: (pesan: string) =>
// void }. Gabungkan semua konsep pertemuan ini: controlled input berlabel
// "Pesan" + tombol submit "Kirim" di dalam <form>. Tombol disabled kalau
// isi pesan (setelah trim) kosong. Saat submit: cegah reload, panggil
// onKirim(pesan yang sudah di-trim), lalu kosongkan input.

import { useState } from "react";

// Lihat SOAL.md untuk kontrak lengkap.
export function FormPesan(props: { onKirim: (pesan: string) => void }) {
  const [pesan, setPesan] = useState("");

  const kosong = pesan.trim() === "";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const pesanBersih = pesan.trim();
        props.onKirim(pesanBersih);
        setPesan("");
      }}
    >
      <label>
        Pesan:
        <input
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
        />
      </label>

      <button type="submit" disabled={kosong}>
        Kirim
      </button>
    </form>
  );
}
