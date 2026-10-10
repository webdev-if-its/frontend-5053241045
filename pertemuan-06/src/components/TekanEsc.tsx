// TODO(Level 7): beri tipe props yang benar — { onEsc: () => void }. Pasang
// listener "keydown" di document di dalam useEffect: saat tombol Escape
// ditekan, panggil onEsc. Render <p>Tekan Esc untuk menutup</p>. Cleanup
// wajib melepas listener, dan efek harus memakai onEsc TERBARU (kalau prop
// onEsc berganti, yang dipanggil adalah fungsi yang baru, bukan yang lama).
// Lihat SOAL.md untuk kontrak lengkap.
import { useEffect, useRef } from 'react'

type TekanEscProps = {
  onEsc: () => void
}

export function TekanEsc({ onEsc }: TekanEscProps) {
  const onEscTerbaru = useRef(onEsc)

  useEffect(() => {
    onEscTerbaru.current = onEsc
  }, [onEsc])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onEscTerbaru.current()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return <p>Tekan Esc untuk menutup</p>
}