// Sudah lengkap (bukan TODO): memasang AuthProvider DI LUAR router, lalu
// menjalankan `routes` dari ./routes lewat createBrowserRouter. Jalankan
// `npm run dev` untuk mencoba routing kalian di browser.
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AuthProvider } from './auth'
import { routes } from './routes'

const router = createBrowserRouter(routes)

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
