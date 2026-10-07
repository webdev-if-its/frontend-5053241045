// TODO(Level 2): komponen TANPA props. Dua state: nama (string) dan jumlah
// klik (number). Render:
// - input berlabel "Nama" (controlled),
// - tombol "+1" dan teks "Klik: {jumlah}".
// Pakai useEffect untuk mengubah document.title menjadi "Halo, {nama}"
// (kalau nama kosong: "Halo, Tamu"). Efek HANYA boleh jalan ulang saat nama
// berubah — klik tombol "+1" tidak boleh memicu efek (atur dependency array).
// Lihat SOAL.md untuk kontrak lengkap.
import { useEffect, useState } from "react";

export function SapaNama() {
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState(0);

  useEffect(() => {
    document.title = nama ? `Halo, ${nama}` : "Halo, Tamu";
  }, [nama]);

  return (
    <div>
      <label>
        Nama
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
      </label>

      <button onClick={() => setJumlah(jumlah + 1)}>+1</button>

      <p>Klik: {jumlah}</p>
    </div>
  );
}