// TODO(Level 1-2): custom hook useCounter(initial: number = 0) yang
// mengembalikan object { count, increment, decrement, reset }:
// - count: number (mulai dari `initial`),
// - increment(): count + 1, decrement(): count - 1,
// - reset(): kembali ke `initial` (bukan selalu 0).
// Tiap pemanggilan useCounter() punya state SENDIRI. Beri tipe parameter dan
// return yang tepat — lihat SOAL.md untuk tanda tangan lengkapnya.

import { useState } from "react";

export function useCounter(initial: number = 0) {
  const [count, setCount] = useState(initial);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  const reset = () => {
    setCount(initial);
  };

  return { count, increment, decrement, reset };
}

