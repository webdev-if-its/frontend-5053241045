# Pertemuan 10 — React Router: Nested Routes, `useParams`, `useNavigate` & Protected Routes

Tugas ini melatih **routing di React**: mendaftarkan halaman lewat konfigurasi array (`createBrowserRouter`-style), **navigasi** dengan `Link`/`NavLink` dan `useNavigate`, **route dinamis** dengan `useParams`, **nested routes** dengan `<Outlet />` (fondasi project dashboard nanti), **penanganan error** dengan `errorElement`, dan **protected routes**. **Soal ini sengaja tidak menunjukkan kode jadi** — tiap level hanya menjelaskan *kontrak* komponennya.

Routing dites **di memori** (`createMemoryRouter`) — tidak butuh browser. Semua route kalian ditulis dalam **`src/routes.tsx`** dalam bentuk array objek (`RouteObject[]`); `src/App.tsx` sudah menyambungkannya ke `createBrowserRouter` supaya bisa dicoba lewat `npm run dev`.

Karena project ini TypeScript, level yang menyangkut komponen dan konfigurasi **dicek dua arah**: perilaku **dan** tipe (bukan `any` — lewat fitur typecheck Vitest). Kalau kalian ganti tipe jadi `any` supaya "aman", test tipe level itu akan tetap gagal.

Nilai mengikuti **level tertinggi yang lolos test secara berurutan** (kalau Level 3 gagal, Level 8 tidak dihitung meski lolos) — kerjakan sejauh kemampuan. Kalian **boleh mengerjakan tidak berurutan** — `npm run levels` tetap menunjukkan level mana saja yang benar-benar lolos apa adanya.

## Cara Kerja Folder Ini

```bash
cd pertemuan-10
npm install       # sekali di awal (memasang react-router-dom)
npm run dev       # coba routing kalian di browser
npm run levels    # cek level mana yang sudah lolos
npm run build     # pastikan project tetap bisa di-build
```

Semua level akan **gagal** di awal — itu normal, kalian belum mengedit apa-apa. File di `src/__tests__/` (`levels.test.tsx` dan `levels.test-d.ts`) **jangan diedit** — dosen menimpa ulang keduanya sebelum menilai.

Level 10 juga butuh isian di **`README.md` milik repo kalian sendiri** (bukan file di folder ini) — heading `## Refleksi Pertemuan 10` sudah disiapkan di sana.

Data contoh ada di `src/data.ts` (`daftarProduk`: Laptop/Mouse/Keyboard, `daftarPengguna`: Ani/Budi) dan tipenya di `src/types.ts` — sudah lengkap, pakai saja.

**Ringkasan struktur akhir** (dibangun bertahap sepanjang level):

```
/                      RootLayout (Navbar + Outlet), errorElement = ErrorPage
├─ (index)             Beranda
├─ tentang             Tentang
├─ produk              DaftarProduk
├─ produk/:id          DetailProduk
├─ login               HalamanLogin
└─ (ProtectedRoute)
   └─ /dashboard       DashboardLayout (nav + Outlet)
      ├─ (index)       Ringkasan
      ├─ pengguna      DaftarPengguna
      └─ pengguna/:id  DetailPengguna
```

---

## Level 1 — Route Dasar (`routes`)

Buat halaman **`Beranda`** (`src/pages/Beranda.tsx`, merender `<h1>Beranda</h1>`) dan **`Tentang`** (`src/pages/Tentang.tsx`, merender `<h1>Tentang</h1>`) — keduanya komponen tanpa props. Lalu di `src/routes.tsx` isi **`routes: RouteObject[]`** (impor `RouteObject` dari `react-router-dom`) sehingga **`"/"`** menampilkan `Beranda` dan **`"/tentang"`** menampilkan `Tentang`.

**Dicek otomatis:** membuka `"/"` menampilkan heading "Beranda" dan `"/tentang"` menampilkan heading "Tentang" (bukan "Beranda"); kedua komponen dapat dirender sendiri; `routes` bertipe persis `RouteObject[]`; komponen tanpa props.

## Level 2 — Komponen `Navbar` (`NavLink`)

Di `src/components/Navbar.tsx`, buat **`Navbar`** — komponen tanpa props. Render **`<nav>`** berisi tiga **`NavLink`**: **"Beranda"** (ke `"/"`), **"Produk"** (ke `"/produk"`), **"Tentang"** (ke `"/tentang"`). Link yang **sedang aktif** mendapat class **`font-bold`** (`className` berupa fungsi yang menerima `{ isActive }`). Link "Beranda" harus memakai prop **`end`** supaya tidak ikut aktif di semua halaman.

**Dicek otomatis:** atribut `href` ketiga link benar; di `/produk/2`, link "Produk" ber-class `font-bold` (rute anak tetap menandai induknya) sedangkan "Beranda" dan "Tentang" tidak; setelah mengklik "Tentang" dan "Beranda", class aktif berpindah dengan benar; komponen tanpa props.

## Level 3 — Halaman `FormMasuk` (`useNavigate`)

Di `src/pages/FormMasuk.tsx`, buat **`FormMasuk`** — komponen tanpa props. Render `<form>` berisi input **berlabel "Nama"**, tombol submit **"Masuk"**, dan tombol biasa (`type="button"`) **"Kembali"**.
- Saat submit: cegah reload, lalu pindah ke **`"/dashboard"`** lewat `useNavigate`.
- Klik "Kembali": mundur satu langkah di history (`navigate(-1)`).

**Dicek otomatis:** submit mengarahkan ke `/dashboard`; "Kembali" (dari history `["/", "/login"]`) kembali ke halaman sebelumnya; komponen tanpa props.

## Level 4 — Halaman `DetailProduk` (`useParams`)

Di `src/pages/DetailProduk.tsx`, buat **`DetailProduk`** — komponen tanpa props yang dipasang di route berparameter `"/produk/:id"`. Ambil `id` dari URL lewat **`useParams`** (nilainya **string** — ubah ke number), cari produknya di `daftarProduk`, lalu render:
- kalau ketemu: teks **`Produk #{id}`** dan **`<h1>{nama produk}</h1>`**;
- kalau tidak ketemu (id tidak ada **atau bukan angka**): teks **`Produk tidak ditemukan`**.

**Dicek otomatis:** `/produk/2` menampilkan "Produk #2" dan heading "Mouse"; `/produk/3` menampilkan "Keyboard"; `/produk/99` dan `/produk/abc` menampilkan "Produk tidak ditemukan"; komponen tanpa props.

## Level 5 — Halaman `DaftarProduk` (`Link`)

Di `src/pages/DaftarProduk.tsx`, buat **`DaftarProduk`** — komponen tanpa props. Render **`<ul>`** berisi satu **`<li>`** per produk di `daftarProduk`; tiap `<li>` memuat **`<Link>`** bertuliskan **nama produk** yang menuju **`/produk/{id}`**.

**Dicek otomatis:** ada 3 `<li>`; link Laptop/Mouse/Keyboard masing-masing ber-`href` `/produk/1`, `/produk/2`, `/produk/3`; mengklik "Mouse" benar-benar pindah ke route `/produk/:id` (tanpa reload); komponen tanpa props.

## Level 6 — `routes`: `/produk` dan `/produk/:id`

Tambahkan ke `routes`: **`"/produk"`** → `DaftarProduk` dan **`"/produk/:id"`** → `DetailProduk`.

**Dicek otomatis:** membuka `/produk` menampilkan daftar; mengklik "Keyboard" pindah ke halaman detail yang menampilkan "Produk #3" dan heading "Keyboard"; membuka `/produk/1` langsung menampilkan "Laptop".

## Level 7 — Nested Routes: `dashboardRoute` & `DashboardLayout`

Ini bagian terpenting — pola yang sama dipakai di project dashboard nanti. Buat:
- **`DashboardLayout`** (`src/components/DashboardLayout.tsx`, tanpa props): render **`<nav>`** berisi dua `NavLink` — **"Ringkasan"** (ke `"/dashboard"`, pakai `end`) dan **"Pengguna"** (ke `"/dashboard/pengguna"`) — lalu **`<Outlet />`** sebagai tempat halaman anak tampil.
- **`Ringkasan`** (`src/pages/Ringkasan.tsx`): `<h2>Ringkasan</h2>`.
- **`DaftarPengguna`** (`src/pages/DaftarPengguna.tsx`): `<h2>Daftar Pengguna</h2>` dan daftar nama pengguna dari `daftarPengguna`.
- Di `src/routes.tsx`, ekspor **`dashboardRoute: RouteObject`** — route **`"/dashboard"`** ber-`element` `DashboardLayout` dengan **`children`**: **index route** → `Ringkasan`, dan **`"pengguna"`** (path relatif!) → `DaftarPengguna`.

**Dicek otomatis:** `/dashboard` menampilkan heading "Ringkasan" dan `<nav>` dengan link ber-`href` yang benar; mengklik "Pengguna" menampilkan "Daftar Pengguna" dan "Ringkasan" hilang, **sementara elemen `<nav>` yang sama tetap ada** (layout tidak dirender ulang — hanya isi `Outlet` yang berganti); `/dashboard/pengguna` langsung menampilkan daftar; `dashboardRoute` bertipe persis `RouteObject`; komponen tanpa props.

## Level 8 — Nested + Dinamis: `/dashboard/pengguna/:id`

Buat **`DetailPengguna`** (`src/pages/DetailPengguna.tsx`, tanpa props): ambil `id` lewat `useParams`, cari di `daftarPengguna`, lalu render **`Pengguna #{id}`** dan **`<h2>{nama}</h2>`** — atau **`Pengguna tidak ditemukan`** kalau tidak ada. Lengkapi:
- `DaftarPengguna`: tiap nama menjadi **`<Link>`** ke **`/dashboard/pengguna/{id}`**;
- `dashboardRoute`: tambahkan child **`"pengguna/:id"`** → `DetailPengguna`.

**Dicek otomatis:** link "Ani" ber-`href` `/dashboard/pengguna/1`; mengklik "Budi" menampilkan "Pengguna #2" dan heading "Budi" **di dalam layout yang sama** (`<nav>` tidak berganti); `/dashboard/pengguna/9` menampilkan "Pengguna tidak ditemukan" dengan `<nav>` tetap ada.

## Level 9 — Error Handling: `ErrorPage` & `RootLayout`

Buat:
- **`ErrorPage`** (`src/components/ErrorPage.tsx`, tanpa props) untuk `errorElement`: ambil error lewat **`useRouteError`**; kalau **`isRouteErrorResponse(error)`** dan `status === 404`, render **`<h1>404 — Halaman tidak ditemukan</h1>`**; selain itu **`<h1>Terjadi kesalahan</h1>`**. Sertakan juga `<Link to="/">` bertuliskan **"Kembali ke beranda"**.
- **`RootLayout`** (`src/components/RootLayout.tsx`, tanpa props): render `<Navbar />` lalu `<Outlet />`.
- Ubah `routes` menjadi **satu route root `"/"`** ber-`element` `RootLayout` dan **`errorElement`** `ErrorPage`, dengan semua halaman sebelumnya (Beranda sebagai index route, tentang, produk, produk/:id) menjadi `children`-nya.

**Dicek otomatis:** URL yang tidak terdaftar (`/tidak-ada`) menampilkan heading "404" dan link "Kembali ke beranda" ke `/`; komponen yang **melempar error** saat render (dipasangi `ErrorPage` sebagai `errorElement`) menampilkan "Terjadi kesalahan" (bukan "404"); di `/tentang` link Navbar dan heading "Tentang" tampil bersamaan; semua komponen tanpa props.

## Level 10 — Protected Routes & Auth (Bonus)

Lengkapi fitur login:
- **`src/auth.tsx`**: **`AuthProvider({ children })`** menyimpan `user` di `useState<string | null>` (awal `null`) dan menyediakan **`{ user, login, logout }`** lewat Context; **`useAuth()`** mengembalikan nilai itu dan **melempar `Error`** yang pesannya menyebut **`AuthProvider`** kalau dipakai di luar Provider. (`AuthProvider` dipasang **di luar** router — `App.tsx` sudah melakukannya.)
- **`ProtectedRoute`** (`src/components/ProtectedRoute.tsx`, tanpa props): kalau `user` `null`, render **`<Navigate to="/login" replace />`**; kalau sudah login, render **`<Outlet />`**.
- **`HalamanLogin`** (`src/pages/HalamanLogin.tsx`, tanpa props): form dengan input **berlabel "Nama"** dan tombol **"Masuk"**. Saat submit: cegah reload; kalau nama (setelah `trim()`) **tidak kosong**, panggil `login(nama)` lalu pindah ke `"/dashboard"`; kalau kosong, **jangan lakukan apa-apa**.
- Di `routes`: tambahkan child **`"login"`** → `HalamanLogin`, dan bungkus `dashboardRoute` dengan **route tanpa path** ber-`element` `<ProtectedRoute />`.

Lalu isi `## Refleksi Pertemuan 10` di README (minimal ±40 karakter): apa bedanya `<Navigate />` dengan `useNavigate()`, dan kenapa protected route di frontend saja **tidak cukup** untuk mengamankan data?

**Dicek otomatis:** `useAuth` (di dalam Provider) bergerak `null` → `"Budi"` → `null` lewat `login`/`logout` dan melempar error bermuatan "AuthProvider" di luar Provider; membuka `/dashboard` saat belum login dialihkan ke `/login`; submit dengan nama kosong tidak berpindah halaman; mengisi nama lalu "Masuk" berpindah ke `/dashboard` dan heading "Ringkasan" tampil; halaman publik (`/produk`) tidak dialihkan; tipe: `AuthProvider` menerima `{ children: ReactNode }`, `useAuth()` mengembalikan persis `{ user: string | null; login: (nama: string) => void; logout: () => void }`; section README terisi memadai.
