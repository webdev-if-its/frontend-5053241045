// TODO(Level 10): komponen TANPA props. Ambil `user` dari useAuth() (dari
// '../auth'). Kalau belum login (user null) render <Navigate to="/login"
// replace />; kalau sudah login render <Outlet /> supaya route anak tampil.
// Lihat SOAL.md untuk kontrak lengkap.
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth";

export function ProtectedRoute() {
  const { user } = useAuth();

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
