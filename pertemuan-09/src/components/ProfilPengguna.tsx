// TODO(Level 10): komponen TANPA props yang menggabungkan custom hook dan
// Context. Ambil data pengguna dengan useFetch<User>(
// 'https://jsonplaceholder.typicode.com/users/1') dari '../hooks/useFetch'
// (JANGAN memanggil fetch() langsung) dan tema dengan useTema(). Elemen
// root-nya adalah <section> dengan className:
// - memuat "bg-white" saat tema 'terang',
// - memuat "bg-slate-900" saat tema 'gelap'.
// Isi: "Memuat..." selama loading; kalau error "Terjadi error: {pesan}"; kalau
// sukses tampilkan name dan email pengguna.
// Lihat SOAL.md untuk kontrak lengkap.
import { useFetch } from "../hooks/useFetch";
import { useTema } from "../context/TemaContext";

type User = {
  name: string;
  email: string;
};

export function ProfilPengguna() {
  const { data, loading, error } = useFetch<User>(
    "https://jsonplaceholder.typicode.com/users/1"
  );

  const { tema } = useTema();

  const kelasTema =
    tema === "terang" ? "bg-white" : "bg-slate-900";

  return (
    <section className={kelasTema}>
      {loading && <p>Memuat...</p>}

      {error && <p>Terjadi error: {error}</p>}

      {data && !loading && !error && (
        <>
          <h2>{data.name}</h2>
          <p>{data.email}</p>
        </>
      )}
    </section>
  );
}