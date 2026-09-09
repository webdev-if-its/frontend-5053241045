// TODO(Level 5): lengkapi TIGA function component di bawah ini (komposisi
// komponen — lihat SOAL.md untuk kontrak lengkap tiap fungsi).

// Header menerima { judul: string }, render <header><h1>{judul}</h1></header>
export function Header(props: { judul: string }) {
  return (<header><h1>{props.judul}</h1></header>)
  
}

// Footer tidak menerima props, render <footer><p>© 2026 Kelas Frontend</p></footer>
export function Footer() {
  return <footer><p>© 2026 Kelas Frontend</p></footer>
}

// Halaman menerima { judul: string }, render <Header judul={judul} />
// diikuti <Footer /> (pakai Fragment, JANGAN tambah <div> pembungkus baru).
export function Halaman(props: { judul: string }) {
  return (
    <>
      <Header judul={props.judul} />
      <Footer />
    </>
  )
}
