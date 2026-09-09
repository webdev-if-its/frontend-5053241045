// TODO(Level 2): beri tipe props yang benar — { nama: string }. Lalu render
// DUA elemen sejajar TANPA elemen pembungkus tambahan di DOM (gunakan
// Fragment, bukan <div>). Lihat SOAL.md untuk kontrak lengkap.
export function Identitas(props: { nama: string }) {
  return (
    <>
      <h2>Nama: {props.nama}</h2>
      <p>Senang bertemu denganmu!</p>
    </>
  );
}
