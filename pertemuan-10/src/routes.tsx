// TODO(Level 1, 6, 7, 8, 9, 10): konfigurasi routing dalam bentuk array
// (gaya createBrowserRouter). File ini mengekspor DUA hal:
//
// 1. `routes: RouteObject[]` — konfigurasi aplikasi utama. Bertahap:
//    - Level 1: "/" -> <Beranda />, "/tentang" -> <Tentang />
//    - Level 6: "/produk" -> <DaftarProduk />, "/produk/:id" -> <DetailProduk />
//    - Level 9: bungkus semuanya dalam SATU route root ("/") beralaskan
//      <RootLayout /> dengan errorElement={<ErrorPage />}; halaman di atas
//      menjadi children-nya (index: true untuk Beranda)
//    - Level 10: tambahkan "/login" -> <HalamanLogin />, dan dashboard
//      dibungkus <ProtectedRoute />
//
// 2. `dashboardRoute: RouteObject` — route "/dashboard" dengan layout
//    <DashboardLayout /> dan children (Level 7-8). Diekspor terpisah supaya
//    bisa dites sendiri dan dipakai ulang di `routes`.
//
// Beri tipe RouteObject (impor dari 'react-router-dom') — lihat SOAL.md.
// TODO(Level 1, 6, 7, 8, 9, 10): konfigurasi routing dalam bentuk array
// (gaya createBrowserRouter). File ini mengekspor DUA hal:
//
// 1. `routes: RouteObject[]` — konfigurasi aplikasi utama. Bertahap:
//    - Level 1: "/" -> <Beranda />, "/tentang" -> <Tentang />
//    - Level 6: "/produk" -> <DaftarProduk />, "/produk/:id" -> <DetailProduk />
//    - Level 9: bungkus semuanya dalam SATU route root ("/") beralaskan
//      <RootLayout /> dengan errorElement={<ErrorPage />}; halaman di atas
//      menjadi children-nya (index: true untuk Beranda)
//    - Level 10: tambahkan "/login" -> <HalamanLogin />, dan dashboard
//      dibungkus <ProtectedRoute />
//
// 2. `dashboardRoute: RouteObject` — route "/dashboard" dengan layout
//    <DashboardLayout /> dan children (Level 7-8). Diekspor terpisah supaya
//    bisa dites sendiri dan dipakai ulang di `routes`.
//
// Beri tipe RouteObject (impor dari 'react-router-dom') — lihat SOAL.md.
import type { RouteObject } from "react-router-dom";
import { Beranda } from "./pages/Beranda";
import { Tentang } from "./pages/Tentang";
import { DaftarProduk } from "./pages/DaftarProduk";
import { DetailProduk } from "./pages/DetailProduk";

export const routes: RouteObject[] = [
  { path: "/", element: <Beranda /> },
  { path: "/tentang", element: <Tentang /> },
  { path: "/produk", element: <DaftarProduk /> },
  { path: "/produk/:id", element: <DetailProduk /> },
];

export const dashboardRoute: any = { path: "/dashboard" };