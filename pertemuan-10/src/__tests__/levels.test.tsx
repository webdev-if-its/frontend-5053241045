// File ini disediakan dosen untuk mengecek progres level secara otomatis.
// JANGAN DIUBAH — perubahan pada file ini tidak akan dipakai saat penilaian
// (dosen menimpa ulang file ini sebelum menjalankan grading).
// Routing dites di memori (createMemoryRouter / MemoryRouter), bukan di browser.
import { readFileSync } from 'node:fs'
import type { ComponentType, ReactNode } from 'react'
import { act, render, renderHook, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
  useParams,
  type RouteObject,
} from 'react-router-dom'
import { test, expect, vi } from 'vitest'

import { routes, dashboardRoute } from '../routes'
import { Beranda } from '../pages/Beranda'
import { Tentang } from '../pages/Tentang'
import { Navbar } from '../components/Navbar'
import { FormMasuk } from '../pages/FormMasuk'
import { DetailProduk } from '../pages/DetailProduk'
import { DaftarProduk } from '../pages/DaftarProduk'
import { ErrorPage } from '../components/ErrorPage'
import { AuthProvider, useAuth } from '../auth'

const placeholder = '(tulis di sini)'

function readFile(path: string): string {
  try {
    return readFileSync(path, 'utf8')
  } catch {
    return ''
  }
}

function section(readme: string, heading: string): string {
  const headingRe = /^##\s+(.+?)\s*$/gim
  const matches = [...readme.matchAll(headingRe)]
  for (let i = 0; i < matches.length; i++) {
    if (matches[i][1].trim().toLowerCase() === heading.toLowerCase()) {
      const start = matches[i].index! + matches[i][0].length
      const end = i + 1 < matches.length ? matches[i + 1].index! : readme.length
      return readme.slice(start, end).trim()
    }
  }
  return ''
}

function filled(text: string, minLen: number): boolean {
  const t = text.trim()
  if (t === '' || t.toLowerCase() === placeholder) return false
  return t.length >= minLen
}

function tampilkan(
  daftarRoute: RouteObject[],
  path: string | string[],
  opsi?: { index?: number; bungkus?: ComponentType<{ children: ReactNode }> },
) {
  const router = createMemoryRouter(daftarRoute, {
    initialEntries: Array.isArray(path) ? path : [path],
    initialIndex: opsi?.index,
  })
  const Bungkus = opsi?.bungkus
  const pohon = <RouterProvider router={router} />
  const hasil = render(Bungkus ? <Bungkus>{pohon}</Bungkus> : pohon)
  return { router, ...hasil }
}

test('Level 1 - routes dasar: "/" dan "/tentang"', () => {
  const { unmount: u1 } = tampilkan(routes, '/')
  expect(screen.getByRole('heading', { name: 'Beranda' })).toBeInTheDocument()
  u1()
  const { unmount: u2 } = tampilkan(routes, '/tentang')
  expect(screen.getByRole('heading', { name: 'Tentang' })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: 'Beranda' })).toBeNull()
  u2()

  const { unmount: u3 } = render(<Beranda />)
  expect(screen.getByRole('heading', { name: 'Beranda' })).toBeInTheDocument()
  u3()
  render(<Tentang />)
  expect(screen.getByRole('heading', { name: 'Tentang' })).toBeInTheDocument()
})

test('Level 2 - Navbar: NavLink & class link aktif', async () => {
  const user = userEvent.setup()
  const { unmount } = render(
    <MemoryRouter initialEntries={['/produk/2']}>
      <Navbar />
    </MemoryRouter>,
  )
  const beranda = screen.getByRole('link', { name: 'Beranda' })
  const produk = screen.getByRole('link', { name: 'Produk' })
  const tentang = screen.getByRole('link', { name: 'Tentang' })
  expect(beranda).toHaveAttribute('href', '/')
  expect(produk).toHaveAttribute('href', '/produk')
  expect(tentang).toHaveAttribute('href', '/tentang')
  expect(produk.className, '/produk/2 termasuk bagian /produk -> link Produk aktif').toMatch(/font-bold/)
  expect(beranda.className, 'link "/" harus pakai prop end agar tidak aktif di semua halaman').not.toMatch(/font-bold/)
  expect(tentang.className).not.toMatch(/font-bold/)

  await user.click(tentang)
  expect(screen.getByRole('link', { name: 'Tentang' }).className).toMatch(/font-bold/)
  expect(screen.getByRole('link', { name: 'Produk' }).className).not.toMatch(/font-bold/)
  await user.click(screen.getByRole('link', { name: 'Beranda' }))
  expect(screen.getByRole('link', { name: 'Beranda' }).className).toMatch(/font-bold/)
  unmount()
})

test('Level 3 - FormMasuk: useNavigate (pindah halaman & kembali)', async () => {
  const daftar: RouteObject[] = [
    { path: '/', element: <p>Halaman awal</p> },
    { path: '/login', element: <FormMasuk /> },
    { path: '/dashboard', element: <p>Halaman dashboard</p> },
  ]
  const user = userEvent.setup()
  const { router, unmount } = tampilkan(daftar, ['/', '/login'], { index: 1 })
  await user.type(screen.getByLabelText(/nama/i), 'Budi')
  await user.click(screen.getByRole('button', { name: /masuk/i }))
  expect(screen.getByText('Halaman dashboard')).toBeInTheDocument()
  expect(router.state.location.pathname).toBe('/dashboard')
  unmount()

  const { unmount: u2 } = tampilkan(daftar, ['/', '/login'], { index: 1 })
  await user.click(screen.getByRole('button', { name: /kembali/i }))
  expect(screen.getByText('Halaman awal'), 'Kembali harus navigate(-1)').toBeInTheDocument()
  u2()
})

test('Level 4 - DetailProduk: useParams', () => {
  const daftar: RouteObject[] = [{ path: '/produk/:id', element: <DetailProduk /> }]
  const { unmount: u1 } = tampilkan(daftar, '/produk/2')
  expect(screen.getByText('Produk #2')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Mouse' })).toBeInTheDocument()
  u1()
  const { unmount: u2 } = tampilkan(daftar, '/produk/3')
  expect(screen.getByRole('heading', { name: 'Keyboard' })).toBeInTheDocument()
  u2()
  const { unmount: u3 } = tampilkan(daftar, '/produk/99')
  expect(screen.getByText(/produk tidak ditemukan/i)).toBeInTheDocument()
  u3()
  const { unmount: u4 } = tampilkan(daftar, '/produk/abc')
  expect(screen.getByText(/produk tidak ditemukan/i), 'id bukan angka juga tidak ditemukan').toBeInTheDocument()
  u4()
})

test('Level 5 - DaftarProduk: Link ke halaman detail', async () => {
  function DetailPalsu() {
    const { id } = useParams()
    return <p>Detail palsu {id}</p>
  }
  const daftar: RouteObject[] = [
    { path: '/produk', element: <DaftarProduk /> },
    { path: '/produk/:id', element: <DetailPalsu /> },
  ]
  const user = userEvent.setup()
  const { unmount } = tampilkan(daftar, '/produk')
  expect(screen.getAllByRole('listitem')).toHaveLength(3)
  expect(screen.getByRole('link', { name: 'Laptop' })).toHaveAttribute('href', '/produk/1')
  expect(screen.getByRole('link', { name: 'Mouse' })).toHaveAttribute('href', '/produk/2')
  expect(screen.getByRole('link', { name: 'Keyboard' })).toHaveAttribute('href', '/produk/3')
  await user.click(screen.getByRole('link', { name: 'Mouse' }))
  expect(screen.getByText('Detail palsu 2')).toBeInTheDocument()
  unmount()
})

test('Level 6 - routes: /produk dan /produk/:id', async () => {
  const user = userEvent.setup()
  const { unmount } = tampilkan(routes, '/produk')
  expect(screen.getByRole('link', { name: 'Laptop' })).toBeInTheDocument()
  await user.click(screen.getByRole('link', { name: 'Keyboard' }))
  expect(screen.getByText('Produk #3')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Keyboard' })).toBeInTheDocument()
  unmount()

  const { unmount: u2 } = tampilkan(routes, '/produk/1')
  expect(screen.getByRole('heading', { name: 'Laptop' })).toBeInTheDocument()
  u2()
})

test('Level 7 - Nested routes: DashboardLayout + Outlet', async () => {
  const user = userEvent.setup()
  const { unmount } = tampilkan([dashboardRoute], '/dashboard')
  expect(screen.getByRole('heading', { name: 'Ringkasan' }), 'index route -> Ringkasan').toBeInTheDocument()
  const nav = screen.getByRole('navigation')
  expect(within(nav).getByRole('link', { name: 'Ringkasan' })).toHaveAttribute('href', '/dashboard')
  expect(within(nav).getByRole('link', { name: 'Pengguna' })).toHaveAttribute('href', '/dashboard/pengguna')

  await user.click(within(nav).getByRole('link', { name: 'Pengguna' }))
  expect(screen.getByRole('heading', { name: 'Daftar Pengguna' })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: 'Ringkasan' })).toBeNull()
  expect(document.body.contains(nav), 'layout (nav) harus TETAP, hanya isi Outlet yang berganti').toBe(true)
  unmount()

  const { unmount: u2 } = tampilkan([dashboardRoute], '/dashboard/pengguna')
  expect(screen.getByRole('heading', { name: 'Daftar Pengguna' })).toBeInTheDocument()
  expect(screen.getByRole('navigation')).toBeInTheDocument()
  u2()
})

test('Level 8 - Nested + dinamis: /dashboard/pengguna/:id', async () => {
  const user = userEvent.setup()
  const { unmount } = tampilkan([dashboardRoute], '/dashboard/pengguna')
  const nav = screen.getByRole('navigation')
  expect(screen.getByRole('link', { name: 'Ani' })).toHaveAttribute('href', '/dashboard/pengguna/1')
  await user.click(screen.getByRole('link', { name: 'Budi' }))
  expect(screen.getByText('Pengguna #2')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Budi' })).toBeInTheDocument()
  expect(document.body.contains(nav), 'detail pengguna harus tampil DI DALAM layout dashboard').toBe(true)
  unmount()

  const { unmount: u2 } = tampilkan([dashboardRoute], '/dashboard/pengguna/9')
  expect(screen.getByText(/pengguna tidak ditemukan/i)).toBeInTheDocument()
  expect(screen.getByRole('navigation')).toBeInTheDocument()
  u2()
})

test('Level 9 - ErrorPage & RootLayout: 404 dan error tak terduga', () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  const { unmount } = tampilkan(routes, '/tidak-ada')
  expect(screen.getByRole('heading', { name: /404/ }), 'URL yang tidak terdaftar harus jatuh ke errorElement').toBeInTheDocument()
  expect(screen.getByRole('link', { name: /kembali ke beranda/i })).toHaveAttribute('href', '/')
  unmount()

  function Meledak(): never {
    throw new Error('Boom')
  }
  const { unmount: u2 } = tampilkan([{ path: '/', element: <Meledak />, errorElement: <ErrorPage /> }], '/')
  expect(screen.getByRole('heading', { name: /terjadi kesalahan/i })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: /404/ })).toBeNull()
  u2()

  const { unmount: u3 } = tampilkan(routes, '/tentang')
  expect(screen.getByRole('link', { name: 'Produk' }), 'RootLayout: Navbar tampil di setiap halaman').toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Tentang' })).toBeInTheDocument()
  u3()
  errorSpy.mockRestore()
})

test('Level 10 - Protected routes + auth, plus refleksi', async () => {
  const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })
  expect(result.current.user).toBeNull()
  act(() => result.current.login('Budi'))
  expect(result.current.user).toBe('Budi')
  act(() => result.current.logout())
  expect(result.current.user).toBeNull()
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  expect(() => renderHook(() => useAuth())).toThrow(/AuthProvider/)
  errorSpy.mockRestore()

  const user = userEvent.setup()
  const { router, unmount } = tampilkan(routes, '/dashboard', { bungkus: AuthProvider })
  expect(router.state.location.pathname, 'belum login -> dialihkan ke /login').toBe('/login')
  expect(screen.queryByRole('heading', { name: 'Ringkasan' })).toBeNull()

  await user.click(screen.getByRole('button', { name: /masuk/i }))
  expect(router.state.location.pathname, 'nama kosong -> tidak boleh login').toBe('/login')

  await user.type(screen.getByLabelText(/nama/i), 'Budi')
  await user.click(screen.getByRole('button', { name: /masuk/i }))
  expect(router.state.location.pathname).toBe('/dashboard')
  expect(await screen.findByRole('heading', { name: 'Ringkasan' })).toBeInTheDocument()
  unmount()

  const { router: r2, unmount: u2 } = tampilkan(routes, '/produk', { bungkus: AuthProvider })
  expect(r2.state.location.pathname, 'halaman publik tidak boleh dialihkan').toBe('/produk')
  expect(screen.getByRole('link', { name: 'Laptop' })).toBeInTheDocument()
  u2()

  const readme = readFile('../README.md')
  expect(
    filled(section(readme, 'Refleksi Pertemuan 11'), 40),
    "section '## Refleksi Pertemuan 11' belum diisi memadai",
  ).toBe(true)
})
