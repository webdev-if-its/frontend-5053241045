// TODO(Level 10): status login lewat Context (pola sama dengan TemaContext
// di pertemuan 10):
// - AuthProvider({ children }): simpan user di useState<string | null>
//   (awal: null = belum login) dan sediakan { user, login, logout } lewat
//   Context Provider. login(nama) mengisi user, logout() mengosongkannya.
// - useAuth(): custom hook pembungkus useContext yang mengembalikan
//   { user, login, logout } dan MELEMPAR Error yang pesannya menyebut
//   "AuthProvider" kalau dipakai di luar AuthProvider.
// Lihat SOAL.md untuk tanda tangan tipe lengkapnya.
export function AuthProvider(props: any) {
  return <>{props.children}</>
}

export function useAuth(): any {
  throw new Error('TODO')
}
