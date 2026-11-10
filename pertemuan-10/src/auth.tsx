// TODO(Level 10): status login lewat Context (pola sama dengan TemaContext
// di pertemuan 10):
// - AuthProvider({ children }): simpan user di useState<string | null>
//   (awal: null = belum login) dan sediakan { user, login, logout } lewat
//   Context Provider. login(nama) mengisi user, logout() mengosongkannya.
// - useAuth(): custom hook pembungkus useContext yang mengembalikan
//   { user, login, logout } dan MELEMPAR Error yang pesannya menyebut
//   "AuthProvider" kalau dipakai di luar AuthProvider.
// Lihat SOAL.md untuk tanda tangan tipe lengkapnya.
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type AuthContextValue = {
  user: string | null;
  login: (nama: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  function login(nama: string) {
    setUser(nama);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }

  return context;
}
