// TODO(Level 4): ganti dengan NRP kalian sendiri, contoh: '5025201012'
export const NRP = '5053241045'

// TODO(Level 3): kembalikan args[0] kalau ada isinya, kalau tidak kembalikan
// fallback.
export function resolveNama(args: string[], fallback: string): string {
  return args[0] || fallback
}

// TODO(Level 5): gabungkan Nama, NRP, dan process.version jadi satu string
// siap cetak (lihat contoh format di SOAL.md).
export function cetakInfo(nama: string): string {
  return `${nama} (${NRP}) - Node.js ${process.version}`
}
