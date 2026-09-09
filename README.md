# frontend-nrp

Repo tugas mata kuliah **Frontend**, dibuat dari template [`webdev-if-its/frontend-template`](https://github.com/webdev-if-its/frontend-template). Ganti judul di atas jadi nama repo kalian sendiri (`frontend-nrp`, contoh: `frontend-5025201012`).

## Aturan Umum

- Tugas tiap pertemuan disimpan di folder `pertemuan-XX/` pada repo ini — masing-masing adalah project Vite + React + TypeScript sendiri (`npm install` terpisah per folder).
- Commit message wajib menyebut level yang dicapai: `pertemuan-XX: level N selesai`.
- Deadline push: sebelum pertemuan berikutnya dimulai.
- Semua level dicek otomatis lewat `npm run levels` (Vitest) — baca `pertemuan-XX/SOAL.md` tiap minggu untuk detail levelnya.

## Mengambil Pertemuan Baru Tiap Minggu

Repo ini **tidak otomatis sinkron** dengan template dosen. Begitu ada pertemuan baru, jalankan (ganti `pertemuan-02` sesuai minggu berjalan):

```bash
git fetch https://github.com/webdev-if-its/frontend-template.git main
git checkout FETCH_HEAD -- pertemuan-02
```

Perintah ini **aman dijalankan kapan pun** — tidak akan menimpa folder pertemuan lain yang sudah kalian kerjakan, karena hanya mengambil folder yang disebutkan. Setelah itu, `cd pertemuan-02 && npm install`, lalu commit folder barunya seperti biasa.

Kalau dosen memperbaiki sesuatu di pertemuan yang sudah dirilis (mis. ada bug di test), biasanya cukup ambil ulang file yang diperbaiki saja, bukan seluruh folder — akan diumumkan file mana yang berubah.

---

Bagian di bawah ini **isi bertahap** sesuai level yang sedang kalian kerjakan (lihat `pertemuan-XX/SOAL.md`) — heading-nya dicek otomatis, jangan diganti namanya.

## Struktur Project
main.tsx adalah file utama yang menjalankan file utama yang digunakan untuk menjalankan aplikasi React dan menghubungkannya dengan elemen root pada index.html.
App.tsx berisi component utama yang mengatur isi atau tampilan halaman aplikasi.

## Identitas
- Nama: Wulan Septiani
- NRP: 5053241045
- Kelas: RPL 

## Commit vs Push
git commit adalah proses menyimpan perubahan ke git di komputer. Sedangkan git push adalah proses mengupload perubahan/commit dari komputer ke git.
Contoh situasi : Ana sudah melakukan commit setelah mengerjakan tugas, tetapi ia lupa untuk melakukan push. Akibatnya, perubahan tersebut hanya tersimpan di komputer ana saja dan belum ada di github, sehingga teman satu timnya belum bisa melihat perubahan tersebut karena ana belum melakukan push

## JSX vs TSX
JSX adalah file yang dipakai untuk menulis kode javascript dengan bentuk yang hampir mirip html.
TSX adalah TSX adalah format file yang digunakan untuk menulis TypeScript yang di dalamnya bisa menggunakan JSX.
Project ini memakai TSX karena tipe data props terdeteksi otomatis dan error tertangkap sebelum runtime 

## Kenapa Union Type untuk Status
Union type lebih baik karena status yang digunakan sudah ditentukan, yaitu pending, selesai, atau batal. Jadi, tidak bisa sembarang memasukkan status lain dan dapat mengurangi kesalahan dalam penulisan status.

## Refleksi
(tulis di sini)
