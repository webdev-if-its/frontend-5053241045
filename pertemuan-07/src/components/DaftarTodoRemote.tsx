// TODO(Level 6-7): komponen TANPA props. Ambil daftar todo lewat getTodos()
// dari '../api/todos' di dalam useEffect (dependency array kosong), lalu:
// - selama data belum datang, render teks "Memuat...",
// - kalau sukses, render <ul> berisi <li> per todo (tampilkan title, key =
//   id) dan "Memuat..." hilang,
// - kalau gagal (error apa pun), render "Terjadi error: {pesan error}" dan
//   "Memuat..." hilang.
// Simpan data/loading/error di useState. JANGAN memanggil fetch() langsung di
// sini (lihat Level 10).
// Lihat SOAL.md untuk kontrak lengkap.
import { useEffect, useState } from 'react'
import { getTodos } from '../api/todos'
import type { Todo } from '../types'

export function DaftarTodoRemote() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getTodos()
      .then((data) => {
        setTodos(data)
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError(String(err))
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p>Memuat...</p>
  }

  if (error !== null) {
    return <p>Terjadi error: {error}</p>
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}