// TODO(Level 9): beri tipe props yang benar — { detikAwal: number;
// onSelesai: () => void }. Tampilkan "Sisa: {n}" yang mulai dari detikAwal
// dan berkurang 1 tiap detik. Saat mencapai 0: panggil onSelesai TEPAT
// SEKALI, berhenti di 0 (tidak negatif), dan tidak ada timer tersisa.
// Saat komponen dilepas di tengah jalan, timer harus dibersihkan dan
// onSelesai tidak boleh terpanggil.
// Lihat SOAL.md untuk kontrak lengkap.
import { useEffect, useRef, useState } from 'react';

type CountdownProps = {
  detikAwal: number;
  onSelesai: () => void;
};

export function Countdown({ detikAwal, onSelesai }: CountdownProps) {
  const [sisa, setSisa] = useState(detikAwal);
  const sudahSelesai = useRef(false);

  useEffect(() => {
    if (sisa <= 0) {
      if (!sudahSelesai.current) {
        sudahSelesai.current = true;
        onSelesai();
      }
      return;
    }

    const timer = setInterval(() => {
      setSisa((sekarang) => Math.max(0, sekarang - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [sisa, onSelesai]);

  return <p>Sisa: {sisa}</p>;
}