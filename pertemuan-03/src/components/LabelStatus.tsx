// TODO(Level 4): beri tipe props yang benar — { selesai: boolean }. Pakai
// TERNARY OPERATOR ( ? : ) di dalam JSX untuk menampilkan teks "Selesai"
// saat selesai bernilai true, atau "Belum Selesai" saat false. Lihat
// SOAL.md untuk kontrak lengkap.
export function LabelStatus(props: { selesai: boolean }) {
  return <span>{props.selesai ? "Selesai" : "Belum Selesai"}</span>
}
