// TODO(Level 7): komponen TANPA props (tipe props-nya harus kosong). Buat
// controlled input berlabel "Nama" yang nilainya disimpan di
// useState<string>, dan tampilkan teks "Halo, {nama}!" — kalau nama masih
// kosong, tampilkan "Halo, Tamu!".

import { useState } from "react";

// Lihat SOAL.md untuk kontrak lengkap.
export function SapaNama() {
  const [nama, setNama] = useState<string>("");

  return (
    <div>
      <label>
        Nama:
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
      </label>

      <p>Halo, {nama || "Tamu"}!</p>
    </div>
  );
}
