// TODO(Level 5): komponen TANPA props. Render <ul> berisi satu <li> per
// produk di `daftarProduk` (dari '../data'); tiap <li> memuat <Link> (dari
// 'react-router-dom') bertuliskan nama produk yang menuju "/produk/{id}".
// Lihat SOAL.md untuk kontrak lengkap.
import { Link } from "react-router-dom";
import { daftarProduk } from "../data";

export function DaftarProduk() {
  return (
    <ul>
      {daftarProduk.map((produk) => (
        <li key={produk.id}>
          <Link to={`/produk/${produk.id}`}>
            {produk.nama}
          </Link>
        </li>
      ))}
    </ul>
  );
}
