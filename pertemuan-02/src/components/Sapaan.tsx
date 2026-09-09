// TODO(Level 7): beri tipe props yang benar — { nama?: string } (nama
// OPSIONAL). Kalau nama tidak diberikan, gunakan nilai default "Tamu" —
// cari tahu caranya lewat default parameter destructuring, bukan lewat
// if/else manual. Render <p>Halo, {nama}!</p>. Lihat SOAL.md.
export function Sapaan(props: { nama?: string }) {
  const { nama = "Tamu" } = props;
  return <p>Halo, {nama}!</p>;
}
