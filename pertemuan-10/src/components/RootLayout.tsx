// TODO(Level 9): komponen TANPA props — layout utama seluruh aplikasi.
// Render <Navbar /> (Level 2) lalu <Outlet /> (dari 'react-router-dom').
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
