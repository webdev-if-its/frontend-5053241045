// TODO(Level 4): beri tipe props yang benar — { onLogin: (email: string) =>
// void }. Render <form> berisi input berlabel "Email" dan tombol submit
// "Masuk". Saat form dikirim: cegah reload halaman (e.preventDefault()),
// lalu panggil onLogin dengan isi email.
// Lihat SOAL.md untuk kontrak lengkap.
export function FormLogin(props: { onLogin: (email: string) => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;

        props.onLogin(email);
      }}
    >
      <label>
        Email:
        <input type="email" name="email" required />
      </label>

      <button type="submit">Masuk</button>
    </form>
  );
}