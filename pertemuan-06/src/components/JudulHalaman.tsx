// TODO(Level 1): beri tipe props yang benar — { judul: string }. Render
// <h1> berisi judul, DAN ubah judul tab browser (document.title) menjadi
// judul itu. Mengubah document.title adalah SIDE EFFECT — taruh di dalam
// useEffect (bukan di badan komponen), dan pastikan judul tab ikut berubah
// saat prop judul berubah.
// Lihat SOAL.md untuk kontrak lengkap.
// @ts-ignore React's type declarations are unavailable in this environment.

import { useEffect } from 'react'

type JudulHalamanProps = {
  judul: string
}

export function JudulHalaman({ judul }: JudulHalamanProps) {
  useEffect(() => {
    document.title = judul
  }, [judul])

  return <h1>{judul}</h1>
}