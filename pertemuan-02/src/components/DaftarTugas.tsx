// TODO(Level 9): beri tipe props yang benar — { tugas: string[] }. Kalau
// array kosong, render teks "Tidak ada tugas". Kalau tidak kosong, render
// <ul> berisi satu <li> per tugas — WAJIB beri `key` yang tepat di tiap
// <li> (React akan mencatat warning kalau key hilang/salah, dan itu
// dicek otomatis). Lihat SOAL.md untuk kontrak lengkap.
export function DaftarTugas(props: { tugas: string[] }) {
  if (props.tugas.length === 0) {
    return <p>Tidak ada tugas</p>;
  }
  return (
    <ul>
      {props.tugas.map((tugas, index) => (
        <li key={index}>{tugas}</li>
      ))}
    </ul>
  );
}
