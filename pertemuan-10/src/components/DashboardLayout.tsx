// TODO(Level 7): komponen TANPA props — layout untuk nested routes.
// Render:
// - <nav> berisi dua NavLink: "Ringkasan" (ke "/dashboard", pakai prop `end`)
//   dan "Pengguna" (ke "/dashboard/pengguna"),
// - <Outlet /> (dari 'react-router-dom') sebagai tempat halaman anak tampil.
// Bagian nav harus TETAP saat berpindah antar halaman anak.
// Lihat SOAL.md untuk kontrak lengkap.
import { NavLink, Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <>
      <nav>
        <NavLink to="/dashboard" end>
          Ringkasan
        </NavLink>

        <NavLink to="/dashboard/pengguna">
          Pengguna
        </NavLink>
      </nav>

      <Outlet />
    </>
  );
}
