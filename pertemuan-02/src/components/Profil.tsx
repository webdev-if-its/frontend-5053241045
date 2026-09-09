// TODO(Level 1): beri tipe props yang benar (bukan `any`) — objek dengan
// dua field: nama (string) dan nrp (string). Lalu render SATU root element
// yang memuat teks "Nama: {nama}" dan "NRP: {nrp}" (boleh di elemen
// terpisah, asal berada di dalam satu pembungkus). Lihat SOAL.md untuk
// kontrak lengkap.
export function Profil(props: { nama: string; nrp: string }) {
  return (
    <div>
      <p>Nama: {props.nama}</p>
      <p>NRP: {props.nrp}</p>
    </div>
  );
}
