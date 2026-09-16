// TODO(Level 1): beri tipe props yang benar — { items: { id: string; nama:
// string }[] }. Render sebuah <ul> berisi satu <li> per item, dengan teks
// nama item di dalamnya. Tiap <li> WAJIB diberi prop `key` yang unik (pakai
// item.id, JANGAN pakai index array). Lihat SOAL.md untuk kontrak lengkap.
export function DaftarBelanja(props: { items: { id: string; nama: string }[] }) {
  return (
    <ul>
      {props.items.map((item) => (
        <li key={item.id}>{item.nama}</li>
      ))}
    </ul>
  )
}
