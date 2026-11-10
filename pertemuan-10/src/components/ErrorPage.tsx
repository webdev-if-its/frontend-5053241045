// TODO(Level 9): komponen TANPA props untuk errorElement. Ambil error lewat
// useRouteError (dari 'react-router-dom'):
// - kalau isRouteErrorResponse(error) dan status 404: render
//   <h1>404 — Halaman tidak ditemukan</h1>,
// - selain itu: render <h1>Terjadi kesalahan</h1>.
// Sertakan juga <Link to="/">Kembali ke beranda</Link>.
// Lihat SOAL.md untuk kontrak lengkap.
import {
  Link,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <>
        <h1>404 — Halaman tidak ditemukan</h1>
        <Link to="/">Kembali ke beranda</Link>
      </>
    );
  }

  return (
    <>
      <h1>Terjadi kesalahan</h1>
      <Link to="/">Kembali ke beranda</Link>
    </>
  );
}