// TODO(Level 6): komponen TANPA props. Tampilkan "Lebar jendela: {n}px"
// (nilai awal window.innerWidth) dan perbarui saat jendela di-resize,
// dengan memasang window.addEventListener("resize", ...) di dalam
// useEffect. Wajib ada cleanup yang memanggil removeEventListener dengan
// fungsi handler yang SAMA persis dengan yang dipasang.
// Lihat SOAL.md untuk kontrak lengkap.

import { useEffect, useState } from "react";

export function LebarJendela() {
  const [lebar, setLebar] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setLebar(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <p>Lebar jendela: {lebar}px</p>;
}