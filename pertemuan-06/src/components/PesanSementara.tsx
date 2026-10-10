// TODO(Level 4): beri tipe props yang benar — { pesan: string; durasi:
// number }. Tampilkan pesan, lalu SEMBUNYIKAN (hilang dari DOM) setelah
// `durasi` milidetik memakai setTimeout di dalam useEffect. Kalau prop pesan
// berganti, pesan baru tampil lagi dan hitung mundurnya mulai dari awal
// (timer lama harus dibersihkan). Saat komponen dilepas, timer harus ikut
// dibersihkan.
// Lihat SOAL.md untuk kontrak lengkap.

import { useEffect, useState } from "react";

type PesanSementaraProps = {
  pesan: string;
  durasi: number;
};

export function PesanSementara({
  pesan,
  durasi,
}: PesanSementaraProps) {
  const [tampil, setTampil] = useState(true);

  useEffect(() => {
    setTampil(true);

    const timer = setTimeout(() => {
      setTampil(false);
    }, durasi);

    return () => {
      clearTimeout(timer);
    };
  }, [pesan, durasi]);

  if (!tampil) {
    return null;
  }

  return <p>{pesan}</p>;
}