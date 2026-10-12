// TODO(Level 10): beri tipe props yang benar — { detikAwal: number }.
// Gabungkan semua materi pertemuan ini jadi timer belajar:
// - teks "Sisa: {n} detik" (mulai dari detikAwal), tombol "Mulai"/"Jeda"
//   (bergantian) dan tombol "Reset",
// - saat berjalan, sisa berkurang tiap detik; "Jeda" menghentikan timer
//   (tidak ada timer tersisa); "Reset" mengembalikan sisa ke detikAwal
//   dan berhenti,
// - saat sisa = 0: tampil teks "Selesai!", timer berhenti otomatis, dan
//   tombol "Mulai" dinonaktifkan (disabled),
// - judul tab (document.title) selalu "Sisa: {n} detik" selama komponen
//   terpasang, dan KEMBALI ke judul semula saat komponen dilepas
//   (cleanup).
// Lihat SOAL.md untuk kontrak lengkap.

import { useEffect, useState } from "react";

type TimerBelajarProps = {
  detikAwal: number;
};

export function TimerBelajar({
  detikAwal,
}: TimerBelajarProps) {
  const [sisa, setSisa] = useState(detikAwal);
  const [berjalan, setBerjalan] = useState(false);

  useEffect(() => {
    const judulLama = document.title;

    return () => {
      document.title = judulLama;
    };
  }, []);

  useEffect(() => {
    document.title = `Sisa: ${sisa} detik`;
  }, [sisa]);

  useEffect(() => {
    if (!berjalan || sisa === 0) {
      return;
    }

    const interval = setInterval(() => {
      setSisa((nilaiSebelumnya) => nilaiSebelumnya - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [berjalan, sisa]);

  useEffect(() => {
    if (sisa === 0) {
      setBerjalan(false);
    }
  }, [sisa]);

  function mulaiAtauJeda() {
    setBerjalan((nilaiSebelumnya) => !nilaiSebelumnya);
  }

  function reset() {
    setSisa(detikAwal);
    setBerjalan(false);
  }

  return (
    <div>
      <p>Sisa: {sisa} detik</p>

      {sisa === 0 && <p>Selesai!</p>}

      <button
        onClick={mulaiAtauJeda}
        disabled={sisa === 0}
      >
        {berjalan ? "Jeda" : "Mulai"}
      </button>

      <button onClick={reset}>Reset</button>
    </div>
  );
}