// File ini disediakan dosen untuk mengecek progres level secara otomatis.
// JANGAN DIUBAH — perubahan pada file ini tidak akan dipakai saat penilaian
// (dosen menimpa ulang file ini sebelum menjalankan grading). Berbeda dari
// levels.test.tsx, file ini TIDAK menjalankan kode — isinya murni
// pengecekan TIPE lewat `tsc` (fitur typecheck Vitest), supaya `any` atau
// tipe yang salah tetap ketahuan walau perilakunya "kelihatan" benar.
import type { ComponentProps, ReactNode } from 'react'
import type { RouteObject } from 'react-router-dom'
import { expectTypeOf, test } from 'vitest'

import { routes, dashboardRoute } from '../routes'
import { Beranda } from '../pages/Beranda'
import { Tentang } from '../pages/Tentang'
import { Navbar } from '../components/Navbar'
import { FormMasuk } from '../pages/FormMasuk'
import { DetailProduk } from '../pages/DetailProduk'
import { DaftarProduk } from '../pages/DaftarProduk'
import { DashboardLayout } from '../components/DashboardLayout'
import { Ringkasan } from '../pages/Ringkasan'
import { DaftarPengguna } from '../pages/DaftarPengguna'
import { DetailPengguna } from '../pages/DetailPengguna'
import { ErrorPage } from '../components/ErrorPage'
import { RootLayout } from '../components/RootLayout'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { HalamanLogin } from '../pages/HalamanLogin'
import { AuthProvider, useAuth } from '../auth'

test('Level 1 - routes bertipe RouteObject[] & halaman tanpa props', () => {
  expectTypeOf(routes).toEqualTypeOf<RouteObject[]>()
  expectTypeOf<Parameters<typeof Beranda>>().toEqualTypeOf<[]>()
  expectTypeOf<Parameters<typeof Tentang>>().toEqualTypeOf<[]>()
})

test('Level 2 - Navbar tidak menerima props', () => {
  expectTypeOf<Parameters<typeof Navbar>>().toEqualTypeOf<[]>()
})

test('Level 3 - FormMasuk tidak menerima props', () => {
  expectTypeOf<Parameters<typeof FormMasuk>>().toEqualTypeOf<[]>()
})

test('Level 4 - DetailProduk tidak menerima props', () => {
  expectTypeOf<Parameters<typeof DetailProduk>>().toEqualTypeOf<[]>()
})

test('Level 5 - DaftarProduk tidak menerima props', () => {
  expectTypeOf<Parameters<typeof DaftarProduk>>().toEqualTypeOf<[]>()
})

test('Level 7 - dashboardRoute bertipe RouteObject & layout tanpa props', () => {
  expectTypeOf(dashboardRoute).toEqualTypeOf<RouteObject>()
  expectTypeOf<Parameters<typeof DashboardLayout>>().toEqualTypeOf<[]>()
  expectTypeOf<Parameters<typeof Ringkasan>>().toEqualTypeOf<[]>()
  expectTypeOf<Parameters<typeof DaftarPengguna>>().toEqualTypeOf<[]>()
})

test('Level 8 - DetailPengguna tidak menerima props', () => {
  expectTypeOf<Parameters<typeof DetailPengguna>>().toEqualTypeOf<[]>()
})

test('Level 9 - ErrorPage & RootLayout tidak menerima props', () => {
  expectTypeOf<Parameters<typeof ErrorPage>>().toEqualTypeOf<[]>()
  expectTypeOf<Parameters<typeof RootLayout>>().toEqualTypeOf<[]>()
})

test('Level 10 - auth & ProtectedRoute bertipe benar (bonus)', () => {
  expectTypeOf<ComponentProps<typeof AuthProvider>>().toEqualTypeOf<{ children: ReactNode }>()
  expectTypeOf<ReturnType<typeof useAuth>>().toEqualTypeOf<{
    user: string | null
    login: (nama: string) => void
    logout: () => void
  }>()
  expectTypeOf<Parameters<typeof ProtectedRoute>>().toEqualTypeOf<[]>()
  expectTypeOf<Parameters<typeof HalamanLogin>>().toEqualTypeOf<[]>()
})
