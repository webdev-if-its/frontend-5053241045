// TODO(Level 2): komponen TANPA props. Render <nav> berisi tiga NavLink
// (dari 'react-router-dom'): "Beranda" (ke "/"), "Produk" (ke "/produk"),
// "Tentang" (ke "/tentang"). Link yang sedang aktif mendapat class
// "font-bold" (className berupa fungsi yang menerima { isActive }). Link
// "Beranda" harus memakai prop `end` supaya tidak aktif di semua halaman.
// Lihat SOAL.md untuk kontrak lengkap.
import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav>
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? "font-bold" : "")}
      >
        Beranda
      </NavLink>

      <NavLink
        to="/produk"
        className={({ isActive }) => (isActive ? "font-bold" : "")}
      >
        Produk
      </NavLink>

      <NavLink
        to="/tentang"
        className={({ isActive }) => (isActive ? "font-bold" : "")}
      >
        Tentang
      </NavLink>
    </nav>
  );
}
