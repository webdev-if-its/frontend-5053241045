// TODO(Level 6): beri tipe props yang benar — { status: Status } (impor
// `Status` dari '../types', jangan tulis ulang union-nya di sini). Lalu
// render teks berbeda sesuai status: pending -> "Menunggu", selesai ->

import type { Status } from "../types";

// "Selesai", batal -> "Dibatalkan". Lihat SOAL.md untuk kontrak lengkap.
export function StatusPesanan(props: { status: Status }) {
  if (props.status === "pending") {
    return <p>Menunggu</p>;
  } else if (props.status === "selesai") {
    return <p>Selesai</p>;
  } else {
    return <p>Dibatalkan</p>;
  }
}
