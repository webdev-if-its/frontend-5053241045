// TODO(Level 8-10): komponen TANPA props — aplikasi todo yang tersambung ke
// API lewat fungsi di '../api/todos' (JANGAN memanggil fetch() langsung di
// sini):
// - saat pertama tampil: ambil daftar (getTodos) dan tampilkan sebagai <li>,
//   tiap <li> berisi checkbox berlabel title + tombol "Hapus",
// - form dengan input berlabel "Todo baru" + tombol "Tambah": panggil
//   addTodo(title), lalu tambahkan todo HASIL RESPONS ke akhir daftar dan
//   kosongkan input,
// - klik checkbox: panggil updateTodo(id, !completed), lalu ganti todo itu di
//   state dengan HASIL RESPONS,
// - klik "Hapus": panggil hapusTodo(id), lalu buang todo itu dari state.
// Lihat SOAL.md untuk kontrak lengkap.
import { useEffect, useState } from 'react'
import { getTodos, addTodo } from '../api/todos'
import type { Todo } from '../types'

export function AplikasiTodoApi() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    getTodos()
      .then((data) => {
        setTodos(data)
      })
      .catch((err: unknown) => {
        console.error(err)
      })
  }, [])

  async function handleTambah(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!title.trim()) {
      return
    }

    try {
      const todoBaru = await addTodo(title)
      setTodos((todosSebelumnya) => [...todosSebelumnya, todoBaru])
      setTitle('')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <form onSubmit={handleTambah}>
        <label htmlFor="todo-baru">Todo baru</label>
        <input
          id="todo-baru"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Tambah</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
              />
              {todo.title}
            </label>
            <button type="button">Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  )
}