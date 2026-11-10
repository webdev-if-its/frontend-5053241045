// TODO(Level 10): komponen TANPA props. Form dengan input berlabel "Nama"
// dan tombol submit "Masuk". Saat submit: cegah reload; kalau nama (setelah
// trim) tidak kosong, panggil login(nama) dari useAuth() lalu pindah ke
// "/dashboard" lewat useNavigate; kalau kosong, jangan lakukan apa-apa.
// Lihat SOAL.md untuk kontrak lengkap.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";

export function HalamanLogin() {
  const [nama, setNama] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const namaBersih = nama.trim();

    if (!namaBersih) {
      return;
    }

    login(namaBersih);
    navigate("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nama">Nama</label>
      <input
        id="nama"
        type="text"
        value={nama}
        onChange={(event) => setNama(event.target.value)}
      />

      <button type="submit">Masuk</button>
    </form>
  );
}
